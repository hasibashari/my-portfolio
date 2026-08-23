'use client'

import NextLink from 'next/link'
import { Box, Container, Typography, Button, Paper } from '@mui/material'
import { FolderGit2, BookOpen, Plus, ArrowRight, Database, Server } from 'lucide-react'
import AdminNav from '../components/AdminNav'
import { ProjectItem } from '../../../shared/constants/projects'
import { BlogPost } from '../../../shared/constants/blog'

interface AdminDashboardViewProps {
  projects: ProjectItem[]
  articles: BlogPost[]
}

export default function AdminDashboardView({ projects, articles }: AdminDashboardViewProps) {
  const featuredCount = projects.filter((p) => p.featured).length

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'var(--color-canvas)', pb: 10 }}>
      <AdminNav />

      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 }, pt: { xs: 4, md: 6 } }}>
        {/* Header Banner */}
        <Box sx={{ mb: 5 }}>
          <Typography
            variant="h4"
            className="font-serif-display"
            sx={{ color: 'var(--color-ink)', fontWeight: 700, mb: 1 }}
          >
            Portfolio Administration
          </Typography>
          <Typography variant="body1" sx={{ color: 'var(--color-muted)', maxWidth: 600 }}>
            Manage your engineering project showcases and technical journal articles directly backed by PostgreSQL.
          </Typography>
        </Box>

        {/* Metrics Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
            gap: 2.5,
            mb: 5,
          }}
        >
          <Paper
            elevation={0}
            sx={{
              p: 3,
              bgcolor: 'var(--color-surface-card)',
              border: '1px solid var(--color-hairline)',
              borderRadius: '16px',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" sx={{ color: 'var(--color-muted)', fontWeight: 500 }}>
                Total Projects
              </Typography>
              <FolderGit2 size={20} color="var(--color-primary)" />
            </Box>
            <Typography variant="h3" sx={{ color: 'var(--color-ink)', fontWeight: 700 }}>
              {projects.length}
            </Typography>
          </Paper>

          <Paper
            elevation={0}
            sx={{
              p: 3,
              bgcolor: 'var(--color-surface-card)',
              border: '1px solid var(--color-hairline)',
              borderRadius: '16px',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" sx={{ color: 'var(--color-muted)', fontWeight: 500 }}>
                Featured Projects
              </Typography>
              <Server size={20} color="#e8a55a" />
            </Box>
            <Typography variant="h3" sx={{ color: 'var(--color-ink)', fontWeight: 700 }}>
              {featuredCount}
            </Typography>
          </Paper>

          <Paper
            elevation={0}
            sx={{
              p: 3,
              bgcolor: 'var(--color-surface-card)',
              border: '1px solid var(--color-hairline)',
              borderRadius: '16px',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" sx={{ color: 'var(--color-muted)', fontWeight: 500 }}>
                Total Articles
              </Typography>
              <BookOpen size={20} color="#5db8a6" />
            </Box>
            <Typography variant="h3" sx={{ color: 'var(--color-ink)', fontWeight: 700 }}>
              {articles.length}
            </Typography>
          </Paper>

          <Paper
            elevation={0}
            sx={{
              p: 3,
              bgcolor: 'var(--color-surface-card)',
              border: '1px solid var(--color-hairline)',
              borderRadius: '16px',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" sx={{ color: 'var(--color-muted)', fontWeight: 500 }}>
                Database Driver
              </Typography>
              <Database size={20} color="var(--color-primary)" />
            </Box>
            <Typography variant="h5" sx={{ color: 'var(--color-ink)', fontWeight: 700, mt: 1 }}>
              PostgreSQL
            </Typography>
          </Paper>
        </Box>

        {/* Section Action Cards */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
          {/* Projects Management Card */}
          <Paper
            elevation={0}
            sx={{
              p: 4,
              bgcolor: 'var(--color-surface-card)',
              border: '1px solid var(--color-hairline)',
              borderRadius: '16px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                <FolderGit2 size={24} color="var(--color-primary)" />
                <Typography variant="h6" className="font-serif-display" sx={{ color: 'var(--color-ink)', fontWeight: 600 }}>
                  Projects Management
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: 'var(--color-muted)' }}>
                View all existing projects, add new system architectures, update code snippets, or modify tech stacks.
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
              <NextLink href="/admin/projects" style={{ textDecoration: 'none' }}>
                <Button
                  variant="outlined"
                  endIcon={<ArrowRight size={16} />}
                  sx={{
                    color: 'var(--color-ink)',
                    borderColor: 'var(--color-hairline)',
                    borderRadius: '8px',
                    textTransform: 'none',
                    fontWeight: 500,
                    '&:hover': { bgcolor: 'var(--color-surface-soft)', borderColor: 'var(--color-primary)' },
                  }}
                >
                  Manage Projects
                </Button>
              </NextLink>
              <NextLink href="/admin/projects/new" style={{ textDecoration: 'none' }}>
                <Button
                  variant="contained"
                  startIcon={<Plus size={16} />}
                  sx={{
                    bgcolor: 'var(--color-primary)',
                    color: 'var(--color-on-primary)',
                    borderRadius: '8px',
                    textTransform: 'none',
                    fontWeight: 600,
                    '&:hover': { bgcolor: 'var(--color-primary-active)' },
                  }}
                >
                  Add Project
                </Button>
              </NextLink>
            </Box>
          </Paper>

          {/* Articles Management Card */}
          <Paper
            elevation={0}
            sx={{
              p: 4,
              bgcolor: 'var(--color-surface-card)',
              border: '1px solid var(--color-hairline)',
              borderRadius: '16px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                <BookOpen size={24} color="var(--color-primary)" />
                <Typography variant="h6" className="font-serif-display" sx={{ color: 'var(--color-ink)', fontWeight: 600 }}>
                  Articles Management
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: 'var(--color-muted)' }}>
                Publish technical writeups, edit Markdown/JSON section structures, and update tags and reading times.
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
              <NextLink href="/admin/articles" style={{ textDecoration: 'none' }}>
                <Button
                  variant="outlined"
                  endIcon={<ArrowRight size={16} />}
                  sx={{
                    color: 'var(--color-ink)',
                    borderColor: 'var(--color-hairline)',
                    borderRadius: '8px',
                    textTransform: 'none',
                    fontWeight: 500,
                    '&:hover': { bgcolor: 'var(--color-surface-soft)', borderColor: 'var(--color-primary)' },
                  }}
                >
                  Manage Articles
                </Button>
              </NextLink>
              <NextLink href="/admin/articles/new" style={{ textDecoration: 'none' }}>
                <Button
                  variant="contained"
                  startIcon={<Plus size={16} />}
                  sx={{
                    bgcolor: 'var(--color-primary)',
                    color: 'var(--color-on-primary)',
                    borderRadius: '8px',
                    textTransform: 'none',
                    fontWeight: 600,
                    '&:hover': { bgcolor: 'var(--color-primary-active)' },
                  }}
                >
                  Add Article
                </Button>
              </NextLink>
            </Box>
          </Paper>
        </Box>
      </Container>
    </Box>
  )
}
