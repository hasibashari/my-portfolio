import { Metadata } from 'next'
import { AdminDashboardView } from '../../features/admin'
import { getProjects, getArticles } from '../../shared/lib/db'

export const metadata: Metadata = {
  title: 'Portfolio Administration | Hasib Ashari',
  description: 'Manage projects, articles, and content in the portfolio.',
}

export default async function AdminPage() {
  const projects = await getProjects()
  const articles = await getArticles()

  return <AdminDashboardView projects={projects} articles={articles} />
}
