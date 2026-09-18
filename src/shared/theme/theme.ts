import { createTheme } from '@mui/material/styles';

export const claudeTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#cc785c', // fallback + token var(--color-primary)
      dark: '#a9583e', // var(--color-primary-active)
      light: '#e8a55a', // var(--color-accent-amber)
      contrastText: '#ffffff',
    },
    background: {
      default: '#faf9f5', // var(--color-canvas)
      paper: '#efe9de', // var(--color-surface-card)
    },
    text: {
      primary: '#141413', // var(--color-ink)
      secondary: '#6c6a64', // var(--color-muted)
    },
    divider: '#e6dfd8', // var(--color-hairline)
  },
  typography: {
    fontFamily: 'var(--font-sans), Inter, sans-serif',
    h1: {
      fontFamily: 'var(--font-serif), "Cormorant Garamond", Georgia, serif',
      fontWeight: 400,
      letterSpacing: '-0.025em',
      color: 'var(--color-ink)',
    },
    h2: {
      fontFamily: 'var(--font-serif), "Cormorant Garamond", Georgia, serif',
      fontWeight: 400,
      letterSpacing: '-0.02em',
      color: 'var(--color-ink)',
    },
    h3: {
      fontFamily: 'var(--font-serif), "Cormorant Garamond", Georgia, serif',
      fontWeight: 400,
      letterSpacing: '-0.015em',
      color: 'var(--color-ink)',
    },
    h4: {
      fontFamily: 'var(--font-sans), Inter, sans-serif',
      fontWeight: 500,
      color: 'var(--color-ink)',
    },
    button: {
      fontFamily: 'var(--font-sans), Inter, sans-serif',
      fontWeight: 500,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 8,
  },
});

// Maintaining lightTheme and darkTheme exports for compatibility
export const lightTheme = claudeTheme;
export const darkTheme = claudeTheme;
