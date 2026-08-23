import { getPool, initDb } from './db'
import { ProjectItem } from '../../constants/projects'

interface ProjectRow {
  id: string
  title: string
  badge: string
  category: string
  badgeColor: string
  description: string
  longDescription: string | null
  techStack: string
  demoUrl: string
  githubUrl: string | null
  imageUrl: string
  codeSnippet: string
  featured: boolean
  createdAt: string
  updatedAt: string
}

function mapRowToProject(row: ProjectRow): ProjectItem {
  let techStack: string[] = []
  try {
    techStack = typeof row.techStack === 'string' ? JSON.parse(row.techStack) : row.techStack
  } catch {
    techStack = []
  }

  return {
    id: row.id,
    title: row.title,
    badge: row.badge,
    category: row.category as ProjectItem['category'],
    badgeColor: row.badgeColor,
    description: row.description,
    longDescription: row.longDescription ?? undefined,
    techStack,
    demoUrl: row.demoUrl,
    githubUrl: row.githubUrl ?? undefined,
    imageUrl: row.imageUrl,
    codeSnippet: row.codeSnippet,
    featured: Boolean(row.featured),
  }
}

export async function getProjects(): Promise<ProjectItem[]> {
  await initDb()
  const pool = getPool()
  const { rows } = await pool.query<ProjectRow>(
    'SELECT * FROM projects ORDER BY "createdAt" DESC',
  )
  return rows.map(mapRowToProject)
}

export async function getProjectById(id: string): Promise<ProjectItem | null> {
  await initDb()
  const pool = getPool()
  const { rows } = await pool.query<ProjectRow>(
    'SELECT * FROM projects WHERE id = $1',
    [id],
  )
  if (!rows[0]) return null
  return mapRowToProject(rows[0])
}

export async function createProject(item: ProjectItem): Promise<ProjectItem> {
  await initDb()
  const pool = getPool()

  const { rows } = await pool.query<ProjectRow>(
    `INSERT INTO projects (
       id, title, badge, category, "badgeColor", description,
       "longDescription", "techStack", "demoUrl", "githubUrl", "imageUrl",
       "codeSnippet", featured, "createdAt", "updatedAt"
     ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,NOW(),NOW())
     RETURNING *`,
    [
      item.id,
      item.title,
      item.badge,
      item.category,
      item.badgeColor,
      item.description,
      item.longDescription ?? null,
      JSON.stringify(item.techStack ?? []),
      item.demoUrl,
      item.githubUrl ?? null,
      item.imageUrl,
      item.codeSnippet,
      item.featured ?? false,
    ],
  )

  if (!rows[0]) throw new Error('Failed to retrieve newly created project')
  return mapRowToProject(rows[0])
}

export async function updateProject(
  id: string,
  updates: Partial<ProjectItem>,
): Promise<ProjectItem | null> {
  const existing = await getProjectById(id)
  if (!existing) return null

  const merged: ProjectItem = {
    ...existing,
    ...updates,
    id: existing.id, // Immutable ID
  }

  const pool = getPool()
  const { rows } = await pool.query<ProjectRow>(
    `UPDATE projects SET
       title            = $1,
       badge            = $2,
       category         = $3,
       "badgeColor"     = $4,
       description      = $5,
       "longDescription" = $6,
       "techStack"      = $7,
       "demoUrl"        = $8,
       "githubUrl"      = $9,
       "imageUrl"       = $10,
       "codeSnippet"    = $11,
       featured         = $12,
       "updatedAt"      = NOW()
     WHERE id = $13
     RETURNING *`,
    [
      merged.title,
      merged.badge,
      merged.category,
      merged.badgeColor,
      merged.description,
      merged.longDescription ?? null,
      JSON.stringify(merged.techStack ?? []),
      merged.demoUrl,
      merged.githubUrl ?? null,
      merged.imageUrl,
      merged.codeSnippet,
      merged.featured ?? false,
      id,
    ],
  )

  if (!rows[0]) return null
  return mapRowToProject(rows[0])
}

export async function deleteProject(id: string): Promise<boolean> {
  const pool = getPool()
  const { rowCount } = await pool.query('DELETE FROM projects WHERE id = $1', [id])
  return (rowCount ?? 0) > 0
}
