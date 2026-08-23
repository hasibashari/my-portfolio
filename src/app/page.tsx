import { HomeView } from '../features/home'
import { getProjects } from '../shared/lib/db'
import Navbar from '../shared/components/Navbar'
import Footer from '../shared/components/Footer'

export default function Home() {
  const projects = getProjects()

  return (
    <main style={{ backgroundColor: 'var(--color-canvas)', minHeight: '100vh' }}>
      <Navbar />
      <HomeView projects={projects} />
      <Footer />
    </main>
  )
}

