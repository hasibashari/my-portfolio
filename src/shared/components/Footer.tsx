'use client'

import { Box, Container, Typography, Link, Divider } from '@mui/material'
import { ArrowUp, ArrowUpRight, Mail, Globe } from 'lucide-react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import Logo from './Logo'
import { footerColumns } from '@/shared/constants/footer'

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'var(--color-surface-dark)',
        color: 'var(--color-on-dark-soft)',
        pt: { xs: 8, md: 10 },
        pb: { xs: 5, md: 6 },
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
        {/* 4-Column Responsive Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: '1.4fr 1fr 1fr 1fr' },
            gap: { xs: 5, sm: 6, md: 4 },
            mb: { xs: 6, md: 8 },
          }}
        >
          {/* Column 1: Brand / Bio / Status */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Logo size={24} color="#faf9f5" />
              <Typography
                variant="h6"
                className="font-serif-display"
                sx={{ fontWeight: 600, color: 'var(--color-on-dark)', fontSize: '1.25rem', letterSpacing: '-0.02em' }}
              >
                Hasib Ashari
              </Typography>
            </Box>

            <Typography variant="body2" sx={{ color: 'var(--color-on-dark-soft)', fontSize: '0.875rem', lineHeight: 1.6, maxWidth: '320px' }}>
              Cloud & Backend Engineer focused on AWS infrastructure, containerization, and modular API development.
            </Typography>

            {/* Status Indicator */}
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
                px: 1.5,
                py: 0.6,
                borderRadius: '9999px',
                bgcolor: 'rgba(250, 249, 245, 0.05)',
                border: '1px solid rgba(250, 249, 245, 0.1)',
                width: 'fit-content',
              }}
            >
              <Box sx={{ width: 7, height: 7, borderRadius: '50%', bgcolor: 'var(--color-success)' }} />
              <Typography variant="caption" sx={{ color: 'var(--color-on-dark-soft)', fontSize: '0.75rem', fontWeight: 500 }}>
                Available for new opportunities
              </Typography>
            </Box>
          </Box>

          {/* Column 2: Navigation */}
          <Box>
            <Typography
              variant="caption"
              sx={{
                color: 'var(--color-on-dark)',
                fontWeight: 600,
                fontSize: '0.75rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                display: 'block',
                mb: 2.5,
              }}
            >
              Navigation
            </Typography>
            <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0, display: 'flex', flexDirection: 'column', gap: 1.75 }}>
              {footerColumns.navigation.map((item) => (
                <Box component="li" key={item.name}>
                  <Link
                    href={item.href}
                    underline="none"
                    sx={{
                      color: 'var(--color-on-dark-soft)',
                      fontSize: '0.875rem',
                      transition: 'color 0.2s ease-in-out',
                      '&:hover': { color: 'var(--color-on-dark)' },
                    }}
                  >
                    {item.name}
                  </Link>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Column 3: Resources & Writing */}
          <Box>
            <Typography
              variant="caption"
              sx={{
                color: 'var(--color-on-dark)',
                fontWeight: 600,
                fontSize: '0.75rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                display: 'block',
                mb: 2.5,
              }}
            >
              Resources
            </Typography>
            <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0, display: 'flex', flexDirection: 'column', gap: 1.75 }}>
              {footerColumns.resources.map((item) => (
                <Box component="li" key={item.name}>
                  <Link
                    href={item.href}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                    underline="none"
                    sx={{
                      color: 'var(--color-on-dark-soft)',
                      fontSize: '0.875rem',
                      transition: 'color 0.2s ease-in-out',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 0.5,
                      '&:hover': { color: 'var(--color-on-dark)' },
                    }}
                  >
                    {item.name}
                    {item.external && <ArrowUpRight size={13} style={{ opacity: 0.7 }} />}
                  </Link>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Column 4: Connect & Work */}
          <Box>
            <Typography
              variant="caption"
              sx={{
                color: 'var(--color-on-dark)',
                fontWeight: 600,
                fontSize: '0.75rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                display: 'block',
                mb: 2.5,
              }}
            >
              Connect & Work
            </Typography>
            <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0, display: 'flex', flexDirection: 'column', gap: 1.75 }}>
              {footerColumns.contact.map((item) => (
                <Box component="li" key={item.name}>
                  <Link
                    href={item.href}
                    underline="none"
                    sx={{
                      color: 'var(--color-on-dark-soft)',
                      fontSize: '0.875rem',
                      transition: 'color 0.2s ease-in-out',
                      '&:hover': { color: 'var(--color-on-dark)' },
                    }}
                  >
                    {item.name}
                  </Link>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>

        {/* Divider */}
        <Divider sx={{ borderColor: 'rgba(250, 249, 245, 0.08)', mb: 4 }} />

        {/* Bottom Bar: Copyright, Social Media & Back to Top */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column-reverse', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', sm: 'center' },
            gap: 2.5,
          }}
        >
          {/* Copyright with discreet admin portal access */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
            <Typography variant="body2" sx={{ color: 'var(--color-muted-soft)', fontSize: '0.8125rem' }}>
              &copy; {new Date().getFullYear()} Hasib Ashari. Built with Claude Editorial Design System.
            </Typography>
            <Link
              href="/admin"
              sx={{
                color: 'var(--color-muted-soft)',
                opacity: 0.2,
                textDecoration: 'none',
                fontSize: '0.75rem',
                transition: 'opacity 0.2s ease',
                '&:hover': { opacity: 0.8 },
              }}
              aria-label="Admin Workspace"
            >
              •
            </Link>
          </Box>

          {/* Social Media Links & Back to Top */}
          <Box sx={{ display: 'flex', gap: 3, alignItems: 'center', flexWrap: 'wrap' }}>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Link href="mailto:hasibashari@gmail.com" sx={{ color: 'var(--color-on-dark-soft)', '&:hover': { color: 'var(--color-on-dark)' }, display: 'flex', alignItems: 'center' }} aria-label="Email">
                <Mail size={17} />
              </Link>
              <Link href="https://github.com" target="_blank" rel="noopener noreferrer" sx={{ color: 'var(--color-on-dark-soft)', '&:hover': { color: 'var(--color-on-dark)' }, display: 'flex', alignItems: 'center' }} aria-label="GitHub">
                <FaGithub size={17} />
              </Link>
              <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer" sx={{ color: 'var(--color-on-dark-soft)', '&:hover': { color: 'var(--color-on-dark)' }, display: 'flex', alignItems: 'center' }} aria-label="LinkedIn">
                <FaLinkedin size={17} />
              </Link>
              <Link href="#hero" sx={{ color: 'var(--color-on-dark-soft)', '&:hover': { color: 'var(--color-on-dark)' }, display: 'flex', alignItems: 'center' }} aria-label="Global Portfolio">
                <Globe size={17} />
              </Link>
            </Box>

            <Box sx={{ width: '1px', height: '14px', bgcolor: 'rgba(250, 249, 245, 0.15)', display: { xs: 'none', sm: 'block' } }} />

            <Link
              href="#hero"
              underline="none"
              sx={{
                color: 'var(--color-on-dark-soft)',
                fontSize: '0.8125rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.5,
                transition: 'color 0.2s ease-in-out',
                '&:hover': { color: 'var(--color-on-dark)' },
              }}
            >
              Back to top <ArrowUp size={13} />
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
