'use client'

import { Box, Container, Typography } from '@mui/material'
import { Sparkles } from 'lucide-react'
import ScrollReveal from '../../../shared/components/ScrollReveal'
import BackLink from '../../../shared/components/BackLink'

export default function ProjectsHero() {
  return (
    <Box
      sx={{
        bgcolor: 'var(--color-canvas)',
        pt: { xs: 4, sm: 6, md: 8 },
        pb: { xs: 3, sm: 4 },
        borderBottom: '1px solid var(--color-hairline)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
        {/* Back to Home Link */}
        <BackLink href="/#projects" label="Back to Overview" />

        {/* Hero Title & Subtitle */}
        <ScrollReveal variant="blur-reveal" delay={0.05}>
          <Box sx={{ maxWidth: '820px' }}>
            <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
              <Sparkles size={16} color="var(--color-primary)" />
              <Typography
                variant="overline"
                className="font-serif-display"
                sx={{
                  color: 'var(--color-primary)',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  letterSpacing: '0.12em',
                  display: 'inline-block',
                }}
              >
                ENGINEERING ARCHIVE & REPOSITORY
              </Typography>
            </Box>

            <Typography
              variant="h1"
              className="font-serif-display"
              sx={{
                fontSize: { xs: '2.25rem', sm: '3.25rem', md: '3.75rem' },
                fontWeight: 400,
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
                color: 'var(--color-ink)',
                mb: 2,
              }}
            >
              All Engineered Projects & Systems.
            </Typography>

            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: '1rem', sm: '1.125rem' },
                color: 'var(--color-body)',
                lineHeight: 1.6,
                maxWidth: '680px',
              }}
            >
              A curated catalog of backend architectures, real-time distributed microservices, AI tooling, and fullstack applications I&apos;ve designed and engineered.
            </Typography>
          </Box>
        </ScrollReveal>
      </Container>
    </Box>
  )
}
