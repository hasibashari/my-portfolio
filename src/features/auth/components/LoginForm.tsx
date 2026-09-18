'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import NextLink from 'next/link'
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Alert,
  CircularProgress,
  IconButton,
  InputAdornment,
} from '@mui/material'
import { Lock, Eye, EyeOff, ArrowLeft, ShieldCheck, Sparkles } from 'lucide-react'
import { loginAdmin } from '../services/auth.service'
import Logo from '@/shared/components/Logo'

export default function LoginForm() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!password.trim()) {
      setError('Please enter your workspace password.')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const result = await loginAdmin(password)

      if (result.success) {
        // Redirect to dashboard
        router.push('/admin')
        router.refresh()
      } else {
        setError(result.error || 'Authentication failed. Incorrect password.')
      }
    } catch {
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Paper
      elevation={0}
      sx={{
        width: '100%',
        maxWidth: 440,
        bgcolor: 'var(--color-surface-card)',
        borderRadius: '16px',
        border: '1px solid var(--color-hairline)',
        p: { xs: 3.5, sm: 4.5 },
        boxShadow: '0 20px 40px -15px rgba(20, 20, 19, 0.08)',
        position: 'relative',
      }}
    >
      {/* Brand Header */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', mb: 3.5 }}>
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: '12px',
            bgcolor: 'var(--color-canvas)',
            border: '1px solid var(--color-hairline)',
            display: 'grid',
            placeItems: 'center',
            mb: 2,
            boxShadow: '0 2px 8px -2px rgba(20, 20, 19, 0.05)',
          }}
        >
          <Logo size={24} color="#cc785c" />
        </Box>

        <Typography
          variant="h4"
          className="font-serif-display"
          sx={{
            fontSize: { xs: '1.5rem', sm: '1.75rem' },
            fontWeight: 600,
            color: 'var(--color-ink)',
            letterSpacing: '-0.02em',
            mb: 1,
          }}
        >
          Admin Workspace
        </Typography>

        <Typography
          variant="body2"
          sx={{ color: 'var(--color-muted)', fontSize: '0.875rem', lineHeight: 1.5, maxWidth: '320px' }}
        >
          Enter your master passkey to access portfolio content management.
        </Typography>
      </Box>

      {/* Error Alert */}
      {error && (
        <Alert
          severity="error"
          sx={{
            mb: 3,
            borderRadius: '8px',
            fontSize: '0.875rem',
            bgcolor: 'rgba(239, 68, 68, 0.08)',
            color: '#dc2626',
            border: '1px solid rgba(239, 68, 68, 0.2)',
          }}
        >
          {error}
        </Alert>
      )}

      {/* Form */}
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="caption"
            sx={{
              color: 'var(--color-ink)',
              fontWeight: 600,
              fontSize: '0.8125rem',
              display: 'block',
              mb: 1,
            }}
          >
            Workspace Passkey
          </Typography>

          <TextField
            fullWidth
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            autoFocus
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock size={18} color="var(--color-muted)" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      size="small"
                      sx={{ color: 'var(--color-muted)' }}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </IconButton>
                  </InputAdornment>
                ),
                sx: {
                  bgcolor: 'var(--color-canvas)',
                  borderRadius: '8px',
                  color: 'var(--color-ink)',
                  fontSize: '0.9375rem',
                  '& fieldset': { borderColor: 'var(--color-hairline)' },
                  '&:hover fieldset': { borderColor: 'var(--color-primary)' },
                  '&.Mui-focused fieldset': { borderColor: 'var(--color-primary)' },
                },
              },
            }}
          />
        </Box>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          disableElevation
          disabled={loading || !password.trim()}
          startIcon={loading ? <CircularProgress size={18} color="inherit" /> : <ShieldCheck size={18} />}
          sx={{
            py: 1.3,
            bgcolor: 'var(--color-primary)',
            color: 'var(--color-on-primary)',
            borderRadius: '8px',
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '0.9375rem',
            boxShadow: '0 4px 14px 0 rgba(204, 120, 92, 0.35)',
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              bgcolor: 'var(--color-primary-active)',
              boxShadow: '0 6px 20px 0 rgba(204, 120, 92, 0.45)',
            },
          }}
        >
          {loading ? 'Authenticating...' : 'Unlock Workspace'}
        </Button>
      </Box>

      {/* Footer Navigation */}
      <Box sx={{ mt: 3.5, pt: 2.5, borderTop: '1px solid var(--color-hairline)', textAlign: 'center' }}>
        <NextLink href="/" style={{ textDecoration: 'none' }}>
          <Typography
            variant="caption"
            sx={{
              color: 'var(--color-muted)',
              fontSize: '0.8125rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.5,
              transition: 'color 0.2s ease',
              '&:hover': { color: 'var(--color-ink)' },
            }}
          >
            <ArrowLeft size={14} /> Back to Public Portfolio
          </Typography>
        </NextLink>
      </Box>
    </Paper>
  )
}
