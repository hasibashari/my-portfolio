'use client'

import React, { useState } from 'react'
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
  Chip,
  Tooltip,
} from '@mui/material'
import {
  ArrowLeft,
  Save,
  Sparkles,
  RefreshCw,
} from 'lucide-react'
import { ProjectItem, ProjectFormData, ProjectCategory, PROJECT_CATEGORIES } from '@/shared/types/projects'
import MarkdownEditor from './MarkdownEditor'

interface ProjectFormProps {
  initialData?: ProjectItem
  isEdit?: boolean
  onSubmit: (data: ProjectFormData) => Promise<void>
  loading?: boolean
}

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

const CATEGORY_COLOR_MAP: Record<ProjectItem['category'], string> = {
  'AI & Backend': '#cc785c',
  'Cloud & Data': '#788c5d',
  'Microservices': '#6a9b9b',
  'Fullstack': '#8b7a9f',
}

const PRESET_BADGE_COLORS = [
  { name: 'Coral Terracotta (AI & Backend)', hex: '#cc785c' },
  { name: 'Sage Olive (Cloud & Data)', hex: '#788c5d' },
  { name: 'Ocean Teal (Microservices)', hex: '#6a9b9b' },
  { name: 'Lavender Violet (Fullstack)', hex: '#8b7a9f' },
  { name: 'Warm Amber', hex: '#d97706' },
  { name: 'Slate Gray', hex: '#64748b' },
]

const POPULAR_TECH_SUGGESTIONS = [
  'TypeScript',
  'Next.js',
  'Node.js',
  'React',
  'Docker',
  'PostgreSQL',
  'Redis',
  'Python',
  'Go',
  'TailwindCSS',
  'AWS',
  'Kubernetes',
]

export default function ProjectForm({
  initialData,
  isEdit = false,
  onSubmit,
  loading = false,
}: ProjectFormProps) {
  const router = useRouter()

  const [formData, setFormData] = useState({
    slug: initialData?.slug || initialData?.id || '',
    title: initialData?.title || '',
    category: (initialData?.category || 'AI & Backend') as ProjectItem['category'],
    badgeColor: initialData?.badgeColor || '#cc785c',
    description: initialData?.description || '',
    longDescription: initialData?.longDescription || '',
    techStack: initialData?.techStack || ['TypeScript', 'Next.js'],
    demoUrl: initialData?.demoUrl || '',
    githubUrl: initialData?.githubUrl || '',
    imageUrl: initialData?.imageUrl || '',
    featured: initialData?.featured || false,
  })

  const [newTagInput, setNewTagInput] = useState('')
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(Boolean(isEdit))
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [serverError, setServerError] = useState<string | null>(null)

  // Auto-generate slug from title
  const handleTitleChange = (newTitle: string) => {
    if (!isSlugManuallyEdited && !isEdit) {
      const generatedSlug = slugify(newTitle)
      setFormData((prev) => ({
        ...prev,
        title: newTitle,
        slug: generatedSlug,
      }))
    } else {
      setFormData((prev) => ({ ...prev, title: newTitle }))
    }
  }

  const handleRegenerateSlug = () => {
    const generatedSlug = slugify(formData.title)
    setFormData((prev) => ({ ...prev, slug: generatedSlug }))
    setIsSlugManuallyEdited(false)
  }

  // Tag chip handlers
  const handleAddTag = (tagToAdd?: string) => {
    const tag = (tagToAdd ?? newTagInput).trim()
    if (!tag) return
    if (!formData.techStack.includes(tag)) {
      setFormData((prev) => ({
        ...prev,
        techStack: [...prev.techStack, tag],
      }))
    }
    setNewTagInput('')
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      techStack: prev.techStack.filter((t) => t !== tagToRemove),
    }))
  }

  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      handleAddTag()
    }
  }

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) {
      newErrors.title = 'Project title is required'
    }

    if (!formData.slug.trim()) {
      newErrors.slug = 'URL Slug is required'
    } else if (!/^[a-z0-9-]+$/.test(formData.slug.trim())) {
      newErrors.slug = 'Slug must only contain lowercase alphanumeric characters and hyphens'
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Short description summary is required'
    }

    if (!formData.imageUrl.trim()) {
      newErrors.imageUrl = 'Image URL is required'
    }

    if (!formData.demoUrl.trim()) {
      newErrors.demoUrl = 'Demo URL is required'
    }

    if (formData.techStack.length === 0) {
      newErrors.techStack = 'Please specify at least one technology in tech stack'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setServerError(null)

    if (!validate()) return

    try {
      const payload: ProjectFormData = {
        ...(initialData?.id ? { id: initialData.id } : {}),
        slug: formData.slug.trim(),
        title: formData.title.trim(),
        badge: formData.category.toUpperCase(), // Auto-derived from category
        category: formData.category,
        badgeColor: formData.badgeColor.trim() || CATEGORY_COLOR_MAP[formData.category] || '#cc785c',
        description: formData.description.trim(),
        longDescription: formData.longDescription.trim() || undefined,
        techStack: formData.techStack,
        demoUrl: formData.demoUrl.trim(),
        githubUrl: formData.githubUrl.trim() || undefined,
        imageUrl: formData.imageUrl.trim(),
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

  const availableCategories = PROJECT_CATEGORIES.filter(
    (c): c is Exclude<ProjectCategory, 'All'> => c !== 'All'
  )

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      elevation={0}
      sx={{
        p: { xs: 2.5, md: 4 },
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

      {/* ── Featured Banner Toggle ────────────────────────────────────────── */}
      <Box
        sx={{
          mb: 3.5,
          p: 2,
          bgcolor: formData.featured ? 'rgba(204, 120, 92, 0.08)' : 'var(--color-canvas)',
          border: '1px solid',
          borderColor: formData.featured ? 'var(--color-primary)' : 'var(--color-hairline)',
          borderRadius: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
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
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
              <Sparkles size={16} color="var(--color-primary)" />
              <Typography sx={{ fontSize: '0.9rem', color: 'var(--color-ink)', fontWeight: 600 }}>
                Feature on Homepage Showcase & Top of Projects list
              </Typography>
            </Box>
          }
        />
        {formData.featured && (
          <Chip
            label="FEATURED SHOWCASE"
            size="small"
            sx={{
              bgcolor: 'var(--color-primary)',
              color: '#ffffff',
              fontWeight: 700,
              fontSize: '0.7rem',
              letterSpacing: '0.05em',
            }}
          />
        )}
      </Box>

      {/* ── Main Form Inputs ──────────────────────────────────────────────── */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2.5, mb: 4 }}>
        {/* Title */}
        <Box sx={{ gridColumn: { xs: '1', md: '1 / -1' } }}>
          <Typography variant="caption" sx={{ color: 'var(--color-ink)', fontWeight: 600, mb: 0.5, display: 'block' }}>
            Project Title *
          </Typography>
          <TextField
            fullWidth
            size="small"
            placeholder="e.g. AI Agent Automation Engine"
            value={formData.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            disabled={loading}
            error={Boolean(errors.title)}
            helperText={errors.title}
            slotProps={{
              input: {
                sx: { bgcolor: 'var(--color-canvas)', borderRadius: '8px', color: 'var(--color-ink)', fontWeight: 500 },
              },
            }}
          />
        </Box>

        {/* URL Slug */}
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.5 }}>
            <Typography variant="caption" sx={{ color: 'var(--color-ink)', fontWeight: 600 }}>
              URL Slug *
            </Typography>
            <Button
              size="small"
              variant="text"
              onClick={handleRegenerateSlug}
              startIcon={<RefreshCw size={12} />}
              sx={{
                textTransform: 'none',
                fontSize: '0.75rem',
                p: 0,
                color: 'var(--color-primary)',
                '&:hover': { bgcolor: 'transparent', textDecoration: 'underline' },
              }}
            >
              Auto-generate from Title
            </Button>
          </Box>
          <TextField
            fullWidth
            size="small"
            placeholder="e.g. ai-agent-engine"
            value={formData.slug}
            onChange={(e) => {
              setFormData({ ...formData, slug: e.target.value })
              setIsSlugManuallyEdited(true)
            }}
            disabled={loading}
            error={Boolean(errors.slug)}
            helperText={errors.slug || 'Unique slug used in share link: /projects?project=[slug]'}
            slotProps={{
              input: {
                sx: {
                  bgcolor: 'var(--color-canvas)',
                  borderRadius: '8px',
                  color: 'var(--color-ink)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem',
                },
              },
            }}
          />
        </Box>

        {/* Category (Badge is automatically derived) */}
        <Box>
          <Typography variant="caption" sx={{ color: 'var(--color-ink)', fontWeight: 600, mb: 0.5, display: 'block' }}>
            Engineering Category * (Badge automatically reflects this)
          </Typography>
          <TextField
            select
            fullWidth
            size="small"
            value={formData.category}
            onChange={(e) => {
              const cat = e.target.value as ProjectItem['category']
              setFormData((prev) => ({
                ...prev,
                category: cat,
                badgeColor: CATEGORY_COLOR_MAP[cat] || prev.badgeColor,
              }))
            }}
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

        {/* Badge Color Palette & Custom Hex */}
        <Box sx={{ gridColumn: { xs: '1', md: '1 / -1' } }}>
          <Typography variant="caption" sx={{ color: 'var(--color-ink)', fontWeight: 600, mb: 1, display: 'block' }}>
            Category Badge Accent Color
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
            {PRESET_BADGE_COLORS.map((preset) => {
              const isSelected = formData.badgeColor.toLowerCase() === preset.hex.toLowerCase()
              return (
                <Tooltip key={preset.hex} title={preset.name}>
                  <Box
                    onClick={() => setFormData({ ...formData, badgeColor: preset.hex })}
                    sx={{
                      width: 28,
                      height: 28,
                      borderRadius: '50%',
                      bgcolor: preset.hex,
                      cursor: 'pointer',
                      border: isSelected ? '3px solid var(--color-ink)' : '2px solid rgba(0,0,0,0.1)',
                      boxShadow: isSelected ? '0 0 0 2px var(--color-primary)' : 'none',
                      transition: 'transform 0.15s ease',
                      '&:hover': { transform: 'scale(1.15)' },
                    }}
                  />
                </Tooltip>
              )
            })}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 'auto' }}>
              <input
                type="color"
                value={formData.badgeColor}
                onChange={(e) => setFormData({ ...formData, badgeColor: e.target.value })}
                style={{
                  width: 30,
                  height: 30,
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  backgroundColor: 'transparent',
                }}
              />
              <TextField
                size="small"
                value={formData.badgeColor}
                onChange={(e) => setFormData({ ...formData, badgeColor: e.target.value })}
                disabled={loading}
                sx={{ width: 100 }}
                slotProps={{
                  input: {
                    sx: {
                      bgcolor: 'var(--color-canvas)',
                      borderRadius: '8px',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.8rem',
                      py: 0,
                    },
                  },
                }}
              />
            </Box>
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
            Cover Image URL *
          </Typography>
          <TextField
            fullWidth
            size="small"
            placeholder="https://images.unsplash.com/photo-..."
            value={formData.imageUrl}
            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
            disabled={loading}
            error={Boolean(errors.imageUrl)}
            helperText={errors.imageUrl || 'High resolution 16:9 banner preview'}
            slotProps={{
              input: {
                sx: { bgcolor: 'var(--color-canvas)', borderRadius: '8px', color: 'var(--color-ink)' },
              },
            }}
          />
        </Box>

        {/* Tech Stack Chip Input */}
        <Box sx={{ gridColumn: { xs: '1', md: '1 / -1' } }}>
          <Typography variant="caption" sx={{ color: 'var(--color-ink)', fontWeight: 600, mb: 0.5, display: 'block' }}>
            Technologies & Frameworks * (Press Enter or comma to add)
          </Typography>
          <Box
            sx={{
              p: 1.5,
              bgcolor: 'var(--color-canvas)',
              border: '1px solid var(--color-hairline)',
              borderRadius: '8px',
              minHeight: '48px',
              display: 'flex',
              flexWrap: 'wrap',
              gap: 1,
              alignItems: 'center',
            }}
          >
            {formData.techStack.map((tech) => (
              <Chip
                key={tech}
                label={tech}
                size="small"
                onDelete={() => handleRemoveTag(tech)}
                sx={{
                  bgcolor: 'var(--color-surface-soft)',
                  color: 'var(--color-ink)',
                  fontWeight: 500,
                  borderRadius: '6px',
                  border: '1px solid var(--color-hairline)',
                }}
              />
            ))}
            <TextField
              variant="standard"
              placeholder={formData.techStack.length === 0 ? 'Type tag and press Enter...' : 'Add more...'}
              value={newTagInput}
              onChange={(e) => setNewTagInput(e.target.value)}
              onKeyDown={handleTagInputKeyDown}
              disabled={loading}
              slotProps={{
                input: {
                  disableUnderline: true,
                  sx: { fontSize: '0.85rem', color: 'var(--color-ink)', minWidth: 120 },
                },
              }}
            />
          </Box>
          {errors.techStack && (
            <Typography variant="caption" sx={{ color: '#ef4444', mt: 0.5, display: 'block' }}>
              {errors.techStack}
            </Typography>
          )}

          {/* Popular Suggestions */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mt: 1.25, alignItems: 'center' }}>
            <Typography variant="caption" sx={{ color: 'var(--color-muted)', fontSize: '0.75rem' }}>
              Suggestions:
            </Typography>
            {POPULAR_TECH_SUGGESTIONS.map((sug) => {
              if (formData.techStack.includes(sug)) return null
              return (
                <Chip
                  key={sug}
                  label={`+ ${sug}`}
                  size="small"
                  onClick={() => handleAddTag(sug)}
                  sx={{
                    cursor: 'pointer',
                    fontSize: '0.7rem',
                    height: '22px',
                    bgcolor: 'transparent',
                    border: '1px dashed var(--color-hairline)',
                    color: 'var(--color-muted)',
                    '&:hover': {
                      bgcolor: 'var(--color-surface-soft)',
                      color: 'var(--color-ink)',
                      borderColor: 'var(--color-primary)',
                    },
                  }}
                />
              )
            })}
          </Box>
        </Box>

        {/* Short Summary Description */}
        <Box sx={{ gridColumn: { xs: '1', md: '1 / -1' } }}>
          <Typography variant="caption" sx={{ color: 'var(--color-ink)', fontWeight: 600, mb: 0.5, display: 'block' }}>
            Short Summary Description * (used for project cards)
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={2}
            placeholder="Brief 1-2 sentence overview of what was built and the core value..."
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
      </Box>

      {/* ── Markdown Extended Details Workspace ───────────────────────────── */}
      <Box sx={{ mb: 4, pt: 3, borderTop: '1px solid var(--color-hairline)' }}>
        <MarkdownEditor
          value={formData.longDescription}
          onChange={(val) => setFormData((prev) => ({ ...prev, longDescription: val }))}
          disabled={loading}
          label="Extended Architecture & Technical Implementation (Markdown)"
          placeholder="Write deep architectural insights, system diagrams, key engineering trade-offs, and code snippets in Markdown..."
          minHeight="380px"
        />
      </Box>

      {/* ── Action Buttons Footer ─────────────────────────────────────────── */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          pt: 2.5,
          borderTop: '1px solid var(--color-hairline)',
        }}
      >
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
            px: 3.5,
            py: 1,
            '&:hover': { bgcolor: 'var(--color-primary-active)' },
          }}
        >
          {loading ? 'Saving...' : isEdit ? 'Update Project' : 'Publish Project'}
        </Button>
      </Box>
    </Paper>
  )
}
