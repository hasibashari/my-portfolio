'use client'

import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  IconButton,
  Chip,
  Button,
  Tooltip,
} from '@mui/material'
import { X, ExternalLink, Share2, Check } from 'lucide-react'
import { FaGithub } from 'react-icons/fa'
import { ProjectItem } from '@/shared/types/projects'

interface ProjectModalProps {
  project: ProjectItem | null
  open: boolean
  onClose: () => void
}

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&h=800&q=80'

export default function ProjectModal({ project, open, onClose }: ProjectModalProps) {
  const [copiedLink, setCopiedLink] = useState(false)
  const [imgSrc, setImgSrc] = useState<string>(project?.imageUrl || '')

  React.useEffect(() => {
    if (project?.imageUrl) {
      setImgSrc(project.imageUrl)
    }
  }, [project])

  if (!project) return null

  const handleCopyLink = async () => {
    try {
      const url =
        typeof window !== 'undefined'
          ? `${window.location.origin}/projects?project=${project.slug || project.id}`
          : ''
      if (url) {
        await navigator.clipboard.writeText(url)
        setCopiedLink(true)
        setTimeout(() => setCopiedLink(false), 2000)
      }
    } catch {
      // Fallback
    }
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      scroll="paper"
      slotProps={{
        paper: {
          sx: {
            bgcolor: 'var(--color-surface-dark)',
            color: 'var(--color-on-dark)',
            borderRadius: { xs: '16px', sm: '20px' },
            border: '1px solid rgba(230, 223, 216, 0.18)',
            boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.65)',
            overflow: 'hidden',
            maxHeight: { xs: '92vh', sm: '88vh' },
            display: 'flex',
            flexDirection: 'column',
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
      {/* Header with image banner, close button, and share link */}
      <Box
        sx={{
          position: 'relative',
          height: { xs: 170, sm: 230 },
          width: '100%',
          flexShrink: 0,
          overflow: 'hidden',
          bgcolor: 'var(--color-surface-dark-soft)',
        }}
      >
        <Box
          component="img"
          src={imgSrc || FALLBACK_IMAGE}
          onError={() => setImgSrc(FALLBACK_IMAGE)}
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

        {/* Top Action Buttons (Share & Close) */}
        <Box sx={{ position: 'absolute', top: 14, right: 14, zIndex: 10, display: 'flex', gap: 1 }}>
          <Tooltip title={copiedLink ? 'Link copied!' : 'Share Project Link'}>
            <IconButton
              onClick={handleCopyLink}
              aria-label="Share project link"
              sx={{
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
              {copiedLink ? <Check size={18} color="#4ade80" /> : <Share2 size={18} />}
            </IconButton>
          </Tooltip>

          <IconButton
            onClick={onClose}
            aria-label="Close dialog"
            sx={{
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
        </Box>

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

      {/* Main Scrollable Content Area */}
      <DialogContent
        sx={{
          p: { xs: 2.5, sm: 4 },
          color: 'var(--color-on-dark)',
          overflowY: 'auto',
          flexGrow: 1,
          '&::-webkit-scrollbar': {
            width: '6px',
          },
          '&::-webkit-scrollbar-track': {
            bgcolor: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            bgcolor: 'rgba(250, 249, 245, 0.2)',
            borderRadius: '4px',
            '&:hover': {
              bgcolor: 'rgba(250, 249, 245, 0.35)',
            },
          },
        }}
      >
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

        {/* Short Summary Description */}
        <Typography
          variant="body1"
          sx={{
            color: 'var(--color-on-dark-soft)',
            fontSize: { xs: '0.95rem', sm: '1.025rem' },
            lineHeight: 1.7,
            mb: 3,
          }}
        >
          {project.description}
        </Typography>

        {/* Tech Stack Breakdown */}
        <Box sx={{ mb: 1, pt: 1 }}>
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
      </DialogContent>

      {/* Sticky Bottom Actions Footer */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          flexWrap: 'wrap',
          gap: 1.5,
          p: { xs: 2, sm: 2.5 },
          px: { xs: 2.5, sm: 4 },
          bgcolor: 'var(--color-surface-dark)',
          borderTop: '1px solid rgba(250, 249, 245, 0.1)',
          flexShrink: 0,
        }}
      >
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
    </Dialog>
  )
}
