'use client'

import { Box, Container, Typography, Card, CardContent, Chip, Button } from '@mui/material'
import { ArrowRight } from 'lucide-react'
import { cn } from '../../../shared/utils/cn'
import { blog } from '../../../shared/constants/blog'

export default function Blog() {
  const featuredPost = blog[0]
  const recentPosts = blog.slice(1)

  return (
    <Box id="blog" className={cn('bg-[#faf9f5] py-24 border-t border-[#e6dfd8]')} sx={{ bgcolor: '#faf9f5', py: { xs: 10, md: 14 }, borderTop: '1px solid #e6dfd8' }}>
      <Container maxWidth="xl" sx={{ px: { xs: 3, sm: 4, lg: 6 } }}>
        {/* Centered Section Header */}
        <Box sx={{ maxWidth: '720px', mb: 8, mx: 'auto', textAlign: 'center' }}>
          <Typography
            variant="overline"
            className="font-serif-display"
            sx={{ color: '#cc785c', fontWeight: 600, fontSize: '0.875rem', letterSpacing: '0.1em', display: 'block', mb: 1.5 }}
          >
            ARTICLES & JOURNAL
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
            Engineering Insights & Thoughts.
          </Typography>
          <Typography variant="body1" sx={{ fontSize: '1.125rem', color: '#3d3d3a', lineHeight: 1.6 }}>
            Technical articles, tutorials, and reflections on building high-quality web software.
          </Typography>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' }, gap: 6 }}>
          {/* Featured Post Card */}
          <Card
            elevation={0}
            sx={{
              bgcolor: '#efe9de',
              borderRadius: '12px',
              border: '1px solid #e6dfd8',
              p: { xs: 4, sm: 5 },
              display: 'flex',
              flexDirection: 'column',
              justify: 'space-between',
            }}
          >
            <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Chip
                  label={featuredPost.category}
                  sx={{
                    bgcolor: '#cc785c',
                    color: '#ffffff',
                    fontWeight: 600,
                    fontSize: '0.75rem',
                    letterSpacing: '0.05em',
                    borderRadius: '9999px',
                    px: 1,
                  }}
                />
                <Typography variant="caption" sx={{ color: '#6c6a64', fontWeight: 500 }}>
                  {featuredPost.date}
                </Typography>
              </Box>

              <Typography
                variant="h2"
                className="font-serif-display"
                sx={{
                  fontSize: { xs: '2.25rem', sm: '2.75rem', md: '3.25rem' },
                  fontWeight: 500,
                  color: '#141413',
                  lineHeight: 1.12,
                  letterSpacing: '-0.025em',
                  mb: 2.5,
                }}
              >
                {featuredPost.title}
              </Typography>

              <Typography variant="body1" sx={{ fontSize: '1.0625rem', color: '#3d3d3a', lineHeight: 1.6, mb: 4 }}>
                {featuredPost.description}
              </Typography>
            </CardContent>

            <Box sx={{ pt: 3, borderTop: '1px solid #e6dfd8', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="caption" sx={{ color: '#6c6a64', fontWeight: 500 }}>
                By Hasib Ashari
              </Typography>

              <Button
                component="a"
                href="#"
                variant="text"
                endIcon={<ArrowRight size={16} />}
                sx={{ color: '#cc785c', fontWeight: 600, textTransform: 'none', '&:hover': { bgcolor: 'transparent', color: '#a9583e' } }}
              >
                Read article
              </Button>
            </Box>
          </Card>

          {/* Secondary Posts Column */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3.5 }}>
            {recentPosts.map((post) => (
              <Card
                key={post.id}
                elevation={0}
                sx={{
                  bgcolor: '#faf9f5',
                  borderRadius: '12px',
                  border: '1px solid #e6dfd8',
                  p: { xs: 3.5, sm: 4 },
                  transition: 'all 0.2s',
                  '&:hover': { borderColor: '#cc785c' },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Chip
                    label={post.category}
                    sx={{
                      bgcolor: '#efe9de',
                      color: '#141413',
                      fontWeight: 600,
                      fontSize: '0.75rem',
                      borderRadius: '9999px',
                      border: '1px solid #e6dfd8',
                    }}
                  />
                  <Typography variant="caption" sx={{ color: '#6c6a64' }}>
                    {post.date}
                  </Typography>
                </Box>

                <Typography
                  variant="h5"
                  className="font-serif-display"
                  sx={{
                    fontSize: '1.375rem',
                    fontWeight: 500,
                    color: '#141413',
                    lineHeight: 1.25,
                    letterSpacing: '-0.015em',
                    mb: 1.5,
                  }}
                >
                  {post.title}
                </Typography>

                <Typography variant="body2" sx={{ fontSize: '0.9375rem', color: '#3d3d3a', lineHeight: 1.6, mb: 3 }}>
                  {post.description}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography variant="caption" sx={{ color: '#6c6a64', fontWeight: 500 }}>
                    By Hasib Ashari
                  </Typography>
                  <Button
                    component="a"
                    href="#"
                    variant="text"
                    size="small"
                    endIcon={<ArrowRight size={14} />}
                    sx={{ color: '#cc785c', fontWeight: 600, textTransform: 'none', p: 0, '&:hover': { bgcolor: 'transparent', color: '#a9583e' } }}
                  >
                    Read article
                  </Button>
                </Box>
              </Card>
            ))}
          </Box>
        </Box>

        {/* Centered Read More / View All Articles Button */}
        <Box sx={{ mt: 8, textAlign: 'center' }}>
          <Button
            component="a"
            href="/blog"
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
            Read More Articles
          </Button>
        </Box>
      </Container>
    </Box>
  )
}
