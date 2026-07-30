'use client'

import { useState } from 'react'
import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material'
import { Menu, X, ArrowRight, Mail } from 'lucide-react'
import ClaudeSpikeLogo from './ClaudeSpikeLogo'
import { cn } from '../utils/cn'

const navigation = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Blog', href: '#blog' },
]

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: '#faf9f5',
          borderBottom: '1px solid #e6dfd8',
          color: '#141413',
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Container maxWidth="xl" disableGutters sx={{ px: { xs: 2.5, sm: 4, lg: 6 } }}>
          <Toolbar disableGutters sx={{ height: 64, justifyContent: 'space-between' }}>
            {/* Left: Brand Logo & Portfolio Name */}
            <Box component="a" href="#" sx={{ display: 'flex', alignItems: 'center', gap: 1.5, textDecoration: 'none' }}>
              <ClaudeSpikeLogo size={22} color="#141413" />
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography
                  variant="h6"
                  className="font-serif-display"
                  sx={{
                    fontWeight: 600,
                    fontSize: '1.1875rem',
                    lineHeight: 1.1,
                    letterSpacing: '-0.02em',
                    color: '#141413',
                  }}
                >
                  Hasib Ashari
                </Typography>
                <Typography variant="caption" sx={{ color: '#6c6a64', fontSize: '0.75rem', fontWeight: 500 }}>
                  Software Engineer
                </Typography>
              </Box>
            </Box>

            {/* Desktop Navigation Links */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 3.5 }}>
              {navigation.map((item) => (
                <Typography
                  key={item.name}
                  component="a"
                  href={item.href}
                  className={cn('text-sm font-medium text-[#3d3d3a] hover:text-[#141413] transition-colors text-decoration-none')}
                  sx={{ textDecoration: 'none', fontSize: '0.875rem' }}
                >
                  {item.name}
                </Typography>
              ))}
            </Box>

            {/* Right: Action CTA */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Button
                component="a"
                href="#contact"
                variant="text"
                className={cn('hidden sm:inline-flex text-[#141413] hover:text-[#cc785c] font-medium')}
                sx={{ textTransform: 'none', color: '#141413', display: { xs: 'none', sm: 'inline-flex' } }}
              >
                Contact
              </Button>

              <Button
                component="a"
                href="#contact"
                variant="contained"
                disableElevation
                className={cn('bg-[#cc785c] hover:bg-[#a9583e] text-white font-medium px-4 py-2 rounded-md transition-all shadow-none')}
                sx={{
                  bgcolor: '#cc785c',
                  color: '#ffffff',
                  borderRadius: '8px',
                  textTransform: 'none',
                  fontWeight: 500,
                  px: 2.5,
                  py: 1,
                  '&:hover': { bgcolor: '#a9583e' },
                }}
              >
                Hire Me
              </Button>

              {/* Mobile menu toggle */}
              <IconButton
                aria-label="open drawer"
                edge="end"
                onClick={() => setMobileMenuOpen(true)}
                sx={{ display: { xs: 'flex', md: 'none' }, color: '#141413' }}
              >
                <Menu size={22} />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        ModalProps={{ keepMounted: true }}
        slotProps={{
          paper: {
            sx: {
              width: '100%',
              maxWidth: 320,
              bgcolor: '#faf9f5',
              p: 3,
              backgroundImage: 'none',
            },
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <ClaudeSpikeLogo size={20} color="#141413" />
            <Box>
              <Typography variant="h6" className="font-serif-display" sx={{ fontWeight: 600, color: '#141413', fontSize: '1.0625rem' }}>
                Hasib Ashari
              </Typography>
              <Typography variant="caption" sx={{ color: '#6c6a64', fontSize: '0.75rem' }}>
                Software Engineer
              </Typography>
            </Box>
          </Box>
          <IconButton onClick={() => setMobileMenuOpen(false)} sx={{ color: '#141413' }}>
            <X size={20} />
          </IconButton>
        </Box>

        <List sx={{ pt: 1, borderBottom: '1px solid #e6dfd8' }}>
          {navigation.map((item) => (
            <ListItem key={item.name} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                component="a"
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                sx={{ borderRadius: 1, '&:hover': { bgcolor: '#efe9de' } }}
              >
                <ListItemText
                  primary={item.name}
                  slotProps={{ primary: { sx: { fontWeight: 500, color: '#141413' } } }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Box sx={{ mt: 3 }}>
          <Button
            component="a"
            href="#contact"
            variant="contained"
            disableElevation
            fullWidth
            onClick={() => setMobileMenuOpen(false)}
            sx={{
              bgcolor: '#cc785c',
              color: '#ffffff',
              borderRadius: '8px',
              textTransform: 'none',
              py: 1.25,
              fontWeight: 500,
              '&:hover': { bgcolor: '#a9583e' },
            }}
          >
            Hire Me <Mail size={16} style={{ marginLeft: 8 }} />
          </Button>
        </Box>
      </Drawer>
    </>
  )
}
