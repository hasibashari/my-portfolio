'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Box, Container, Typography } from '@mui/material'
import AdminNav from '../components/AdminNav'
import ProjectForm from '../components/ProjectForm'
import { ProjectItem } from '../../../shared/constants/projects'

interface AdminProjectFormViewProps {
  project?: ProjectItem
  isEdit?: boolean
}

export default function AdminProjectFormView({ project, isEdit = false }: AdminProjectFormViewProps) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (payload: ProjectItem) => {
    setLoading(true)
    try {
      const url = isEdit ? `/api/admin/projects/${project?.id}` : '/api/admin/projects'
      const method = isEdit ? 'PATCH' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json()
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to save project')
      }

      // Force the admin list (and any server components) to re-fetch fresh data
      router.refresh()
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'var(--color-canvas)', pb: 10 }}>
      <AdminNav />

      <Container maxWidth="md" sx={{ px: { xs: 2, sm: 3, md: 4 }, pt: { xs: 4, md: 6 } }}>
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h4"
            className="font-serif-display"
            sx={{ color: 'var(--color-ink)', fontWeight: 700, mb: 0.5 }}
          >
            {isEdit ? `Edit Project: ${project?.title}` : 'Create New Project'}
          </Typography>
          <Typography variant="body2" sx={{ color: 'var(--color-muted)' }}>
            {isEdit
              ? 'Update project details, code snippets, or tech stack.'
              : 'Add a new distributed system, backend architecture, or fullstack project.'}
          </Typography>
        </Box>

        <ProjectForm
          initialData={project}
          isEdit={isEdit}
          onSubmit={handleSubmit}
          loading={loading}
        />
      </Container>
    </Box>
  )
}
