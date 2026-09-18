import { Pool } from 'pg'
import { projects as defaultProjects } from '@/shared/seeds/projects.seed'
import { blog as defaultBlogPosts } from '@/shared/seeds/articles.seed'
import { ProjectItem } from '@/shared/types/projects'
import { BlogPost } from '@/shared/types/blog'

// --------------------------------------------------------------------------
// Connection pool — reused across requests in the same Node.js process.
// DATABASE_URL is read from the environment at module load time so that no
// credentials are hard-coded in source.
// --------------------------------------------------------------------------

let poolInstance: Pool | null = null

export function getPool(): Pool {
  if (poolInstance) {
    return poolInstance
  }

  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is not set.')
  }

  poolInstance = new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 10,
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 5_000,
    ssl: { rejectUnauthorized: false },
  })

  return poolInstance
}

// --------------------------------------------------------------------------
// Schema initialisation + seed — call once per process startup.
// --------------------------------------------------------------------------

// Promise-based singleton: multiple concurrent requests all await the same
// promise instead of each racing through the full schema + seed logic.
// Reset to null on failure so the next request can retry.
let initPromise: Promise<void> | null = null

export function initDb(): Promise<void> {
  if (!initPromise) {
    initPromise = _runInit().catch((err) => {
      // Allow retry on next request if initialisation failed
      initPromise = null
      return Promise.reject(err)
    })
  }
  return initPromise
}

async function _runInit(): Promise<void> {
  const pool = getPool()
  const client = await pool.connect()

  try {
    await client.query('BEGIN')

    // ── Projects table ──────────────────────────────────────────────────────
    await client.query(`
      CREATE TABLE IF NOT EXISTS projects (
        id            TEXT        PRIMARY KEY,
        title         TEXT        NOT NULL,
        badge         TEXT        NOT NULL,
        category      TEXT        NOT NULL,
        "badgeColor"  TEXT        NOT NULL,
        description   TEXT        NOT NULL,
        "longDescription"  TEXT,
        "techStack"   TEXT        NOT NULL,
        "demoUrl"     TEXT        NOT NULL,
        "githubUrl"   TEXT,
        "imageUrl"    TEXT        NOT NULL,
        featured      BOOLEAN     NOT NULL DEFAULT FALSE,
        "createdAt"   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        "updatedAt"   TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `)

    // ── Articles table ──────────────────────────────────────────────────────
    await client.query(`
      CREATE TABLE IF NOT EXISTS articles (
        id             SERIAL      PRIMARY KEY,
        slug           TEXT        NOT NULL UNIQUE,
        title          TEXT        NOT NULL,
        date           TEXT        NOT NULL,
        category       TEXT        NOT NULL,
        "isCoralBadge" BOOLEAN     NOT NULL DEFAULT FALSE,
        "readingTime"  TEXT        NOT NULL,
        description    TEXT        NOT NULL,
        tags           TEXT        NOT NULL,
        author         TEXT        NOT NULL,
        content        TEXT        NOT NULL,
        "createdAt"    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        "updatedAt"    TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `)

    // Ensure content column exists if table was created previously with sections
    await client.query(`
      ALTER TABLE articles ADD COLUMN IF NOT EXISTS content TEXT;
    `)

    // ── Seed projects if empty ──────────────────────────────────────────────
    const { rows: pRows } = await client.query('SELECT COUNT(*)::int AS count FROM projects')
    if (pRows[0].count === 0) {
      for (const item of defaultProjects as ProjectItem[]) {
        await client.query(
          `INSERT INTO projects (
             id, title, badge, category, "badgeColor", description,
             "longDescription", "techStack", "demoUrl", "githubUrl", "imageUrl",
             featured
           ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)`,
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
      }
    }

    // ── Seed articles if empty or migrate empty content ─────────────────────
    const { rows: aRows } = await client.query('SELECT COUNT(*)::int AS count FROM articles')
    if (aRows[0].count === 0) {
      for (const post of defaultBlogPosts as BlogPost[]) {
        await client.query(
          `INSERT INTO articles (
             id, slug, title, date, category, "isCoralBadge", "readingTime",
             description, tags, author, content
           ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)`,
          [
            post.id,
            post.slug,
            post.title,
            post.date,
            post.category,
            post.isCoralBadge ?? false,
            post.readingTime,
            post.description,
            JSON.stringify(post.tags ?? []),
            JSON.stringify(post.author ?? { name: '', role: '' }),
            post.content,
          ],
        )
      }
    } else {
      // If table exists but content column is null for existing seed articles, backfill them
      for (const post of defaultBlogPosts as BlogPost[]) {
        await client.query(
          `UPDATE articles SET content = $1 WHERE slug = $2 AND (content IS NULL OR content = '')`,
          [post.content, post.slug],
        )
      }
    }

    await client.query('COMMIT')
  } catch (err) {
    await client.query('ROLLBACK')
    throw err
  } finally {
    client.release()
  }
}
