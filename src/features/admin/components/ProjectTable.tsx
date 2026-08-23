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
import { Edit2, Trash2, ExternalLink, Star } from 'lucide-react'
import { ProjectItem } from '../../../shared/constants/projects'
import DeleteConfirmModal from './DeleteConfirmModal'

interface ProjectTableProps {
  projects: ProjectItem[]
  onDelete: (id: string) => Promise<void>
}

export default function ProjectTable({ projects, onDelete }: ProjectTableProps) {
  const [deleteTarget, setDeleteTarget] = useState<ProjectItem | null>(null)
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

  if (projects.length === 0) {
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
          No projects found.
        </Typography>
        <Typography variant="body2" sx={{ color: 'var(--color-muted)' }}>
          Create your first project by clicking the &ldquo;Add Project&rdquo; button above.
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
              <TableCell sx={{ color: 'var(--color-ink)', fontWeight: 600 }}>Project</TableCell>
              <TableCell sx={{ color: 'var(--color-ink)', fontWeight: 600 }}>Category</TableCell>
              <TableCell sx={{ color: 'var(--color-ink)', fontWeight: 600 }}>Badge</TableCell>
              <TableCell sx={{ color: 'var(--color-ink)', fontWeight: 600 }}>Tech Stack</TableCell>
              <TableCell sx={{ color: 'var(--color-ink)', fontWeight: 600 }} align="center">Featured</TableCell>
              <TableCell sx={{ color: 'var(--color-ink)', fontWeight: 600 }} align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.map((project) => (
              <TableRow
                key={project.id}
                hover
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  borderColor: 'var(--color-hairline)',
                }}
              >
                <TableCell component="th" scope="row">
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={{ fontWeight: 600, color: 'var(--color-ink)', fontSize: '0.95rem' }}>
                      {project.title}
                    </Typography>
                    <Typography sx={{ color: 'var(--color-muted)', fontSize: '0.8rem', fontFamily: 'monospace' }}>
                      {project.id}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip
                    label={project.category}
                    size="small"
                    sx={{
                      bgcolor: 'var(--color-surface-soft)',
                      color: 'var(--color-ink)',
                      border: '1px solid var(--color-hairline)',
                      fontWeight: 500,
                      fontSize: '0.75rem',
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={project.badge}
                    size="small"
                    sx={{
                      bgcolor: `${project.badgeColor}20`,
                      color: project.badgeColor,
                      fontWeight: 600,
                      fontSize: '0.75rem',
                      border: `1px solid ${project.badgeColor}40`,
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', maxWidth: 220 }}>
                    {project.techStack.slice(0, 3).map((tech) => (
                      <Typography
                        key={tech}
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
                        {tech}
                      </Typography>
                    ))}
                    {project.techStack.length > 3 && (
                      <Typography component="span" sx={{ fontSize: '0.75rem', color: 'var(--color-muted)' }}>
                        +{project.techStack.length - 3}
                      </Typography>
                    )}
                  </Box>
                </TableCell>
                <TableCell align="center">
                  {project.featured ? (
                    <Tooltip title="Featured Project">
                      <Star size={18} fill="#e8a55a" color="#e8a55a" style={{ display: 'inline' }} />
                    </Tooltip>
                  ) : (
                    <Typography sx={{ color: 'var(--color-muted)', fontSize: '0.8rem' }}>—</Typography>
                  )}
                </TableCell>
                <TableCell align="right">
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 0.5 }}>
                    {project.demoUrl && (
                      <Tooltip title="View Demo">
                        <IconButton
                          size="small"
                          component="a"
                          href={project.demoUrl}
                          target="_blank"
                          rel="noreferrer"
                          sx={{ color: 'var(--color-muted)', '&:hover': { color: 'var(--color-primary)' } }}
                        >
                          <ExternalLink size={16} />
                        </IconButton>
                      </Tooltip>
                    )}
                    <Tooltip title="Edit Project">
                      <NextLink href={`/admin/projects/${project.id}/edit`}>
                        <IconButton
                          size="small"
                          sx={{ color: 'var(--color-muted)', '&:hover': { color: 'var(--color-ink)' } }}
                        >
                          <Edit2 size={16} />
                        </IconButton>
                      </NextLink>
                    </Tooltip>
                    <Tooltip title="Delete Project">
                      <IconButton
                        size="small"
                        onClick={() => setDeleteTarget(project)}
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
        title="Delete Project"
        itemName={deleteTarget?.title || ''}
        loading={deleting}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
      />
    </>
  )
}
