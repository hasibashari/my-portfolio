'use client'

import { Box, Container, Typography, Chip } from '@mui/material'
import { Layout, Server, Wrench, Check } from 'lucide-react'
import { cn } from '../../../shared/utils/cn'

const skillCategories = [
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

export default function Skills() {
  return (
    <Box id="skills" className={cn('bg-[#faf9f5] py-24 border-t border-[#e6dfd8]')} sx={{ bgcolor: '#faf9f5', py: { xs: 10, md: 14 }, borderTop: '1px solid #e6dfd8' }}>
      <Container maxWidth="xl" sx={{ px: { xs: 3, sm: 4, lg: 6 } }}>
        <Box sx={{ textAlign: 'center', maxWidth: '720px', mx: 'auto', mb: 8 }}>
          <Typography
            variant="overline"
            className="font-serif-display"
            sx={{ color: '#cc785c', fontWeight: 600, fontSize: '0.875rem', letterSpacing: '0.1em', display: 'block', mb: 1.5 }}
          >
            TECHNICAL STACK
          </Typography>
          <Typography
            variant="h2"
            className="font-serif-display"
            sx={{
              fontSize: { xs: '2rem', sm: '2.75rem', md: '3.25rem' },
              fontWeight: 400,
              lineHeight: 1.12,
              letterSpacing: '-0.025em',
              color: '#141413',
              mb: 2.5,
            }}
          >
            Skills & Capability Matrix.
          </Typography>
          <Typography variant="body1" sx={{ fontSize: '1.125rem', color: '#3d3d3a', lineHeight: 1.6 }}>
            A curated breakdown of technologies I use to craft fast, scalable, and resilient digital solutions.
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: 'repeat(3, 1fr)' },
            gap: 4,
          }}
        >
          {skillCategories.map((category) => {
            const Icon = category.icon
            return (
              <Box
                key={category.name}
                sx={{
                  bgcolor: '#faf9f5',
                  borderRadius: '12px',
                  border: '1px solid #e6dfd8',
                  p: { xs: 3.5, sm: 4.5 },
                  display: 'flex',
                  flexDirection: 'column',
                  justify: 'space-between',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    borderColor: category.badgeColor,
                    boxShadow: '0 10px 30px -10px rgba(20, 20, 19, 0.08)',
                  },
                }}
              >
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                    <Box
                      sx={{
                        width: 44,
                        height: 44,
                        borderRadius: '10px',
                        bgcolor: '#efe9de',
                        border: '1px solid #e6dfd8',
                        display: 'grid',
                        placeItems: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={22} color={category.badgeColor} style={{ display: 'block', margin: 'auto' }} />
                    </Box>
                    <Chip
                      label={category.badge}
                      sx={{
                        bgcolor: '#efe9de',
                        color: '#141413',
                        fontWeight: 600,
                        fontSize: '0.75rem',
                        letterSpacing: '0.05em',
                        py: 0.5,
                        px: 1,
                        borderRadius: '9999px',
                        border: '1px solid #e6dfd8',
                      }}
                    />
                  </Box>

                  <Typography
                    variant="h4"
                    className="font-serif-display"
                    sx={{
                      fontSize: '1.5rem',
                      fontWeight: 600,
                      color: '#141413',
                      mb: 2,
                      letterSpacing: '-0.015em',
                    }}
                  >
                    {category.name}
                  </Typography>

                  <Typography variant="body2" sx={{ fontSize: '0.9375rem', color: '#3d3d3a', lineHeight: 1.6, mb: 4 }}>
                    {category.description}
                  </Typography>

                  <Box component="ul" sx={{ m: 0, p: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 1.5, mb: 2 }}>
                    {category.skills.map((skill) => (
                      <Box component="li" key={skill} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                        <Check size={16} color={category.badgeColor} style={{ marginTop: 3, flexShrink: 0 }} />
                        <Typography variant="body2" sx={{ fontSize: '0.875rem', color: '#3d3d3a', fontWeight: 500 }}>
                          {skill}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Box>
            )
          })}
        </Box>
      </Container>
    </Box>
  )
}
