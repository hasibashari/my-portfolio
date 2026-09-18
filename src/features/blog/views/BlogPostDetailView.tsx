'use client'

import { Box, Container } from '@mui/material'
import { BlogPost } from '@/shared/types/blog'
import ArticleHeader from '../components/ArticleHeader'
import ArticleContent from '../components/ArticleContent'
import ArticleShare from '../components/ArticleShare'
import RelatedArticles from '../components/RelatedArticles'

interface BlogPostDetailViewProps {
  post: BlogPost
  relatedPosts: BlogPost[]
}

export default function BlogPostDetailView({ post, relatedPosts }: BlogPostDetailViewProps) {
  return (
    <Box
      component="article"
      sx={{
        bgcolor: 'var(--color-canvas)',
        minHeight: '85vh',
        pt: { xs: 4, sm: 6, md: 8 },
        pb: { xs: 10, md: 14 },
      }}
    >
      <Container maxWidth="md" sx={{ px: { xs: 2.5, sm: 3, md: 4 } }}>
        {/* Article Editorial Header */}
        <ArticleHeader post={post} />

        {/* Long-form Article Body */}
        <ArticleContent content={post.content} />

        {/* Social Share & Copy Link */}
        <ArticleShare post={post} />

        {/* Recommended Reads */}
        <RelatedArticles relatedPosts={relatedPosts} />
      </Container>
    </Box>
  )
}
