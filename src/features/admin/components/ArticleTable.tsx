'use client'

import { useState } from 'react'
import NextLink from 'next/link'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  Box,
  Typography,
  Tooltip,
} from '@mui/material'
import { Edit2, Trash2, ExternalLink, Sparkles } from 'lucide-react'
import { BlogPost } from '../../../shared/constants/blog'
import DeleteConfirmModal from './DeleteConfirmModal'

interface ArticleTableProps {
  articles: BlogPost[]
  onDelete: (id: number) => Promise<void>
}

export default function ArticleTable({ articles, onDelete }: ArticleTableProps) {
  const [deleteTarget, setDeleteTarget] = useState<BlogPost | null>(null)
  const [deleting, setDeleting] = useState(false)

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return
    try {
      setDeleting(true)
      await onDelete(deleteTarget.id)
      setDeleteTarget(null)
    } finally {
      setDeleting(false)
    }
  }

  if (articles.length === 0) {
    return (
      <Box
        sx={{
          py: 8,
          textAlign: 'center',
          bgcolor: 'var(--color-surface-card)',
          borderRadius: '12px',
          border: '1px dashed var(--color-hairline)',
        }}
      >
        <Typography variant="h6" className="font-serif-display" sx={{ color: 'var(--color-ink)', mb: 1 }}>
          No articles found.
        </Typography>
        <Typography variant="body2" sx={{ color: 'var(--color-muted)' }}>
          Create your first article by clicking the &ldquo;Add Article&rdquo; button above.
        </Typography>
      </Box>
    )
  }

  return (
    <>
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          bgcolor: 'var(--color-surface-card)',
          border: '1px solid var(--color-hairline)',
          borderRadius: '12px',
          overflow: 'hidden',
        }}
      >
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ bgcolor: 'var(--color-surface-soft)' }}>
            <TableRow>
              <TableCell sx={{ color: 'var(--color-ink)', fontWeight: 600 }}>Article</TableCell>
              <TableCell sx={{ color: 'var(--color-ink)', fontWeight: 600 }}>Category</TableCell>
              <TableCell sx={{ color: 'var(--color-ink)', fontWeight: 600 }}>Date & Reading Time</TableCell>
              <TableCell sx={{ color: 'var(--color-ink)', fontWeight: 600 }}>Tags</TableCell>
              <TableCell sx={{ color: 'var(--color-ink)', fontWeight: 600 }} align="center">Highlight</TableCell>
              <TableCell sx={{ color: 'var(--color-ink)', fontWeight: 600 }} align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {articles.map((article) => (
              <TableRow
                key={article.id}
                hover
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  borderColor: 'var(--color-hairline)',
                }}
              >
                <TableCell component="th" scope="row">
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={{ fontWeight: 600, color: 'var(--color-ink)', fontSize: '0.95rem' }}>
                      {article.title}
                    </Typography>
                    <Typography sx={{ color: 'var(--color-muted)', fontSize: '0.8rem', fontFamily: 'monospace' }}>
                      /blog/{article.slug}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip
                    label={article.category}
                    size="small"
                    sx={{
                      bgcolor: 'var(--color-surface-soft)',
                      color: 'var(--color-ink)',
                      border: '1px solid var(--color-hairline)',
                      fontWeight: 600,
                      fontSize: '0.725rem',
                      letterSpacing: '0.04em',
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Typography sx={{ fontSize: '0.85rem', color: 'var(--color-ink)', fontWeight: 500 }}>
                    {article.date}
                  </Typography>
                  <Typography sx={{ fontSize: '0.75rem', color: 'var(--color-muted)' }}>
                    {article.readingTime}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', maxWidth: 200 }}>
                    {article.tags.slice(0, 2).map((tag) => (
                      <Typography
                        key={tag}
                        component="span"
                        sx={{
                          fontSize: '0.75rem',
                          color: 'var(--color-muted)',
                          bgcolor: 'var(--color-surface-soft)',
                          px: 0.75,
                          py: 0.25,
                          borderRadius: '4px',
                        }}
                      >
                        {tag}
                      </Typography>
                    ))}
                    {article.tags.length > 2 && (
                      <Typography component="span" sx={{ fontSize: '0.75rem', color: 'var(--color-muted)' }}>
                        +{article.tags.length - 2}
                      </Typography>
                    )}
                  </Box>
                </TableCell>
                <TableCell align="center">
                  {article.isCoralBadge ? (
                    <Tooltip title="Coral Highlight Badge">
                      <Sparkles size={18} color="var(--color-primary)" style={{ display: 'inline' }} />
                    </Tooltip>
                  ) : (
                    <Typography sx={{ color: 'var(--color-muted)', fontSize: '0.8rem' }}>—</Typography>
                  )}
                </TableCell>
                <TableCell align="right">
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 0.5 }}>
                    <Tooltip title="View Public Article">
                      <IconButton
                        size="small"
                        component="a"
                        href={`/blog/${article.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        sx={{ color: 'var(--color-muted)', '&:hover': { color: 'var(--color-primary)' } }}
                      >
                        <ExternalLink size={16} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit Article">
                      <NextLink href={`/admin/articles/${article.id}/edit`}>
                        <IconButton
                          size="small"
                          sx={{ color: 'var(--color-muted)', '&:hover': { color: 'var(--color-ink)' } }}
                        >
                          <Edit2 size={16} />
                        </IconButton>
                      </NextLink>
                    </Tooltip>
                    <Tooltip title="Delete Article">
                      <IconButton
                        size="small"
                        onClick={() => setDeleteTarget(article)}
                        sx={{ color: 'var(--color-muted)', '&:hover': { color: '#dc2626' } }}
                      >
                        <Trash2 size={16} />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <DeleteConfirmModal
        open={Boolean(deleteTarget)}
        title="Delete Article"
        itemName={deleteTarget?.title || ''}
        loading={deleting}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
      />
    </>
  )
}
