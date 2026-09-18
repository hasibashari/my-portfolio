'use client';

import React from 'react';
import {
  Box,
  Container,
  Button,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Search, X } from 'lucide-react';
import ScrollReveal from '@/shared/components/ScrollReveal';

export interface FilterBarProps<T extends string> {
  categories: readonly T[];
  selectedCategory: T;
  onCategoryChange: (category: T) => void;
  categoryCounts?: Record<T, number>;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  searchPlaceholder?: string;
  sticky?: boolean;
  showScrollReveal?: boolean;
  containerMaxWidth?: 'lg' | 'md' | 'xl' | false;
}

export default function FilterBar<T extends string>({
  categories,
  selectedCategory,
  onCategoryChange,
  categoryCounts,
  searchQuery,
  onSearchChange,
  searchPlaceholder = 'Search...',
  sticky = false,
  showScrollReveal = true,
  containerMaxWidth = 'lg',
}: FilterBarProps<T>) {
  const content = (
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
        {categories.map(cat => {
          const isActive = selectedCategory === cat;
          const count = categoryCounts ? categoryCounts[cat] : undefined;

          return (
            <Button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              variant='text'
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
              {count !== undefined && (
                <Typography
                  component='span'
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
              )}
            </Button>
          );
        })}
      </Box>

      {/* Search Bar Input */}
      <Box sx={{ minWidth: { xs: '100%', md: '280px' } }}>
        <TextField
          fullWidth
          size='small'
          placeholder={searchPlaceholder}
          value={searchQuery}
          onChange={e => onSearchChange(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position='start'>
                  <Search size={16} color='var(--color-muted)' />
                </InputAdornment>
              ),
              endAdornment: searchQuery ? (
                <InputAdornment position='end'>
                  <IconButton
                    size='small'
                    onClick={() => onSearchChange('')}
                    aria-label='Clear search query'
                    sx={{ p: 0.5, color: 'var(--color-muted)' }}
                  >
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
  );

  const inner = containerMaxWidth ? (
    <Container maxWidth={containerMaxWidth} sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
      {showScrollReveal ? (
        <ScrollReveal variant='fade-up' delay={0.05}>
          {content}
        </ScrollReveal>
      ) : (
        content
      )}
    </Container>
  ) : showScrollReveal ? (
    <ScrollReveal variant='fade-up' delay={0.05}>
      {content}
    </ScrollReveal>
  ) : (
    content
  );

  if (sticky) {
    return (
      <Box
        sx={{
          py: { xs: 2, sm: 2.5 },
          borderBottom: '1px solid var(--color-hairline)',
          bgcolor: 'rgba(250, 249, 245, 0.92)',
          position: 'sticky',
          top: 64,
          zIndex: 10,
          backdropFilter: 'blur(12px)',
        }}
      >
        {inner}
      </Box>
    );
  }

  return <Box sx={{ pt: { xs: 2.5, sm: 3 }, pb: { xs: 1, sm: 1.5 } }}>{inner}</Box>;
}
