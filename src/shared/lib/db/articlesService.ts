import { getDb } from './db'
import { BlogPost, ArticleSection } from '../../constants/blog'

interface ArticleRow {
  id: number
  slug: string
  title: string
  date: string
  category: string
  isCoralBadge: number
  readingTime: string
  description: string
  tags: string
  author: string
  sections: string
  createdAt: string
  updatedAt: string
}

function mapRowToArticle(row: ArticleRow): BlogPost {
  let tags: string[] = []
  let author = { name: 'Hasib Ashari', role: 'Software Engineer', avatar: undefined as string | undefined }
  let sections: ArticleSection[] = []

  try {
    tags = typeof row.tags === 'string' ? JSON.parse(row.tags) : row.tags
  } catch {
    tags = []
  }

  try {
    author = typeof row.author === 'string' ? JSON.parse(row.author) : row.author
  } catch {
    author = { name: 'Hasib Ashari', role: 'Software Engineer', avatar: undefined }
  }

  try {
    sections = typeof row.sections === 'string' ? JSON.parse(row.sections) : row.sections
  } catch {
    sections = []
  }

  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    date: row.date,
    category: row.category,
    isCoralBadge: Boolean(row.isCoralBadge),
    readingTime: row.readingTime,
    description: row.description,
    tags,
    author,
    sections,
  }
}

export function getArticles(): BlogPost[] {
  const db = getDb()
  const rows = db.prepare('SELECT * FROM articles ORDER BY datetime(createdAt) DESC').all() as ArticleRow[]
  return rows.map(mapRowToArticle)
}

export function getArticleById(id: number): BlogPost | null {
  const db = getDb()
  const row = db.prepare('SELECT * FROM articles WHERE id = ?').get(id) as ArticleRow | undefined
  if (!row) return null
  return mapRowToArticle(row)
}

export function getArticleBySlug(slug: string): BlogPost | null {
  const db = getDb()
  const row = db.prepare('SELECT * FROM articles WHERE slug = ?').get(slug) as ArticleRow | undefined
  if (!row) return null
  return mapRowToArticle(row)
}

export const getBlogPostBySlug = getArticleBySlug

export function getAllBlogSlugs(): string[] {
  const db = getDb()
  const rows = db.prepare('SELECT slug FROM articles').all() as { slug: string }[]
  return rows.map(r => r.slug)
}

export function getRelatedBlogPosts(currentSlug: string, count: number = 2): BlogPost[] {
  const db = getDb()
  const rows = db.prepare('SELECT * FROM articles WHERE slug != ? ORDER BY datetime(createdAt) DESC LIMIT ?').all(currentSlug, count) as ArticleRow[]
  return rows.map(mapRowToArticle)
}

export function createArticle(data: Omit<BlogPost, 'id'> & { id?: number }): BlogPost {
  const db = getDb()
  const insert = db.prepare(`
    INSERT INTO articles (
      slug, title, date, category, isCoralBadge, readingTime,
      description, tags, author, sections, createdAt, updatedAt
    ) VALUES (
      ?, ?, ?, ?, ?, ?,
      ?, ?, ?, ?, datetime('now'), datetime('now')
    )
  `)

  const info = insert.run(
    data.slug,
    data.title,
    data.date,
    data.category,
    data.isCoralBadge ? 1 : 0,
    data.readingTime,
    data.description,
    JSON.stringify(data.tags || []),
    JSON.stringify(data.author || { name: 'Hasib Ashari', role: 'Software Engineer' }),
    JSON.stringify(data.sections || [])
  )

  const createdId = Number(info.lastInsertRowid)
  const created = getArticleById(createdId)
  if (!created) {
    throw new Error('Failed to retrieve newly created article')
  }
  return created
}

export function updateArticle(id: number, updates: Partial<BlogPost>): BlogPost | null {
  const existing = getArticleById(id)
  if (!existing) return null

  const updated: BlogPost = {
    ...existing,
    ...updates,
    id: existing.id,
  }

  const db = getDb()
  const stmt = db.prepare(`
    UPDATE articles SET
      slug = ?,
      title = ?,
      date = ?,
      category = ?,
      isCoralBadge = ?,
      readingTime = ?,
      description = ?,
      tags = ?,
      author = ?,
      sections = ?,
      updatedAt = datetime('now')
    WHERE id = ?
  `)

  stmt.run(
    updated.slug,
    updated.title,
    updated.date,
    updated.category,
    updated.isCoralBadge ? 1 : 0,
    updated.readingTime,
    updated.description,
    JSON.stringify(updated.tags || []),
    JSON.stringify(updated.author || { name: 'Hasib Ashari', role: 'Software Engineer' }),
    JSON.stringify(updated.sections || []),
    id
  )

  return getArticleById(id)
}

export function deleteArticle(id: number): boolean {
  const db = getDb()
  const info = db.prepare('DELETE FROM articles WHERE id = ?').run(id)
  return info.changes > 0
}
