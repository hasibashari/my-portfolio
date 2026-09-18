export interface ProjectItem {
  id: string
  slug: string
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

export type ProjectFormData = Omit<ProjectItem, 'id'> & { id?: string }

export const PROJECT_CATEGORIES = [
  'All',
  'AI & Backend',
  'Cloud & Data',
  'Microservices',
  'Fullstack',
] as const

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number]

