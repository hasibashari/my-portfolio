import {
  About,
  Blog,
  Contact,
  Experience,
  Hero,
  LogoClouds,
  Projects,
  Skills,
} from '../features/home'
import Footer from '../shared/components/Footer'
import Navbar from '../shared/components/Navbar'

export default function Home() {
  return (
    <main style={{ backgroundColor: '#111827', minHeight: '100vh' }}>
      <Navbar />
      <Hero />
      <LogoClouds />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Blog />
      <Contact />
      <Footer />
    </main>
  )
}
