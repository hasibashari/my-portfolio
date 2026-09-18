import { BlogPost } from '@/shared/types/blog'

export const blog: BlogPost[] = [
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

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blog.find((post) => post.slug === slug)
}

export function getAllBlogSlugs(): string[] {
  return blog.map((post) => post.slug)
}

export function getRelatedBlogPosts(currentSlug: string, count: number = 2): BlogPost[] {
  return blog.filter((post) => post.slug !== currentSlug).slice(0, count)
}
