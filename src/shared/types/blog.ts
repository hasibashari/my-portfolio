export interface BlogPost {
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

export const BLOG_CATEGORIES = ['All', 'PERFORMANCE', 'ARCHITECTURE', 'REACT & TS'] as const
export type BlogCategory = (typeof BLOG_CATEGORIES)[number]
