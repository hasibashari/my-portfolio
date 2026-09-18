'use client';

import { Box, Container, Typography, Card, CardContent } from '@mui/material';
import { Code2, Gauge, Palette } from 'lucide-react';
import ScrollReveal from '@/shared/components/ScrollReveal';

const principles = [
  {
    icon: Gauge,
    title: 'Cloud Architecture & AWS',
    description:
      'Designing reliable cloud environments on AWS, focusing on EC2, S3, Disaster Recovery Center (DRC) topologies, and automated backup workflows.',
  },
  {
    icon: Code2,
    title: 'Containerization & DevOps',
    description:
      'Packaging services with Docker, applying foundational Infrastructure as Code (IaC) principles, and deploying resilient systems on Linux cloud instances.',
  },
  {
    icon: Palette,
    title: 'Modular Backend APIs',
    description:
      'Developing structured RESTful APIs with Node.js, Express, and NestJS, coupled with relational database schema design using PostgreSQL.',
  },
];

export default function About() {
  return (
    <Box
      id='about'
      sx={{
        bgcolor: 'var(--color-canvas)',
        py: { xs: 8, sm: 10, md: 12 },
      }}
    >
      <Container maxWidth='lg' sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
        {/* Centered Section Header with Blur-Reveal */}
        <ScrollReveal variant='blur-reveal'>
          <Box sx={{ maxWidth: '720px', mb: { xs: 5, md: 7 }, mx: 'auto', textAlign: 'center' }}>
            <Typography
              variant='overline'
              className='font-serif-display'
              sx={{
                color: 'var(--color-primary)',
                fontWeight: 600,
                fontSize: '0.875rem',
                letterSpacing: '0.1em',
                display: 'block',
                mb: 1.5,
              }}
            >
              ABOUT MY BACKGROUND
            </Typography>
            <Typography
              variant='h2'
              className='font-serif-display'
              sx={{
                fontSize: { xs: '2rem', sm: '2.75rem', md: '3.25rem' },
                fontWeight: 400,
                lineHeight: 1.12,
                letterSpacing: '-0.025em',
                color: 'var(--color-ink)',
                mb: 2.5,
              }}
            >
              Bridging reliable cloud infrastructure with robust backend engineering.
            </Typography>
            <Typography
              variant='body1'
              sx={{ fontSize: '1.125rem', color: 'var(--color-body)', lineHeight: 1.6 }}
            >
              With practical On-the-Job Training (OJT) experience in cloud architecture and DevOps at
              Elitry, I focus on designing resilient AWS cloud environments, containerized deployments,
              and clean, modular backend APIs.
            </Typography>
          </Box>
        </ScrollReveal>

        {/* 3-Up Feature Cards Grid with Pop-Up Variant */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: { xs: 2.5, sm: 3, md: 4 },
          }}
        >
          {principles.map((item, idx) => {
            const Icon = item.icon;
            return (
              <ScrollReveal
                key={item.title}
                variant='pop-up'
                delay={idx * 0.12}
                style={{ height: '100%' }}
              >
                <Card
                  elevation={0}
                  sx={{
                    bgcolor: 'var(--color-surface-card)',
                    borderRadius: '12px',
                    border: '1px solid var(--color-hairline)',
                    p: { xs: 2.5, sm: 3.5, md: 4 },
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '100%',
                    transition: 'all 0.25s ease-in-out',
                    '&:hover': {
                      borderColor: 'var(--color-primary)',
                      transform: 'translateY(-4px)',
                      boxShadow: '0 12px 28px -6px rgba(20, 20, 19, 0.1)',
                      '& .icon-box': {
                        borderColor: 'var(--color-primary)',
                        bgcolor: '#ffffff',
                        transform: 'scale(1.08)',
                      },
                    },
                  }}
                >
                  <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
                    <Box
                      className='icon-box'
                      sx={{
                        width: 44,
                        height: 44,
                        borderRadius: '10px',
                        bgcolor: 'var(--color-canvas)',
                        border: '1px solid var(--color-hairline)',
                        display: 'grid',
                        placeItems: 'center',
                        mb: 3,
                        flexShrink: 0,
                        transition: 'all 0.2s ease-in-out',
                      }}
                    >
                      <Icon
                        size={22}
                        color='#cc785c'
                        style={{ display: 'block', margin: 'auto' }}
                      />
                    </Box>

                    <Typography
                      variant='h5'
                      className='font-serif-display'
                      sx={{
                        fontSize: '1.375rem',
                        fontWeight: 600,
                        color: 'var(--color-ink)',
                        mb: 1.5,
                        letterSpacing: '-0.015em',
                      }}
                    >
                      {item.title}
                    </Typography>

                    <Typography
                      variant='body2'
                      sx={{ fontSize: '0.9375rem', color: 'var(--color-body)', lineHeight: 1.6 }}
                    >
                      {item.description}
                    </Typography>
                  </CardContent>
                </Card>
              </ScrollReveal>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
}
