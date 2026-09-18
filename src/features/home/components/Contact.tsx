'use client';

import { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  TextField,
  Typography,
} from '@mui/material';
import { CheckCircle2, Sparkles, Send, Mail, MapPin, Phone, RefreshCw } from 'lucide-react';
import ScrollReveal from '@/shared/components/ScrollReveal';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Please fill in all fields before sending.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to send message. Please try again.');
      }

      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : 'An unexpected error occurred. Please try again or email directly.';
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setErrorMessage(null);
  };

  return (
    <Box
      id='contact'
      sx={{
        bgcolor: 'var(--color-canvas)',
        py: { xs: 8, sm: 10, md: 12 },
      }}
    >
      <Container maxWidth='lg' sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
        <ScrollReveal variant='zoom-in' duration={0.65}>
          {/* Full-Bleed Coral Callout Card */}
          <Box
            sx={{
              bgcolor: 'var(--color-primary)',
              borderRadius: '16px',
              p: { xs: 2.5, sm: 4, md: 6 },
              color: 'var(--color-on-primary)',
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' },
              gap: { xs: 4, lg: 6 },
              alignItems: 'center',
              boxShadow: '0 20px 40px -10px rgba(204, 120, 92, 0.3)',
            }}
          >
            {/* Left: Headline & Contact Info */}
            <Box>
              <Box sx={{ mb: 3, display: 'inline-flex' }}>
                <Box
                  sx={{
                    bgcolor: 'rgba(255, 255, 255, 0.2)',
                    color: '#ffffff',
                    fontWeight: 600,
                    fontSize: '0.75rem',
                    letterSpacing: '0.05em',
                    py: 0.75,
                    px: 1.75,
                    borderRadius: '9999px',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <Sparkles size={14} color='#ffffff' style={{ flexShrink: 0 }} />
                  <Typography
                    variant='caption'
                    sx={{ color: '#ffffff', fontWeight: 600, lineHeight: 1 }}
                  >
                    GET IN TOUCH
                  </Typography>
                </Box>
              </Box>

              <Typography
                variant='h2'
                className='font-serif-display'
                sx={{
                  fontSize: { xs: '2rem', sm: '2.75rem', md: '3.25rem' },
                  fontWeight: 400,
                  lineHeight: 1.12,
                  letterSpacing: '-0.025em',
                  color: '#ffffff',
                  mb: 2.5,
                }}
              >
                Let&apos;s work together.
              </Typography>

              <Typography
                variant='body1'
                sx={{
                  fontSize: '1.125rem',
                  color: 'rgba(255, 255, 255, 0.9)',
                  lineHeight: 1.6,
                  maxWidth: '500px',
                  mb: 4,
                }}
              >
                Whether you have an associate/junior cloud engineering role, backend opportunity, or
                a technical collaboration, I&apos;d love to connect.
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box
                  component='a'
                  href='mailto:hasibashari@gmail.com'
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    textDecoration: 'none',
                    color: '#ffffff',
                    transition: 'opacity 0.2s',
                    '&:hover': { opacity: 0.85 },
                  }}
                >
                  <Mail size={18} color='#ffffff' style={{ flexShrink: 0 }} />
                  <Typography variant='body2' sx={{ color: '#ffffff', fontWeight: 500 }}>
                    hasibashari@gmail.com
                  </Typography>
                </Box>
                <Box
                  component='a'
                  href='tel:+6281513869744'
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    textDecoration: 'none',
                    color: '#ffffff',
                    transition: 'opacity 0.2s',
                    '&:hover': { opacity: 0.85 },
                  }}
                >
                  <Phone size={18} color='#ffffff' style={{ flexShrink: 0 }} />
                  <Typography variant='body2' sx={{ color: '#ffffff', fontWeight: 500 }}>
                    +62 815-1386-9744
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <MapPin size={18} color='#ffffff' style={{ flexShrink: 0 }} />
                  <Typography variant='body2' sx={{ color: '#ffffff', fontWeight: 500 }}>
                    Indonesia (Available for Global & Remote Work)
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Right: Interactive Contact Form */}
            <Box
              sx={{
                bgcolor: 'var(--color-canvas)',
                borderRadius: '12px',
                p: { xs: 2.5, sm: 3.5, md: 4 },
                color: 'var(--color-ink)',
              }}
            >
              {submitted ? (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <CheckCircle2
                    size={48}
                    color='#5db872'
                    style={{ margin: '0 auto 16px', display: 'block' }}
                  />
                  <Typography
                    variant='h5'
                    className='font-serif-display'
                    sx={{ fontWeight: 600, mb: 1, color: 'var(--color-ink)' }}
                  >
                    Message Sent Successfully!
                  </Typography>
                  <Typography variant='body2' sx={{ color: 'var(--color-body)', mb: 3 }}>
                    Thank you for reaching out! Your message has been delivered to Hasib, and you
                    will receive a reply within 24 hours.
                  </Typography>
                  <Button
                    variant='outlined'
                    size='small'
                    onClick={handleReset}
                    startIcon={<RefreshCw size={14} />}
                    sx={{
                      color: 'var(--color-ink)',
                      borderColor: 'var(--color-hairline)',
                      textTransform: 'none',
                      borderRadius: '8px',
                      '&:hover': {
                        borderColor: 'var(--color-primary)',
                        bgcolor: 'var(--color-surface-card)',
                      },
                    }}
                  >
                    Send Another Message
                  </Button>
                </Box>
              ) : (
                <form onSubmit={handleSubmit}>
                  <Typography
                    variant='h6'
                    className='font-serif-display'
                    sx={{ fontWeight: 600, mb: 1, color: 'var(--color-ink)' }}
                  >
                    Send a Message
                  </Typography>
                  <Typography variant='body2' sx={{ color: 'var(--color-muted)', mb: 2.5 }}>
                    Fill out the form below and I&apos;ll respond within 24 hours.
                  </Typography>

                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                    {errorMessage && (
                      <Alert
                        severity='error'
                        sx={{
                          borderRadius: '8px',
                          fontSize: '0.875rem',
                        }}
                        onClose={() => setErrorMessage(null)}
                      >
                        {errorMessage}
                      </Alert>
                    )}

                    <TextField
                      fullWidth
                      label='Your Name'
                      required
                      disabled={isSubmitting}
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      variant='outlined'
                      size='small'
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          bgcolor: '#ffffff',
                          borderRadius: '8px',
                          '& fieldset': { borderColor: 'var(--color-hairline)' },
                          '&:hover fieldset': { borderColor: 'var(--color-primary)' },
                          '&.Mui-focused fieldset': { borderColor: 'var(--color-primary)' },
                        },
                      }}
                    />

                    <TextField
                      fullWidth
                      label='Your Email'
                      type='email'
                      required
                      disabled={isSubmitting}
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      variant='outlined'
                      size='small'
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          bgcolor: '#ffffff',
                          borderRadius: '8px',
                          '& fieldset': { borderColor: 'var(--color-hairline)' },
                          '&:hover fieldset': { borderColor: 'var(--color-primary)' },
                          '&.Mui-focused fieldset': { borderColor: 'var(--color-primary)' },
                        },
                      }}
                    />

                    <TextField
                      fullWidth
                      label='Message / Project Brief'
                      required
                      multiline
                      rows={4}
                      disabled={isSubmitting}
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      variant='outlined'
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          bgcolor: '#ffffff',
                          borderRadius: '8px',
                          '& fieldset': { borderColor: 'var(--color-hairline)' },
                          '&:hover fieldset': { borderColor: 'var(--color-primary)' },
                          '&.Mui-focused fieldset': { borderColor: 'var(--color-primary)' },
                        },
                      }}
                    />

                    <Button
                      type='submit'
                      variant='contained'
                      disableElevation
                      disabled={isSubmitting}
                      fullWidth
                      endIcon={
                        isSubmitting ? (
                          <CircularProgress size={16} color='inherit' />
                        ) : (
                          <Send size={16} />
                        )
                      }
                      sx={{
                        bgcolor: 'var(--color-primary)',
                        color: 'var(--color-on-primary)',
                        py: 1.5,
                        borderRadius: '8px',
                        textTransform: 'none',
                        fontWeight: 500,
                        fontSize: '0.9375rem',
                        boxShadow: 'none',
                        transition: 'all 0.2s ease-in-out',
                        '&:hover': {
                          bgcolor: 'var(--color-primary-active)',
                          transform: 'translateY(-1px)',
                        },
                        '&.Mui-disabled': {
                          bgcolor: 'rgba(204, 120, 92, 0.6)',
                          color: 'rgba(255, 255, 255, 0.8)',
                        },
                      }}
                    >
                      {isSubmitting ? 'Sending Message...' : 'Send Message'}
                    </Button>
                  </Box>
                </form>
              )}
            </Box>
          </Box>
        </ScrollReveal>
      </Container>
    </Box>
  );
}
