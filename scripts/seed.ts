import { Pool } from 'pg'

interface ProjectSeedItem {
  id: string
  title: string
  badge: string
  category: 'AI & Backend' | 'Cloud & Data' | 'Microservices' | 'Fullstack'
  badgeColor: string
  description: string
  longDescription?: string
  techStack: string[]
  demoUrl: string
  githubUrl?: string
  imageUrl: string
  featured?: boolean
}

interface ArticleSeedItem {
  id: number
  slug: string
  title: string
  date: string
  category: string
  isCoralBadge?: boolean
  readingTime: string
  description: string
  tags: string[]
  author: {
    name: string
    role: string
    avatar?: string
  }
  content: string
}

const defaultProjects: ProjectSeedItem[] = [
  {
    id: 'ai-agent-automation',
    title: 'AI Agent Automation',
    badge: 'AI & BACKEND',
    category: 'AI & Backend',
    badgeColor: '#cc785c',
    description:
      'Autonomous multi-agent system orchestrating complex workflows using LLMs, vector memory, and distributed execution pipelines.',
    longDescription: `## Overview

A resilient distributed system for executing and evaluating autonomous multi-agent workloads with real-time feedback loops and fallback heuristics.

### Technical Highlights
- **Distributed Agent Runtime**: Built on top of Node.js worker threads and Redis Pub/Sub for sub-millisecond task dispatching.
- **Hierarchical Vector Memory**: Implements dense embeddings and semantic retrieval to maintain long-horizon conversational context.
- **Fail-safe Tool Execution**: Sandboxed runtime with dynamic validation, schema verification, and automated retry backoffs.

\`\`\`typescript
// Agent Orchestration Core Loop
export async function executeAgentPlan(plan: ExecutionPlan): Promise<ExecutionResult> {
  const context = await memoryStore.retrieveRelevantContext(plan.goal);
  const decision = await llmClient.evaluateNextAction({ plan, context });
  return dispatchToWorkers(decision);
}
\`\`\``,
    techStack: ['TypeScript', 'Node.js', 'PostgreSQL', 'Redis', 'Docker'],
    demoUrl: 'https://demo.example.com/ai-agent',
    githubUrl: 'https://github.com/example/ai-agent-automation',
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?w=800&auto=format&fit=crop&q=80',
    featured: true,
  },
  {
    id: 'cloud-data-pipeline',
    title: 'Cloud Data Pipeline',
    badge: 'CLOUD & DATA',
    category: 'Cloud & Data',
    badgeColor: '#788c5d',
    description:
      'Scalable stream-processing architecture processing 10M+ daily events with Apache Kafka, ClickHouse, and Kubernetes.',
    longDescription: `## Stream Processing at Scale

Designed to ingest, transform, and aggregate high-throughput telemetry data with zero data loss and sub-second analytical query latency.

### Key Achievements
- Ingests **10,000+ events/sec** with end-to-end P99 latency < 200ms.
- Built-in schema evolution protection with protobuf schema registry.`,
    techStack: ['Go', 'Apache Kafka', 'ClickHouse', 'Kubernetes', 'Terraform'],
    demoUrl: 'https://demo.example.com/data-pipeline',
    githubUrl: 'https://github.com/example/cloud-data-pipeline',
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80',
    featured: true,
  },
  {
    id: 'resilient-microservices',
    title: 'Resilient Microservices Engine',
    badge: 'MICROSERVICES',
    category: 'Microservices',
    badgeColor: '#5a788c',
    description:
      'Production-grade gRPC/REST microservices platform featuring distributed tracing, circuit breakers, and zero-downtime deploys.',
    longDescription: `## High-Availability Microservices

Modular backend architecture built for enterprise stability and high-concurrency transactional processing.

### Architecture Pillars
- **Resilience**: Adaptive rate limiters, token bucket throttling, and circuit breakers via Envoy proxy.
- **Observability**: OpenTelemetry distributed tracing integrated with Prometheus and Grafana dashboards.`,
    techStack: ['Go', 'gRPC', 'PostgreSQL', 'Envoy', 'OpenTelemetry'],
    demoUrl: 'https://demo.example.com/microservices',
    imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&auto=format&fit=crop&q=80',
    featured: true,
  },
  {
    id: 'fullstack-saas-core',
    title: 'Fullstack SaaS Infrastructure',
    badge: 'FULLSTACK',
    category: 'Fullstack',
    badgeColor: '#8a7090',
    description:
      'High-performance editorial platform with React 19, Next.js App Router, edge caching, and fine-grained RBAC auth.',
    techStack: ['Next.js', 'React 19', 'TypeScript', 'Tailwind CSS', 'PostgreSQL'],
    demoUrl: 'https://demo.example.com/saas-core',
    githubUrl: 'https://github.com/example/fullstack-saas-core',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
    featured: false,
  },
  {
    id: 'distributed-cache-layer',
    title: 'Distributed In-Memory Cache',
    badge: 'CLOUD & DATA',
    category: 'Cloud & Data',
    badgeColor: '#788c5d',
    description:
      'Low-latency custom caching tier with consistent hashing, LRU-K eviction, and raft-based leader election.',
    techStack: ['Rust', 'Raft', 'gRPC', 'Prometheus'],
    demoUrl: 'https://demo.example.com/cache-layer',
    githubUrl: 'https://github.com/example/distributed-cache-layer',
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
    featured: false,
  },
  {
    id: 'enterprise-api-gateway',
    title: 'Enterprise API Gateway',
    badge: 'MICROSERVICES',
    category: 'Microservices',
    badgeColor: '#5a788c',
    description:
      'High-throughput reverse proxy handling JWT validation, dynamic rate limiting, and automated load balancing.',
    techStack: ['Go', 'Redis', 'Docker', 'Kong'],
    demoUrl: 'https://demo.example.com/api-gateway',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
    featured: false,
  },
]

const defaultBlogPosts: ArticleSeedItem[] = [
  {
    id: 1,
    slug: 'optimizing-web-vitals-and-lcp-in-nextjs',
    title: 'Optimizing Web Vitals & LCP in Next.js 15 Applications',
    date: 'Jul 15, 2026',
    category: 'PERFORMANCE',
    isCoralBadge: true,
    readingTime: '6 min read',
    description:
      'A practical guide to improving Largest Contentful Paint, reducing bundle sizes, and leveraging server components for instant page rendering.',
    tags: ['Next.js', 'Core Web Vitals', 'Performance', 'React Server Components'],
    author: {
      name: 'Hasib Ashari',
      role: 'Software Engineer',
    },
    content: `## The Modern LCP Bottleneck

Largest Contentful Paint (LCP) remains the single most critical metric influencing user-perceived performance. In modern Single Page Applications and hybrid Next.js architectures, LCP delays frequently stem from cascaded network requests, client-side hydration delays, and unoptimized font or image loading.

With React Server Components (RSC), we can eliminate significant JavaScript execution overhead by offloading data fetching and initial markup compilation entirely to the edge or server runtime.

> **Key Rule**: Never block server component rendering on secondary queries. Fetch only critical hero data upstream and stream lower-priority components with React Suspense.

## Leveraging Next.js Image Priority & Font Optimization

Hero elements and prominent brand imagery must be preloaded rather than lazily fetched. Utilizing the priority flag on Next.js Image components injects a high-priority preload link header into the initial document response.

Similarly, using \`next/font\` automatically inlines critical font CSS and zero-CLS font definitions during compile time, ensuring instantaneous typography rendering.

\`\`\`tsx
// Optimized Hero Image Implementation
import Image from 'next/image'

export function HeroBanner() {
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl">
      <Image
        src="/assets/hero-architecture.webp"
        alt="System Architecture Diagram"
        fill
        priority
        fetchPriority="high"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
        className="object-cover"
      />
    </div>
  )
}
\`\`\`

## Granular Dynamic Imports & Bundle Splitting

Heavy client interactive components—such as modal viewers, chart canvases, and animation engines—should not inflate the initial bundle footprint. By strategically deferring them via dynamic imports, the main thread remains unencumbered during the critical first input phase.

\`\`\`tsx
// Dynamic Loading for Non-Critical Interactive Components
import dynamic from 'next/dynamic'

const InteractiveAnalyticsCanvas = dynamic(
  () => import('./InteractiveAnalyticsCanvas'),
  {
    loading: () => <div className="h-64 animate-pulse bg-neutral-100 rounded-lg" />,
    ssr: false,
  }
)
\`\`\`

## Summary & Key Takeaways

Achieving sub-second LCP requires an end-to-end discipline: stream critical HTML early with Server Components, assign priority to above-the-fold media assets, and isolate heavy interactive features behind dynamic boundaries.

> **Measurement Tip**: Always measure real-world performance using Chrome User Experience Report (CrUX) and Lighthouse CI in production builds.`,
  },
  {
    id: 2,
    slug: 'building-resilient-component-systems-mui-tailwind',
    title: 'Building Resilient Component Systems with MUI & Tailwind',
    date: 'Jun 20, 2026',
    category: 'ARCHITECTURE',
    isCoralBadge: false,
    readingTime: '8 min read',
    description:
      'How to seamlessly combine Material UI accessibility primitives with utility-first Tailwind CSS for maintainable design systems.',
    tags: ['Design Systems', 'MUI', 'Tailwind CSS', 'TypeScript'],
    author: {
      name: 'Hasib Ashari',
      role: 'Software Engineer',
    },
    content: `## Bridging Utility-First and Component Primitives

Material UI provides comprehensive ARIA accessibility, keyboard navigation, and battle-tested headless behaviors. Meanwhile, Tailwind CSS offers unmatched agility for bespoke styling, typography, and micro-layouts.

Integrating both requires establishing clear boundaries: allow MUI to govern complex interactive semantics (Drawers, Modals, Menus, Sliders) while employing custom design tokens and utility classes for aesthetic skinning.

## Custom Design Tokens and CSS Variables

By defining an editorial palette using CSS custom variables (such as \`--color-canvas\`, \`--color-ink\`, \`--color-primary\`), components across both MUI \`sx\` props and Tailwind utility classes share a single synchronized source of truth.

\`\`\`tsx
// Polymorphic Component Bridge Example
import { Button as MuiButton, ButtonProps } from '@mui/material'
import { clsx } from 'clsx'

interface CustomButtonProps extends ButtonProps {
  variantStyle?: 'editorial' | 'minimal'
}

export function EditorialButton({ variantStyle = 'editorial', className, children, ...props }: CustomButtonProps) {
  return (
    <MuiButton
      disableElevation
      className={clsx(
        'font-sans transition-all duration-200 rounded-lg px-4 py-2 text-sm font-medium',
        variantStyle === 'editorial' && 'bg-(--color-primary) text-(--color-on-primary) hover:brightness-105',
        className
      )}
      {...props}
    >
      {children}
    </MuiButton>
  )
}
\`\`\`

## Conclusion

A hybrid approach prevents reinventing complex focus-trapping and keyboard listeners from scratch while retaining complete creative freedom over modern editorial typography and brand aesthetics.`,
  },
  {
    id: 3,
    slug: 'modern-state-management-patterns-in-react-19',
    title: 'Modern State Management Patterns in React 19',
    date: 'May 10, 2026',
    category: 'REACT & TS',
    isCoralBadge: false,
    readingTime: '5 min read',
    description:
      'Comparing Zustand, Redux Toolkit, and native React hooks for scalable state synchronization across large codebases.',
    tags: ['React 19', 'Zustand', 'TypeScript', 'State Management'],
    author: {
      name: 'Hasib Ashari',
      role: 'Software Engineer',
    },
    content: `## The Shift in React 19 State Philosophy

With React 19 native actions, \`useOptimistic\`, and \`useActionState\`, many traditional client-side store responsibilities—such as form submission status and asynchronous mutations—can be handled natively with zero boilerplate.

However, global client state such as active themes, modal stacks, filtering criteria, and audio/canvas synchronization still benefit immensely from lightweight atomic stores.

## Why Zustand Shines for Global Transient State

Zustand provides a minimal, boilerplate-free store pattern that works seamlessly outside the React render tree when needed, avoiding unnecessary re-renders via selector subscriptions.

\`\`\`typescript
// Lightweight Filter Store with Zustand
import { create } from 'zustand'

interface FilterState {
  category: string
  searchQuery: string
  setCategory: (category: string) => void
  setSearchQuery: (query: string) => void
  reset: () => void
}

export const useFilterStore = create<FilterState>((set) => ({
  category: 'All',
  searchQuery: '',
  setCategory: (category) => set({ category }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  reset: () => set({ category: 'All', searchQuery: '' }),
}))
\`\`\`

## Key Takeaways

Use React 19 native Server Actions and \`useActionState\` for data mutations, React Context for static subtree configurations, and Zustand for high-performance transient global UI state.`,
  },
]

async function seedDatabase() {
  const databaseUrl = process.env.DATABASE_URL
  if (!databaseUrl) {
    console.error('❌ Error: DATABASE_URL is not set in environment.')
    process.exit(1)
  }

  console.log('🌱 Connecting to database for seeding...')
  const pool = new Pool({
    connectionString: databaseUrl,
    ssl: { rejectUnauthorized: false },
  })

  const client = await pool.connect()

  try {
    await client.query('BEGIN')

    // ── 1. Ensure tables exist ───────────────────────────────────────────────
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

    // ── 2. Seed projects ────────────────────────────────────────────────────
    const { rows: pRows } = await client.query('SELECT COUNT(*)::int AS count FROM projects')
    console.log(`📊 Existing projects in DB: ${pRows[0].count}`)

    let insertedProjects = 0
    for (const item of defaultProjects) {
      const { rowCount } = await client.query(
        `INSERT INTO projects (
           id, title, badge, category, "badgeColor", description,
           "longDescription", "techStack", "demoUrl", "githubUrl", "imageUrl",
           featured
         ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
         ON CONFLICT (id) DO NOTHING`,
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
      if ((rowCount ?? 0) > 0) insertedProjects++
    }
    console.log(`✅ Projects seeded (${insertedProjects} new records inserted, others already existed).`)

    // ── 3. Seed articles ────────────────────────────────────────────────────
    const { rows: aRows } = await client.query('SELECT COUNT(*)::int AS count FROM articles')
    console.log(`📊 Existing articles in DB: ${aRows[0].count}`)

    let insertedArticles = 0
    for (const post of defaultBlogPosts) {
      const { rowCount } = await client.query(
        `INSERT INTO articles (
           id, slug, title, date, category, "isCoralBadge", "readingTime",
           description, tags, author, content
         ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
         ON CONFLICT (slug) DO UPDATE SET
           content = EXCLUDED.content
           WHERE articles.content IS NULL OR articles.content = ''`,
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
          JSON.stringify(post.author ?? { name: 'Hasib Ashari', role: 'Software Engineer' }),
          post.content,
        ],
      )
      if ((rowCount ?? 0) > 0) insertedArticles++
    }
    console.log(`✅ Articles seeded (${insertedArticles} records updated/inserted).`)

    await client.query('COMMIT')
    console.log('🎉 Database seeding completed successfully!')
  } catch (err) {
    await client.query('ROLLBACK')
    console.error('❌ Seeding failed:', err)
    process.exit(1)
  } finally {
    client.release()
    await pool.end()
  }
}

seedDatabase().catch((err) => {
  console.error('Fatal seeding error:', err)
  process.exit(1)
})
