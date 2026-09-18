import { ProjectItem } from '@/shared/types/projects'
import { BlogPost } from '@/shared/types/blog'
import About from '../components/About'
import Blog from '../components/Blog'
import Contact from '../components/Contact'
import Experience from '../components/Experience'
import Hero from '../components/Hero'
import LogoClouds from '../components/LogoClouds'
import Projects from '../components/Projects'
import Skills from '../components/Skills'

interface HomeViewProps {
  projects: ProjectItem[]
  articles: BlogPost[]
}

export default function HomeView({ projects, articles }: HomeViewProps) {
  return (
    <>
      <Hero />
      <LogoClouds />
      <About />
      <Skills />
      <Experience />
      <Projects projects={projects} />
      <Blog articles={articles} />
      <Contact />
    </>
  )
}
