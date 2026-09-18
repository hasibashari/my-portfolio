'use client'

import { Box, Container, Typography, Tooltip } from '@mui/material'
import ScrollReveal from '@/shared/components/ScrollReveal'
import { logo } from '../constants/home'

export default function LogoClouds() {
  return (
    <Box
      id="technologies"
      sx={{
        bgcolor: 'var(--color-surface-soft)',
        borderTop: '1px solid var(--color-hairline)',
        borderBottom: '1px solid var(--color-hairline)',
        py: { xs: 4, sm: 5 },
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
        <ScrollReveal duration={0.5}>
          {/* Minimal Section Label */}
          <Typography
            variant="overline"
            className="font-serif-display"
            sx={{
              display: 'block',
              textAlign: 'center',
              color: 'var(--color-muted)',
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '0.12em',
              mb: { xs: 3.5, sm: 4.5 },
            }}
          >
            TECHNOLOGIES I TRUST & USE
          </Typography>

          {/* Ultra-Clean Borderless Centered Logo Band */}
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              gap: { xs: 3, sm: 5, md: 6 },
            }}
          >
            {logo.map((item) => (
              <Tooltip key={item.name} title={item.tag} arrow placement="top">
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    p: 1,
                    opacity: 0.75,
                    filter: 'grayscale(100%)',
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
        </ScrollReveal>
      </Container>
    </Box>
  )
}
