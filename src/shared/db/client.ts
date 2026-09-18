import { Pool } from 'pg'

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
// Schema initialisation — call once per process startup.
// --------------------------------------------------------------------------

// Promise-based singleton: multiple concurrent requests all await the same
// promise instead of each racing through the schema check.
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
      DO $$
      BEGIN
        IF EXISTS (
          SELECT 1 FROM information_schema.columns
          WHERE table_name = 'articles' AND column_name = 'sections'
        ) THEN
          ALTER TABLE articles ALTER COLUMN sections DROP NOT NULL;
        END IF;
      END $$;
    `)

    await client.query('COMMIT')
  } catch (err) {
    await client.query('ROLLBACK')
    throw err
  } finally {
    client.release()
  }
}
