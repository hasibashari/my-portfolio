import { HomeView } from '@/features/home'
import { getProjects } from '@/shared/db/projects.service'
import { getArticles } from '@/shared/db/articles.service'
import Navbar from '@/shared/components/Navbar'
import Footer from '@/shared/components/Footer'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const [projects, articles] = await Promise.all([getProjects(), getArticles()])

  return (
    <main style={{ backgroundColor: 'var(--color-canvas)', minHeight: '100vh' }}>
      <Navbar />
      <HomeView projects={projects} articles={articles} />
      <Footer />
    </main>
  )
}

