import { NextRequest, NextResponse } from 'next/server'
import { getArticleById, updateArticle, deleteArticle, getArticleBySlug } from '../../../../../shared/lib/db'
import { BlogPost } from '../../../../../shared/constants/blog'

interface RouteContext {
  params: Promise<{ id: string }>
}

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params
    const articleId = parseInt(id, 10)
    if (isNaN(articleId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid article ID format' },
        { status: 400 }
      )
    }

    const article = await getArticleById(articleId)
    if (!article) {
      return NextResponse.json(
        { success: false, error: `Article with ID ${articleId} not found` },
        { status: 404 }
      )
    }
    return NextResponse.json({ success: true, data: article })
  } catch (error) {
    console.error('Failed to get article:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve article from database' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params
    const articleId = parseInt(id, 10)
    if (isNaN(articleId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid article ID format' },
        { status: 400 }
      )
    }

    const existing = await getArticleById(articleId)
    if (!existing) {
      return NextResponse.json(
        { success: false, error: `Article with ID ${articleId} not found` },
        { status: 404 }
      )
    }

    const body = await request.json()
    const {
      slug,
      title,
      date,
      category,
      isCoralBadge,
      readingTime,
      description,
      tags,
      author,
      sections,
    } = body

    if (slug !== undefined) {
      const slugRegex = /^[a-z0-9-]+$/
      if (!slugRegex.test(String(slug).trim())) {
        return NextResponse.json(
          { success: false, error: 'Slug must only contain lowercase alphanumeric characters and hyphens' },
          { status: 400 }
        )
      }

      // Check if new slug conflicts with another article
      const conflict = await getArticleBySlug(String(slug).trim())
      if (conflict && conflict.id !== articleId) {
        return NextResponse.json(
          { success: false, error: `Slug "${String(slug).trim()}" is already used by another article` },
          { status: 409 }
        )
      }
    }

    const updates: Partial<BlogPost> = {}

    if (slug !== undefined) updates.slug = String(slug).trim()
    if (title !== undefined) updates.title = String(title).trim()
    if (date !== undefined) updates.date = String(date).trim()
    if (category !== undefined) updates.category = String(category).trim().toUpperCase()
    if (isCoralBadge !== undefined) updates.isCoralBadge = Boolean(isCoralBadge)
    if (readingTime !== undefined) updates.readingTime = String(readingTime).trim()
    if (description !== undefined) updates.description = String(description).trim()
    if (tags !== undefined) {
      updates.tags = Array.isArray(tags) ? tags.map(t => String(t).trim()).filter(Boolean) : []
    }
    if (author !== undefined && typeof author === 'object') {
      updates.author = {
        name: author.name ? String(author.name).trim() : existing.author.name,
        role: author.role ? String(author.role).trim() : existing.author.role,
        avatar: author.avatar ? String(author.avatar).trim() : undefined,
      }
    }
    if (sections !== undefined && Array.isArray(sections)) {
      updates.sections = sections
    }

    const updated = await updateArticle(articleId, updates)
    return NextResponse.json({ success: true, data: updated })
  } catch (error) {
    console.error('Failed to update article:', error)
    return NextResponse.json(
      { success: false, error: 'An error occurred while updating the article' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params
    const articleId = parseInt(id, 10)
    if (isNaN(articleId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid article ID format' },
        { status: 400 }
      )
    }

    const existing = await getArticleById(articleId)
    if (!existing) {
      return NextResponse.json(
        { success: false, error: `Article with ID ${articleId} not found` },
        { status: 404 }
      )
    }

    const success = await deleteArticle(articleId)
    if (!success) {
      return NextResponse.json(
        { success: false, error: 'Failed to delete article' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, message: `Article "${existing.title}" deleted successfully` })
  } catch (error) {
    console.error('Failed to delete article:', error)
    return NextResponse.json(
      { success: false, error: 'An error occurred while deleting the article' },
      { status: 500 }
    )
  }
}
