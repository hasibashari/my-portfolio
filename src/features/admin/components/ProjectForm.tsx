'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import NextLink from 'next/link'
import {
  Box,
  Button,
  TextField,
  MenuItem,
  FormControlLabel,
  Switch,
  Alert,
  CircularProgress,
  Typography,
  Paper,
} from '@mui/material'
import { ArrowLeft, Save } from 'lucide-react'
import { ProjectItem, ProjectCategory, PROJECT_CATEGORIES } from '../../../shared/constants/projects'

interface ProjectFormProps {
  initialData?: ProjectItem
  isEdit?: boolean
  onSubmit: (data: ProjectItem) => Promise<void>
  loading?: boolean
}

export default function ProjectForm({
  initialData,
  isEdit = false,
  onSubmit,
  loading = false,
}: ProjectFormProps) {
  const router = useRouter()

  const [formData, setFormData] = useState({
    id: initialData?.id || '',
    title: initialData?.title || '',
    category: (initialData?.category || 'AI & Backend') as ProjectItem['category'],
    badge: initialData?.badge || '',
    badgeColor: initialData?.badgeColor || '#cc785c',
    description: initialData?.description || '',
    longDescription: initialData?.longDescription || '',
    techStack: initialData?.techStack ? initialData.techStack.join(', ') : '',
    demoUrl: initialData?.demoUrl || '',
    githubUrl: initialData?.githubUrl || '',
    imageUrl: initialData?.imageUrl || '',
    codeSnippet: initialData?.codeSnippet || '',
    featured: initialData?.featured || false,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [serverError, setServerError] = useState<string | null>(null)

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.id.trim()) {
      newErrors.id = 'Project ID (slug) is required'
    } else if (!/^[a-z0-9-]+$/.test(formData.id.trim())) {
      newErrors.id = 'ID must only contain lowercase alphanumeric characters and hyphens'
    }

    if (!formData.title.trim()) {
      newErrors.title = 'Project title is required'
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Short description is required'
    }

    if (!formData.imageUrl.trim()) {
      newErrors.imageUrl = 'Image URL is required'
    }

    if (!formData.demoUrl.trim()) {
      newErrors.demoUrl = 'Demo URL is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setServerError(null)

    if (!validate()) return

    try {
      const techStackArray = formData.techStack
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)

      const payload: ProjectItem = {
        id: formData.id.trim(),
        title: formData.title.trim(),
        badge: formData.badge.trim() || formData.category.toUpperCase(),
        category: formData.category,
        badgeColor: formData.badgeColor.trim(),
        description: formData.description.trim(),
        longDescription: formData.longDescription.trim() || undefined,
        techStack: techStackArray,
        demoUrl: formData.demoUrl.trim(),
        githubUrl: formData.githubUrl.trim() || undefined,
        imageUrl: formData.imageUrl.trim(),
        codeSnippet: formData.codeSnippet.trim() || '// Code snippet',
        featured: formData.featured,
      }

      await onSubmit(payload)
      router.push('/admin/projects')
    } catch (err: unknown) {
      if (err instanceof Error) {
        setServerError(err.message)
      } else {
        setServerError('An unexpected error occurred while saving the project.')
      }
    }
  }

  const availableCategories = PROJECT_CATEGORIES.filter((c): c is Exclude<ProjectCategory, 'All'> => c !== 'All')

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      elevation={0}
      sx={{
        p: { xs: 3, md: 4 },
        bgcolor: 'var(--color-surface-card)',
        border: '1px solid var(--color-hairline)',
        borderRadius: '16px',
      }}
    >
      {serverError && (
        <Alert severity="error" sx={{ mb: 3, borderRadius: '8px' }}>
          {serverError}
        </Alert>
      )}

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3, mb: 3 }}>
        {/* Project ID */}
        <Box>
          <Typography variant="caption" sx={{ color: 'var(--color-ink)', fontWeight: 600, mb: 0.5, display: 'block' }}>
            Project ID (Slug) *
          </Typography>
          <TextField
            fullWidth
            size="small"
            placeholder="e.g. ai-studio"
            value={formData.id}
            onChange={(e) => setFormData({ ...formData, id: e.target.value })}
            disabled={isEdit || loading}
            error={Boolean(errors.id)}
            helperText={errors.id || (isEdit ? 'ID cannot be changed once created.' : 'Lowercase, numbers, and hyphens only.')}
            slotProps={{
              input: {
                sx: { bgcolor: 'var(--color-canvas)', borderRadius: '8px', color: 'var(--color-ink)' },
              },
            }}
          />
        </Box>

        {/* Project Title */}
        <Box>
          <Typography variant="caption" sx={{ color: 'var(--color-ink)', fontWeight: 600, mb: 0.5, display: 'block' }}>
            Project Title *
          </Typography>
          <TextField
            fullWidth
            size="small"
            placeholder="e.g. AI Agent Automation Engine"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            disabled={loading}
            error={Boolean(errors.title)}
            helperText={errors.title}
            slotProps={{
              input: {
                sx: { bgcolor: 'var(--color-canvas)', borderRadius: '8px', color: 'var(--color-ink)' },
              },
            }}
          />
        </Box>

        {/* Category */}
        <Box>
          <Typography variant="caption" sx={{ color: 'var(--color-ink)', fontWeight: 600, mb: 0.5, display: 'block' }}>
            Category *
          </Typography>
          <TextField
            select
            fullWidth
            size="small"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value as ProjectItem['category'] })}
            disabled={loading}
            slotProps={{
              input: {
                sx: { bgcolor: 'var(--color-canvas)', borderRadius: '8px', color: 'var(--color-ink)' },
              },
            }}
          >
            {availableCategories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </TextField>
        </Box>

        {/* Badge & Color */}
        <Box sx={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 2 }}>
          <Box>
            <Typography variant="caption" sx={{ color: 'var(--color-ink)', fontWeight: 600, mb: 0.5, display: 'block' }}>
              Badge Label
            </Typography>
            <TextField
              fullWidth
              size="small"
              placeholder="e.g. AI & BACKEND"
              value={formData.badge}
              onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
              disabled={loading}
              slotProps={{
                input: {
                  sx: { bgcolor: 'var(--color-canvas)', borderRadius: '8px', color: 'var(--color-ink)' },
                },
              }}
            />
          </Box>
          <Box>
            <Typography variant="caption" sx={{ color: 'var(--color-ink)', fontWeight: 600, mb: 0.5, display: 'block' }}>
              Badge Color
            </Typography>
            <TextField
              fullWidth
              size="small"
              placeholder="#cc785c"
              value={formData.badgeColor}
              onChange={(e) => setFormData({ ...formData, badgeColor: e.target.value })}
              disabled={loading}
              slotProps={{
                input: {
                  sx: { bgcolor: 'var(--color-canvas)', borderRadius: '8px', color: 'var(--color-ink)' },
                },
              }}
            />
          </Box>
        </Box>

        {/* Demo URL */}
        <Box>
          <Typography variant="caption" sx={{ color: 'var(--color-ink)', fontWeight: 600, mb: 0.5, display: 'block' }}>
            Demo URL *
          </Typography>
          <TextField
            fullWidth
            size="small"
            placeholder="https://example.com/demo"
            value={formData.demoUrl}
            onChange={(e) => setFormData({ ...formData, demoUrl: e.target.value })}
            disabled={loading}
            error={Boolean(errors.demoUrl)}
            helperText={errors.demoUrl}
            slotProps={{
              input: {
                sx: { bgcolor: 'var(--color-canvas)', borderRadius: '8px', color: 'var(--color-ink)' },
              },
            }}
          />
        </Box>

        {/* GitHub URL */}
        <Box>
          <Typography variant="caption" sx={{ color: 'var(--color-ink)', fontWeight: 600, mb: 0.5, display: 'block' }}>
            GitHub Repository URL
          </Typography>
          <TextField
            fullWidth
            size="small"
            placeholder="https://github.com/hasibashari/repo"
            value={formData.githubUrl}
            onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
            disabled={loading}
            slotProps={{
              input: {
                sx: { bgcolor: 'var(--color-canvas)', borderRadius: '8px', color: 'var(--color-ink)' },
              },
            }}
          />
        </Box>

        {/* Image URL */}
        <Box sx={{ gridColumn: { xs: '1', md: '1 / -1' } }}>
          <Typography variant="caption" sx={{ color: 'var(--color-ink)', fontWeight: 600, mb: 0.5, display: 'block' }}>
            Image URL *
          </Typography>
          <TextField
            fullWidth
            size="small"
            placeholder="https://images.unsplash.com/photo-..."
            value={formData.imageUrl}
            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
            disabled={loading}
            error={Boolean(errors.imageUrl)}
            helperText={errors.imageUrl}
            slotProps={{
              input: {
                sx: { bgcolor: 'var(--color-canvas)', borderRadius: '8px', color: 'var(--color-ink)' },
              },
            }}
          />
        </Box>

        {/* Tech Stack */}
        <Box sx={{ gridColumn: { xs: '1', md: '1 / -1' } }}>
          <Typography variant="caption" sx={{ color: 'var(--color-ink)', fontWeight: 600, mb: 0.5, display: 'block' }}>
            Tech Stack (Comma-separated)
          </Typography>
          <TextField
            fullWidth
            size="small"
            placeholder="Node.js, Express, Docker, OpenAI API, Redis, TypeScript"
            value={formData.techStack}
            onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
            disabled={loading}
            slotProps={{
              input: {
                sx: { bgcolor: 'var(--color-canvas)', borderRadius: '8px', color: 'var(--color-ink)' },
              },
            }}
          />
        </Box>

        {/* Short Description */}
        <Box sx={{ gridColumn: { xs: '1', md: '1 / -1' } }}>
          <Typography variant="caption" sx={{ color: 'var(--color-ink)', fontWeight: 600, mb: 0.5, display: 'block' }}>
            Short Summary Description *
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={2}
            placeholder="Brief 1-2 sentence overview of the project"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            disabled={loading}
            error={Boolean(errors.description)}
            helperText={errors.description}
            slotProps={{
              input: {
                sx: { bgcolor: 'var(--color-canvas)', borderRadius: '8px', color: 'var(--color-ink)' },
              },
            }}
          />
        </Box>

        {/* Long Description */}
        <Box sx={{ gridColumn: { xs: '1', md: '1 / -1' } }}>
          <Typography variant="caption" sx={{ color: 'var(--color-ink)', fontWeight: 600, mb: 0.5, display: 'block' }}>
            Extended Architecture Details (Optional)
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={3}
            placeholder="Detailed architecture explanation, metrics, or technical implementation notes..."
            value={formData.longDescription}
            onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
            disabled={loading}
            slotProps={{
              input: {
                sx: { bgcolor: 'var(--color-canvas)', borderRadius: '8px', color: 'var(--color-ink)' },
              },
            }}
          />
        </Box>

        {/* Code Snippet */}
        <Box sx={{ gridColumn: { xs: '1', md: '1 / -1' } }}>
          <Typography variant="caption" sx={{ color: 'var(--color-ink)', fontWeight: 600, mb: 0.5, display: 'block' }}>
            Featured Code Snippet
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            placeholder="// TypeScript or architectural code snippet"
            value={formData.codeSnippet}
            onChange={(e) => setFormData({ ...formData, codeSnippet: e.target.value })}
            disabled={loading}
            slotProps={{
              input: {
                sx: {
                  bgcolor: 'var(--color-canvas)',
                  borderRadius: '8px',
                  color: 'var(--color-ink)',
                  fontFamily: 'monospace',
                  fontSize: '0.85rem',
                },
              },
            }}
          />
        </Box>

        {/* Featured Flag */}
        <Box sx={{ gridColumn: { xs: '1', md: '1 / -1' } }}>
          <FormControlLabel
            control={
              <Switch
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                disabled={loading}
                sx={{
                  '& .MuiSwitch-switchBase.Mui-checked': {
                    color: 'var(--color-primary)',
                  },
                  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                    backgroundColor: 'var(--color-primary)',
                  },
                }}
              />
            }
            label={
              <Typography sx={{ fontSize: '0.9rem', color: 'var(--color-ink)', fontWeight: 500 }}>
                Mark as Featured Project on Home & Project list
              </Typography>
            }
          />
        </Box>
      </Box>

      {/* Action Buttons */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 2, pt: 2, borderTop: '1px solid var(--color-hairline)' }}>
        <NextLink href="/admin/projects" style={{ textDecoration: 'none' }}>
          <Button
            variant="outlined"
            disabled={loading}
            startIcon={<ArrowLeft size={16} />}
            sx={{
              color: 'var(--color-ink)',
              borderColor: 'var(--color-hairline)',
              borderRadius: '8px',
              textTransform: 'none',
              fontWeight: 500,
              px: 2.5,
              '&:hover': { bgcolor: 'var(--color-canvas)', borderColor: 'var(--color-primary)' },
            }}
          >
            Cancel
          </Button>
        </NextLink>

        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          startIcon={loading ? <CircularProgress size={16} sx={{ color: '#fff' }} /> : <Save size={16} />}
          sx={{
            bgcolor: 'var(--color-primary)',
            color: 'var(--color-on-primary)',
            borderRadius: '8px',
            textTransform: 'none',
            fontWeight: 600,
            px: 3,
            '&:hover': { bgcolor: 'var(--color-primary-active)' },
          }}
        >
          {loading ? 'Saving...' : isEdit ? 'Update Project' : 'Create Project'}
        </Button>
      </Box>
    </Paper>
  )
}
