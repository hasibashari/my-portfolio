'use client'

import { useState } from 'react'
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from '@mui/material'
import { CheckCircle2, Sparkles, Send, Mail, MapPin } from 'lucide-react'
import ScrollReveal from '../../../shared/components/ScrollReveal'

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.email && formData.message) {
      setSubmitted(true)
    }
  }

  return (
    <Box
      id="contact"
      sx={{
        bgcolor: 'var(--color-canvas)',
        py: { xs: 8, sm: 10, md: 12 },
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
        <ScrollReveal variant="zoom-in" duration={0.65}>
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
                  <Sparkles size={14} color="#ffffff" style={{ flexShrink: 0 }} />
                  <Typography variant="caption" sx={{ color: '#ffffff', fontWeight: 600, lineHeight: 1 }}>
                    GET IN TOUCH
                  </Typography>
                </Box>
              </Box>

              <Typography
                variant="h2"
                className="font-serif-display"
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

              <Typography variant="body1" sx={{ fontSize: '1.125rem', color: 'rgba(255, 255, 255, 0.9)', lineHeight: 1.6, maxWidth: '500px', mb: 4 }}>
                Whether you have a new web application project, technical consulting inquiry, or a software engineering role, I&apos;d love to connect.
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Mail size={18} color="#ffffff" style={{ flexShrink: 0 }} />
                  <Typography variant="body2" sx={{ color: '#ffffff', fontWeight: 500 }}>
                    hasib.ashari@example.com
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <MapPin size={18} color="#ffffff" style={{ flexShrink: 0 }} />
                  <Typography variant="body2" sx={{ color: '#ffffff', fontWeight: 500 }}>
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
                  <CheckCircle2 size={48} color="#5db872" style={{ margin: '0 auto 16px', display: 'block' }} />
                  <Typography variant="h5" className="font-serif-display" sx={{ fontWeight: 600, mb: 1, color: 'var(--color-ink)' }}>
                    Message Sent Successfully!
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'var(--color-body)' }}>
                    Thank you for reaching out, Hasib will get back to you within 24 hours.
                  </Typography>
                </Box>
              ) : (
                <form onSubmit={handleSubmit}>
                  <Typography variant="h6" className="font-serif-display" sx={{ fontWeight: 600, mb: 1, color: 'var(--color-ink)' }}>
                    Send a Message
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'var(--color-muted)', mb: 3 }}>
                    Fill out the form below and I&apos;ll respond within 24 hours.
                  </Typography>

                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                    <TextField
                      fullWidth
                      label="Your Name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      variant="outlined"
                      size="small"
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
                      label="Your Email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      variant="outlined"
                      size="small"
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
                      label="Message / Project Brief"
                      required
                      multiline
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      variant="outlined"
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
                      type="submit"
                      variant="contained"
                      disableElevation
                      fullWidth
                      endIcon={<Send size={16} />}
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
                        '&:hover': { bgcolor: 'var(--color-primary-active)', transform: 'translateY(-1px)' },
                      }}
                    >
                      Send Message
                    </Button>
                  </Box>
                </form>
              )}
            </Box>
          </Box>
        </ScrollReveal>
      </Container>
    </Box>
  )
}
