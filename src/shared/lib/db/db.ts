import { Pool } from 'pg'
import { projects as defaultProjects, ProjectItem } from '../../constants/projects'
import { blog as defaultBlogPosts, BlogPost } from '../../constants/blog'

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

let initialised = false

export async function initDb(): Promise<void> {
  if (initialised) return

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
        sections       TEXT        NOT NULL,
        "createdAt"    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        "updatedAt"    TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
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

    // ── Seed articles if empty ──────────────────────────────────────────────
    const { rows: aRows } = await client.query('SELECT COUNT(*)::int AS count FROM articles')
    if (aRows[0].count === 0) {
      for (const post of defaultBlogPosts as BlogPost[]) {
        await client.query(
          `INSERT INTO articles (
             id, slug, title, date, category, "isCoralBadge", "readingTime",
             description, tags, author, sections
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
            JSON.stringify(post.sections ?? []),
          ],
        )
      }
    }

    await client.query('COMMIT')
    initialised = true
  } catch (err) {
    await client.query('ROLLBACK')
    throw err
  } finally {
    client.release()
  }
}
