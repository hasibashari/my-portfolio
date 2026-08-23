'use client'

import { useState } from 'react'
import NextLink from 'next/link'
import {
  Box,
  Container,
  Typography,
  Button,
  Snackbar,
  Alert,
} from '@mui/material'
import { Plus } from 'lucide-react'
import AdminNav from '../components/AdminNav'
import ArticleTable from '../components/ArticleTable'
import { BlogPost } from '../../../shared/constants/blog'

interface AdminArticlesViewProps {
  initialArticles: BlogPost[]
}

export default function AdminArticlesView({ initialArticles }: AdminArticlesViewProps) {
  const [articles, setArticles] = useState<BlogPost[]>(initialArticles)
  const [notification, setNotification] = useState<{ message: string; severity: 'success' | 'error' } | null>(null)

  const handleDeleteArticle = async (id: number) => {
    try {
      const res = await fetch(`/api/admin/articles/${id}`, {
        method: 'DELETE',
      })
      const data = await res.json()

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to delete article')
      }

      setArticles((prev) => prev.filter((a) => a.id !== id))
      setNotification({ message: 'Article deleted successfully.', severity: 'success' })
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to delete article.'
      setNotification({ message, severity: 'error' })
    }
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'var(--color-canvas)', pb: 10 }}>
      <AdminNav />

      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 }, pt: { xs: 4, md: 6 } }}>
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 2,
            mb: 4,
          }}
        >
          <Box>
            <Typography
              variant="h4"
              className="font-serif-display"
              sx={{ color: 'var(--color-ink)', fontWeight: 700, mb: 0.5 }}
            >
              Engineering Articles Management
            </Typography>
            <Typography variant="body2" sx={{ color: 'var(--color-muted)' }}>
              Manage technical essays, performance guides, and architecture insights.
            </Typography>
          </Box>

          <NextLink href="/admin/articles/new" style={{ textDecoration: 'none' }}>
            <Button
              variant="contained"
              startIcon={<Plus size={18} />}
              sx={{
                bgcolor: 'var(--color-primary)',
                color: 'var(--color-on-primary)',
                borderRadius: '8px',
                textTransform: 'none',
                fontWeight: 600,
                px: 2.5,
                py: 1,
                '&:hover': { bgcolor: 'var(--color-primary-active)' },
              }}
            >
              Add Article
            </Button>
          </NextLink>
        </Box>

        {/* Article Table */}
        <ArticleTable articles={articles} onDelete={handleDeleteArticle} />

        {/* Feedback Snackbar */}
        <Snackbar
          open={Boolean(notification)}
          autoHideDuration={4000}
          onClose={() => setNotification(null)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          {notification ? (
            <Alert
              onClose={() => setNotification(null)}
              severity={notification.severity}
              sx={{ width: '100%', borderRadius: '8px' }}
            >
              {notification.message}
            </Alert>
          ) : undefined}
        </Snackbar>
      </Container>
    </Box>
  )
}
