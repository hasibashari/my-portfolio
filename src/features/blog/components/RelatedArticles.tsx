'use client'

import { Box, Typography } from '@mui/material'
import { BlogPost } from '../../../shared/constants/blog'
import BlogCard from './BlogCard'

interface RelatedArticlesProps {
  relatedPosts: BlogPost[]
}

export default function RelatedArticles({ relatedPosts }: RelatedArticlesProps) {
  if (!relatedPosts || relatedPosts.length === 0) return null

  return (
    <Box sx={{ mt: 8, pt: 6, borderTop: '1px solid var(--color-hairline)' }}>
      <Typography
        variant="overline"
        className="font-serif-display"
        sx={{
          color: 'var(--color-primary)',
          fontWeight: 600,
          fontSize: '0.8125rem',
          letterSpacing: '0.1em',
          display: 'block',
          mb: 1,
        }}
      >
        CONTINUE READING
      </Typography>

      <Typography
        variant="h3"
        className="font-serif-display"
        sx={{
          fontSize: { xs: '1.75rem', sm: '2.125rem' },
          fontWeight: 500,
          color: 'var(--color-ink)',
          lineHeight: 1.2,
          mb: 4,
        }}
      >
        Related Articles & Notes
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          gap: { xs: 3, md: 4 },
        }}
      >
        {relatedPosts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </Box>
    </Box>
  )
}
