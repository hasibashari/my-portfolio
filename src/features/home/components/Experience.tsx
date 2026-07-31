'use client'

import { Box, Container, Typography } from '@mui/material'
import { CheckCircle2 } from 'lucide-react'
import { cn } from '../../../shared/utils/cn'
import { experiences } from '../../../shared/constants/experiences'

export default function Experience() {
  return (
    <Box id="experience" className={cn('bg-[#f5f0e8] py-24 border-t border-[#e6dfd8]')} sx={{ bgcolor: '#f5f0e8', py: { xs: 10, md: 14 }, borderTop: '1px solid #e6dfd8' }}>
      <Container maxWidth="xl" sx={{ px: { xs: 3, sm: 4, lg: 6 } }}>
        <Box sx={{ textAlign: 'center', maxWidth: '720px', mx: 'auto', mb: 8 }}>
          <Typography
            variant="overline"
            className="font-serif-display"
            sx={{ color: '#cc785c', fontWeight: 600, fontSize: '0.875rem', letterSpacing: '0.1em', display: 'block', mb: 1.5 }}
          >
            CAREER TIMELINE
          </Typography>
          <Typography
            variant="h2"
            className="font-serif-display"
            sx={{
              fontSize: { xs: '2rem', sm: '2.75rem', md: '3.25rem' },
              fontWeight: 400,
              lineHeight: 1.12,
              letterSpacing: '-0.025em',
              color: '#141413',
              mb: 2.5,
            }}
          >
            Work Experience & Professional Impact.
          </Typography>
          <Typography variant="body1" sx={{ fontSize: '1.125rem', color: '#3d3d3a', lineHeight: 1.6 }}>
            My journey building software across high-growth startups and established technology teams.
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, maxWidth: '900px', mx: 'auto', position: 'relative' }}>
          {/* Vertical Timeline Line */}
          <Box
            sx={{
              position: 'absolute',
              top: '24px',
              bottom: '24px',
              left: { xs: '15px', sm: '23px' },
              width: '2px',
              bgcolor: '#e6dfd8',
              zIndex: 0,
            }}
          />
          {experiences.map((exp) => (
            <Box key={exp.role + exp.company} sx={{ position: 'relative', zIndex: 1 }}>
              {/* Timeline Dot */}
              <Box
                sx={{
                  position: 'absolute',
                  top: '28px',
                  left: { xs: '10px', sm: '18px' },
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  bgcolor: '#cc785c',
                  border: '2px solid #f5f0e8',
                  zIndex: 2,
                }}
              />
              
              <Box
                sx={{
                  ml: { xs: '40px', sm: '56px' },
                  bgcolor: '#faf9f5',
                  borderRadius: '12px',
                  border: '1px solid #e6dfd8',
                  p: { xs: 3.5, sm: 4.5 },
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    borderColor: '#cc785c',
                    boxShadow: '0 8px 24px -8px rgba(20, 20, 19, 0.08)',
                  },
                }}
              >
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, gap: 1, mb: 2 }}>
                <Box>
                  <Typography
                    variant="h5"
                    className="font-serif-display"
                    sx={{
                      fontSize: '1.375rem',
                      fontWeight: 600,
                      color: '#141413',
                      letterSpacing: '-0.015em',
                    }}
                  >
                    {exp.role}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#cc785c', fontWeight: 600, fontSize: '0.9375rem', mt: 0.25 }}>
                    {exp.company} • {exp.location}
                  </Typography>
                </Box>

                <Typography
                  variant="caption"
                  sx={{
                    bgcolor: '#efe9de',
                    color: '#141413',
                    px: 1.5,
                    py: 0.5,
                    borderRadius: '9999px',
                    fontWeight: 600,
                    fontSize: '0.8125rem',
                    border: '1px solid #e6dfd8',
                  }}
                >
                  {exp.period}
                </Typography>
              </Box>

              <Typography variant="body2" sx={{ fontSize: '0.9375rem', color: '#3d3d3a', lineHeight: 1.6, mb: 3 }}>
                {exp.description}
              </Typography>

              <Box component="ul" sx={{ m: 0, p: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 1.25 }}>
                {exp.highlights.map((item) => (
                  <Box component="li" key={item} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.25 }}>
                    <CheckCircle2 size={16} color="#cc785c" style={{ marginTop: 3, flexShrink: 0 }} />
                    <Typography variant="body2" sx={{ fontSize: '0.875rem', color: '#3d3d3a', lineHeight: 1.5 }}>
                      {item}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  )
}
