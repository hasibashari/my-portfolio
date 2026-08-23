import { getPool, initDb } from './db'
import { BlogPost, ArticleSection } from '../../constants/blog'

interface ArticleRow {
  id: number
  slug: string
  title: string
  date: string
  category: string
  isCoralBadge: boolean
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

export async function getArticles(): Promise<BlogPost[]> {
  await initDb()
  const pool = getPool()
  const { rows } = await pool.query<ArticleRow>(
    'SELECT * FROM articles ORDER BY "createdAt" DESC',
  )
  return rows.map(mapRowToArticle)
}

export async function getArticleById(id: number): Promise<BlogPost | null> {
  await initDb()
  const pool = getPool()
  const { rows } = await pool.query<ArticleRow>(
    'SELECT * FROM articles WHERE id = $1',
    [id],
  )
  if (!rows[0]) return null
  return mapRowToArticle(rows[0])
}

export async function getArticleBySlug(slug: string): Promise<BlogPost | null> {
  await initDb()
  const pool = getPool()
  const { rows } = await pool.query<ArticleRow>(
    'SELECT * FROM articles WHERE slug = $1',
    [slug],
  )
  if (!rows[0]) return null
  return mapRowToArticle(rows[0])
}

export const getBlogPostBySlug = getArticleBySlug

export async function getAllBlogSlugs(): Promise<string[]> {
  await initDb()
  const pool = getPool()
  const { rows } = await pool.query<{ slug: string }>('SELECT slug FROM articles')
  return rows.map((r) => r.slug)
}

export async function getRelatedBlogPosts(
  currentSlug: string,
  count: number = 2,
): Promise<BlogPost[]> {
  await initDb()
  const pool = getPool()
  const { rows } = await pool.query<ArticleRow>(
    'SELECT * FROM articles WHERE slug != $1 ORDER BY "createdAt" DESC LIMIT $2',
    [currentSlug, count],
  )
  return rows.map(mapRowToArticle)
}

export async function createArticle(
  data: Omit<BlogPost, 'id'> & { id?: number },
): Promise<BlogPost> {
  await initDb()
  const pool = getPool()

  const { rows } = await pool.query<ArticleRow>(
    `INSERT INTO articles (
       slug, title, date, category, "isCoralBadge", "readingTime",
       description, tags, author, sections, "createdAt", "updatedAt"
     ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,NOW(),NOW())
     RETURNING *`,
    [
      data.slug,
      data.title,
      data.date,
      data.category,
      data.isCoralBadge ?? false,
      data.readingTime,
      data.description,
      JSON.stringify(data.tags ?? []),
      JSON.stringify(data.author ?? { name: 'Hasib Ashari', role: 'Software Engineer' }),
      JSON.stringify(data.sections ?? []),
    ],
  )

  if (!rows[0]) throw new Error('Failed to retrieve newly created article')
  return mapRowToArticle(rows[0])
}

export async function updateArticle(
  id: number,
  updates: Partial<BlogPost>,
): Promise<BlogPost | null> {
  const existing = await getArticleById(id)
  if (!existing) return null

  const merged: BlogPost = { ...existing, ...updates, id: existing.id }

  const pool = getPool()
  const { rows } = await pool.query<ArticleRow>(
    `UPDATE articles SET
       slug           = $1,
       title          = $2,
       date           = $3,
       category       = $4,
       "isCoralBadge" = $5,
       "readingTime"  = $6,
       description    = $7,
       tags           = $8,
       author         = $9,
       sections       = $10,
       "updatedAt"    = NOW()
     WHERE id = $11
     RETURNING *`,
    [
      merged.slug,
      merged.title,
      merged.date,
      merged.category,
      merged.isCoralBadge ?? false,
      merged.readingTime,
      merged.description,
      JSON.stringify(merged.tags ?? []),
      JSON.stringify(merged.author ?? { name: 'Hasib Ashari', role: 'Software Engineer' }),
      JSON.stringify(merged.sections ?? []),
      id,
    ],
  )

  if (!rows[0]) return null
  return mapRowToArticle(rows[0])
}

export async function deleteArticle(id: number): Promise<boolean> {
  const pool = getPool()
  const { rowCount } = await pool.query('DELETE FROM articles WHERE id = $1', [id])
  return (rowCount ?? 0) > 0
}
