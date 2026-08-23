import { NextRequest, NextResponse } from 'next/server'
import { getArticles, createArticle, getArticleBySlug } from '../../../../shared/lib/db'

export async function GET() {
  try {
    const articles = getArticles()
    return NextResponse.json({ success: true, data: articles })
  } catch (error) {
    console.error('Failed to get articles:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve articles from database' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
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

    if (!slug || typeof slug !== 'string' || slug.trim() === '') {
      return NextResponse.json(
        { success: false, error: 'Article slug is required' },
        { status: 400 }
      )
    }

    const slugRegex = /^[a-z0-9-]+$/
    if (!slugRegex.test(slug.trim())) {
      return NextResponse.json(
        { success: false, error: 'Slug must only contain lowercase alphanumeric characters and hyphens' },
        { status: 400 }
      )
    }

    if (!title || typeof title !== 'string' || title.trim() === '') {
      return NextResponse.json(
        { success: false, error: 'Article title is required' },
        { status: 400 }
      )
    }

    if (!category || typeof category !== 'string' || category.trim() === '') {
      return NextResponse.json(
        { success: false, error: 'Article category is required' },
        { status: 400 }
      )
    }

    if (!description || typeof description !== 'string' || description.trim() === '') {
      return NextResponse.json(
        { success: false, error: 'Article description is required' },
        { status: 400 }
      )
    }

    // Check slug uniqueness
    const existing = getArticleBySlug(slug.trim())
    if (existing) {
      return NextResponse.json(
        { success: false, error: `An article with slug "${slug.trim()}" already exists` },
        { status: 409 }
      )
    }

    const formattedDate = date && typeof date === 'string' && date.trim() !== ''
      ? date.trim()
      : new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date())

    const calculatedReadingTime = readingTime && typeof readingTime === 'string' && readingTime.trim() !== ''
      ? readingTime.trim()
      : '5 min read'

    const authorObj = author && typeof author === 'object'
      ? {
          name: author.name ? String(author.name).trim() : 'Hasib Ashari',
          role: author.role ? String(author.role).trim() : 'Software Engineer',
          avatar: author.avatar ? String(author.avatar).trim() : undefined,
        }
      : {
          name: 'Hasib Ashari',
          role: 'Software Engineer',
        }

    const parsedSections = Array.isArray(sections) ? sections : [
      {
        heading: 'Introduction',
        paragraphs: [description.trim()],
      }
    ]

    const newArticle = {
      slug: slug.trim(),
      title: title.trim(),
      date: formattedDate,
      category: category.trim().toUpperCase(),
      isCoralBadge: Boolean(isCoralBadge),
      readingTime: calculatedReadingTime,
      description: description.trim(),
      tags: Array.isArray(tags) ? tags.map(t => String(t).trim()).filter(Boolean) : [],
      author: authorObj,
      sections: parsedSections,
    }

    const created = createArticle(newArticle)
    return NextResponse.json({ success: true, data: created }, { status: 201 })
  } catch (error) {
    console.error('Failed to create article:', error)
    return NextResponse.json(
      { success: false, error: 'An error occurred while creating the article' },
      { status: 500 }
    )
  }
}
