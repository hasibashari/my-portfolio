'use client'

import { useState, useEffect } from 'react'
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
import { Menu, X, Mail } from 'lucide-react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import Logo from './Logo'
import { cn } from '../utils/cn'
import { nav } from '../constants/nav'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    const sectionsToObserve = [...nav.map(item => item.href.substring(1)), 'hero']
    sectionsToObserve.forEach((id) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [])

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          top: 0,
          bgcolor: isScrolled ? 'rgba(250, 249, 245, 0.85)' : '#faf9f5',
          backdropFilter: isScrolled ? 'blur(12px)' : 'none',
          borderBottom: isScrolled ? '1px solid rgba(230, 223, 216, 0.8)' : '1px solid transparent',
          boxShadow: isScrolled ? '0 4px 30px -10px rgba(0,0,0,0.1)' : 'none',
          color: '#141413',
          transition: 'all 0.3s ease-in-out',
        }}
      >
        <Container maxWidth="xl" disableGutters sx={{ px: { xs: 2.5, sm: 4, lg: 6 } }}>
          <Toolbar disableGutters sx={{ height: 64, justifyContent: 'space-between' }}>
            {/* Left: Brand Logo & Portfolio Name */}
            <Box component="a" href="#" sx={{ display: 'flex', alignItems: 'center', gap: 1.5, textDecoration: 'none' }}>
              <Logo size={22} color="#141413" />
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
              </Box>
            </Box>

            {/* Desktop Navigation Links */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 3.5 }}>
              {nav.map((item) => {
                const isActive = activeSection === item.href.substring(1)
                return (
                  <Typography
                    key={item.name}
                    component="a"
                    href={item.href}
                    className={cn('text-sm font-medium transition-colors text-decoration-none')}
                    sx={{
                      textDecoration: 'none',
                      fontSize: '0.875rem',
                      position: 'relative',
                      color: isActive ? '#141413' : '#3d3d3a',
                      '&:hover': {
                        color: '#141413',
                      },
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        width: isActive ? '100%' : '0%',
                        height: '2px',
                        bottom: '-4px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        backgroundColor: '#cc785c',
                        transition: 'width 0.3s ease-in-out',
                      },
                      '&:hover::after': {
                        width: '100%',
                      },
                    }}
                  >
                    {item.name}
                  </Typography>
                )
              })}
            </Box>

            {/* Right: Action CTA */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Button
                component="a"
                href="#contact"
                variant="contained"
                disableElevation
                className={cn('bg-[#cc785c] hover:bg-[#a9583e] text-white font-medium px-4 py-2 rounded-md transition-all shadow-none')}
                sx={{
                  display: { xs: 'none', md: 'inline-flex' },
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
                aria-label="toggle drawer"
                edge="end"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                sx={{ display: { xs: 'flex', md: 'none' }, color: '#141413' }}
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
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
              display: 'flex',
              flexDirection: 'column',
            },
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Button
            component="a"
            href="#contact"
            variant="contained"
            disableElevation
            onClick={() => setMobileMenuOpen(false)}
            sx={{
              bgcolor: '#cc785c',
              color: '#ffffff',
              borderRadius: '8px',
              textTransform: 'none',
              px: 3,
              py: 1,
              fontWeight: 500,
              '&:hover': { bgcolor: '#a9583e' },
            }}
          >
            Hire Me <Mail size={16} style={{ marginLeft: 8 }} />
          </Button>
          <IconButton onClick={() => setMobileMenuOpen(false)} sx={{ color: '#141413' }}>
            <X size={24} />
          </IconButton>
        </Box>

        <List sx={{ pt: 1, borderBottom: '1px solid #e6dfd8' }}>
          {nav.map((item) => {
            const isActive = activeSection === item.href.substring(1)
            return (
              <ListItem key={item.name} disablePadding sx={{ mb: 1 }}>
                <ListItemButton
                  component="a"
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  sx={{
                    borderRadius: 1,
                    bgcolor: isActive ? '#efe9de' : 'transparent',
                    '&:hover': { bgcolor: '#efe9de' }
                  }}
                >
                  <ListItemText
                    primary={item.name}
                    slotProps={{ primary: { sx: { fontWeight: 500, color: isActive ? '#cc785c' : '#141413' } } }}
                  />
                </ListItemButton>
              </ListItem>
            )
          })}
        </List>

        {/* Drawer Footer / Socials */}
        <Box sx={{ mt: 'auto', pt: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="caption" sx={{ color: '#a09d96', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Let&apos;s Connect
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <IconButton component="a" href="https://github.com" target="_blank" sx={{ color: '#3d3d3a', bgcolor: '#efe9de', borderRadius: '8px', '&:hover': { bgcolor: '#e6dfd8', color: '#141413' } }}>
              <FaGithub size={20} />
            </IconButton>
            <IconButton component="a" href="https://linkedin.com" target="_blank" sx={{ color: '#3d3d3a', bgcolor: '#efe9de', borderRadius: '8px', '&:hover': { bgcolor: '#e6dfd8', color: '#141413' } }}>
              <FaLinkedin size={20} />
            </IconButton>
            <IconButton component="a" href="#contact" onClick={() => setMobileMenuOpen(false)} sx={{ color: '#3d3d3a', bgcolor: '#efe9de', borderRadius: '8px', '&:hover': { bgcolor: '#e6dfd8', color: '#141413' } }}>
              <Mail size={20} />
            </IconButton>
          </Box>
        </Box>

      </Drawer>
    </>
  )
}
