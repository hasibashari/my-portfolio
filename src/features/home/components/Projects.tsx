'use client'

import { useState } from 'react'
import { Box, Container, Typography, Button, Chip } from '@mui/material'
import { ArrowRight, ExternalLink } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import ScrollReveal from '../../../shared/components/ScrollReveal'
import { projects } from '../../../shared/constants/projects'

export default function Projects() {
  const [activeTab, setActiveTab] = useState(0)

  const current = projects[activeTab]

  return (
    <Box
      id="projects"
      sx={{
        bgcolor: 'var(--color-canvas)',
        py: { xs: 8, sm: 10, md: 12 },
        borderTop: '1px solid var(--color-hairline)',
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
        {/* Centered Section Header with Blur-Reveal */}
        <ScrollReveal variant="blur-reveal">
          <Box sx={{ maxWidth: '720px', mb: { xs: 4.5, md: 6 }, mx: 'auto', textAlign: 'center' }}>
            <Typography
              variant="overline"
              className="font-serif-display"
              sx={{ color: 'var(--color-primary)', fontWeight: 600, fontSize: '0.875rem', letterSpacing: '0.1em', display: 'block', mb: 1.5 }}
            >
              PORTFOLIO SHOWCASE
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
              Featured Engineering Projects.
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.125rem', color: 'var(--color-body)', lineHeight: 1.6 }}>
              Explore selected web applications, API services, and user interfaces I&apos;ve built.
            </Typography>
          </Box>
        </ScrollReveal>

        {/* Centered Project Selector Tabs */}
        <ScrollReveal variant="fade-up" delay={0.1}>
          <Box sx={{ display: 'flex', gap: 1.5, mb: { xs: 3, md: 4 }, flexWrap: 'wrap', justifyContent: 'center' }}>
            {projects.map((item, idx) => (
              <Button
                key={item.id}
                onClick={() => setActiveTab(idx)}
                variant="text"
                sx={{
                  bgcolor: activeTab === idx ? 'var(--color-surface-card)' : 'transparent',
                  color: activeTab === idx ? 'var(--color-ink)' : 'var(--color-muted)',
                  fontWeight: 500,
                  fontSize: '0.875rem',
                  borderRadius: '8px',
                  px: 2.5,
                  py: 1,
                  textTransform: 'none',
                  border: '1px solid',
                  borderColor: activeTab === idx ? 'var(--color-hairline)' : 'transparent',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': { bgcolor: 'var(--color-surface-card)', color: 'var(--color-ink)' },
                }}
              >
                {item.title}
              </Button>
            ))}
          </Box>
        </ScrollReveal>

        {/* Dark Navy Product Showcase Card with Zoom-In Variant */}
        <ScrollReveal variant="zoom-in" delay={0.15}>
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -10 }}
              transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', lg: 'row' },
                  bgcolor: 'var(--color-surface-dark)',
                  borderRadius: '16px',
                  color: 'var(--color-on-dark)',
                  boxShadow: '0 25px 50px -12px rgba(20, 20, 19, 0.35)',
                  border: '1px solid rgba(250, 249, 245, 0.1)',
                  overflow: 'hidden',
                }}
              >
                {/* Left Text Column */}
                <Box sx={{ flex: 1, p: { xs: 2.5, sm: 3.5, md: 4.5 }, display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap', mb: 3 }}>
                    <Chip
                      label={current.badge}
                      sx={{
                        bgcolor: current.badgeColor,
                        color: '#ffffff',
                        fontWeight: 600,
                        fontSize: '0.75rem',
                        letterSpacing: '0.05em',
                        borderRadius: '9999px',
                      }}
                    />
                    <Typography variant="h5" className="font-serif-display" sx={{ color: 'var(--color-on-dark)', fontSize: '1.375rem', fontWeight: 500 }}>
                      {current.title}
                    </Typography>
                  </Box>

                  <Typography variant="body1" sx={{ color: 'var(--color-on-dark-soft)', mb: 4, fontSize: '1rem', lineHeight: 1.6 }}>
                    {current.description}
                  </Typography>

                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 'auto' }}>
                    {current.techStack.map((tech) => (
                      <Chip
                        key={tech}
                        label={tech}
                        size="small"
                        sx={{
                          bgcolor: 'rgba(250, 249, 245, 0.08)',
                          color: 'var(--color-on-dark)',
                          fontSize: '0.75rem',
                          borderRadius: '6px',
                          border: '1px solid rgba(250, 249, 245, 0.12)',
                        }}
                      />
                    ))}
                  </Box>

                  <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center', flexWrap: 'wrap', mt: 5 }}>
                    <Button
                      component="a"
                      href={current.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="contained"
                      size="small"
                      disableElevation
                      endIcon={<ExternalLink size={14} />}
                      sx={{
                        bgcolor: 'var(--color-primary)',
                        color: 'var(--color-on-primary)',
                        textTransform: 'none',
                        fontSize: '0.8125rem',
                        fontWeight: 500,
                        borderRadius: '6px',
                        boxShadow: 'none',
                        transition: 'all 0.2s ease-in-out',
                        '&:hover': { bgcolor: 'var(--color-primary-active)', transform: 'translateY(-1px)' },
                      }}
                    >
                      Live Demo
                    </Button>
                  </Box>
                </Box>

                {/* Right Image Column */}
                <Box sx={{ flex: 1, minHeight: { xs: '250px', sm: '350px', lg: 'auto' }, position: 'relative', overflow: 'hidden' }}>
                  <Box
                    component="img"
                    src={current.imageUrl}
                    alt={current.title}
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease',
                      '&:hover': {
                        transform: 'scale(1.05)',
                      },
                    }}
                  />
                  {/* Overlay gradient to blend edge */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      background: {
                        xs: 'linear-gradient(to bottom, #181715 0%, transparent 20%)',
                        lg: 'linear-gradient(to right, #181715 0%, transparent 20%)'
                      },
                      pointerEvents: 'none'
                    }}
                  />
                </Box>
              </Box>
            </motion.div>
          </AnimatePresence>
        </ScrollReveal>

        {/* Centered Read More / View All Projects Button */}
        <ScrollReveal variant="fade-up" delay={0.2}>
          <Box sx={{ mt: { xs: 5, md: 7 }, textAlign: 'center' }}>
            <Button
              component="a"
              href="/projects"
              variant="outlined"
              endIcon={<ArrowRight size={18} />}
              sx={{
                color: 'var(--color-ink)',
                borderColor: 'var(--color-hairline)',
                bgcolor: 'var(--color-canvas)',
                px: 4,
                py: 1.5,
                borderRadius: '8px',
                fontWeight: 500,
                fontSize: '0.9375rem',
                textTransform: 'none',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  bgcolor: 'var(--color-surface-card)',
                  borderColor: 'var(--color-primary)',
                  color: 'var(--color-primary)',
                  transform: 'translateY(-2px)',
                },
              }}
            >
              View All Projects
            </Button>
          </Box>
        </ScrollReveal>
      </Container>
    </Box>
  )
}
