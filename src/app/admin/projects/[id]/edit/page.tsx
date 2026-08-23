import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { AdminProjectFormView } from '../../../../../features/admin'
import { getProjectById } from '../../../../../shared/lib/db'

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const project = getProjectById(id)

  return {
    title: project ? `Edit ${project.title} | Admin` : 'Edit Project | Admin',
    description: 'Edit project details and architecture notes.',
  }
}

export default async function EditProjectPage({ params }: PageProps) {
  const { id } = await params
  const project = getProjectById(id)

  if (!project) {
    notFound()
  }

  return <AdminProjectFormView project={project} isEdit={true} />
}
