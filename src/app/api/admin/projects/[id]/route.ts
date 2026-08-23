import { NextRequest, NextResponse } from 'next/server'
import { getProjectById, updateProject, deleteProject } from '../../../../../shared/lib/db'
import { ProjectItem, PROJECT_CATEGORIES } from '../../../../../shared/constants/projects'

interface RouteContext {
  params: Promise<{ id: string }>
}

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params
    const project = getProjectById(id)
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
    const existing = getProjectById(id)
    if (!existing) {
      return NextResponse.json(
        { success: false, error: `Project with ID "${id}" not found` },
        { status: 404 }
      )
    }

    const body = await request.json()
    const {
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
      codeSnippet,
      featured,
    } = body

    if (category && (!(PROJECT_CATEGORIES as readonly string[]).includes(category) || category === 'All')) {
      return NextResponse.json(
        { success: false, error: `Invalid category. Must be one of: ${PROJECT_CATEGORIES.filter(c => c !== 'All').join(', ')}` },
        { status: 400 }
      )
    }

    const updates: Partial<ProjectItem> = {}

    if (title !== undefined) updates.title = String(title).trim()
    if (badge !== undefined) updates.badge = String(badge).trim()
    if (category !== undefined) updates.category = category as ProjectItem['category']
    if (badgeColor !== undefined) updates.badgeColor = String(badgeColor).trim()
    if (description !== undefined) updates.description = String(description).trim()
    if (longDescription !== undefined) updates.longDescription = String(longDescription).trim()
    if (techStack !== undefined) {
      updates.techStack = Array.isArray(techStack) ? techStack.map(t => String(t).trim()).filter(Boolean) : []
    }
    if (demoUrl !== undefined) updates.demoUrl = String(demoUrl).trim()
    if (githubUrl !== undefined) updates.githubUrl = String(githubUrl).trim()
    if (imageUrl !== undefined) updates.imageUrl = String(imageUrl).trim()
    if (codeSnippet !== undefined) updates.codeSnippet = String(codeSnippet).trim()
    if (featured !== undefined) updates.featured = Boolean(featured)

    const updated = updateProject(id, updates)
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
    const existing = getProjectById(id)
    if (!existing) {
      return NextResponse.json(
        { success: false, error: `Project with ID "${id}" not found` },
        { status: 404 }
      )
    }

    const success = deleteProject(id)
    if (!success) {
      return NextResponse.json(
        { success: false, error: 'Failed to delete project' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, message: `Project "${id}" deleted successfully` })
  } catch (error) {
    console.error('Failed to delete project:', error)
    return NextResponse.json(
      { success: false, error: 'An error occurred while deleting the project' },
      { status: 500 }
    )
  }
}
