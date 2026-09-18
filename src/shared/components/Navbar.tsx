'use client';

import { useState, useEffect } from 'react';
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
} from '@mui/material';
import { Menu, X, Mail, Download } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';
import { nav } from '@/shared/constants/nav';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const pathname = usePathname();

  const isHomePage = pathname === '/';
  const isProjectsPage = pathname === '/projects' || pathname.startsWith('/projects');
  const isBlogPage = pathname === '/blog' || pathname.startsWith('/blog');
  const getHref = (href: string) => (isHomePage ? href : `/${href}`);

  const isItemActive = (href: string) => {
    const sectionId = href.startsWith('#') ? href.substring(1) : href;
    if (sectionId === 'projects' && isProjectsPage) {
      return true;
    }
    if (sectionId === 'blog' && isBlogPage) {
      return true;
    }
    return isHomePage && activeSection === sectionId;
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isHomePage) return;

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const sectionsToObserve = [...nav.map(item => item.href.substring(1)), 'hero'];
    sectionsToObserve.forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [isHomePage]);

  return (
    <>
      <AppBar
        position='sticky'
        elevation={0}
        sx={{
          top: 0,
          bgcolor: isScrolled ? 'rgba(250, 249, 245, 0.85)' : 'var(--color-canvas)',
          backdropFilter: isScrolled ? 'blur(12px)' : 'none',
          borderBottom: isScrolled ? '1px solid rgba(230, 223, 216, 0.8)' : '1px solid transparent',
          boxShadow: isScrolled ? '0 4px 30px -10px rgba(0,0,0,0.1)' : 'none',
          color: 'var(--color-ink)',
          transition: 'all 0.3s ease-in-out',
        }}
      >
        <Container maxWidth='lg' disableGutters sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
          <Toolbar disableGutters sx={{ height: 64, justifyContent: 'space-between' }}>
            {/* Left: Brand Logo & Portfolio Name */}
            <Box
              component={Link}
              href='/'
              sx={{ display: 'flex', alignItems: 'center', gap: 1.5, textDecoration: 'none' }}
            >
              <Logo size={22} color='#141413' />
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography
                  variant='h6'
                  className='font-serif-display'
                  sx={{
                    fontWeight: 600,
                    fontSize: '1.1875rem',
                    lineHeight: 1.1,
                    letterSpacing: '-0.02em',
                    color: 'var(--color-ink)',
                  }}
                >
                  Hasib Ashari
                </Typography>
              </Box>
            </Box>

            {/* Desktop Navigation Links */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 3.5 }}>
              {nav.map(item => {
                const isActive = isItemActive(item.href);
                return (
                  <Typography
                    key={item.name}
                    component='a'
                    href={getHref(item.href)}
                    sx={{
                      textDecoration: 'none',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      position: 'relative',
                      color: isActive ? 'var(--color-ink)' : 'var(--color-body)',
                      transition: 'color 0.2s ease-in-out',
                      '&:hover': {
                        color: 'var(--color-ink)',
                      },
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        width: isActive ? '100%' : '0%',
                        height: '2px',
                        bottom: '-4px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        backgroundColor: 'var(--color-primary)',
                        transition: 'width 0.3s ease-in-out',
                      },
                      '&:hover::after': {
                        width: '100%',
                      },
                    }}
                  >
                    {item.name}
                  </Typography>
                );
              })}
            </Box>

            {/* Right: Action CTA */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Button
                component='a'
                href={getHref('#contact')}
                variant='contained'
                disableElevation
                sx={{
                  display: { xs: 'none', md: 'inline-flex' },
                  bgcolor: 'var(--color-primary)',
                  color: 'var(--color-on-primary)',
                  borderRadius: '8px',
                  textTransform: 'none',
                  fontWeight: 500,
                  px: 2.5,
                  py: 1,
                  boxShadow: 'none',
                  '&:hover': { bgcolor: 'var(--color-primary-active)' },
                }}
              >
                Hire Me
              </Button>

              {/* Mobile menu toggle */}
              <IconButton
                aria-label='toggle drawer'
                edge='end'
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                sx={{ display: { xs: 'flex', md: 'none' }, color: 'var(--color-ink)' }}
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor='right'
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        ModalProps={{ keepMounted: true }}
        slotProps={{
          paper: {
            sx: {
              width: '100%',
              maxWidth: 320,
              bgcolor: 'var(--color-canvas)',
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
            component='a'
            href={getHref('#contact')}
            variant='contained'
            disableElevation
            onClick={() => setMobileMenuOpen(false)}
            sx={{
              bgcolor: 'var(--color-primary)',
              color: 'var(--color-on-primary)',
              borderRadius: '8px',
              textTransform: 'none',
              px: 3,
              py: 1,
              fontWeight: 500,
              '&:hover': { bgcolor: 'var(--color-primary-active)' },
            }}
          >
            Hire Me <Mail size={16} style={{ marginLeft: 8 }} />
          </Button>
          <IconButton onClick={() => setMobileMenuOpen(false)} sx={{ color: 'var(--color-ink)' }}>
            <X size={24} />
          </IconButton>
        </Box>

        <List sx={{ pt: 1, borderBottom: '1px solid var(--color-hairline)' }}>
          {nav.map(item => {
            const isActive = isItemActive(item.href);
            return (
              <ListItem key={item.name} disablePadding sx={{ mb: 1 }}>
                <ListItemButton
                  component='a'
                  href={getHref(item.href)}
                  onClick={() => setMobileMenuOpen(false)}
                  sx={{
                    borderRadius: 1,
                    bgcolor: isActive ? 'var(--color-surface-card)' : 'transparent',
                    '&:hover': { bgcolor: 'var(--color-surface-card)' },
                  }}
                >
                  <ListItemText
                    primary={item.name}
                    slotProps={{
                      primary: {
                        sx: {
                          fontWeight: 500,
                          color: isActive ? 'var(--color-primary)' : 'var(--color-ink)',
                        },
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>

        {/* Drawer Footer / Socials */}
        <Box sx={{ mt: 'auto', pt: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography
            variant='caption'
            sx={{
              color: 'var(--color-muted-soft)',
              fontWeight: 500,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
            }}
          >
            Let&apos;s Connect
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <IconButton
              component='a'
              href='https://github.com'
              target='_blank'
              sx={{
                color: 'var(--color-body)',
                bgcolor: 'var(--color-surface-card)',
                borderRadius: '8px',
                '&:hover': { bgcolor: 'var(--color-hairline)', color: 'var(--color-ink)' },
              }}
            >
              <FaGithub size={20} />
            </IconButton>
            <IconButton
              component='a'
              href='https://linkedin.com'
              target='_blank'
              sx={{
                color: 'var(--color-body)',
                bgcolor: 'var(--color-surface-card)',
                borderRadius: '8px',
                '&:hover': { bgcolor: 'var(--color-hairline)', color: 'var(--color-ink)' },
              }}
            >
              <FaLinkedin size={20} />
            </IconButton>
            <IconButton
              component='a'
              href={getHref('#contact')}
              onClick={() => setMobileMenuOpen(false)}
              sx={{
                color: 'var(--color-body)',
                bgcolor: 'var(--color-surface-card)',
                borderRadius: '8px',
                '&:hover': { bgcolor: 'var(--color-hairline)', color: 'var(--color-ink)' },
              }}
            >
              <Mail size={20} />
            </IconButton>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
