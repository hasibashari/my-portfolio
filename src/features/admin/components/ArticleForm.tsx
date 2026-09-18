'use client'

import React, { useState } from 'react'
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
import { ArrowLeft, Save, Sparkles, RefreshCw } from 'lucide-react'
import { BlogPost, BlogCategory, BLOG_CATEGORIES } from '@/shared/types/blog'
import MarkdownEditor, { calculateReadingStats } from './MarkdownEditor'

export type ArticleFormData = Omit<BlogPost, 'id'> & { id?: number }

interface ArticleFormProps {
  initialData?: BlogPost
  isEdit?: boolean
  onSubmit: (data: ArticleFormData) => Promise<void>
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

const DEFAULT_MARKDOWN_TEMPLATE = `## Introduction

Write the opening narrative of your article here. Set up the context, problem statement, or background.

## Technical Deep Dive

Explain the architectural concepts, code patterns, and practical trade-offs.

\`\`\`tsx
// Example implementation snippet
export function examplePattern() {
  return { status: 'success' }
}
\`\`\`

> **Pro Tip**: Use blockquotes for critical takeaways, performance rules, or warnings.

## Summary & Key Takeaways

Summarize the key architectural decisions and future recommendations.
`

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
    isCoralBadge: initialData?.isCoralBadge || false,
    description: initialData?.description || '',
    tags: initialData?.tags ? initialData.tags.join(', ') : '',
    authorName: initialData?.author?.name || 'Hasib Ashari',
    authorRole: initialData?.author?.role || 'Software Engineer',
    content: initialData?.content || DEFAULT_MARKDOWN_TEMPLATE,
  })

  // Track whether slug was manually altered by user
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(Boolean(isEdit))
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [serverError, setServerError] = useState<string | null>(null)

  // Auto-calculate reading time when content changes
  const stats = calculateReadingStats(formData.content)

  // Auto-generate slug from title if not manually edited
  const handleTitleChange = (newTitle: string) => {
    if (!isSlugManuallyEdited && !isEdit) {
      const generatedSlug = slugify(newTitle)
      setFormData((prev) => ({ ...prev, title: newTitle, slug: generatedSlug }))
    } else {
      setFormData((prev) => ({ ...prev, title: newTitle }))
    }
  }

  const handleRegenerateSlug = () => {
    const generatedSlug = slugify(formData.title)
    setFormData((prev) => ({ ...prev, slug: generatedSlug }))
    setIsSlugManuallyEdited(false)
  }

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

    if (!formData.content.trim()) {
      newErrors.content = 'Article Markdown content cannot be empty'
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

      const payload: ArticleFormData = {
        slug: formData.slug.trim(),
        title: formData.title.trim(),
        category: formData.category.trim().toUpperCase(),
        date: formData.date.trim(),
        readingTime: stats.readingTime,
        isCoralBadge: formData.isCoralBadge,
        description: formData.description.trim(),
        tags: tagsArray,
        author: {
          name: formData.authorName.trim(),
          role: formData.authorRole.trim(),
        },
        content: formData.content,
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

  const availableCategories = BLOG_CATEGORIES.filter(
    (c): c is Exclude<BlogCategory, 'All'> => c !== 'All'
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

      {/* ── Metadata Header Section ────────────────────────────────────────── */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="subtitle2"
          sx={{
            color: 'var(--color-primary)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            fontWeight: 600,
            mb: 2,
          }}
        >
          Article Metadata & Publishing Settings
        </Typography>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2.5 }}>
          {/* Title */}
          <Box sx={{ gridColumn: { xs: '1', md: '1 / -1' } }}>
            <Typography variant="caption" sx={{ color: 'var(--color-ink)', fontWeight: 600, mb: 0.5, display: 'block' }}>
              Article Title *
            </Typography>
            <TextField
              fullWidth
              size="medium"
              placeholder="e.g. Optimizing Web Vitals & LCP in Next.js 15"
              value={formData.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              disabled={loading}
              error={Boolean(errors.title)}
              helperText={errors.title}
              slotProps={{
                input: {
                  sx: {
                    bgcolor: 'var(--color-canvas)',
                    borderRadius: '8px',
                    color: 'var(--color-ink)',
                    fontSize: '1.05rem',
                    fontWeight: 500,
                  },
                },
              }}
            />
          </Box>

          {/* Article Slug */}
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
              placeholder="e.g. optimizing-web-vitals-and-lcp-in-nextjs"
              value={formData.slug}
              onChange={(e) => {
                setFormData({ ...formData, slug: e.target.value })
                setIsSlugManuallyEdited(true)
              }}
              disabled={loading}
              error={Boolean(errors.slug)}
              helperText={errors.slug || 'Unique slug used in URL: /blog/[slug]'}
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

          {/* Publish Date & Auto Reading Time */}
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
                Reading Time (Auto)
              </Typography>
              <TextField
                fullWidth
                size="small"
                value={stats.readingTime}
                disabled
                slotProps={{
                  input: {
                    sx: {
                      bgcolor: 'var(--color-surface-soft)',
                      borderRadius: '8px',
                      color: 'var(--color-ink)',
                      fontWeight: 500,
                    },
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
              placeholder="Next.js, Performance, TypeScript, React Server Components"
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

          {/* Highlight Badge Flag */}
          <Box sx={{ display: 'flex', alignItems: 'center', pt: 2 }}>
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
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                  <Sparkles size={16} color="var(--color-primary)" />
                  <Typography sx={{ fontSize: '0.9rem', color: 'var(--color-ink)', fontWeight: 500 }}>
                    Highlight with Coral Accent Badge
                  </Typography>
                </Box>
              }
            />
          </Box>

          {/* Short Summary Description */}
          <Box sx={{ gridColumn: { xs: '1', md: '1 / -1' } }}>
            <Typography variant="caption" sx={{ color: 'var(--color-ink)', fontWeight: 600, mb: 0.5, display: 'block' }}>
              Summary Description * (used for SEO & blog cards)
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={2}
              placeholder="A concise, compelling overview summary of the article..."
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
      </Box>

      {/* ── Extracted Markdown Editor Component ───────────────────────────── */}
      <MarkdownEditor
        value={formData.content}
        onChange={(content) => setFormData((prev) => ({ ...prev, content }))}
        disabled={loading}
        error={errors.content}
        minHeight="480px"
      />

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
            px: 3.5,
            py: 1,
            '&:hover': { bgcolor: 'var(--color-primary-active)' },
          }}
        >
          {loading ? 'Saving...' : isEdit ? 'Update Article' : 'Publish Article'}
        </Button>
      </Box>
    </Paper>
  )
}
