'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import NextLink from 'next/link'
import {
  Box,
  Button,
  TextField,
  FormControlLabel,
  Switch,
  Alert,
  CircularProgress,
  Typography,
  Paper,
  MenuItem,
} from '@mui/material'
import { ArrowLeft, Save } from 'lucide-react'
import { BlogPost, BlogCategory, BLOG_CATEGORIES, ArticleSection } from '../../../shared/constants/blog'

export type ArticleFormData = Omit<BlogPost, 'id'> & { id?: number }

interface ArticleFormProps {
  initialData?: BlogPost
  isEdit?: boolean
  onSubmit: (data: ArticleFormData) => Promise<void>
  loading?: boolean
}

export default function ArticleForm({
  initialData,
  isEdit = false,
  onSubmit,
  loading = false,
}: ArticleFormProps) {
  const router = useRouter()

  const defaultDate = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date())

  const [formData, setFormData] = useState({
    slug: initialData?.slug || '',
    title: initialData?.title || '',
    category: initialData?.category || 'PERFORMANCE',
    date: initialData?.date || defaultDate,
    readingTime: initialData?.readingTime || '5 min read',
    isCoralBadge: initialData?.isCoralBadge || false,
    description: initialData?.description || '',
    tags: initialData?.tags ? initialData.tags.join(', ') : '',
    authorName: initialData?.author?.name || 'Hasib Ashari',
    authorRole: initialData?.author?.role || 'Software Engineer',
    sectionsJson: initialData?.sections
      ? JSON.stringify(initialData.sections, null, 2)
      : JSON.stringify(
          [
            {
              heading: 'Introduction',
              paragraphs: [
                'Write the introductory paragraph for your new architectural article here.',
              ],
            },
            {
              heading: 'Technical Deep Dive',
              paragraphs: [
                'Explain the design considerations and implementation nuances.',
              ],
              codeSnippet: {
                language: 'tsx',
                caption: 'Example Implementation',
                code: `// Sample code snippet\nexport function example() {\n  return true\n}`,
              },
            },
          ],
          null,
          2
        ),
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [serverError, setServerError] = useState<string | null>(null)

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.slug.trim()) {
      newErrors.slug = 'Slug is required'
    } else if (!/^[a-z0-9-]+$/.test(formData.slug.trim())) {
      newErrors.slug = 'Slug must only contain lowercase alphanumeric characters and hyphens'
    }

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required'
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description summary is required'
    }

    if (!formData.category.trim()) {
      newErrors.category = 'Category is required'
    }

    try {
      const parsed = JSON.parse(formData.sectionsJson)
      if (!Array.isArray(parsed)) {
        newErrors.sectionsJson = 'Sections must be a valid JSON array of section objects'
      }
    } catch {
      newErrors.sectionsJson = 'Invalid JSON format in sections. Please ensure valid JSON syntax.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setServerError(null)

    if (!validate()) return

    try {
      const tagsArray = formData.tags
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)

      const parsedSections: ArticleSection[] = JSON.parse(formData.sectionsJson)

      const payload: ArticleFormData = {
        slug: formData.slug.trim(),
        title: formData.title.trim(),
        category: formData.category.trim().toUpperCase(),
        date: formData.date.trim(),
        readingTime: formData.readingTime.trim(),
        isCoralBadge: formData.isCoralBadge,
        description: formData.description.trim(),
        tags: tagsArray,
        author: {
          name: formData.authorName.trim(),
          role: formData.authorRole.trim(),
        },
        sections: parsedSections,
      }

      await onSubmit(payload)
      router.push('/admin/articles')
    } catch (err: unknown) {
      if (err instanceof Error) {
        setServerError(err.message)
      } else {
        setServerError('An unexpected error occurred while saving the article.')
      }
    }
  }

  const availableCategories = BLOG_CATEGORIES.filter((c): c is Exclude<BlogCategory, 'All'> => c !== 'All')

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
        {/* Article Slug */}
        <Box>
          <Typography variant="caption" sx={{ color: 'var(--color-ink)', fontWeight: 600, mb: 0.5, display: 'block' }}>
            Article URL Slug *
          </Typography>
          <TextField
            fullWidth
            size="small"
            placeholder="e.g. optimizing-web-vitals-and-lcp"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            disabled={loading}
            error={Boolean(errors.slug)}
            helperText={errors.slug || 'Unique slug used in URL: /blog/[slug]'}
            slotProps={{
              input: {
                sx: { bgcolor: 'var(--color-canvas)', borderRadius: '8px', color: 'var(--color-ink)' },
              },
            }}
          />
        </Box>

        {/* Title */}
        <Box>
          <Typography variant="caption" sx={{ color: 'var(--color-ink)', fontWeight: 600, mb: 0.5, display: 'block' }}>
            Article Title *
          </Typography>
          <TextField
            fullWidth
            size="small"
            placeholder="e.g. Optimizing Web Vitals & LCP in Next.js"
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
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
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

        {/* Date & Reading Time */}
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
          <Box>
            <Typography variant="caption" sx={{ color: 'var(--color-ink)', fontWeight: 600, mb: 0.5, display: 'block' }}>
              Publish Date
            </Typography>
            <TextField
              fullWidth
              size="small"
              placeholder="Jul 15, 2026"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
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
              Reading Time
            </Typography>
            <TextField
              fullWidth
              size="small"
              placeholder="6 min read"
              value={formData.readingTime}
              onChange={(e) => setFormData({ ...formData, readingTime: e.target.value })}
              disabled={loading}
              slotProps={{
                input: {
                  sx: { bgcolor: 'var(--color-canvas)', borderRadius: '8px', color: 'var(--color-ink)' },
                },
              }}
            />
          </Box>
        </Box>

        {/* Author Name & Role */}
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
          <Box>
            <Typography variant="caption" sx={{ color: 'var(--color-ink)', fontWeight: 600, mb: 0.5, display: 'block' }}>
              Author Name
            </Typography>
            <TextField
              fullWidth
              size="small"
              value={formData.authorName}
              onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
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
              Author Role
            </Typography>
            <TextField
              fullWidth
              size="small"
              value={formData.authorRole}
              onChange={(e) => setFormData({ ...formData, authorRole: e.target.value })}
              disabled={loading}
              slotProps={{
                input: {
                  sx: { bgcolor: 'var(--color-canvas)', borderRadius: '8px', color: 'var(--color-ink)' },
                },
              }}
            />
          </Box>
        </Box>

        {/* Tags */}
        <Box>
          <Typography variant="caption" sx={{ color: 'var(--color-ink)', fontWeight: 600, mb: 0.5, display: 'block' }}>
            Tags (Comma-separated)
          </Typography>
          <TextField
            fullWidth
            size="small"
            placeholder="Next.js, Core Web Vitals, Performance, TypeScript"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            disabled={loading}
            slotProps={{
              input: {
                sx: { bgcolor: 'var(--color-canvas)', borderRadius: '8px', color: 'var(--color-ink)' },
              },
            }}
          />
        </Box>

        {/* Short Summary Description */}
        <Box sx={{ gridColumn: { xs: '1', md: '1 / -1' } }}>
          <Typography variant="caption" sx={{ color: 'var(--color-ink)', fontWeight: 600, mb: 0.5, display: 'block' }}>
            Summary Description *
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={2}
            placeholder="Brief overview summary of the article"
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

        {/* Highlight Badge Flag */}
        <Box sx={{ gridColumn: { xs: '1', md: '1 / -1' } }}>
          <FormControlLabel
            control={
              <Switch
                checked={formData.isCoralBadge}
                onChange={(e) => setFormData({ ...formData, isCoralBadge: e.target.checked })}
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
                Highlight with Coral Accent Badge
              </Typography>
            }
          />
        </Box>

        {/* Sections JSON */}
        <Box sx={{ gridColumn: { xs: '1', md: '1 / -1' } }}>
          <Typography variant="caption" sx={{ color: 'var(--color-ink)', fontWeight: 600, mb: 0.5, display: 'block' }}>
            Article Sections Structure (JSON) *
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={8}
            value={formData.sectionsJson}
            onChange={(e) => setFormData({ ...formData, sectionsJson: e.target.value })}
            disabled={loading}
            error={Boolean(errors.sectionsJson)}
            helperText={errors.sectionsJson || 'JSON array containing heading, paragraphs, codeSnippet, and callouts.'}
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
      </Box>

      {/* Action Buttons */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 2, pt: 2, borderTop: '1px solid var(--color-hairline)' }}>
        <NextLink href="/admin/articles" style={{ textDecoration: 'none' }}>
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
          {loading ? 'Saving...' : isEdit ? 'Update Article' : 'Create Article'}
        </Button>
      </Box>
    </Paper>
  )
}
