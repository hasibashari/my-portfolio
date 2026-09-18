'use client'

import { Box, Container, Button, Typography, TextField, InputAdornment, IconButton } from '@mui/material'
import { Search, X } from 'lucide-react'
import ScrollReveal from '@/shared/components/ScrollReveal'
import { PROJECT_CATEGORIES, ProjectCategory } from '@/shared/types/projects'

interface ProjectsFilterProps {
  selectedCategory: ProjectCategory
  onCategoryChange: (category: ProjectCategory) => void
  categoryCounts: Record<ProjectCategory, number>
  searchQuery: string
  onSearchChange: (query: string) => void
}

export default function ProjectsFilter({
  selectedCategory,
  onCategoryChange,
  categoryCounts,
  searchQuery,
  onSearchChange,
}: ProjectsFilterProps) {
  return (
    <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 }, pt: { xs: 3, sm: 4 } }}>
      <ScrollReveal variant="fade-up" delay={0.05}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'stretch', md: 'center' },
            gap: 2,
          }}
        >
          {/* Category Filter Buttons */}
          <Box
            sx={{
              display: 'flex',
              gap: 1.25,
              flexWrap: { xs: 'nowrap', sm: 'wrap' },
              overflowX: { xs: 'auto', sm: 'visible' },
              pb: { xs: 1, sm: 0 },
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

          {/* Search Bar Input */}
          <Box sx={{ minWidth: { xs: '100%', md: '280px' } }}>
            <TextField
              fullWidth
              size="small"
              placeholder="Search projects or tech..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search size={16} color="var(--color-muted)" />
                    </InputAdornment>
                  ),
                  endAdornment: searchQuery ? (
                    <InputAdornment position="end">
                      <IconButton size="small" onClick={() => onSearchChange('')} sx={{ p: 0.5, color: 'var(--color-muted)' }}>
                        <X size={14} />
                      </IconButton>
                    </InputAdornment>
                  ) : null,
                  sx: {
                    bgcolor: 'var(--color-surface-card)',
                    borderRadius: '10px',
                    fontSize: '0.85rem',
                    color: 'var(--color-ink)',
                    border: '1px solid var(--color-hairline)',
                    '& fieldset': { border: 'none' },
                  },
                },
              }}
            />
          </Box>
        </Box>
      </ScrollReveal>
    </Container>
  )
}
