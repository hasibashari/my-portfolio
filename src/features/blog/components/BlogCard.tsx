'use client'

import { Box, Card, CardContent, Chip, Typography } from '@mui/material'
import { ArrowRight, Clock, Calendar } from 'lucide-react'
import Link from 'next/link'
import { BlogPost } from '../../../shared/constants/blog'

interface BlogCardProps {
  post: BlogPost
  featured?: boolean
}

export default function BlogCard({ post, featured = false }: BlogCardProps) {
  return (
    <Card
      component={Link}
      href={`/blog/${post.slug}`}
      elevation={0}
      sx={{
        textDecoration: 'none',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        bgcolor: 'var(--color-canvas)',
        borderRadius: '12px',
        border: '1px solid var(--color-hairline)',
        p: { xs: 2.5, sm: 3.5, md: featured ? 4 : 3.5 },
        transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        '&:hover': {
          borderColor: 'var(--color-primary)',
          transform: 'translateY(-4px)',
          boxShadow: '0 12px 32px -8px rgba(20, 20, 19, 0.09)',
          '& .read-more-btn': {
            color: 'var(--color-primary-active)',
            transform: 'translateX(4px)',
          },
        },
      }}
    >
      <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
        {/* Meta Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap', mb: 2.5 }}>
          <Chip
            label={post.category}
            size="small"
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

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, color: 'var(--color-muted)', fontSize: '0.8125rem' }}>
            <Calendar size={13} />
            <Typography variant="caption" sx={{ color: 'inherit', fontWeight: 500 }}>
              {post.date}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, color: 'var(--color-muted)', fontSize: '0.8125rem' }}>
            <Clock size={13} />
            <Typography variant="caption" sx={{ color: 'inherit', fontWeight: 500 }}>
              {post.readingTime}
            </Typography>
          </Box>
        </Box>

        {/* Title */}
        <Typography
          variant="h3"
          className="font-serif-display"
          sx={{
            fontSize: { xs: '1.375rem', sm: featured ? '1.875rem' : '1.5rem' },
            fontWeight: 500,
            color: 'var(--color-ink)',
            lineHeight: 1.22,
            letterSpacing: '-0.02em',
            mb: 2,
          }}
        >
          {post.title}
        </Typography>

        {/* Excerpt */}
        <Typography
          variant="body1"
          sx={{
            fontSize: '0.9375rem',
            color: 'var(--color-body)',
            lineHeight: 1.6,
            mb: 3,
          }}
        >
          {post.description}
        </Typography>

        {/* Tags */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mb: 3 }}>
          {post.tags.map((tag) => (
            <Typography
              key={tag}
              variant="caption"
              sx={{
                px: 1,
                py: 0.25,
                borderRadius: '4px',
                bgcolor: 'var(--color-surface-soft)',
                color: 'var(--color-muted)',
                fontSize: '0.75rem',
                fontWeight: 500,
                border: '1px solid var(--color-hairline)',
              }}
            >
              #{tag}
            </Typography>
          ))}
        </Box>
      </CardContent>

      {/* Footer */}
      <Box
        sx={{
          pt: 2.5,
          borderTop: '1px solid var(--color-hairline)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="caption" sx={{ color: 'var(--color-muted)', fontWeight: 500 }}>
          By {post.author.name}
        </Typography>

        <Box
          className="read-more-btn"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.75,
            color: 'var(--color-primary)',
            fontSize: '0.875rem',
            fontWeight: 600,
            transition: 'all 0.2s ease-in-out',
          }}
        >
          Read article <ArrowRight size={15} />
        </Box>
      </Box>
    </Card>
  )
}
