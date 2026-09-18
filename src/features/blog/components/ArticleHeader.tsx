'use client'

import { Box, Chip, Typography } from '@mui/material'
import { Calendar, Clock } from 'lucide-react'
import BackLink from '@/shared/components/BackLink'
import { BlogPost } from '@/shared/types/blog'

interface ArticleHeaderProps {
  post: BlogPost
}

export default function ArticleHeader({ post }: ArticleHeaderProps) {
  return (
    <Box sx={{ mb: { xs: 5, md: 7 } }}>
      {/* Back Button */}
      <BackLink
        href="/blog"
        label="Back to Articles"
        variant="button"
        withReveal={false}
        sx={{ mb: { xs: 3, md: 4 } }}
      />

      {/* Meta Chips */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap', mb: 2.5 }}>
        <Chip
          label={post.category}
          sx={{
            bgcolor: post.isCoralBadge ? 'var(--color-primary)' : 'var(--color-surface-card)',
            color: post.isCoralBadge ? 'var(--color-on-primary)' : 'var(--color-ink)',
            fontWeight: 600,
            fontSize: '0.75rem',
            letterSpacing: '0.04em',
            borderRadius: '9999px',
            border: post.isCoralBadge ? 'none' : '1px solid var(--color-hairline)',
          }}
        />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, color: 'var(--color-muted)', fontSize: '0.875rem' }}>
          <Calendar size={14} />
          <Typography variant="caption" sx={{ color: 'inherit', fontWeight: 500 }}>
            {post.date}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, color: 'var(--color-muted)', fontSize: '0.875rem' }}>
          <Clock size={14} />
          <Typography variant="caption" sx={{ color: 'inherit', fontWeight: 500 }}>
            {post.readingTime}
          </Typography>
        </Box>
      </Box>

      {/* Headline Title */}
      <Typography
        variant="h1"
        className="font-serif-display"
        sx={{
          fontSize: { xs: '2.25rem', sm: '3rem', md: '3.5rem' },
          fontWeight: 400,
          lineHeight: 1.12,
          letterSpacing: '-0.03em',
          color: 'var(--color-ink)',
          mb: 3,
        }}
      >
        {post.title}
      </Typography>

      {/* Lead Excerpt */}
      <Typography
        variant="body1"
        sx={{
          fontSize: { xs: '1.125rem', sm: '1.25rem' },
          color: 'var(--color-body)',
          lineHeight: 1.6,
          mb: 4,
          fontStyle: 'italic',
        }}
      >
        {post.description}
      </Typography>

      {/* Author Bio Banner */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          py: 2.5,
          borderTop: '1px solid var(--color-hairline)',
          borderBottom: '1px solid var(--color-hairline)',
        }}
      >
        <Box
          sx={{
            width: 44,
            height: 44,
            borderRadius: '50%',
            bgcolor: 'var(--color-primary)',
            color: 'var(--color-on-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
            fontSize: '1rem',
            fontFamily: 'var(--font-serif)',
          }}
        >
          HA
        </Box>
        <Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'var(--color-ink)', lineHeight: 1.2 }}>
            {post.author.name}
          </Typography>
          <Typography variant="caption" sx={{ color: 'var(--color-muted)', fontWeight: 500 }}>
            {post.author.role} • Technical Writer
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}
