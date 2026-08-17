'use client'

import { Box, Container, Typography } from '@mui/material'
import ScrollReveal from '../../../shared/components/ScrollReveal'

export default function BlogHero() {
  return (
    <Box
      sx={{
        pt: { xs: 8, sm: 10, md: 12 },
        pb: { xs: 5, sm: 6, md: 8 },
        borderBottom: '1px solid var(--color-hairline)',
        bgcolor: 'var(--color-surface-soft)',
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
        <ScrollReveal variant="blur-reveal">
          <Box sx={{ maxWidth: '800px', mx: 'auto', textAlign: 'center' }}>
            <Typography
              variant="overline"
              className="font-serif-display"
              sx={{
                color: 'var(--color-primary)',
                fontWeight: 600,
                fontSize: '0.875rem',
                letterSpacing: '0.12em',
                display: 'inline-block',
                mb: 1.5,
              }}
            >
              TECHNICAL ESSAYS & ARCHITECTURE NOTES
            </Typography>

            <Typography
              variant="h1"
              className="font-serif-display"
              sx={{
                fontSize: { xs: '2.5rem', sm: '3.25rem', md: '4rem' },
                fontWeight: 400,
                lineHeight: 1.08,
                letterSpacing: '-0.03em',
                color: 'var(--color-ink)',
                mb: 2.5,
              }}
            >
              Engineering Journal & Insights.
            </Typography>

            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: '1.0625rem', sm: '1.1875rem' },
                color: 'var(--color-body)',
                lineHeight: 1.6,
                maxWidth: '640px',
                mx: 'auto',
              }}
            >
              Deep dives on web performance, distributed systems, modern React paradigms, and resilient software architecture.
            </Typography>
          </Box>
        </ScrollReveal>
      </Container>
    </Box>
  )
}
