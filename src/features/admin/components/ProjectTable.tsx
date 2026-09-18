'use client'

import React from 'react'
import NextLink from 'next/link'
import {
  IconButton,
  Chip,
  Box,
  Typography,
  Tooltip,
} from '@mui/material'
import { Edit2, Trash2, ExternalLink, Star } from 'lucide-react'
import { ProjectItem } from '@/shared/types/projects'
import DataTable, { ColumnDef } from './DataTable'

interface ProjectTableProps {
  projects: ProjectItem[]
  onDelete: (id: string) => Promise<void>
}

export default function ProjectTable({ projects, onDelete }: ProjectTableProps) {
  const columns: ColumnDef<ProjectItem>[] = [
    {
      header: 'Project',
      render: (project) => (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography sx={{ fontWeight: 600, color: 'var(--color-ink)', fontSize: '0.95rem' }}>
            {project.title}
          </Typography>
          <Typography sx={{ color: 'var(--color-muted)', fontSize: '0.8rem', fontFamily: 'monospace' }}>
            /projects?project={project.slug || project.id}
          </Typography>
        </Box>
      ),
    },
    {
      header: 'Category',
      render: (project) => (
        <Chip
          label={project.category}
          size="small"
          sx={{
            bgcolor: project.badgeColor ? `${project.badgeColor}18` : 'var(--color-surface-soft)',
            color: project.badgeColor || 'var(--color-ink)',
            border: `1px solid ${project.badgeColor ? `${project.badgeColor}35` : 'var(--color-hairline)'}`,
            fontWeight: 600,
            fontSize: '0.75rem',
            textTransform: 'capitalize',
          }}
        />
      ),
    },
    {
      header: 'Tech Stack',
      render: (project) => (
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
      ),
    },
    {
      header: 'Featured',
      align: 'center',
      render: (project) =>
        project.featured ? (
          <Tooltip title="Featured Project">
            <Star size={18} fill="#e8a55a" color="#e8a55a" style={{ display: 'inline' }} />
          </Tooltip>
        ) : (
          <Typography sx={{ color: 'var(--color-muted)', fontSize: '0.8rem' }}>—</Typography>
        ),
    },
  ]

  return (
    <DataTable<ProjectItem>
      data={projects}
      columns={columns}
      keyExtractor={(project) => project.id}
      emptyState={{
        title: 'No projects found.',
        description: 'Create your first project by clicking the "Add Project" button above.',
      }}
      deleteConfig={{
        modalTitle: 'Delete Project',
        getItemName: (project) => project.title,
        onDelete: (project) => onDelete(project.id),
      }}
      renderActions={(project, { openDeleteModal }) => (
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
              onClick={() => openDeleteModal(project)}
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
