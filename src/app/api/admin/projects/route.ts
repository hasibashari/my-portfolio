import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { getProjects, createProject, getProjectById } from '@/shared/db/projects.service'
import { ProjectItem, PROJECT_CATEGORIES } from '@/shared/types/projects'

export async function GET() {
  try {
    const projects = await getProjects()
    return NextResponse.json({ success: true, data: projects })
  } catch (error) {
    console.error('Failed to get projects:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve projects from database' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validation
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

    if (!title || typeof title !== 'string' || title.trim() === '') {
      return NextResponse.json(
        { success: false, error: 'Project title is required' },
        { status: 400 }
      )
    }

    // Determine slug: either provided or derived from title
    let finalSlug = slug && typeof slug === 'string' ? slug.trim() : ''
    if (!finalSlug) {
      finalSlug = title
        .toString()
        .toLowerCase()
        .trim()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '')
    }

    // Slug format check
    const slugRegex = /^[a-z0-9-]+$/
    if (!slugRegex.test(finalSlug)) {
      return NextResponse.json(
        { success: false, error: 'Project URL slug must only contain lowercase letters, numbers, and hyphens' },
        { status: 400 }
      )
    }

    if (!category || !(PROJECT_CATEGORIES as readonly string[]).includes(category) || category === 'All') {
      return NextResponse.json(
        { success: false, error: `Invalid category. Must be one of: ${PROJECT_CATEGORIES.filter(c => c !== 'All').join(', ')}` },
        { status: 400 }
      )
    }

    if (!description || typeof description !== 'string' || description.trim() === '') {
      return NextResponse.json(
        { success: false, error: 'Project description is required' },
        { status: 400 }
      )
    }

    if (!imageUrl || typeof imageUrl !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Project image URL is required' },
        { status: 400 }
      )
    }

    if (!demoUrl || typeof demoUrl !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Project demo URL is required' },
        { status: 400 }
      )
    }

    // Check duplicate Slug
    const existing = await getProjectById(finalSlug)
    if (existing) {
      return NextResponse.json(
        { success: false, error: `A project with URL slug "${finalSlug}" already exists` },
        { status: 409 }
      )
    }

    // Generate automatic UUID for project internal ID
    const newId = crypto.randomUUID()

    const newProject: ProjectItem = {
      id: newId,
      slug: finalSlug,
      title: title.trim(),
      badge: (badge && typeof badge === 'string') ? badge.trim() : category.toUpperCase(),
      category: category as ProjectItem['category'],
      badgeColor: (badgeColor && typeof badgeColor === 'string') ? badgeColor.trim() : '#cc785c',
      description: description.trim(),
      longDescription: (longDescription && typeof longDescription === 'string') ? longDescription.trim() : undefined,
      techStack: Array.isArray(techStack) ? techStack.map(t => String(t).trim()).filter(Boolean) : [],
      demoUrl: demoUrl.trim(),
      githubUrl: (githubUrl && typeof githubUrl === 'string') ? githubUrl.trim() : undefined,
      imageUrl: imageUrl.trim(),
      featured: Boolean(featured),
    }

    const created = await createProject(newProject)

    // Invalidate SSR cache so home and projects pages show the new project immediately
    revalidatePath('/')
    revalidatePath('/projects')

    return NextResponse.json({ success: true, data: created }, { status: 201 })
  } catch (error) {
    console.error('Failed to create project:', error)
    return NextResponse.json(
      { success: false, error: 'An error occurred while creating the project' },
      { status: 500 }
    )
  }
}
