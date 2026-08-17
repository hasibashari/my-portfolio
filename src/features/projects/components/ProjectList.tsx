'use client'

import { useState, useMemo } from 'react'
import { Box, Container, Typography, Button } from '@mui/material'
import { AnimatePresence, motion } from 'motion/react'
import { FolderGit2 } from 'lucide-react'
import ProjectsHero from './ProjectsHero'
import ProjectsFilter from './ProjectsFilter'
import ProjectCard from './ProjectCard'
import ProjectModal from './ProjectModal'
import {
  projects,
  ProjectItem,
  ProjectCategory,
  PROJECT_CATEGORIES,
} from '../../../shared/constants/projects'

export default function ProjectList() {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('All')
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null)

  // Compute total counts per category
  const categoryCounts = useMemo(() => {
    const counts: Record<ProjectCategory, number> = {
      All: projects.length,
      'AI & Backend': 0,
      'Cloud & Data': 0,
      Microservices: 0,
      Fullstack: 0,
    }

    PROJECT_CATEGORIES.forEach((cat) => {
      if (cat !== 'All') {
        counts[cat] = projects.filter((p) => p.category === cat).length
      }
    })

    return counts
  }, [])

  // Filter projects strictly by category
  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'All') return projects
    return projects.filter((project) => project.category === selectedCategory)
  }, [selectedCategory])

  return (
    <Box sx={{ minHeight: '80vh', pb: { xs: 10, md: 14 }, bgcolor: 'var(--color-canvas)' }}>
      {/* Editorial Hero Header */}
      <ProjectsHero />

      {/* Modular Category Filter Component */}
      <ProjectsFilter
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        categoryCounts={categoryCounts}
      />

      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 }, pt: { xs: 3, sm: 4 } }}>
        {/* Results Counter */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: { xs: 3, md: 3.5 },
          }}
        >
          <Typography variant="body2" sx={{ color: 'var(--color-muted)', fontWeight: 500 }}>
            Showing{' '}
            <Box component="span" sx={{ color: 'var(--color-ink)', fontWeight: 600 }}>
              {filteredProjects.length}
            </Box>{' '}
            {filteredProjects.length === 1 ? 'project' : 'projects'}
            {selectedCategory !== 'All' && ` in "${selectedCategory}"`}
          </Typography>

          {selectedCategory !== 'All' && (
            <Button
              size="small"
              onClick={() => setSelectedCategory('All')}
              sx={{
                color: 'var(--color-primary)',
                textTransform: 'none',
                fontSize: '0.8125rem',
                fontWeight: 500,
                p: 0,
                '&:hover': { bgcolor: 'transparent', color: 'var(--color-primary-active)' },
              }}
            >
              Show all
            </Button>
          )}
        </Box>

        {/* Symmetrical 3-Column Project Grid */}
        {filteredProjects.length > 0 ? (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                lg: 'repeat(3, 1fr)',
              },
              gap: { xs: 2.5, sm: 3, lg: 3.5 },
              alignItems: 'stretch',
            }}
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onOpenModal={(proj) => setActiveModalProject(proj)}
                />
              ))}
            </AnimatePresence>
          </Box>
        ) : (
          /* Empty State */
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <Box
              sx={{
                textAlign: 'center',
                py: { xs: 8, sm: 10 },
                px: 2,
                borderRadius: '16px',
                bgcolor: 'var(--color-surface-soft)',
                border: '1px dashed var(--color-hairline)',
                maxWidth: '500px',
                mx: 'auto',
              }}
            >
              <Box
                sx={{
                  display: 'inline-flex',
                  p: 2,
                  borderRadius: '50%',
                  bgcolor: 'var(--color-surface-card)',
                  color: 'var(--color-muted)',
                  mb: 2,
                }}
              >
                <FolderGit2 size={32} />
              </Box>
              <Typography variant="h6" className="font-serif-display" sx={{ color: 'var(--color-ink)', mb: 1 }}>
                No projects in this category yet
              </Typography>
              <Typography variant="body2" sx={{ color: 'var(--color-muted)', mb: 3 }}>
                Check back soon or explore projects in other engineering categories.
              </Typography>
              <Button
                variant="outlined"
                onClick={() => setSelectedCategory('All')}
                sx={{
                  color: 'var(--color-ink)',
                  borderColor: 'var(--color-hairline)',
                  bgcolor: 'var(--color-canvas)',
                  textTransform: 'none',
                  borderRadius: '8px',
                  px: 2.5,
                  py: 1,
                  '&:hover': {
                    bgcolor: 'var(--color-surface-card)',
                    borderColor: 'var(--color-primary)',
                  },
                }}
              >
                View all projects
              </Button>
            </Box>
          </motion.div>
        )}
      </Container>

      {/* Project Details Modal */}
      <ProjectModal
        project={activeModalProject}
        open={Boolean(activeModalProject)}
        onClose={() => setActiveModalProject(null)}
      />
    </Box>
  )
}
