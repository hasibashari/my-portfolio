'use client'

import { useState } from 'react'
import { Box, Container, Typography, Button, Chip } from '@mui/material'
import { ArrowRight, ExternalLink } from 'lucide-react'
import { cn } from '../../../shared/utils/cn'
import { projects } from '../../../shared/constants/projects'

export default function Projects() {
  const [activeTab, setActiveTab] = useState(0)

  const current = projects[activeTab]

  return (
    <Box id="projects" className={cn('bg-[#faf9f5] py-24 border-t border-[#e6dfd8]')} sx={{ bgcolor: '#faf9f5', py: { xs: 10, md: 14 }, borderTop: '1px solid #e6dfd8' }}>
      <Container maxWidth="xl" sx={{ px: { xs: 3, sm: 4, lg: 6 } }}>
        {/* Centered Section Header */}
        <Box sx={{ maxWidth: '720px', mb: 6, mx: 'auto', textAlign: 'center' }}>
          <Typography
            variant="overline"
            className="font-serif-display"
            sx={{ color: '#cc785c', fontWeight: 600, fontSize: '0.875rem', letterSpacing: '0.1em', display: 'block', mb: 1.5 }}
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
              color: '#141413',
              mb: 2.5,
            }}
          >
            Featured Engineering Projects.
          </Typography>
          <Typography variant="body1" sx={{ fontSize: '1.125rem', color: '#3d3d3a', lineHeight: 1.6 }}>
            Explore selected web applications, API services, and user interfaces I&apos;ve built.
          </Typography>
        </Box>

        {/* Centered Project Selector Tabs */}
        <Box sx={{ display: 'flex', gap: 1.5, mb: 4, flexWrap: 'wrap', justifyContent: 'center' }}>
          {projects.map((item, idx) => (
            <Button
              key={item.id}
              onClick={() => setActiveTab(idx)}
              variant="text"
              sx={{
                bgcolor: activeTab === idx ? '#efe9de' : 'transparent',
                color: activeTab === idx ? '#141413' : '#6c6a64',
                fontWeight: 500,
                fontSize: '0.875rem',
                borderRadius: '8px',
                px: 2.5,
                py: 1,
                textTransform: 'none',
                border: '1px solid',
                borderColor: activeTab === idx ? '#e6dfd8' : 'transparent',
                '&:hover': { bgcolor: '#efe9de', color: '#141413' },
              }}
            >
              {item.title}
            </Button>
          ))}
        </Box>

        {/* Dark Navy Product Showcase Card */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', lg: 'row' },
            bgcolor: '#181715',
            borderRadius: '16px',
            color: '#faf9f5',
            boxShadow: '0 25px 50px -12px rgba(20, 20, 19, 0.35)',
            border: '1px solid rgba(250, 249, 245, 0.1)',
            overflow: 'hidden',
          }}
        >
          {/* Left Text Column */}
          <Box sx={{ flex: 1, p: { xs: 3, sm: 5 }, display: 'flex', flexDirection: 'column' }}>
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
              <Typography variant="h5" className="font-serif-display" sx={{ color: '#faf9f5', fontSize: '1.375rem', fontWeight: 500 }}>
                {current.title}
              </Typography>
            </Box>

            <Typography variant="body1" sx={{ color: '#a09d96', mb: 4, fontSize: '1rem', lineHeight: 1.6 }}>
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
                    color: '#faf9f5',
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
                  bgcolor: '#cc785c',
                  color: '#ffffff',
                  textTransform: 'none',
                  fontSize: '0.8125rem',
                  fontWeight: 500,
                  borderRadius: '6px',
                  '&:hover': { bgcolor: '#a9583e' },
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

        {/* Centered Read More / View All Projects Button */}
        <Box sx={{ mt: 8, textAlign: 'center' }}>
          <Button
            component="a"
            href="/projects"
            variant="outlined"
            endIcon={<ArrowRight size={18} />}
            sx={{
              color: '#141413',
              borderColor: '#e6dfd8',
              bgcolor: '#faf9f5',
              px: 4,
              py: 1.5,
              borderRadius: '8px',
              fontWeight: 500,
              fontSize: '0.9375rem',
              textTransform: 'none',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                bgcolor: '#efe9de',
                borderColor: '#cc785c',
                color: '#cc785c',
              },
            }}
          >
            View All Projects
          </Button>
        </Box>
      </Container>
    </Box>
  )
}
