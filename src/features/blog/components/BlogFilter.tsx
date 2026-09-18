'use client'

import { Box, Container, Chip, TextField, InputAdornment } from '@mui/material'
import { Search } from 'lucide-react'
import { BLOG_CATEGORIES, BlogCategory } from '@/shared/types/blog'

interface BlogFilterProps {
  selectedCategory: BlogCategory
  onCategoryChange: (category: BlogCategory) => void
  categoryCounts: Record<BlogCategory, number>
  searchQuery: string
  onSearchChange: (query: string) => void
}

export default function BlogFilter({
  selectedCategory,
  onCategoryChange,
  categoryCounts,
  searchQuery,
  onSearchChange,
}: BlogFilterProps) {
  return (
    <Box
      sx={{
        py: { xs: 2.5, sm: 3 },
        borderBottom: '1px solid var(--color-hairline)',
        bgcolor: 'var(--color-canvas)',
        position: 'sticky',
        top: 64,
        zIndex: 10,
        backdropFilter: 'blur(12px)',
        backgroundColor: 'rgba(250, 249, 245, 0.92)',
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { xs: 'stretch', md: 'center' },
            justifyContent: 'space-between',
            gap: 2,
          }}
        >
          {/* Category Chips */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              overflowX: 'auto',
              pb: { xs: 1, md: 0 },
              scrollbarWidth: 'none',
              '&::-webkit-scrollbar': { display: 'none' },
            }}
          >
            {BLOG_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat
              const count = categoryCounts[cat] || 0
              return (
                <Chip
                  key={cat}
                  label={`${cat} (${count})`}
                  clickable
                  onClick={() => onCategoryChange(cat)}
                  sx={{
                    bgcolor: isSelected ? 'var(--color-primary)' : 'var(--color-surface-card)',
                    color: isSelected ? 'var(--color-on-primary)' : 'var(--color-ink)',
                    fontWeight: isSelected ? 600 : 500,
                    fontSize: '0.8125rem',
                    border: '1px solid',
                    borderColor: isSelected ? 'var(--color-primary)' : 'var(--color-hairline)',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      bgcolor: isSelected ? 'var(--color-primary-active)' : 'var(--color-hairline)',
                    },
                  }}
                />
              )
            })}
          </Box>

          {/* Search Input */}
          <Box sx={{ width: { xs: '100%', md: '300px' } }}>
            <TextField
              size="small"
              fullWidth
              placeholder="Search articles & topics..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search size={16} color="var(--color-muted)" />
                    </InputAdornment>
                  ),
                  sx: {
                    bgcolor: 'var(--color-canvas)',
                    fontSize: '0.875rem',
                    borderRadius: '8px',
                    '& fieldset': {
                      borderColor: 'var(--color-hairline)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'var(--color-primary)',
                    },
                  },
                },
              }}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
