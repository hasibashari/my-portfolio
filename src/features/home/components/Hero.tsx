'use client'

import { useState } from 'react'
import {
  Box,
  Button,
  Container,
  Typography,
} from '@mui/material'
import { ArrowRight, Sparkles, Code2 } from 'lucide-react'
import Terminal from '../../../shared/components/Terminal'
import { cn } from '../../../shared/utils/cn'

export default function Hero() {

  const configSnippet = `// hasib.config.ts
export const engineer = {
  name: "Hasib Ashari",
  title: "Software Engineer",
  focus: [
    "Frontend Architecture", "Full-Stack Web Systems"
  ],
  craft: [
    "Clean Code", "Web Vitals Performance", 
    "Editorial UI/UX"
  ],
  status: "Available",
};
`

  return (
    <Box id="hero" sx={{ bgcolor: '#faf9f5', color: '#141413', position: 'relative', overflow: 'hidden' }}>
      <Container maxWidth="xl" sx={{ px: { xs: 3, sm: 4, lg: 6 }, pt: { xs: 8, md: 12 }, pb: { xs: 10, md: 16 } }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' },
            gap: { xs: 6, lg: 8 },
            alignItems: 'center',
          }}
        >
          {/* Left Column: Personal Value Proposition */}
          <Box sx={{ maxWidth: { lg: '560px' } }}>
            {/* Custom Preserved Flex Availability Badge */}
            <Box sx={{ mb: 3, display: 'inline-flex' }}>
              <Box
                sx={{
                  bgcolor: '#efe9de',
                  color: '#141413',
                  fontWeight: 500,
                  fontSize: '0.8125rem',
                  py: 0.75,
                  px: 1.75,
                  borderRadius: '9999px',
                  border: '1px solid #e6dfd8',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <Sparkles size={14} color="#cc785c" style={{ flexShrink: 0 }} />
                <Typography variant="caption" sx={{ color: '#141413', fontWeight: 500, lineHeight: 1 }}>
                  Open for Frontend & Full-Stack Roles
                </Typography>
              </Box>
            </Box>

            {/* Display XL Headline */}
            <Typography
              variant="h1"
              className="font-serif-display"
              sx={{
                fontSize: { xs: '2.5rem', sm: '3.75rem', md: '4rem' },
                fontWeight: 400,
                lineHeight: 1.08,
                letterSpacing: '-0.03em',
                color: '#141413',
                mb: 3,
              }}
            >
              Hi, I'm Hasib Ashari. Building high-performance web products.
            </Typography>

            {/* Body Description */}
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: '1.0625rem', sm: '1.25rem' },
                lineHeight: 1.55,
                color: '#3d3d3a',
                mb: 4.5,
              }}
            >
              Software Engineer specializing in modern frontend architectures, React/Next.js ecosystems, and intuitive user experiences built with high engineering craft.
            </Typography>

            {/* CTA Action Buttons */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 2 }}>
              <Button
                variant="contained"
                disableElevation
                component="a"
                href="#projects"
                endIcon={<ArrowRight size={18} />}
                className={cn('bg-[#cc785c] hover:bg-[#a9583e] text-white font-medium shadow-none')}
                sx={{
                  bgcolor: '#cc785c',
                  color: '#ffffff',
                  px: 3.5,
                  py: 1.5,
                  borderRadius: '8px',
                  textTransform: 'none',
                  fontWeight: 500,
                  fontSize: '0.9375rem',
                  '&:hover': { bgcolor: '#a9583e' },
                }}
              >
                Explore Featured Projects
              </Button>

              <Button
                variant="outlined"
                component="a"
                href="#contact"
                sx={{
                  bgcolor: '#faf9f5',
                  color: '#141413',
                  borderColor: '#e6dfd8',
                  px: 3,
                  py: 1.5,
                  borderRadius: '8px',
                  textTransform: 'none',
                  fontWeight: 500,
                  fontSize: '0.9375rem',
                  '&:hover': { bgcolor: '#efe9de', borderColor: '#cc785c' },
                }}
              >
                Contact Me
              </Button>
            </Box>
          </Box>

          {/* Right Column: Standalone Terminal Window */}
          <Terminal filename="hasib.config.ts" codeSnippet={configSnippet}>
            {/* Stat Grid (Styled as a dashboard inside terminal) */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 2,
                py: 2,
                borderTop: '1px dashed rgba(250, 249, 245, 0.12)',
                borderBottom: '1px dashed rgba(250, 249, 245, 0.12)',
              }}
            >
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h5" className="font-serif-display" sx={{ color: '#cc785c', fontWeight: 600, fontSize: '1.25rem' }}>
                  5+
                </Typography>
                <Typography variant="caption" sx={{ color: '#a09d96', fontSize: '0.7rem', fontFamily: 'var(--font-mono)' }}>
                  Years Exp
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center', borderLeft: '1px dashed rgba(250, 249, 245, 0.12)', borderRight: '1px dashed rgba(250, 249, 245, 0.12)' }}>
                <Typography variant="h5" className="font-serif-display" sx={{ color: '#e8a55a', fontWeight: 600, fontSize: '1.25rem' }}>
                  30+
                </Typography>
                <Typography variant="caption" sx={{ color: '#a09d96', fontSize: '0.7rem', fontFamily: 'var(--font-mono)' }}>
                  Web Apps
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h5" className="font-serif-display" sx={{ color: '#5db8a6', fontWeight: 600, fontSize: '1.25rem' }}>
                  99%
                </Typography>
                <Typography variant="caption" sx={{ color: '#a09d96', fontSize: '0.7rem', fontFamily: 'var(--font-mono)' }}>
                  Core Vitals
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="caption" sx={{ color: '#5db8a6', display: 'flex', alignItems: 'center', gap: 1, fontFamily: 'var(--font-mono)' }}>
                <Code2 size={14} style={{ flexShrink: 0 }} /> Frontend Specialist
              </Typography>
              <Typography variant="caption" sx={{ color: '#a09d96', fontFamily: 'var(--font-mono)' }}>
                TypeScript 5.0
              </Typography>
            </Box>
          </Terminal>
        </Box>
      </Container>
    </Box>
  )
}
