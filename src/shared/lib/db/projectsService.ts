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
    featured: Boolean(row.featured),
  }
}

export async function getProjects(): Promise<ProjectItem[]> {
  await initDb()
  const pool = getPool()
  const { rows } = await pool.query<ProjectRow>(
    'SELECT * FROM projects ORDER BY featured DESC, "createdAt" DESC',
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
       featured, "createdAt", "updatedAt"
     ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,NOW(),NOW())
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
  await initDb()
  const pool = getPool()

  // Build a dynamic SET clause from only the fields provided in `updates`.
  // This avoids a preceding SELECT and saves a full round-trip to the DB.
  const setClauses: string[] = []
  const values: unknown[] = []
  let p = 1

  if (updates.title           !== undefined) { setClauses.push(`title             = $${p++}`); values.push(updates.title) }
  if (updates.badge           !== undefined) { setClauses.push(`badge             = $${p++}`); values.push(updates.badge) }
  if (updates.category        !== undefined) { setClauses.push(`category          = $${p++}`); values.push(updates.category) }
  if (updates.badgeColor      !== undefined) { setClauses.push(`"badgeColor"      = $${p++}`); values.push(updates.badgeColor) }
  if (updates.description     !== undefined) { setClauses.push(`description       = $${p++}`); values.push(updates.description) }
  if (updates.longDescription !== undefined) { setClauses.push(`"longDescription" = $${p++}`); values.push(updates.longDescription ?? null) }
  if (updates.techStack       !== undefined) { setClauses.push(`"techStack"       = $${p++}`); values.push(JSON.stringify(updates.techStack)) }
  if (updates.demoUrl         !== undefined) { setClauses.push(`"demoUrl"         = $${p++}`); values.push(updates.demoUrl) }
  if (updates.githubUrl       !== undefined) { setClauses.push(`"githubUrl"       = $${p++}`); values.push(updates.githubUrl ?? null) }
  if (updates.imageUrl        !== undefined) { setClauses.push(`"imageUrl"        = $${p++}`); values.push(updates.imageUrl) }
  if (updates.featured        !== undefined) { setClauses.push(`featured          = $${p++}`); values.push(updates.featured) }

  // Nothing to update — just return the existing record
  if (setClauses.length === 0) return getProjectById(id)

  setClauses.push(`"updatedAt" = NOW()`)
  values.push(id) // final bind param for WHERE clause

  const { rows } = await pool.query<ProjectRow>(
    `UPDATE projects SET ${setClauses.join(', ')} WHERE id = $${p} RETURNING *`,
    values,
  )

  if (!rows[0]) return null
  return mapRowToProject(rows[0])
}

export async function deleteProject(id: string): Promise<boolean> {
  const pool = getPool()
  const { rowCount } = await pool.query('DELETE FROM projects WHERE id = $1', [id])
  return (rowCount ?? 0) > 0
}
