import { Metadata } from 'next'
import { ProjectsView } from '@/features/projects'
import { getProjects } from '@/shared/db/projects.service'
import Navbar from '@/shared/components/Navbar'
import Footer from '@/shared/components/Footer'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'All Projects & Engineering Archive | Hasib Ashari',
  description:
    'Explore the complete catalog of engineering projects, distributed backend systems, AI agents, and fullstack applications built by Hasib Ashari.',
  openGraph: {
    title: 'All Projects | Hasib Ashari - Portfolio',
    description:
      'Explore selected backend systems, cloud microservices, and AI architectures.',
  },
}

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <main style={{ backgroundColor: 'var(--color-canvas)', minHeight: '100vh' }}>
      <Navbar />
      <ProjectsView initialProjects={projects} />
      <Footer />
    </main>
  )
}
