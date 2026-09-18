import { Suspense } from 'react'
import ProjectList from '../components/ProjectList'
import { ProjectItem } from '@/shared/types/projects'

interface ProjectsViewProps {
  initialProjects?: ProjectItem[]
}

export default function ProjectsView({ initialProjects }: ProjectsViewProps) {
  return (
    <Suspense fallback={<div style={{ minHeight: '80vh', backgroundColor: 'var(--color-canvas)' }} />}>
      <ProjectList initialProjects={initialProjects} />
    </Suspense>
  )
}
