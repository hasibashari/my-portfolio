'use client'

import { Box, Container, Typography, Card, CardContent, Chip, Button } from '@mui/material'
import { ArrowRight } from 'lucide-react'
import ScrollReveal from '../../../shared/components/ScrollReveal'
import { blog } from '../../../shared/constants/blog'

export default function Blog() {
  const featuredPost = blog[0]
  const recentPosts = blog.slice(1)

  return (
    <Box
      id="blog"
      sx={{
        bgcolor: 'var(--color-canvas)',
        py: { xs: 8, sm: 10, md: 12 },
        borderTop: '1px solid var(--color-hairline)',
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
        {/* Centered Section Header with Blur-Reveal */}
        <ScrollReveal variant="blur-reveal">
          <Box sx={{ maxWidth: '720px', mb: { xs: 5, md: 7 }, mx: 'auto', textAlign: 'center' }}>
            <Typography
              variant="overline"
              className="font-serif-display"
              sx={{ color: 'var(--color-primary)', fontWeight: 600, fontSize: '0.875rem', letterSpacing: '0.1em', display: 'block', mb: 1.5 }}
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
                color: 'var(--color-ink)',
                mb: 2.5,
              }}
            >
              Engineering Insights & Thoughts.
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.125rem', color: 'var(--color-body)', lineHeight: 1.6 }}>
              Technical articles, tutorials, and reflections on building high-quality web software.
            </Typography>
          </Box>
        </ScrollReveal>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' }, gap: { xs: 3, lg: 5 } }}>
          {/* Featured Post Card - Slides from Left */}
          <ScrollReveal variant="slide-right" delay={0.1} style={{ height: '100%' }}>
            <Card
              elevation={0}
              sx={{
                bgcolor: 'var(--color-surface-card)',
                borderRadius: '12px',
                border: '1px solid var(--color-hairline)',
                p: { xs: 2.5, sm: 3.5, md: 4.5 },
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
                transition: 'all 0.25s ease-in-out',
                '&:hover': {
                  borderColor: 'var(--color-primary)',
                  transform: 'translateY(-4px)',
                  boxShadow: '0 12px 30px -8px rgba(20, 20, 19, 0.1)',
                },
              }}
            >
              <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                  <Chip
                    label={featuredPost.category}
                    sx={{
                      bgcolor: 'var(--color-primary)',
                      color: 'var(--color-on-primary)',
                      fontWeight: 600,
                      fontSize: '0.75rem',
                      letterSpacing: '0.05em',
                      borderRadius: '9999px',
                      px: 1,
                    }}
                  />
                  <Typography variant="caption" sx={{ color: 'var(--color-muted)', fontWeight: 500 }}>
                    {featuredPost.date}
                  </Typography>
                </Box>

                <Typography
                  variant="h2"
                  className="font-serif-display"
                  sx={{
                    fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.5rem' },
                    fontWeight: 500,
                    color: 'var(--color-ink)',
                    lineHeight: 1.15,
                    letterSpacing: '-0.025em',
                    mb: 2.5,
                  }}
                >
                  {featuredPost.title}
                </Typography>

                <Typography variant="body1" sx={{ fontSize: '1.0625rem', color: 'var(--color-body)', lineHeight: 1.6, mb: 4 }}>
                  {featuredPost.description}
                </Typography>
              </CardContent>

              <Box sx={{ pt: 3, borderTop: '1px solid var(--color-hairline)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="caption" sx={{ color: 'var(--color-muted)', fontWeight: 500 }}>
                  By Hasib Ashari
                </Typography>

                <Button
                  component="a"
                  href="#"
                  variant="text"
                  endIcon={<ArrowRight size={16} />}
                  sx={{ color: 'var(--color-primary)', fontWeight: 600, textTransform: 'none', '&:hover': { bgcolor: 'transparent', color: 'var(--color-primary-active)' } }}
                >
                  Read article
                </Button>
              </Box>
            </Card>
          </ScrollReveal>

          {/* Secondary Posts Column - Slides from Right with Stagger */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3.5 }}>
            {recentPosts.map((post, idx) => (
              <ScrollReveal key={post.id} variant="slide-left" delay={0.15 + idx * 0.12}>
                <Card
                  elevation={0}
                  sx={{
                    bgcolor: 'var(--color-canvas)',
                    borderRadius: '12px',
                    border: '1px solid var(--color-hairline)',
                    p: { xs: 2.5, sm: 3, md: 3.5 },
                    transition: 'all 0.25s ease-in-out',
                    '&:hover': {
                      borderColor: 'var(--color-primary)',
                      transform: 'translateY(-3px)',
                      boxShadow: '0 8px 24px -6px rgba(20, 20, 19, 0.08)',
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Chip
                      label={post.category}
                      sx={{
                        bgcolor: 'var(--color-surface-card)',
                        color: 'var(--color-ink)',
                        fontWeight: 600,
                        fontSize: '0.75rem',
                        borderRadius: '9999px',
                        border: '1px solid var(--color-hairline)',
                      }}
                    />
                    <Typography variant="caption" sx={{ color: 'var(--color-muted)' }}>
                      {post.date}
                    </Typography>
                  </Box>

                  <Typography
                    variant="h5"
                    className="font-serif-display"
                    sx={{
                      fontSize: '1.375rem',
                      fontWeight: 500,
                      color: 'var(--color-ink)',
                      lineHeight: 1.25,
                      letterSpacing: '-0.015em',
                      mb: 1.5,
                    }}
                  >
                    {post.title}
                  </Typography>

                  <Typography variant="body2" sx={{ fontSize: '0.9375rem', color: 'var(--color-body)', lineHeight: 1.6, mb: 3 }}>
                    {post.description}
                  </Typography>

                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="caption" sx={{ color: 'var(--color-muted)', fontWeight: 500 }}>
                      By Hasib Ashari
                    </Typography>
                    <Button
                      component="a"
                      href="#"
                      variant="text"
                      size="small"
                      endIcon={<ArrowRight size={14} />}
                      sx={{ color: 'var(--color-primary)', fontWeight: 600, textTransform: 'none', p: 0, '&:hover': { bgcolor: 'transparent', color: 'var(--color-primary-active)' } }}
                    >
                      Read article
                    </Button>
                  </Box>
                </Card>
              </ScrollReveal>
            ))}
          </Box>
        </Box>

        {/* Centered Read More / View All Articles Button */}
        <ScrollReveal variant="fade-up" delay={0.25}>
          <Box sx={{ mt: { xs: 5, md: 7 }, textAlign: 'center' }}>
            <Button
              component="a"
              href="/blog"
              variant="outlined"
              endIcon={<ArrowRight size={18} />}
              sx={{
                color: 'var(--color-ink)',
                borderColor: 'var(--color-hairline)',
                bgcolor: 'var(--color-canvas)',
                px: 4,
                py: 1.5,
                borderRadius: '8px',
                fontWeight: 500,
                fontSize: '0.9375rem',
                textTransform: 'none',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  bgcolor: 'var(--color-surface-card)',
                  borderColor: 'var(--color-primary)',
                  color: 'var(--color-primary)',
                  transform: 'translateY(-2px)',
                },
              }}
            >
              Read More Articles
            </Button>
          </Box>
        </ScrollReveal>
      </Container>
    </Box>
  )
}
