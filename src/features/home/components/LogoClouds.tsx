'use client'

import { Box, Container, Typography, Tooltip } from '@mui/material'
import { cn } from '../../../shared/utils/cn'

const techLogos = [
  {
    name: 'React.js',
    logoUrl: 'https://cdn.simpleicons.org/react/61DAFB',
    tag: 'React.js • Frontend Library',
  },
  {
    name: 'Next.js 15',
    logoUrl: 'https://cdn.simpleicons.org/nextdotjs/000000',
    tag: 'Next.js 15 • Full-Stack Framework',
  },
  {
    name: 'TypeScript',
    logoUrl: 'https://cdn.simpleicons.org/typescript/3178C6',
    tag: 'TypeScript • Type Safety',
  },
  {
    name: 'Tailwind CSS',
    logoUrl: 'https://cdn.simpleicons.org/tailwindcss/06B6D4',
    tag: 'Tailwind CSS • Styling System',
  },
  {
    name: 'Material UI',
    logoUrl: 'https://cdn.simpleicons.org/mui/007FFF',
    tag: 'Material UI • Component Library',
  },
  {
    name: 'Node.js',
    logoUrl: 'https://cdn.simpleicons.org/nodedotjs/5FA04E',
    tag: 'Node.js • Backend Runtime',
  },
  {
    name: 'Express.js',
    logoUrl: 'https://cdn.simpleicons.org/express/000000',
    tag: 'Express.js • API Framework',
  },
  {
    name: 'PostgreSQL',
    logoUrl: 'https://cdn.simpleicons.org/postgresql/4169E1',
    tag: 'PostgreSQL • Database Engine',
  },
]

export default function LogoClouds() {
  return (
    <Box
      className={cn('bg-[#f5f0e8] border-y border-[#e6dfd8] py-10 sm:py-12')}
      sx={{
        bgcolor: '#f5f0e8',
        borderTop: '1px solid #e6dfd8',
        borderBottom: '1px solid #e6dfd8',
        py: { xs: 5, sm: 6 },
      }}
    >
      <Container maxWidth="xl" sx={{ px: { xs: 3, sm: 4, lg: 6 } }}>
        {/* Minimal Section Label */}
        <Typography
          variant="overline"
          className="font-serif-display"
          sx={{
            display: 'block',
            textAlign: 'center',
            color: '#8c8a84',
            fontSize: '0.75rem',
            fontWeight: 600,
            letterSpacing: '0.12em',
            mb: 4.5,
          }}
        >
          CORE TECHNOLOGY STACK & TOOLING
        </Typography>

        {/* Ultra-Clean Borderless Centered Logo Band */}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: { xs: 4, sm: 6, md: 7, lg: 8 },
          }}
        >
          {techLogos.map((item) => (
            <Tooltip key={item.name} title={item.tag} arrow placement="top">
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  p: 1,
                  opacity: 0.75,
                  filter: 'grayscale(20%)',
                  transition: 'all 0.25s ease-in-out',
                  '&:hover': {
                    opacity: 1,
                    filter: 'grayscale(0%)',
                    transform: 'scale(1.15) translateY(-2px)',
                  },
                }}
              >
                {/* Clean Large Official SVG Brand Icon */}
                <Box
                  component="img"
                  src={item.logoUrl}
                  alt={`${item.name} logo`}
                  sx={{
                    width: { xs: 32, sm: 36, md: 40 },
                    height: { xs: 32, sm: 36, md: 40 },
                    objectFit: 'contain',
                    display: 'block',
                  }}
                />
              </Box>
            </Tooltip>
          ))}
        </Box>
      </Container>
    </Box>
  )
}
