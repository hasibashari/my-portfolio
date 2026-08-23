import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { AdminArticleFormView } from '../../../../../features/admin'
import { getArticleById } from '../../../../../shared/lib/db'

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const articleId = parseInt(id, 10)
  const article = isNaN(articleId) ? null : getArticleById(articleId)

  return {
    title: article ? `Edit ${article.title} | Admin` : 'Edit Article | Admin',
    description: 'Edit article writeup and technical sections.',
  }
}

export default async function EditArticlePage({ params }: PageProps) {
  const { id } = await params
  const articleId = parseInt(id, 10)

  if (isNaN(articleId)) {
    notFound()
  }

  const article = getArticleById(articleId)

  if (!article) {
    notFound()
  }

  return <AdminArticleFormView article={article} isEdit={true} />
}
