'use client'

import { Box, Container, Typography, Card, CardContent } from '@mui/material'
import { Code2, Gauge, Palette } from 'lucide-react'
import { cn } from '../../../shared/utils/cn'

const principles = [
  {
    icon: Code2,
    title: 'Clean Architecture & Scalability',
    description:
      'Building robust microservices and modular APIs with Express and NestJS, ensuring maintainability and high availability under load.',
  },
  {
    icon: Gauge,
    title: 'Cloud & Infrastructure First',
    description:
      'Designing fault-tolerant cloud environments using Docker containerization and deploying resilient systems on AWS and GCP.',
  },
  {
    icon: Palette,
    title: 'AI Integration & Data Pipelines',
    description:
      'Engineering secure and low-latency backend architectures prepared for AI processing, LLM integrations, and complex data streams.',
  },
]

export default function About() {
  return (
    <Box id="about" className={cn('bg-[#faf9f5] py-24')} sx={{ bgcolor: '#faf9f5', py: { xs: 10, md: 14 } }}>
      <Container maxWidth="xl" sx={{ px: { xs: 3, sm: 4, lg: 6 } }}>
        {/* Centered Section Header */}
        <Box sx={{ maxWidth: '720px', mb: 8, mx: 'auto', textAlign: 'center' }}>
          <Typography
            variant="overline"
            className="font-serif-display"
            sx={{
              color: '#cc785c',
              fontWeight: 600,
              fontSize: '0.875rem',
              letterSpacing: '0.1em',
              display: 'block',
              mb: 1.5,
            }}
          >
            ENGINEERING PHILOSOPHY
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
            Engineering digital experiences with precision & care.
          </Typography>
          <Typography variant="body1" sx={{ fontSize: '1.125rem', color: '#3d3d3a', lineHeight: 1.6 }}>
            With a deep passion for system design and cloud architecture, I create scalable backend systems that balance technical complexity with seamless integration for modern AI applications.
          </Typography>
        </Box>

        {/* 3-Up Feature Cards Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: 4,
          }}
        >
          {principles.map((item) => {
            const Icon = item.icon
            return (
              <Card
                key={item.title}
                elevation={0}
                className={cn('bg-[#efe9de] border border-[#e6dfd8] rounded-xl transition-all hover:border-[#cc785c]')}
                sx={{
                  bgcolor: '#efe9de',
                  borderRadius: '12px',
                  border: '1px solid #e6dfd8',
                  p: { xs: 3, sm: 4 },
                  display: 'flex',
                  flexDirection: 'column',
                  justify: 'space-between',
                  height: '100%',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    borderColor: '#cc785c',
                    boxShadow: '0 8px 24px -6px rgba(20, 20, 19, 0.08)',
                    '& .icon-box': {
                      borderColor: '#cc785c',
                      bgcolor: '#ffffff',
                      transform: 'scale(1.05)',
                    },
                  },
                }}
              >
                <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
                  <Box
                    className="icon-box"
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: '10px',
                      bgcolor: '#faf9f5',
                      border: '1px solid #e6dfd8',
                      display: 'grid',
                      placeItems: 'center',
                      mb: 3,
                      flexShrink: 0,
                      transition: 'all 0.2s ease-in-out',
                    }}
                  >
                    <Icon size={22} color="#cc785c" style={{ display: 'block', margin: 'auto' }} />
                  </Box>

                  <Typography
                    variant="h5"
                    className="font-serif-display"
                    sx={{
                      fontSize: '1.375rem',
                      fontWeight: 600,
                      color: '#141413',
                      mb: 1.5,
                      letterSpacing: '-0.015em',
                    }}
                  >
                    {item.title}
                  </Typography>

                  <Typography variant="body2" sx={{ fontSize: '0.9375rem', color: '#3d3d3a', lineHeight: 1.6 }}>
                    {item.description}
                  </Typography>
                </CardContent>
              </Card>
            )
          })}
        </Box>
      </Container>
    </Box>
  )
}
