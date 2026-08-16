'use client'

import { Box, Container, Typography, Card, CardContent } from '@mui/material'
import { Code2, Gauge, Palette } from 'lucide-react'
import ScrollReveal from '../../../shared/components/ScrollReveal'

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
    <Box
      id="about"
      sx={{
        bgcolor: 'var(--color-canvas)',
        py: { xs: 8, sm: 10, md: 12 },
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
        {/* Centered Section Header with Blur-Reveal */}
        <ScrollReveal variant="blur-reveal">
          <Box sx={{ maxWidth: '720px', mb: { xs: 5, md: 7 }, mx: 'auto', textAlign: 'center' }}>
            <Typography
              variant="overline"
              className="font-serif-display"
              sx={{
                color: 'var(--color-primary)',
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
                color: 'var(--color-ink)',
                mb: 2.5,
              }}
            >
              Engineering digital experiences with precision & care.
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.125rem', color: 'var(--color-body)', lineHeight: 1.6 }}>
              With a deep passion for system design and cloud architecture, I create scalable backend systems that balance technical complexity with seamless integration for modern AI applications.
            </Typography>
          </Box>
        </ScrollReveal>

        {/* 3-Up Feature Cards Grid with Pop-Up Variant */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: { xs: 2.5, sm: 3, md: 4 },
          }}
        >
          {principles.map((item, idx) => {
            const Icon = item.icon
            return (
              <ScrollReveal key={item.title} variant="pop-up" delay={idx * 0.12} style={{ height: '100%' }}>
                <Card
                  elevation={0}
                  sx={{
                    bgcolor: 'var(--color-surface-card)',
                    borderRadius: '12px',
                    border: '1px solid var(--color-hairline)',
                    p: { xs: 2.5, sm: 3.5, md: 4 },
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '100%',
                    transition: 'all 0.25s ease-in-out',
                    '&:hover': {
                      borderColor: 'var(--color-primary)',
                      transform: 'translateY(-4px)',
                      boxShadow: '0 12px 28px -6px rgba(20, 20, 19, 0.1)',
                      '& .icon-box': {
                        borderColor: 'var(--color-primary)',
                        bgcolor: '#ffffff',
                        transform: 'scale(1.08)',
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
                        bgcolor: 'var(--color-canvas)',
                        border: '1px solid var(--color-hairline)',
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
                        color: 'var(--color-ink)',
                        mb: 1.5,
                        letterSpacing: '-0.015em',
                      }}
                    >
                      {item.title}
                    </Typography>

                    <Typography variant="body2" sx={{ fontSize: '0.9375rem', color: 'var(--color-body)', lineHeight: 1.6 }}>
                      {item.description}
                    </Typography>
                  </CardContent>
                </Card>
              </ScrollReveal>
            )
          })}
        </Box>
      </Container>
    </Box>
  )
}
