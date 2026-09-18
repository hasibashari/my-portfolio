import { Metadata } from 'next'
import { AdminProjectsView } from '@/features/admin'
import { getProjects } from '@/shared/db/projects.service'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Manage Projects | Admin Portfolio',
  description: 'Manage and configure project items.',
}

export default async function AdminProjectsPage() {
  const projects = await getProjects()

  return <AdminProjectsView initialProjects={projects} />
}
