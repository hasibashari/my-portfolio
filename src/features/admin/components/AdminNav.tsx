'use client'

import { usePathname } from 'next/navigation'
import NextLink from 'next/link'
import { Box, Container, Typography, Button, Chip } from '@mui/material'
import { LayoutDashboard, FolderGit2, BookOpen, ArrowLeft } from 'lucide-react'

export default function AdminNav() {
  const pathname = usePathname()

  const navItems = [
    { label: 'Overview', href: '/admin', icon: LayoutDashboard, exact: true },
    { label: 'Projects', href: '/admin/projects', icon: FolderGit2, exact: false },
    { label: 'Articles', href: '/admin/articles', icon: BookOpen, exact: false },
  ]

  const isActive = (href: string, exact: boolean) => {
    if (exact) return pathname === href
    return pathname.startsWith(href)
  }

  return (
    <Box
      sx={{
        bgcolor: 'var(--color-surface-soft)',
        borderBottom: '1px solid var(--color-hairline)',
        py: 2,
        position: 'sticky',
        top: 0,
        zIndex: 40,
        backdropFilter: 'blur(8px)',
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          {/* Logo & Status Badge */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <NextLink href="/admin" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Typography
                variant="h6"
                className="font-serif-display"
                sx={{
                  color: 'var(--color-ink)',
                  fontWeight: 700,
                  fontSize: '1.2rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                Portfolio Admin
              </Typography>
            </NextLink>
            <Chip
              label="Dev Mode"
              size="small"
              sx={{
                bgcolor: 'rgba(204, 120, 92, 0.15)',
                color: 'var(--color-primary)',
                fontWeight: 600,
                fontSize: '0.75rem',
                height: 22,
                borderRadius: '6px',
              }}
            />
          </Box>

          {/* Navigation Links */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {navItems.map((item) => {
              const active = isActive(item.href, item.exact)
              const Icon = item.icon
              return (
                <NextLink key={item.href} href={item.href} style={{ textDecoration: 'none' }}>
                  <Button
                    size="small"
                    startIcon={<Icon size={16} />}
                    sx={{
                      textTransform: 'none',
                      fontWeight: active ? 600 : 500,
                      color: active ? 'var(--color-primary)' : 'var(--color-muted)',
                      bgcolor: active ? 'var(--color-surface-card)' : 'transparent',
                      border: '1px solid',
                      borderColor: active ? 'var(--color-hairline)' : 'transparent',
                      borderRadius: '8px',
                      px: 1.75,
                      py: 0.75,
                      '&:hover': {
                        bgcolor: 'var(--color-surface-card)',
                        color: 'var(--color-ink)',
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                </NextLink>
              )
            })}

            <Box sx={{ width: '1px', height: 24, bgcolor: 'var(--color-hairline)', mx: 1 }} />

            {/* Back to Public Site */}
            <NextLink href="/" style={{ textDecoration: 'none' }}>
              <Button
                size="small"
                variant="outlined"
                startIcon={<ArrowLeft size={16} />}
                sx={{
                  textTransform: 'none',
                  fontWeight: 500,
                  color: 'var(--color-ink)',
                  borderColor: 'var(--color-hairline)',
                  borderRadius: '8px',
                  px: 1.5,
                  py: 0.75,
                  '&:hover': {
                    borderColor: 'var(--color-primary)',
                    bgcolor: 'var(--color-surface-card)',
                  },
                }}
              >
                Back to Site
              </Button>
            </NextLink>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
