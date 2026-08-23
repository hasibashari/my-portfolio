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
import ProjectTable from '../components/ProjectTable'
import { ProjectItem } from '../../../shared/constants/projects'

interface AdminProjectsViewProps {
  initialProjects: ProjectItem[]
}

export default function AdminProjectsView({ initialProjects }: AdminProjectsViewProps) {
  const [projects, setProjects] = useState<ProjectItem[]>(initialProjects)
  const [notification, setNotification] = useState<{ message: string; severity: 'success' | 'error' } | null>(null)

  const handleDeleteProject = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/projects/${id}`, {
        method: 'DELETE',
      })
      const data = await res.json()

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to delete project')
      }

      setProjects((prev) => prev.filter((p) => p.id !== id))
      setNotification({ message: 'Project deleted successfully.', severity: 'success' })
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to delete project.'
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
              Project Archive Management
            </Typography>
            <Typography variant="body2" sx={{ color: 'var(--color-muted)' }}>
              Manage and configure portfolio project items, live demos, and architecture snippets.
            </Typography>
          </Box>

          <NextLink href="/admin/projects/new" style={{ textDecoration: 'none' }}>
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
              Add Project
            </Button>
          </NextLink>
        </Box>

        {/* Project Table */}
        <ProjectTable projects={projects} onDelete={handleDeleteProject} />

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
