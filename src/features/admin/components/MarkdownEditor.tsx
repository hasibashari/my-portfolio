'use client'

import React, { useState, useRef } from 'react'
import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material'
import {
  Bold,
  Italic,
  Heading2,
  Heading3,
  Code,
  Terminal,
  Quote,
  Link2,
  Table as TableIcon,
  List,
  ListOrdered,
  Columns,
  PenTool,
  Eye,
} from 'lucide-react'
import ArticleContent from '@/features/blog/components/ArticleContent'

export interface MarkdownEditorProps {
  value: string
  onChange: (value: string) => void
  disabled?: boolean
  placeholder?: string
  minHeight?: string | number
  error?: string
  label?: string
}

export function calculateReadingStats(text: string) {
  const words = text.trim() ? text.trim().split(/\s+/).filter(Boolean).length : 0
  const readingMinutes = Math.max(1, Math.ceil(words / 200))
  return {
    words,
    readingTime: `${readingMinutes} min read`,
  }
}

export default function MarkdownEditor({
  value,
  onChange,
  disabled = false,
  placeholder = 'Write your article in Markdown format here...',
  minHeight = '480px',
  error,
  label = 'Article Markdown Content *',
}: MarkdownEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const [viewMode, setViewMode] = useState<'split' | 'write' | 'preview'>('split')

  const stats = calculateReadingStats(value)

  const insertFormatting = (prefix: string, suffix: string = '', defaultPlaceholder: string = '') => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = value.substring(start, end)
    const textToInsert = selectedText || defaultPlaceholder

    const updatedContent =
      value.substring(0, start) +
      prefix +
      textToInsert +
      suffix +
      value.substring(end)

    onChange(updatedContent)

    // Restore cursor position
    setTimeout(() => {
      textarea.focus()
      const newCursorPos = start + prefix.length + textToInsert.length
      textarea.setSelectionRange(newCursorPos, newCursorPos)
    }, 0)
  }

  return (
    <Box sx={{ mb: 3 }}>
      {label && (
        <Typography
          variant="caption"
          sx={{ color: 'var(--color-ink)', fontWeight: 600, mb: 1, display: 'block' }}
        >
          {label}
        </Typography>
      )}

      {/* ── Workspace Toolbar Header ────────────────────────────────────────── */}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 1.5,
          p: 1.5,
          bgcolor: 'var(--color-surface-soft)',
          borderTopLeftRadius: '12px',
          borderTopRightRadius: '12px',
          border: '1px solid var(--color-hairline)',
          borderBottom: 'none',
        }}
      >
        {/* Quick Formatting Buttons */}
        <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 0.5 }}>
          <Tooltip title="Heading 2 (##)">
            <IconButton size="small" onClick={() => insertFormatting('## ', '\n', 'Heading 2')} sx={{ color: 'var(--color-ink)' }}>
              <Heading2 size={16} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Heading 3 (###)">
            <IconButton size="small" onClick={() => insertFormatting('### ', '\n', 'Heading 3')} sx={{ color: 'var(--color-ink)' }}>
              <Heading3 size={16} />
            </IconButton>
          </Tooltip>
          <Box sx={{ width: '1px', height: 18, bgcolor: 'var(--color-hairline)', mx: 0.5 }} />
          <Tooltip title="Bold (**text**)">
            <IconButton size="small" onClick={() => insertFormatting('**', '**', 'bold text')} sx={{ color: 'var(--color-ink)' }}>
              <Bold size={16} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Italic (*text*)">
            <IconButton size="small" onClick={() => insertFormatting('*', '*', 'italic text')} sx={{ color: 'var(--color-ink)' }}>
              <Italic size={16} />
            </IconButton>
          </Tooltip>
          <Box sx={{ width: '1px', height: 18, bgcolor: 'var(--color-hairline)', mx: 0.5 }} />
          <Tooltip title="Inline Code (`code`)">
            <IconButton size="small" onClick={() => insertFormatting('`', '`', 'code')} sx={{ color: 'var(--color-ink)' }}>
              <Code size={16} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Code Block (```tsx)">
            <IconButton
              size="small"
              onClick={() => insertFormatting('```tsx\n// code snippet\n', '\n```\n', 'const result = true')}
              sx={{ color: 'var(--color-ink)' }}
            >
              <Terminal size={16} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Quote / Callout (> Note)">
            <IconButton
              size="small"
              onClick={() => insertFormatting('> **Key Rule**: ', '\n', 'Important concept or note')}
              sx={{ color: 'var(--color-ink)' }}
            >
              <Quote size={16} />
            </IconButton>
          </Tooltip>
          <Box sx={{ width: '1px', height: 18, bgcolor: 'var(--color-hairline)', mx: 0.5 }} />
          <Tooltip title="Insert Link">
            <IconButton size="small" onClick={() => insertFormatting('[', '](https://example.com)', 'link title')} sx={{ color: 'var(--color-ink)' }}>
              <Link2 size={16} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Insert Table">
            <IconButton
              size="small"
              onClick={() => insertFormatting('\n| Header 1 | Header 2 |\n| :--- | :--- |\n| Cell 1 | Cell 2 |\n', '', '')}
              sx={{ color: 'var(--color-ink)' }}
            >
              <TableIcon size={16} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Bulleted List">
            <IconButton size="small" onClick={() => insertFormatting('- ', '\n', 'List item')} sx={{ color: 'var(--color-ink)' }}>
              <List size={16} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Numbered List">
            <IconButton size="small" onClick={() => insertFormatting('1. ', '\n', 'Numbered item')} sx={{ color: 'var(--color-ink)' }}>
              <ListOrdered size={16} />
            </IconButton>
          </Tooltip>
        </Box>

        {/* View Mode Toggle */}
        <ButtonGroup size="small" variant="outlined" sx={{ bgcolor: 'var(--color-canvas)', borderRadius: '6px' }}>
          <Tooltip title="Write Only">
            <Button
              variant={viewMode === 'write' ? 'contained' : 'outlined'}
              onClick={() => setViewMode('write')}
              sx={{
                textTransform: 'none',
                px: 1.5,
                minWidth: 0,
                bgcolor: viewMode === 'write' ? 'var(--color-primary)' : 'transparent',
                color: viewMode === 'write' ? '#fff' : 'var(--color-ink)',
              }}
            >
              <PenTool size={14} style={{ marginRight: 4 }} />
              Write
            </Button>
          </Tooltip>
          <Tooltip title="Split View (Editor + Live Preview)">
            <Button
              variant={viewMode === 'split' ? 'contained' : 'outlined'}
              onClick={() => setViewMode('split')}
              sx={{
                textTransform: 'none',
                px: 1.5,
                minWidth: 0,
                bgcolor: viewMode === 'split' ? 'var(--color-primary)' : 'transparent',
                color: viewMode === 'split' ? '#fff' : 'var(--color-ink)',
              }}
            >
              <Columns size={14} style={{ marginRight: 4 }} />
              Split
            </Button>
          </Tooltip>
          <Tooltip title="Preview Only">
            <Button
              variant={viewMode === 'preview' ? 'contained' : 'outlined'}
              onClick={() => setViewMode('preview')}
              sx={{
                textTransform: 'none',
                px: 1.5,
                minWidth: 0,
                bgcolor: viewMode === 'preview' ? 'var(--color-primary)' : 'transparent',
                color: viewMode === 'preview' ? '#fff' : 'var(--color-ink)',
              }}
            >
              <Eye size={14} style={{ marginRight: 4 }} />
              Preview
            </Button>
          </Tooltip>
        </ButtonGroup>
      </Box>

      {/* ── Dual-Pane Content Area ─────────────────────────────────────────── */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns:
            viewMode === 'split'
              ? { xs: '1fr', lg: '1fr 1fr' }
              : '1fr',
          border: '1px solid var(--color-hairline)',
          borderRadius: '0 0 12px 12px',
          overflow: 'hidden',
          minHeight,
        }}
      >
        {/* Editor Pane (Left) */}
        {(viewMode === 'split' || viewMode === 'write') && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              bgcolor: 'var(--color-canvas)',
              borderRight: viewMode === 'split' ? { lg: '1px solid var(--color-hairline)' } : 'none',
            }}
          >
            <Box
              component="textarea"
              ref={textareaRef}
              value={value}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value)}
              placeholder={placeholder}
              disabled={disabled}
              sx={{
                flexGrow: 1,
                minHeight: '440px',
                p: 2.5,
                border: 'none',
                outline: 'none',
                resize: 'vertical',
                bgcolor: 'transparent',
                color: 'var(--color-ink)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.9rem',
                lineHeight: 1.65,
                tabSize: 2,
              }}
            />

            {/* Status Bar */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                px: 2,
                py: 1,
                borderTop: '1px solid var(--color-hairline)',
                bgcolor: 'var(--color-surface-soft)',
                fontSize: '0.75rem',
                color: 'var(--color-muted)',
              }}
            >
              <Typography variant="caption" sx={{ color: 'var(--color-muted)', fontFamily: 'monospace' }}>
                Markdown Enabled • CommonMark & GFM
              </Typography>
              <Typography variant="caption" sx={{ color: 'var(--color-muted)', fontFamily: 'monospace' }}>
                {stats.words} words • {value.length} chars • {stats.readingTime}
              </Typography>
            </Box>
          </Box>
        )}

        {/* Live Preview Pane (Right) */}
        {(viewMode === 'split' || viewMode === 'preview') && (
          <Box
            sx={{
              bgcolor: 'var(--color-canvas)',
              p: { xs: 2.5, md: 3.5 },
              overflowY: 'auto',
              maxHeight: '600px',
              borderLeft: viewMode === 'split' ? { lg: '1px solid var(--color-hairline)' } : 'none',
            }}
          >
            <Box sx={{ mb: 2, pb: 1.5, borderBottom: '1px dashed var(--color-hairline)' }}>
              <Typography variant="caption" sx={{ color: 'var(--color-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Real-time Editorial Preview
              </Typography>
            </Box>
            <ArticleContent content={value || '*No content yet. Type in the editor to see live rendering.*'} />
          </Box>
        )}
      </Box>

      {error && (
        <Typography variant="caption" sx={{ color: '#ef4444', mt: 1, display: 'block' }}>
          {error}
        </Typography>
      )}
    </Box>
  )
}
