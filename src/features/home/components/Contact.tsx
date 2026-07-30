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
import { cn } from '../../../shared/utils/cn'

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
    <Box id="contact" className={cn('bg-[#faf9f5] py-20')} sx={{ bgcolor: '#faf9f5', py: { xs: 8, md: 14 } }}>
      <Container maxWidth="xl" sx={{ px: { xs: 3, sm: 4, lg: 6 } }}>
        {/* Full-Bleed Coral Callout Card */}
        <Box
          sx={{
            bgcolor: '#cc785c',
            borderRadius: '16px',
            p: { xs: 4, sm: 6, md: 8 },
            color: '#ffffff',
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' },
            gap: 6,
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
              Let's work together.
            </Typography>

            <Typography variant="body1" sx={{ fontSize: '1.125rem', color: 'rgba(255, 255, 255, 0.9)', lineHeight: 1.6, maxWidth: '500px', mb: 4 }}>
              Whether you have a new web application project, technical consulting inquiry, or a software engineering role, I'd love to connect.
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
              bgcolor: '#faf9f5',
              borderRadius: '12px',
              p: { xs: 3.5, sm: 4.5 },
              color: '#141413',
            }}
          >
            {submitted ? (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <CheckCircle2 size={48} color="#5db872" style={{ margin: '0 auto 16px', display: 'block' }} />
                <Typography variant="h5" className="font-serif-display" sx={{ fontWeight: 600, mb: 1, color: '#141413' }}>
                  Message Sent Successfully!
                </Typography>
                <Typography variant="body2" sx={{ color: '#3d3d3a' }}>
                  Thank you for reaching out, Hasib will get back to you within 24 hours.
                </Typography>
              </Box>
            ) : (
              <form onSubmit={handleSubmit}>
                <Typography variant="h6" className="font-serif-display" sx={{ fontWeight: 600, mb: 1, color: '#141413' }}>
                  Send a Message
                </Typography>
                <Typography variant="body2" sx={{ color: '#6c6a64', mb: 3 }}>
                  Fill out the form below and I'll respond within 24 hours.
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
                        '& fieldset': { borderColor: '#e6dfd8' },
                        '&:hover fieldset': { borderColor: '#cc785c' },
                        '&.Mui-focused fieldset': { borderColor: '#cc785c' },
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
                        '& fieldset': { borderColor: '#e6dfd8' },
                        '&:hover fieldset': { borderColor: '#cc785c' },
                        '&.Mui-focused fieldset': { borderColor: '#cc785c' },
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
                        '& fieldset': { borderColor: '#e6dfd8' },
                        '&:hover fieldset': { borderColor: '#cc785c' },
                        '&.Mui-focused fieldset': { borderColor: '#cc785c' },
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
                      bgcolor: '#cc785c',
                      color: '#ffffff',
                      py: 1.5,
                      borderRadius: '8px',
                      textTransform: 'none',
                      fontWeight: 500,
                      fontSize: '0.9375rem',
                      '&:hover': { bgcolor: '#a9583e' },
                    }}
                  >
                    Send Message
                  </Button>
                </Box>
              </form>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
