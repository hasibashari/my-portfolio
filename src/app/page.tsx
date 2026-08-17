import { HomeView } from '../features/home'
import Navbar from '../shared/components/Navbar'
import Footer from '../shared/components/Footer'

export default function Home() {
  return (
    <main style={{ backgroundColor: 'var(--color-canvas)', minHeight: '100vh' }}>
      <Navbar />
      <HomeView />
      <Footer />
    </main>
  )
}

