import Database from 'better-sqlite3'
import path from 'path'
import fs from 'fs'
import { projects as defaultProjects, ProjectItem } from '../../constants/projects'
import { blog as defaultBlogPosts, BlogPost } from '../../constants/blog'

let dbInstance: Database.Database | null = null

export function getDb(): Database.Database {
  if (dbInstance) {
    return dbInstance
  }

  const dbDir = path.join(process.cwd(), 'data')
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true })
  }

  const dbPath = path.join(dbDir, 'portfolio.db')
  const db = new Database(dbPath)

  // Configure pragmas for performance & integrity
  db.pragma('journal_mode = WAL')
  db.pragma('foreign_keys = ON')

  // Initialize Tables
  initTables(db)

  dbInstance = db
  return dbInstance
}

function initTables(db: Database.Database) {
  // Projects Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS projects (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      badge TEXT NOT NULL,
      category TEXT NOT NULL,
      badgeColor TEXT NOT NULL,
      description TEXT NOT NULL,
      longDescription TEXT,
      techStack TEXT NOT NULL,
      demoUrl TEXT NOT NULL,
      githubUrl TEXT,
      imageUrl TEXT NOT NULL,
      codeSnippet TEXT NOT NULL,
      featured INTEGER DEFAULT 0,
      createdAt TEXT NOT NULL DEFAULT (datetime('now')),
      updatedAt TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `)

  // Articles Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS articles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT NOT NULL UNIQUE,
      title TEXT NOT NULL,
      date TEXT NOT NULL,
      category TEXT NOT NULL,
      isCoralBadge INTEGER DEFAULT 0,
      readingTime TEXT NOT NULL,
      description TEXT NOT NULL,
      tags TEXT NOT NULL,
      author TEXT NOT NULL,
      sections TEXT NOT NULL,
      createdAt TEXT NOT NULL DEFAULT (datetime('now')),
      updatedAt TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `)

  // Seed default data if empty
  const projectCount = db.prepare('SELECT COUNT(*) as count FROM projects').get() as { count: number }
  if (projectCount.count === 0) {
    const insertProject = db.prepare(`
      INSERT INTO projects (
        id, title, badge, category, badgeColor, description,
        longDescription, techStack, demoUrl, githubUrl, imageUrl,
        codeSnippet, featured
      ) VALUES (
        ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?,
        ?, ?
      )
    `)

    const insertMany = db.transaction((items: ProjectItem[]) => {
      for (const item of items) {
        insertProject.run(
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
      }
    })

    insertMany(defaultProjects)
  }

  const articleCount = db.prepare('SELECT COUNT(*) as count FROM articles').get() as { count: number }
  if (articleCount.count === 0) {
    const insertArticle = db.prepare(`
      INSERT INTO articles (
        id, slug, title, date, category, isCoralBadge, readingTime,
        description, tags, author, sections
      ) VALUES (
        ?, ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?
      )
    `)

    const insertManyArticles = db.transaction((posts: BlogPost[]) => {
      for (const post of posts) {
        insertArticle.run(
          post.id,
          post.slug,
          post.title,
          post.date,
          post.category,
          post.isCoralBadge ? 1 : 0,
          post.readingTime,
          post.description,
          JSON.stringify(post.tags || []),
          JSON.stringify(post.author || { name: '', role: '' }),
          JSON.stringify(post.sections || [])
        )
      }
    })

    insertManyArticles(defaultBlogPosts)
  }
}
