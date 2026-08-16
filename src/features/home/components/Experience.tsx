'use client'

import { Box, Container, Typography } from '@mui/material'
import { CheckCircle2 } from 'lucide-react'
import ScrollReveal from '../../../shared/components/ScrollReveal'
import { experiences } from '../../../shared/constants/experiences'

export default function Experience() {
  return (
    <Box
      id="experience"
      sx={{
        bgcolor: 'var(--color-surface-soft)',
        py: { xs: 8, sm: 10, md: 12 },
        borderTop: '1px solid var(--color-hairline)',
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
        {/* Centered Section Header with Blur-Reveal */}
        <ScrollReveal variant="blur-reveal">
          <Box sx={{ textAlign: 'center', maxWidth: '720px', mx: 'auto', mb: { xs: 5, md: 7 } }}>
            <Typography
              variant="overline"
              className="font-serif-display"
              sx={{ color: 'var(--color-primary)', fontWeight: 600, fontSize: '0.875rem', letterSpacing: '0.1em', display: 'block', mb: 1.5 }}
            >
              CAREER TIMELINE
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
              Work Experience & Professional Impact.
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.125rem', color: 'var(--color-body)', lineHeight: 1.6 }}>
              My journey building software across high-growth startups and established technology teams.
            </Typography>
          </Box>
        </ScrollReveal>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, maxWidth: '900px', mx: 'auto', position: 'relative' }}>
          {/* Vertical Timeline Line */}
          <Box
            sx={{
              position: 'absolute',
              top: '24px',
              bottom: '24px',
              left: { xs: '11px', sm: '19px' },
              width: '2px',
              bgcolor: 'var(--color-hairline)',
              zIndex: 0,
            }}
          />
          {experiences.map((exp, idx) => (
            <ScrollReveal key={exp.role + exp.company} variant="fade-up" delay={idx * 0.1}>
              <Box sx={{ position: 'relative', zIndex: 1 }}>
                {/* Timeline Dot */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: '28px',
                    left: { xs: '6px', sm: '14px' },
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    bgcolor: 'var(--color-primary)',
                    border: '2px solid var(--color-surface-soft)',
                    zIndex: 2,
                  }}
                />
                
                <Box
                  sx={{
                    ml: { xs: '28px', sm: '48px' },
                    bgcolor: 'var(--color-canvas)',
                    borderRadius: '12px',
                    border: '1px solid var(--color-hairline)',
                    p: { xs: 2.5, sm: 3.5, md: 4 },
                    transition: 'all 0.25s ease-in-out',
                    '&:hover': {
                      borderColor: 'var(--color-primary)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 24px -8px rgba(20, 20, 19, 0.08)',
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, gap: 1, mb: 2 }}>
                    <Box>
                      <Typography
                        variant="h5"
                        className="font-serif-display"
                        sx={{
                          fontSize: '1.375rem',
                          fontWeight: 600,
                          color: 'var(--color-ink)',
                          letterSpacing: '-0.015em',
                        }}
                      >
                        {exp.role}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'var(--color-primary)', fontWeight: 600, fontSize: '0.9375rem', mt: 0.25 }}>
                        {exp.company} • {exp.location}
                      </Typography>
                    </Box>

                    <Typography
                      variant="caption"
                      sx={{
                        bgcolor: 'var(--color-surface-card)',
                        color: 'var(--color-ink)',
                        px: 1.5,
                        py: 0.5,
                        borderRadius: '9999px',
                        fontWeight: 600,
                        fontSize: '0.8125rem',
                        border: '1px solid var(--color-hairline)',
                      }}
                    >
                      {exp.period}
                    </Typography>
                  </Box>

                  <Typography variant="body2" sx={{ fontSize: '0.9375rem', color: 'var(--color-body)', lineHeight: 1.6, mb: 3 }}>
                    {exp.description}
                  </Typography>

                  <Box component="ul" sx={{ m: 0, p: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 1.25 }}>
                    {exp.highlights.map((item) => (
                      <Box component="li" key={item} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.25 }}>
                        <CheckCircle2 size={16} color="#cc785c" style={{ marginTop: 3, flexShrink: 0 }} />
                        <Typography variant="body2" sx={{ fontSize: '0.875rem', color: 'var(--color-body)', lineHeight: 1.5 }}>
                          {item}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Box>
            </ScrollReveal>
          ))}
        </Box>
      </Container>
    </Box>
  )
}
