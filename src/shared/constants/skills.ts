import { Layout, Server, Wrench } from 'lucide-react'

export const skills = [
  {
    name: 'Frontend Mastery',
    badge: 'EXPERT',
    badgeColor: '#cc785c',
    description: 'Building modern, accessible, and responsive user interfaces with type safety and optimal rendering performance.',
    skills: ['React.js 19', 'Next.js 15 (App Router)', 'TypeScript', 'Tailwind CSS', 'Material UI (MUI)', 'Zustand / Redux Toolkit'],
    icon: Layout,
  },
  {
    name: 'UI & Styling Ecosystem',
    badge: 'ADVANCED',
    badgeColor: '#e8a55a',
    description: 'Designing scalable component libraries, accessible WCAG themes, and fluid micro-animations.',
    skills: ['Design Systems Architecture', 'CSS-in-JS & Emotion', 'Framer Motion & Transitions', 'Responsive Grid & Flex Layouts', 'Custom MUI Theme Customization'],
    icon: Wrench,
  },
  {
    name: 'Backend & Data APIs',
    badge: 'PROFICIENT',
    badgeColor: '#5db8a6',
    description: 'Designing robust server architecture, REST/GraphQL APIs, and database schemas for seamless data flow.',
    skills: ['Node.js & Express', 'PostgreSQL & SQL', 'RESTful API Architecture', 'Prisma ORM', 'GraphQL & Apollo', 'Redis Caching'],
    icon: Server,
  },
]
