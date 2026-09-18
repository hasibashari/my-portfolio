'use client';

import { Box, Button, SxProps, Theme } from '@mui/material';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import ScrollReveal from './ScrollReveal';

export interface BackLinkProps {
  href?: string;
  label?: string;
  variant?: 'link' | 'button';
  withReveal?: boolean;
  sx?: SxProps<Theme>;
}

export default function BackLink({
  href = '/',
  label = 'Back to Overview',
  variant = 'link',
  withReveal = true,
  sx,
}: BackLinkProps) {
  const content =
    variant === 'button' ? (
      <Button
        component={Link}
        href={href}
        startIcon={
          <ArrowLeft
            size={16}
            style={{
              transition: 'transform 0.2s ease-in-out',
            }}
          />
        }
        sx={{
          color: 'var(--color-muted)',
          textTransform: 'none',
          fontWeight: 500,
          fontSize: '0.875rem',
          px: 1.5,
          py: 0.5,
          borderRadius: '6px',
          bgcolor: 'var(--color-surface-soft)',
          border: '1px solid var(--color-hairline)',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            bgcolor: 'var(--color-hairline)',
            color: 'var(--color-ink)',
            '& svg': {
              transform: 'translateX(-3px)',
            },
          },
          ...sx,
        }}
      >
        {label}
      </Button>
    ) : (
      <Box
        component={Link}
        href={href}
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          color: 'var(--color-muted)',
          textDecoration: 'none',
          fontSize: '0.875rem',
          fontWeight: 500,
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            color: 'var(--color-ink)',
            '& svg': {
              transform: 'translateX(-4px)',
              color: 'var(--color-primary)',
            },
          },
          ...sx,
        }}
      >
        <ArrowLeft
          size={16}
          style={{
            transition: 'transform 0.2s ease-in-out, color 0.2s ease-in-out',
          }}
        />
        <span>{label}</span>
      </Box>
    );

  if (!withReveal) {
    return content;
  }

  return (
    <ScrollReveal variant='fade-up'>
      <Box sx={{ mb: { xs: 3, md: 4 } }}>{content}</Box>
    </ScrollReveal>
  );
}
