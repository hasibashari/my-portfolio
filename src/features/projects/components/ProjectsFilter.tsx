'use client'

import { Box, Container, Button, Typography } from '@mui/material'
import ScrollReveal from '../../../shared/components/ScrollReveal'
import { PROJECT_CATEGORIES, ProjectCategory } from '../../../shared/constants/projects'

interface ProjectsFilterProps {
  selectedCategory: ProjectCategory
  onCategoryChange: (category: ProjectCategory) => void
  categoryCounts: Record<ProjectCategory, number>
}

export default function ProjectsFilter({
  selectedCategory,
  onCategoryChange,
  categoryCounts,
}: ProjectsFilterProps) {
  return (
    <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 }, pt: { xs: 3, sm: 4 } }}>
      <ScrollReveal variant="fade-up" delay={0.05}>
        <Box
          sx={{
            display: 'flex',
            gap: 1.25,
            flexWrap: { xs: 'nowrap', sm: 'wrap' },
            overflowX: { xs: 'auto', sm: 'visible' },
            pb: { xs: 1.5, sm: 0 },
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': { display: 'none' },
          }}
        >
          {PROJECT_CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat
            const count = categoryCounts[cat] || 0

            return (
              <Button
                key={cat}
                onClick={() => onCategoryChange(cat)}
                variant="text"
                sx={{
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                  bgcolor: isActive ? 'var(--color-ink)' : 'var(--color-surface-soft)',
                  color: isActive ? 'var(--color-on-dark)' : 'var(--color-body)',
                  border: '1px solid',
                  borderColor: isActive ? 'var(--color-ink)' : 'var(--color-hairline)',
                  borderRadius: '10px',
                  px: { xs: 1.75, sm: 2.25 },
                  py: 0.85,
                  fontSize: '0.8125rem',
                  fontWeight: isActive ? 600 : 500,
                  textTransform: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 1,
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    bgcolor: isActive ? 'var(--color-ink)' : 'var(--color-surface-card)',
                    borderColor: isActive ? 'var(--color-ink)' : 'var(--color-muted-soft)',
                    color: isActive ? 'var(--color-on-dark)' : 'var(--color-ink)',
                  },
                }}
              >
                <span>{cat}</span>
                <Typography
                  component="span"
                  sx={{
                    fontSize: '0.6875rem',
                    fontWeight: 600,
                    px: 0.75,
                    py: 0.1,
                    borderRadius: '9999px',
                    bgcolor: isActive ? 'rgba(250, 249, 245, 0.2)' : 'var(--color-surface-card)',
                    color: isActive ? 'var(--color-on-dark)' : 'var(--color-muted)',
                    border: isActive ? 'none' : '1px solid var(--color-hairline)',
                  }}
                >
                  {count}
                </Typography>
              </Button>
            )
          })}
        </Box>
      </ScrollReveal>
    </Container>
  )
}
