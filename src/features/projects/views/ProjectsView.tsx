import ProjectList from '../components/ProjectList'
import { ProjectItem } from '../../../shared/constants/projects'

interface ProjectsViewProps {
  initialProjects?: ProjectItem[]
}

export default function ProjectsView({ initialProjects }: ProjectsViewProps) {
  return <ProjectList initialProjects={initialProjects} />
}
