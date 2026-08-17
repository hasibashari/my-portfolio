import { Metadata } from 'next'
import { BlogView } from '../../features/blog'
import Navbar from '../../shared/components/Navbar'
import Footer from '../../shared/components/Footer'

export const metadata: Metadata = {
  title: 'Engineering Journal & Articles | Hasib Ashari',
  description:
    'Deep dives on web performance, distributed systems, modern React paradigms, and resilient software architecture.',
  openGraph: {
    title: 'Engineering Journal & Articles | Hasib Ashari',
    description:
      'Deep dives on web performance, distributed systems, modern React paradigms, and resilient software architecture.',
  },
}

export default function BlogPage() {
  return (
    <main style={{ backgroundColor: 'var(--color-canvas)', minHeight: '100vh' }}>
      <Navbar />
      <BlogView />
      <Footer />
    </main>
  )
}
