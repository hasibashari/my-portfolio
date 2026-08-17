import { Metadata } from 'next'
import { ProjectsView } from '../../features/projects'
import Navbar from '../../shared/components/Navbar'
import Footer from '../../shared/components/Footer'

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

export default function ProjectsPage() {
  return (
    <main style={{ backgroundColor: 'var(--color-canvas)', minHeight: '100vh' }}>
      <Navbar />
      <ProjectsView />
      <Footer />
    </main>
  )
}

