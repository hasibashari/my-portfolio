'use client'

import { useState } from 'react'
import { Box, Typography, Button, Snackbar, Alert } from '@mui/material'
import { Link2, Check } from 'lucide-react'
import { FaLinkedin, FaXTwitter } from 'react-icons/fa6'
import { BlogPost } from '../../../shared/constants/blog'

interface ArticleShareProps {
  post: BlogPost
}

export default function ArticleShare({ post }: ArticleShareProps) {
  const [copied, setCopied] = useState(false)

  const handleCopyLink = async () => {
    try {
      if (typeof window !== 'undefined') {
        await navigator.clipboard.writeText(window.location.href)
        setCopied(true)
      }
    } catch {
      // Fallback
    }
  }

  const handleShareTwitter = () => {
    if (typeof window !== 'undefined') {
      const shareUrl = encodeURIComponent(window.location.href)
      const shareText = encodeURIComponent(`Read "${post.title}" by Hasib Ashari`)
      window.open(`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`, '_blank', 'noopener,noreferrer')
    }
  }

  const handleShareLinkedIn = () => {
    if (typeof window !== 'undefined') {
      const shareUrl = encodeURIComponent(window.location.href)
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <Box
      sx={{
        py: 4,
        my: 5,
        borderTop: '1px solid var(--color-hairline)',
        borderBottom: '1px solid var(--color-hairline)',
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: { xs: 'flex-start', sm: 'center' },
        justifyContent: 'space-between',
        gap: 2.5,
      }}
    >
      <Box>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'var(--color-ink)', mb: 0.5 }}>
          Share this insight
        </Typography>
        <Typography variant="body2" sx={{ color: 'var(--color-muted)' }}>
          Did you find this article helpful? Spread the word.
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
        {/* Copy Link Button */}
        <Button
          variant="outlined"
          size="small"
          onClick={handleCopyLink}
          startIcon={copied ? <Check size={14} color="#4ade80" /> : <Link2 size={14} />}
          sx={{
            textTransform: 'none',
            color: 'var(--color-ink)',
            borderColor: 'var(--color-hairline)',
            borderRadius: '6px',
            bgcolor: 'var(--color-canvas)',
            fontWeight: 500,
            '&:hover': {
              borderColor: 'var(--color-primary)',
              bgcolor: 'var(--color-surface-card)',
            },
          }}
        >
          {copied ? 'Link Copied' : 'Copy Link'}
        </Button>

        {/* X (Twitter) */}
        <Button
          onClick={handleShareTwitter}
          variant="outlined"
          size="small"
          startIcon={<FaXTwitter size={13} />}
          sx={{
            textTransform: 'none',
            color: 'var(--color-ink)',
            borderColor: 'var(--color-hairline)',
            borderRadius: '6px',
            bgcolor: 'var(--color-canvas)',
            fontWeight: 500,
            '&:hover': {
              borderColor: 'var(--color-ink)',
              bgcolor: 'var(--color-surface-card)',
            },
          }}
        >
          X / Twitter
        </Button>

        {/* LinkedIn */}
        <Button
          onClick={handleShareLinkedIn}
          variant="outlined"
          size="small"
          startIcon={<FaLinkedin size={14} />}
          sx={{
            textTransform: 'none',
            color: 'var(--color-ink)',
            borderColor: 'var(--color-hairline)',
            borderRadius: '6px',
            bgcolor: 'var(--color-canvas)',
            fontWeight: 500,
            '&:hover': {
              borderColor: '#0a66c2',
              color: '#0a66c2',
              bgcolor: 'var(--color-surface-card)',
            },
          }}
        >
          LinkedIn
        </Button>
      </Box>

      <Snackbar
        open={copied}
        autoHideDuration={2500}
        onClose={() => setCopied(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" sx={{ width: '100%', bgcolor: 'var(--color-ink)', color: '#ffffff' }}>
          Article link copied to clipboard!
        </Alert>
      </Snackbar>
    </Box>
  )
}
