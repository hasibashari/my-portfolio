'use client'

import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  IconButton,
  Chip,
  Button,
} from '@mui/material'
import { X, ExternalLink } from 'lucide-react'
import { FaGithub } from 'react-icons/fa'
import { ProjectItem } from '../../../shared/constants/projects'

interface ProjectModalProps {
  project: ProjectItem | null
  open: boolean
  onClose: () => void
}

export default function ProjectModal({ project, open, onClose }: ProjectModalProps) {
  if (!project) return null

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      scroll="body"
      slotProps={{
        paper: {
          sx: {
            bgcolor: 'var(--color-surface-dark)',
            color: 'var(--color-on-dark)',
            borderRadius: '20px',
            border: '1px solid rgba(230, 223, 216, 0.18)',
            boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.65)',
            overflow: 'hidden',
            m: { xs: 2, sm: 3 },
          },
        },
        backdrop: {
          sx: {
            bgcolor: 'rgba(20, 20, 19, 0.8)',
            backdropFilter: 'blur(8px)',
          },
        },
      }}
    >
      {/* Header with image banner & close button */}
      <Box
        sx={{
          position: 'relative',
          height: { xs: 180, sm: 240 },
          width: '100%',
          overflow: 'hidden',
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
          }}
        />
        {/* Gradient Overlay */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(24, 23, 21, 0.3) 0%, rgba(24, 23, 21, 0.95) 100%)',
          }}
        />

        {/* Close Button */}
        <IconButton
          onClick={onClose}
          aria-label="Close dialog"
          sx={{
            position: 'absolute',
            top: 14,
            right: 14,
            bgcolor: 'rgba(24, 23, 21, 0.6)',
            color: 'var(--color-on-dark)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(250, 249, 245, 0.15)',
            '&:hover': {
              bgcolor: 'rgba(24, 23, 21, 0.9)',
              color: 'var(--color-primary)',
            },
          }}
        >
          <X size={18} />
        </IconButton>

        {/* Floating Badge */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 16,
            left: { xs: 16, sm: 24 },
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
              fontSize: '0.75rem',
              letterSpacing: '0.05em',
              borderRadius: '9999px',
            }}
          />
        </Box>
      </Box>

      {/* Main Content Area */}
      <DialogContent sx={{ p: { xs: 2.5, sm: 4 }, color: 'var(--color-on-dark)' }}>
        {/* Title */}
        <Typography
          variant="h3"
          className="font-serif-display"
          sx={{
            fontSize: { xs: '1.5rem', sm: '2rem' },
            fontWeight: 500,
            color: 'var(--color-on-dark)',
            letterSpacing: '-0.02em',
            mb: 2,
          }}
        >
          {project.title}
        </Typography>

        {/* Deep Description / Architecture Overview */}
        <Box sx={{ mb: 3.5 }}>
          <Typography
            variant="body1"
            sx={{
              color: 'var(--color-on-dark-soft)',
              fontSize: { xs: '0.9375rem', sm: '1rem' },
              lineHeight: 1.7,
              mb: 1.5,
            }}
          >
            {project.longDescription || project.description}
          </Typography>
        </Box>

        {/* Tech Stack Breakdown */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="caption"
            sx={{
              color: 'var(--color-primary)',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              display: 'block',
              mb: 1.5,
            }}
          >
            Technologies & Frameworks
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {project.techStack.map((tech) => (
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
        </Box>

        {/* Footer Actions */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 2,
            pt: 3,
            borderTop: '1px solid rgba(250, 249, 245, 0.1)',
          }}
        >
          <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
            <Button
              component="a"
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="contained"
              disableElevation
              endIcon={<ExternalLink size={15} />}
              sx={{
                bgcolor: 'var(--color-primary)',
                color: 'var(--color-on-primary)',
                textTransform: 'none',
                fontSize: '0.875rem',
                fontWeight: 500,
                borderRadius: '8px',
                px: 2.5,
                py: 0.9,
                '&:hover': {
                  bgcolor: 'var(--color-primary-active)',
                },
              }}
            >
              Launch Live Demo
            </Button>

            {project.githubUrl && (
              <Button
                component="a"
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="outlined"
                startIcon={<FaGithub size={15} />}
                sx={{
                  color: 'var(--color-on-dark)',
                  borderColor: 'rgba(250, 249, 245, 0.25)',
                  bgcolor: 'rgba(250, 249, 245, 0.04)',
                  textTransform: 'none',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  borderRadius: '8px',
                  px: 2.5,
                  py: 0.9,
                  '&:hover': {
                    bgcolor: 'rgba(250, 249, 245, 0.1)',
                    borderColor: 'rgba(250, 249, 245, 0.4)',
                  },
                }}
              >
                View Repository
              </Button>
            )}
          </Box>

          <Button
            onClick={onClose}
            variant="text"
            sx={{
              color: 'var(--color-on-dark-soft)',
              textTransform: 'none',
              fontSize: '0.875rem',
              '&:hover': { color: 'var(--color-on-dark)', bgcolor: 'transparent' },
            }}
          >
            Close
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  )
}
