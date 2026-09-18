'use client'

import NextLink from 'next/link'
import {
  IconButton,
  Chip,
  Box,
  Typography,
  Tooltip,
} from '@mui/material'
import { Edit2, Trash2, ExternalLink, Sparkles } from 'lucide-react'
import { BlogPost } from '@/shared/types/blog'
import DataTable, { ColumnDef } from './DataTable'

interface ArticleTableProps {
  articles: BlogPost[]
  onDelete: (id: number) => Promise<void>
}

export default function ArticleTable({ articles, onDelete }: ArticleTableProps) {
  const columns: ColumnDef<BlogPost>[] = [
    {
      header: 'Article',
      render: (article) => (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography sx={{ fontWeight: 600, color: 'var(--color-ink)', fontSize: '0.95rem' }}>
            {article.title}
          </Typography>
          <Typography sx={{ color: 'var(--color-muted)', fontSize: '0.8rem', fontFamily: 'monospace' }}>
            /blog/{article.slug}
          </Typography>
        </Box>
      ),
    },
    {
      header: 'Category',
      render: (article) => (
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
      ),
    },
    {
      header: 'Date & Time',
      render: (article) => (
        <Box>
          <Typography sx={{ fontSize: '0.85rem', color: 'var(--color-ink)', fontWeight: 500 }}>
            {article.date}
          </Typography>
          <Typography sx={{ fontSize: '0.75rem', color: 'var(--color-muted)' }}>
            {article.readingTime}
          </Typography>
        </Box>
      ),
    },
    {
      header: 'Tags',
      render: (article) => (
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
      ),
    },
    {
      header: 'Highlight',
      align: 'center',
      render: (article) =>
        article.isCoralBadge ? (
          <Tooltip title="Coral Highlight Badge">
            <Sparkles size={18} color="var(--color-primary)" style={{ display: 'inline' }} />
          </Tooltip>
        ) : (
          <Typography sx={{ color: 'var(--color-muted)', fontSize: '0.8rem' }}>—</Typography>
        ),
    },
  ]

  return (
    <DataTable<BlogPost>
      data={articles}
      columns={columns}
      keyExtractor={(article) => article.id}
      emptyState={{
        title: 'No articles found.',
        description: 'Create your first article by clicking the "Add Article" button above.',
      }}
      deleteConfig={{
        modalTitle: 'Delete Article',
        getItemName: (article) => article.title,
        onDelete: (article) => onDelete(article.id),
      }}
      renderActions={(article, { openDeleteModal }) => (
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
              onClick={() => openDeleteModal(article)}
              sx={{ color: 'var(--color-muted)', '&:hover': { color: '#dc2626' } }}
            >
              <Trash2 size={16} />
            </IconButton>
          </Tooltip>
        </Box>
      )}
    />
  )
}
