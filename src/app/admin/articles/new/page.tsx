import { Metadata } from 'next'
import { AdminArticleFormView } from '@/features/admin'

export const metadata: Metadata = {
  title: 'Create Article | Admin Portfolio',
  description: 'Write a new engineering article.',
}

export default function NewArticlePage() {
  return <AdminArticleFormView isEdit={false} />
}
