'use client';

import { Box, Container, Typography, Chip } from '@mui/material';
import { Check } from 'lucide-react';
import ScrollReveal from '@/shared/components/ScrollReveal';
import { skills } from '../constants/home';

export default function Skills() {
  return (
    <Box
      id='skills'
      sx={{
        bgcolor: 'var(--color-canvas)',
        py: { xs: 8, sm: 10, md: 12 },
        borderTop: '1px solid var(--color-hairline)',
      }}
    >
      <Container maxWidth='lg' sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
        {/* Centered Header with Blur-Reveal */}
        <ScrollReveal variant='blur-reveal'>
          <Box sx={{ textAlign: 'center', maxWidth: '720px', mx: 'auto', mb: { xs: 5, md: 7 } }}>
            <Typography
              variant='overline'
              className='font-serif-display'
              sx={{
                color: 'var(--color-primary)',
                fontWeight: 600,
                fontSize: '0.875rem',
                letterSpacing: '0.1em',
                display: 'block',
                mb: 1.5,
              }}
            >
              CAPABILITIES & EXPERTISE
            </Typography>
            <Typography
              variant='h2'
              className='font-serif-display'
              sx={{
                fontSize: { xs: '2rem', sm: '2.75rem', md: '3.25rem' },
                fontWeight: 400,
                lineHeight: 1.12,
                letterSpacing: '-0.025em',
                color: 'var(--color-ink)',
                mb: 2.5,
              }}
            >
              Skills & Capability Matrix.
            </Typography>
            <Typography
              variant='body1'
              sx={{ fontSize: '1.125rem', color: 'var(--color-body)', lineHeight: 1.6 }}
            >
              A curated breakdown of technologies I use to craft fast, scalable, and resilient
              digital solutions.
            </Typography>
          </Box>
        </ScrollReveal>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: 'repeat(3, 1fr)' },
            gap: { xs: 2.5, sm: 3, md: 4 },
          }}
        >
          {skills.map((category, idx) => {
            const Icon = category.icon;
            return (
              <ScrollReveal
                key={category.name}
                variant='zoom-in'
                delay={idx * 0.12}
                style={{ height: '100%' }}
              >
                <Box
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
                      borderColor: category.badgeColor,
                      transform: 'translateY(-4px)',
                      boxShadow: '0 12px 30px -10px rgba(20, 20, 19, 0.1)',
                    },
                  }}
                >
                  <Box>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        mb: 3,
                      }}
                    >
                      <Box
                        sx={{
                          width: 44,
                          height: 44,
                          borderRadius: '10px',
                          bgcolor: 'var(--color-canvas)',
                          border: '1px solid var(--color-hairline)',
                          display: 'grid',
                          placeItems: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <Icon
                          size={22}
                          color={category.badgeColor}
                          style={{ display: 'block', margin: 'auto' }}
                        />
                      </Box>
                      <Chip
                        label={category.badge}
                        sx={{
                          bgcolor: 'var(--color-canvas)',
                          color: 'var(--color-ink)',
                          fontWeight: 600,
                          fontSize: '0.75rem',
                          letterSpacing: '0.05em',
                          py: 0.5,
                          px: 1,
                          borderRadius: '9999px',
                          border: '1px solid var(--color-hairline)',
                        }}
                      />
                    </Box>

                    <Typography
                      variant='h4'
                      className='font-serif-display'
                      sx={{
                        fontSize: '1.5rem',
                        fontWeight: 600,
                        color: 'var(--color-ink)',
                        mb: 2,
                        letterSpacing: '-0.015em',
                      }}
                    >
                      {category.name}
                    </Typography>

                    <Typography
                      variant='body2'
                      sx={{
                        fontSize: '0.9375rem',
                        color: 'var(--color-body)',
                        lineHeight: 1.6,
                        mb: 4,
                      }}
                    >
                      {category.description}
                    </Typography>

                    <Box
                      component='ul'
                      sx={{
                        m: 0,
                        p: 0,
                        listStyle: 'none',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1.5,
                        mb: 2,
                      }}
                    >
                      {category.skills.map(skill => (
                        <Box
                          component='li'
                          key={skill}
                          sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}
                        >
                          <Check
                            size={16}
                            color={category.badgeColor}
                            style={{ marginTop: 3, flexShrink: 0 }}
                          />
                          <Typography
                            variant='body2'
                            sx={{
                              fontSize: '0.875rem',
                              color: 'var(--color-body)',
                              fontWeight: 500,
                            }}
                          >
                            {skill}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </Box>
              </ScrollReveal>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
}
