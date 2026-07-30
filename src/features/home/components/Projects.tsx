'use client'

import { useState } from 'react'
import { Box, Container, Typography, Button, Chip } from '@mui/material'
import { Code2, ExternalLink, Copy, Check } from 'lucide-react'
import { cn } from '../../../shared/utils/cn'

const projects = [
  {
    id: 'ecommerce',
    title: 'E-Commerce Platform & Checkout Suite',
    badge: 'FULL-STACK APP',
    badgeColor: '#cc785c',
    description:
      'A high-conversion e-commerce platform built with Next.js 15, Stripe payment integration, server-side search filtering, and responsive MUI/Tailwind UI.',
    techStack: ['Next.js 15', 'TypeScript', 'Stripe API', 'Tailwind CSS', 'PostgreSQL'],
    demoUrl: 'https://example.com/ecommerce-demo',
    codeSnippet: `// Next.js App Router Checkout Session Endpoint
import { Stripe } from "stripe";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { cartItems, userId } = await req.parseJson();
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: cartItems.map(item => ({ price: item.priceId, quantity: item.qty })),
    mode: "payment",
    success_url: \`\${process.env.SITE_URL}/order/success\`,
  });
  return NextResponse.json({ id: session.id });
}`,
  },
  {
    id: 'analytics',
    title: 'Realtime Analytics & Performance Dashboard',
    badge: 'DASHBOARD & DATA',
    badgeColor: '#e8a55a',
    description:
      'An enterprise metrics dashboard monitoring real-time server telemetry, user engagement graphs, and web vitals metrics with responsive charts.',
    techStack: ['React 19', 'Material UI', 'Recharts', 'Express.js', 'WebSocket'],
    demoUrl: 'https://example.com/analytics-demo',
    codeSnippet: `// Realtime Telemetry Hook with Auto-Reconnect
export function useTelemetryStream(endpoint: string) {
  const [metrics, setMetrics] = useState<MetricData[]>([]);
  useEffect(() => {
    const ws = new WebSocket(endpoint);
    ws.onmessage = (evt) => {
      const data = JSON.parse(evt.data);
      setMetrics(prev => [...prev.slice(-50), data]);
    };
    return () => ws.close();
  }, [endpoint]);
  return metrics;
}`,
  },
  {
    id: 'ai-studio',
    title: 'AI Task Automation & Prompt Studio',
    badge: 'AI & PRODUCTIVITY',
    badgeColor: '#5db8a6',
    description:
      'An agentic workflow platform allowing teams to compose, test, and execute multi-prompt AI workflows with streaming responses.',
    techStack: ['TypeScript', 'Claude SDK', 'Next.js', 'Zustand', 'Tailwind CSS'],
    demoUrl: 'https://example.com/ai-studio-demo',
    codeSnippet: `// Agentic Tool Execution Pipeline
const response = await anthropic.messages.create({
  model: "claude-3-5-sonnet",
  max_tokens: 1024,
  system: "You are an autonomous code refactoring engine.",
  tools: [fileReadTool, codeEditTool],
  messages: [{ role: "user", content: "Optimize React component rendering" }]
});`,
  },
]

export default function Projects() {
  const [activeTab, setActiveTab] = useState(0)
  const [copied, setCopied] = useState(false)

  const current = projects[activeTab]

  const handleCopy = () => {
    navigator.clipboard.writeText(current.codeSnippet)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Box id="projects" className={cn('bg-[#faf9f5] py-24 border-t border-[#e6dfd8]')} sx={{ bgcolor: '#faf9f5', py: { xs: 10, md: 14 }, borderTop: '1px solid #e6dfd8' }}>
      <Container maxWidth="xl" sx={{ px: { xs: 3, sm: 4, lg: 6 } }}>
        {/* Centered Section Header */}
        <Box sx={{ maxWidth: '720px', mb: 6, mx: 'auto', textAlign: 'center' }}>
          <Typography
            variant="overline"
            className="font-serif-display"
            sx={{ color: '#cc785c', fontWeight: 600, fontSize: '0.875rem', letterSpacing: '0.1em', display: 'block', mb: 1.5 }}
          >
            PORTFOLIO SHOWCASE
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
            Featured Engineering Projects.
          </Typography>
          <Typography variant="body1" sx={{ fontSize: '1.125rem', color: '#3d3d3a', lineHeight: 1.6 }}>
            Explore selected web applications, API services, and user interfaces I've built.
          </Typography>
        </Box>

        {/* Centered Project Selector Tabs */}
        <Box sx={{ display: 'flex', gap: 1.5, mb: 4, flexWrap: 'wrap', justifyContent: 'center' }}>
          {projects.map((item, idx) => (
            <Button
              key={item.id}
              onClick={() => setActiveTab(idx)}
              variant="text"
              sx={{
                bgcolor: activeTab === idx ? '#efe9de' : 'transparent',
                color: activeTab === idx ? '#141413' : '#6c6a64',
                fontWeight: 500,
                fontSize: '0.875rem',
                borderRadius: '8px',
                px: 2.5,
                py: 1,
                textTransform: 'none',
                border: '1px solid',
                borderColor: activeTab === idx ? '#e6dfd8' : 'transparent',
                '&:hover': { bgcolor: '#efe9de', color: '#141413' },
              }}
            >
              {item.title}
            </Button>
          ))}
        </Box>

        {/* Dark Navy Product Showcase Card */}
        <Box
          sx={{
            bgcolor: '#181715',
            borderRadius: '16px',
            p: { xs: 3, sm: 5 },
            color: '#faf9f5',
            boxShadow: '0 25px 50px -12px rgba(20, 20, 19, 0.35)',
            border: '1px solid rgba(250, 249, 245, 0.1)',
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'center' }, gap: 2, mb: 3, pb: 3, borderBottom: '1px solid rgba(250, 249, 245, 0.1)' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
              <Chip
                label={current.badge}
                sx={{
                  bgcolor: current.badgeColor,
                  color: '#ffffff',
                  fontWeight: 600,
                  fontSize: '0.75rem',
                  letterSpacing: '0.05em',
                  borderRadius: '9999px',
                }}
              />
              <Typography variant="h5" className="font-serif-display" sx={{ color: '#faf9f5', fontSize: '1.375rem', fontWeight: 500 }}>
                {current.title}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center', flexWrap: 'wrap' }}>
              <Button
                component="a"
                href={current.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="contained"
                size="small"
                disableElevation
                endIcon={<ExternalLink size={14} />}
                sx={{
                  bgcolor: '#cc785c',
                  color: '#ffffff',
                  textTransform: 'none',
                  fontSize: '0.8125rem',
                  fontWeight: 500,
                  borderRadius: '6px',
                  '&:hover': { bgcolor: '#a9583e' },
                }}
              >
                Live Demo
              </Button>

              <Button
                onClick={handleCopy}
                variant="outlined"
                size="small"
                startIcon={copied ? <Check size={14} color="#5db872" /> : <Copy size={14} />}
                sx={{
                  bgcolor: '#252320',
                  color: '#faf9f5',
                  borderColor: 'rgba(250, 249, 245, 0.15)',
                  textTransform: 'none',
                  fontSize: '0.8125rem',
                  borderRadius: '6px',
                  '&:hover': { bgcolor: '#1f1e1b', borderColor: '#cc785c' },
                }}
              >
                {copied ? 'Snippet Copied' : 'Copy Code'}
              </Button>
            </Box>
          </Box>

          <Typography variant="body1" sx={{ color: '#a09d96', mb: 3, fontSize: '1rem', lineHeight: 1.6 }}>
            {current.description}
          </Typography>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 4 }}>
            {current.techStack.map((tech) => (
              <Chip
                key={tech}
                label={tech}
                size="small"
                sx={{
                  bgcolor: 'rgba(250, 249, 245, 0.08)',
                  color: '#faf9f5',
                  fontSize: '0.75rem',
                  borderRadius: '6px',
                  border: '1px solid rgba(250, 249, 245, 0.12)',
                }}
              />
            ))}
          </Box>

          <Box
            sx={{
              bgcolor: '#1f1e1b',
              borderRadius: '12px',
              p: { xs: 2.5, sm: 3.5 },
              border: '1px solid rgba(250, 249, 245, 0.08)',
              overflowX: 'auto',
            }}
          >
            <Box
              component="pre"
              sx={{
                fontFamily: 'var(--font-mono), monospace',
                fontSize: { xs: '0.8125rem', sm: '0.875rem' },
                lineHeight: 1.65,
                color: '#faf9f5',
                m: 0,
              }}
            >
              <code>{current.codeSnippet}</code>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
