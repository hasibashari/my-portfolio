import { Metadata } from 'next'
import { AdminProjectsView } from '../../../features/admin'
import { getProjects } from '../../../shared/lib/db'

export const metadata: Metadata = {
  title: 'Manage Projects | Admin Portfolio',
  description: 'Manage and configure project items.',
}

export default function AdminProjectsPage() {
  const projects = getProjects()

  return <AdminProjectsView initialProjects={projects} />
}
