'use client'

import {
  Box,
  Button,
  Container,
  Typography,
} from '@mui/material'
import { ArrowRight, Sparkles } from 'lucide-react'
import { motion } from 'motion/react'
import ArchitectureCanvas from './ArchitectureCanvas'

export default function Hero() {
  return (
    <Box
      id="hero"
      sx={{
        bgcolor: 'var(--color-canvas)',
        color: 'var(--color-ink)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Interactive Cursor-Driven Architecture Dot Matrix Canvas */}
      <ArchitectureCanvas />

      <Container
        maxWidth="lg"
        sx={{
          position: 'relative',
          zIndex: 1,
          px: { xs: 2, sm: 3, md: 4 },
          pt: { xs: 8, sm: 10, md: 14 },
          pb: { xs: 8, sm: 10, md: 14 },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        {/* Availability Badge */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <Box sx={{ mb: 3.5, display: 'inline-flex' }}>
            <Box
              sx={{
                bgcolor: 'var(--color-surface-card)',
                color: 'var(--color-ink)',
                fontWeight: 500,
                fontSize: '0.8125rem',
                py: 0.75,
                px: 2,
                borderRadius: '9999px',
                border: '1px solid var(--color-hairline)',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                boxShadow: '0 2px 8px -2px rgba(20, 20, 19, 0.05)',
              }}
            >
              <Sparkles size={14} color="#cc785c" style={{ flexShrink: 0 }} />
              <Typography variant="caption" sx={{ color: 'var(--color-ink)', fontWeight: 500, lineHeight: 1 }}>
                Open for Backend & Cloud Engineering Roles
              </Typography>
            </Box>
          </Box>
        </motion.div>

        {/* Display XL Headline */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <Typography
            variant="h1"
            className="font-serif-display"
            sx={{
              fontSize: { xs: '2.5rem', sm: '3.75rem', md: '4.25rem' },
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              color: 'var(--color-ink)',
              maxWidth: '860px',
              mx: 'auto',
              mb: 3,
            }}
          >
            Hi, I&apos;m Hasib Ashari. Building highly scalable cloud systems.
          </Typography>
        </motion.div>

        {/* Body Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: '1.0625rem', sm: '1.25rem' },
              lineHeight: 1.6,
              color: 'var(--color-body)',
              maxWidth: '680px',
              mx: 'auto',
              mb: 4.5,
            }}
          >
            Backend & Cloud Engineer specializing in scalable architectures, cloud infrastructure (AWS/GCP), and building robust API layers for AI-driven applications.
          </Typography>
        </motion.div>

        {/* CTA Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2,
              mb: 6,
            }}
          >
            <Button
              variant="contained"
              disableElevation
              component="a"
              href="#projects"
              endIcon={<ArrowRight size={18} />}
              sx={{
                bgcolor: 'var(--color-primary)',
                color: 'var(--color-on-primary)',
                px: 3.5,
                py: 1.5,
                borderRadius: '8px',
                textTransform: 'none',
                fontWeight: 500,
                fontSize: '0.9375rem',
                boxShadow: '0 4px 14px 0 rgba(204, 120, 92, 0.35)',
                transition: 'all 0.2s ease-in-out',
                '&:hover': { bgcolor: 'var(--color-primary-active)', boxShadow: '0 6px 20px 0 rgba(204, 120, 92, 0.45)', transform: 'translateY(-2px)' },
              }}
            >
              Explore Featured Projects
            </Button>

            <Button
              variant="outlined"
              component="a"
              href="#contact"
              sx={{
                bgcolor: 'var(--color-canvas)',
                color: 'var(--color-ink)',
                borderColor: 'var(--color-hairline)',
                px: 3,
                py: 1.5,
                borderRadius: '8px',
                textTransform: 'none',
                fontWeight: 500,
                fontSize: '0.9375rem',
                backdropFilter: 'blur(8px)',
                transition: 'all 0.2s ease-in-out',
                '&:hover': { bgcolor: 'var(--color-surface-card)', borderColor: 'var(--color-primary)', transform: 'translateY(-2px)' },
              }}
            >
              Contact Me
            </Button>
          </Box>
        </motion.div>

        {/* Minimal Stats Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55, ease: [0.21, 0.47, 0.32, 0.98] }}
          style={{ width: '100%' }}
        >
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              gap: { xs: 3, sm: 6 },
              pt: { xs: 4, md: 5 },
              borderTop: '1px solid var(--color-hairline)',
              maxWidth: '640px',
              width: '100%',
              mx: 'auto',
            }}
          >
            <Box sx={{ textAlign: 'center' }}>
              <Typography
                variant="h5"
                className="font-serif-display"
                sx={{ color: 'var(--color-primary)', fontWeight: 600, fontSize: { xs: '1.25rem', sm: '1.5rem' } }}
              >
                2+
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: 'var(--color-muted)',
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-mono)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                Years Coding
              </Typography>
            </Box>

            <Box sx={{ width: '1px', height: '28px', bgcolor: 'var(--color-hairline)', display: { xs: 'none', sm: 'block' } }} />

            <Box sx={{ textAlign: 'center' }}>
              <Typography
                variant="h5"
                className="font-serif-display"
                sx={{ color: 'var(--color-primary)', fontWeight: 600, fontSize: { xs: '1.25rem', sm: '1.5rem' } }}
              >
                10+
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: 'var(--color-muted)',
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-mono)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                Projects Built
              </Typography>
            </Box>

            <Box sx={{ width: '1px', height: '28px', bgcolor: 'var(--color-hairline)', display: { xs: 'none', sm: 'block' } }} />

            <Box sx={{ textAlign: 'center' }}>
              <Typography
                variant="h5"
                className="font-serif-display"
                sx={{ color: 'var(--color-primary)', fontWeight: 600, fontSize: { xs: '1.25rem', sm: '1.5rem' } }}
              >
                99.9%
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: 'var(--color-muted)',
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-mono)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                Uptime SLA
              </Typography>
            </Box>
          </Box>
        </motion.div>
      </Container>
    </Box>
  )
}
