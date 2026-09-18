import { Metadata } from 'next'
import { AdminArticlesView } from '@/features/admin'
import { getArticles } from '@/shared/lib/db/articlesService'

export const metadata: Metadata = {
  title: 'Manage Articles | Admin Portfolio',
  description: 'Manage and publish engineering articles.',
}

export default async function AdminArticlesPage() {
  const articles = await getArticles()

  return <AdminArticlesView initialArticles={articles} />
}
