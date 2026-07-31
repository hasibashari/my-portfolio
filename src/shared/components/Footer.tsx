'use client'

import { Box, Container, Typography, Link, Divider } from '@mui/material'
import { Globe, Share2, FileText, Mail } from 'lucide-react'
import Logo from './Logo'
import { cn } from '../utils/cn'
import { footer } from '../constants/footer'

export default function Footer() {
  return (
    <Box
      component="footer"
      className={cn('bg-[#181715] text-[#a09d96] py-16')}
      sx={{ bgcolor: '#181715', color: '#a09d96', pt: 8, pb: 6 }}
    >
      <Container maxWidth="xl" sx={{ px: { xs: 3, sm: 4, lg: 6 } }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'center' }, gap: 4, mb: 6 }}>
          {/* Brand Header */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Logo size={24} color="#faf9f5" />
            <Box>
              <Typography
                variant="h6"
                className="font-serif-display"
                sx={{ fontWeight: 600, color: '#faf9f5', fontSize: '1.25rem', letterSpacing: '-0.02em' }}
              >
                Hasib Ashari
              </Typography>
              <Typography variant="caption" sx={{ color: '#a09d96', fontSize: '0.8125rem' }}>
                Software Engineer • Crafting Thoughtful Digital Products
              </Typography>
            </Box>
          </Box>

          {/* Quick Nav Links */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
            {footer.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                underline="none"
                sx={{ color: '#a09d96', fontSize: '0.875rem', '&:hover': { color: '#faf9f5' }, transition: 'color 0.2s' }}
              >
                {item.name}
              </Link>
            ))}
          </Box>
        </Box>

        <Divider sx={{ borderColor: 'rgba(250, 249, 245, 0.1)', mb: 4 }} />

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', sm: 'center' },
            gap: 2,
          }}
        >
          <Typography variant="body2" sx={{ color: '#8e8b82', fontSize: '0.8125rem' }}>
            &copy; {new Date().getFullYear()} Hasib Ashari. Built with Claude Editorial Design System.
          </Typography>

          <Box sx={{ display: 'flex', gap: 2.5, alignItems: 'center' }}>
            <Link href="mailto:hasib.ashari@example.com" sx={{ color: '#a09d96', '&:hover': { color: '#faf9f5' } }} aria-label="Email">
              <Mail size={18} />
            </Link>
            <Link href="https://github.com" target="_blank" rel="noopener noreferrer" sx={{ color: '#a09d96', '&:hover': { color: '#faf9f5' } }} aria-label="Global Portfolio">
              <Globe size={18} />
            </Link>
            <Link href="#contact" sx={{ color: '#a09d96', '&:hover': { color: '#faf9f5' } }} aria-label="Share">
              <Share2 size={18} />
            </Link>
            <Link href="#blog" sx={{ color: '#a09d96', '&:hover': { color: '#faf9f5' } }} aria-label="Articles">
              <FileText size={18} />
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
