'use client'

import { Box, Typography, Button, Chip } from '@mui/material'
import { ExternalLink } from 'lucide-react'
import { FaGithub } from 'react-icons/fa'
import { motion } from 'motion/react'
import { ProjectItem } from '../../../shared/constants/projects'

interface ProjectCardProps {
  project: ProjectItem
  onOpenModal: (project: ProjectItem) => void
}

export default function ProjectCard({ project, onOpenModal }: ProjectCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.3 }}
      style={{ height: '100%' }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          bgcolor: 'var(--color-surface-dark)',
          borderRadius: '16px',
          color: 'var(--color-on-dark)',
          border: '1px solid rgba(230, 223, 216, 0.16)',
          overflow: 'hidden',
          boxShadow: '0 8px 24px -8px rgba(20, 20, 19, 0.3)',
          transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            borderColor: 'rgba(204, 120, 92, 0.45)',
            boxShadow: '0 16px 36px -10px rgba(20, 20, 19, 0.5)',
          },
        }}
      >
        {/* Top Image Preview Banner */}
        <Box
          onClick={() => onOpenModal(project)}
          sx={{
            position: 'relative',
            height: { xs: 170, sm: 185 },
            width: '100%',
            overflow: 'hidden',
            cursor: 'pointer',
            bgcolor: 'var(--color-surface-dark-soft)',
          }}
        >
          <Box
            component="img"
            src={project.imageUrl}
            alt={project.title}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              transition: 'transform 0.4s cubic-bezier(0.2, 0, 0.2, 1)',
              '&:hover': {
                transform: 'scale(1.06)',
              },
            }}
          />
          {/* Subtle Mask Gradient */}
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom, rgba(24, 23, 21, 0.15) 0%, rgba(24, 23, 21, 0.85) 100%)',
              pointerEvents: 'none',
            }}
          />

          {/* Floating Category Badge */}
          <Box
            sx={{
              position: 'absolute',
              top: 12,
              left: 12,
              zIndex: 2,
            }}
          >
            <Chip
              label={project.badge}
              size="small"
              sx={{
                bgcolor: project.badgeColor,
                color: '#ffffff',
                fontWeight: 600,
                fontSize: '0.6875rem',
                letterSpacing: '0.05em',
                borderRadius: '9999px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
              }}
            />
          </Box>
        </Box>

        {/* Content Body - Perfectly Symmetrical Flexbox */}
        <Box
          sx={{
            p: { xs: 2.25, sm: 2.75 },
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
          }}
        >
          {/* Title with uniform 2-line clamp */}
          <Typography
            variant="h4"
            className="font-serif-display"
            onClick={() => onOpenModal(project)}
            sx={{
              fontSize: '1.1875rem',
              fontWeight: 500,
              color: 'var(--color-on-dark)',
              letterSpacing: '-0.015em',
              mb: 1.25,
              lineHeight: 1.25,
              cursor: 'pointer',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              minHeight: '2.5rem',
              transition: 'color 0.2s ease',
              '&:hover': {
                color: 'var(--color-primary)',
              },
            }}
          >
            {project.title}
          </Typography>

          {/* Short Description with uniform 3-line clamp */}
          <Typography
            variant="body2"
            sx={{
              color: 'var(--color-on-dark-soft)',
              fontSize: '0.8125rem',
              lineHeight: 1.55,
              mb: 2,
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              minHeight: '3.8rem',
            }}
          >
            {project.description}
          </Typography>

          {/* Tech Stack Chips */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.6, mb: 2.5, minHeight: '1.75rem' }}>
            {project.techStack.slice(0, 4).map((tech) => (
              <Chip
                key={tech}
                label={tech}
                size="small"
                sx={{
                  bgcolor: 'rgba(250, 249, 245, 0.08)',
                  color: 'var(--color-on-dark)',
                  fontSize: '0.6875rem',
                  borderRadius: '5px',
                  height: '22px',
                  border: '1px solid rgba(250, 249, 245, 0.12)',
                }}
              />
            ))}
            {project.techStack.length > 4 && (
              <Chip
                label={`+${project.techStack.length - 4}`}
                size="small"
                sx={{
                  bgcolor: 'rgba(250, 249, 245, 0.04)',
                  color: 'var(--color-on-dark-soft)',
                  fontSize: '0.6875rem',
                  borderRadius: '5px',
                  height: '22px',
                }}
              />
            )}
          </Box>

          {/* Bottom Action CTAs - Left Aligned */}
          <Box
            sx={{
              mt: 'auto',
              pt: 1.75,
              borderTop: '1px solid rgba(250, 249, 245, 0.08)',
              display: 'flex',
              gap: 1,
              alignItems: 'center',
            }}
          >
            <Button
              component="a"
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="contained"
              size="small"
              disableElevation
              endIcon={<ExternalLink size={12} />}
              sx={{
                bgcolor: 'var(--color-primary)',
                color: 'var(--color-on-primary)',
                textTransform: 'none',
                fontSize: '0.75rem',
                fontWeight: 500,
                borderRadius: '6px',
                px: 1.5,
                py: 0.5,
                minWidth: 'auto',
                boxShadow: 'none',
                '&:hover': {
                  bgcolor: 'var(--color-primary-active)',
                },
              }}
            >
              Demo
            </Button>

            {project.githubUrl && (
              <Button
                component="a"
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="outlined"
                size="small"
                aria-label="GitHub Source Code"
                sx={{
                  color: 'var(--color-on-dark)',
                  borderColor: 'rgba(250, 249, 245, 0.2)',
                  bgcolor: 'rgba(250, 249, 245, 0.04)',
                  minWidth: '32px',
                  width: '32px',
                  height: '28px',
                  p: 0,
                  borderRadius: '6px',
                  '&:hover': {
                    bgcolor: 'rgba(250, 249, 245, 0.12)',
                    borderColor: 'rgba(250, 249, 245, 0.4)',
                  },
                }}
              >
                <FaGithub size={13} />
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </motion.div>
  )
}
