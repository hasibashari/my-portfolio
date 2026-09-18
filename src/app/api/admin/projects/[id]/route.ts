import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { getProjectById, updateProject, deleteProject } from '@/shared/db/projects.service'
import { ProjectItem, PROJECT_CATEGORIES } from '@/shared/types/projects'

interface RouteContext {
  params: Promise<{ id: string }>
}

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params
    const project = await getProjectById(id)
    if (!project) {
      return NextResponse.json(
        { success: false, error: `Project with ID "${id}" not found` },
        { status: 404 }
      )
    }
    return NextResponse.json({ success: true, data: project })
  } catch (error) {
    console.error('Failed to get project:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve project from database' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params
    const existing = await getProjectById(id)
    if (!existing) {
      return NextResponse.json(
        { success: false, error: `Project with ID "${id}" not found` },
        { status: 404 }
      )
    }

    const body = await request.json()
    const {
      slug,
      title,
      badge,
      category,
      badgeColor,
      description,
      longDescription,
      techStack,
      demoUrl,
      githubUrl,
      imageUrl,
      featured,
    } = body

    const updates: Partial<ProjectItem> = {}

    if (slug !== undefined) {
      const trimmedSlug = String(slug).trim()
      const slugRegex = /^[a-z0-9-]+$/
      if (!slugRegex.test(trimmedSlug)) {
        return NextResponse.json(
          { success: false, error: 'Project URL slug must only contain lowercase letters, numbers, and hyphens' },
          { status: 400 }
        )
      }

      // Check if slug is used by another project
      const conflict = await getProjectById(trimmedSlug)
      if (conflict && conflict.id !== existing.id) {
        return NextResponse.json(
          { success: false, error: `A project with URL slug "${trimmedSlug}" already exists` },
          { status: 409 }
        )
      }

      updates.slug = trimmedSlug
    }

    if (category && (!(PROJECT_CATEGORIES as readonly string[]).includes(category) || category === 'All')) {
      return NextResponse.json(
        { success: false, error: `Invalid category. Must be one of: ${PROJECT_CATEGORIES.filter(c => c !== 'All').join(', ')}` },
        { status: 400 }
      )
    }

    if (title !== undefined) updates.title = String(title).trim()
    if (category !== undefined) {
      updates.category = category as ProjectItem['category']
      updates.badge = badge ? String(badge).trim() : category.toUpperCase()
    } else if (badge !== undefined) {
      updates.badge = String(badge).trim()
    }
    if (badgeColor !== undefined) updates.badgeColor = String(badgeColor).trim()
    if (description !== undefined) updates.description = String(description).trim()
    if (longDescription !== undefined) updates.longDescription = String(longDescription).trim()
    if (techStack !== undefined) {
      updates.techStack = Array.isArray(techStack) ? techStack.map(t => String(t).trim()).filter(Boolean) : []
    }
    if (demoUrl !== undefined) updates.demoUrl = String(demoUrl).trim()
    if (githubUrl !== undefined) updates.githubUrl = String(githubUrl).trim()
    if (imageUrl !== undefined) updates.imageUrl = String(imageUrl).trim()
    if (featured !== undefined) updates.featured = Boolean(featured)

    const updated = await updateProject(existing.id, updates)

    // Invalidate SSR cache so home and projects pages reflect the update immediately
    revalidatePath('/')
    revalidatePath('/projects')

    return NextResponse.json({ success: true, data: updated })
  } catch (error) {
    console.error('Failed to update project:', error)
    return NextResponse.json(
      { success: false, error: 'An error occurred while updating the project' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params
    const existing = await getProjectById(id)
    if (!existing) {
      return NextResponse.json(
        { success: false, error: `Project with ID "${id}" not found` },
        { status: 404 }
      )
    }

    const success = await deleteProject(id)
    if (!success) {
      return NextResponse.json(
        { success: false, error: 'Failed to delete project' },
        { status: 500 }
      )
    }

    // Invalidate SSR cache so home and projects pages no longer show the deleted project
    revalidatePath('/')
    revalidatePath('/projects')

    return NextResponse.json({ success: true, message: `Project "${id}" deleted successfully` })
  } catch (error) {
    console.error('Failed to delete project:', error)
    return NextResponse.json(
      { success: false, error: 'An error occurred while deleting the project' },
      { status: 500 }
    )
  }
}
