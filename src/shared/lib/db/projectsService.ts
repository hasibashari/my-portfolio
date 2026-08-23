import { getDb } from './db'
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
  featured: number
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
    longDescription: row.longDescription || undefined,
    techStack,
    demoUrl: row.demoUrl,
    githubUrl: row.githubUrl || undefined,
    imageUrl: row.imageUrl,
    codeSnippet: row.codeSnippet,
    featured: Boolean(row.featured),
  }
}

export function getProjects(): ProjectItem[] {
  const db = getDb()
  const rows = db.prepare('SELECT * FROM projects ORDER BY datetime(createdAt) DESC').all() as ProjectRow[]
  return rows.map(mapRowToProject)
}

export function getProjectById(id: string): ProjectItem | null {
  const db = getDb()
  const row = db.prepare('SELECT * FROM projects WHERE id = ?').get(id) as ProjectRow | undefined
  if (!row) return null
  return mapRowToProject(row)
}

export function createProject(item: ProjectItem): ProjectItem {
  const db = getDb()
  const insert = db.prepare(`
    INSERT INTO projects (
      id, title, badge, category, badgeColor, description,
      longDescription, techStack, demoUrl, githubUrl, imageUrl,
      codeSnippet, featured, createdAt, updatedAt
    ) VALUES (
      ?, ?, ?, ?, ?, ?,
      ?, ?, ?, ?, ?,
      ?, ?, datetime('now'), datetime('now')
    )
  `)

  insert.run(
    item.id,
    item.title,
    item.badge,
    item.category,
    item.badgeColor,
    item.description,
    item.longDescription || null,
    JSON.stringify(item.techStack || []),
    item.demoUrl,
    item.githubUrl || null,
    item.imageUrl,
    item.codeSnippet,
    item.featured ? 1 : 0
  )

  const created = getProjectById(item.id)
  if (!created) {
    throw new Error('Failed to retrieve newly created project')
  }
  return created
}

export function updateProject(id: string, updates: Partial<ProjectItem>): ProjectItem | null {
  const existing = getProjectById(id)
  if (!existing) return null

  const updated: ProjectItem = {
    ...existing,
    ...updates,
    id: existing.id, // Immutable ID
  }

  const db = getDb()
  const stmt = db.prepare(`
    UPDATE projects SET
      title = ?,
      badge = ?,
      category = ?,
      badgeColor = ?,
      description = ?,
      longDescription = ?,
      techStack = ?,
      demoUrl = ?,
      githubUrl = ?,
      imageUrl = ?,
      codeSnippet = ?,
      featured = ?,
      updatedAt = datetime('now')
    WHERE id = ?
  `)

  stmt.run(
    updated.title,
    updated.badge,
    updated.category,
    updated.badgeColor,
    updated.description,
    updated.longDescription || null,
    JSON.stringify(updated.techStack || []),
    updated.demoUrl,
    updated.githubUrl || null,
    updated.imageUrl,
    updated.codeSnippet,
    updated.featured ? 1 : 0,
    id
  )

  return getProjectById(id)
}

export function deleteProject(id: string): boolean {
  const db = getDb()
  const info = db.prepare('DELETE FROM projects WHERE id = ?').run(id)
  return info.changes > 0
}
