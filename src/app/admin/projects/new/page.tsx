import { Metadata } from 'next'
import { AdminProjectFormView } from '../../../../features/admin'

export const metadata: Metadata = {
  title: 'Create Project | Admin Portfolio',
  description: 'Add a new project to the portfolio.',
}

export default function NewProjectPage() {
  return <AdminProjectFormView isEdit={false} />
}
