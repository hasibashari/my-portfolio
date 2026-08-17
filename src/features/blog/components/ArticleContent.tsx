'use client'

import { useState } from 'react'
import { Box, Typography, IconButton, Tooltip } from '@mui/material'
import { Check, Copy, Info, AlertTriangle, Lightbulb } from 'lucide-react'
import { ArticleSection } from '../../../shared/constants/blog'

interface ArticleContentProps {
  sections: ArticleSection[]
}

function CodeBlock({ code, language, caption }: { code: string; language: string; caption?: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback
    }
  }

  return (
    <Box
      sx={{
        my: 3.5,
        borderRadius: '10px',
        overflow: 'hidden',
        border: '1px solid var(--color-hairline)',
        bgcolor: '#1b1b1a',
      }}
    >
      {/* Code Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 2.5,
          py: 1.25,
          bgcolor: '#141413',
          borderBottom: '1px solid #282826',
        }}
      >
        <Typography
          variant="caption"
          sx={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: '#a0a09e',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          {caption || language}
        </Typography>

        <Tooltip title={copied ? 'Copied to clipboard!' : 'Copy snippet'}>
          <IconButton size="small" onClick={handleCopy} sx={{ color: '#a0a09e', '&:hover': { color: '#ffffff' } }}>
            {copied ? <Check size={14} color="#4ade80" /> : <Copy size={14} />}
          </IconButton>
        </Tooltip>
      </Box>

      {/* Code Area */}
      <Box
        component="pre"
        sx={{
          p: 2.5,
          m: 0,
          overflowX: 'auto',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.875rem',
          lineHeight: 1.6,
          color: '#e6e4df',
          whiteSpace: 'pre',
          tabSize: 2,
        }}
      >
        <code>{code}</code>
      </Box>
    </Box>
  )
}

export default function ArticleContent({ sections }: ArticleContentProps) {
  return (
    <Box sx={{ mb: { xs: 6, md: 8 } }}>
      {sections.map((section, idx) => (
        <Box key={idx} sx={{ mb: 5 }}>
          {section.heading && (
            <Typography
              variant="h2"
              className="font-serif-display"
              sx={{
                fontSize: { xs: '1.625rem', sm: '2rem' },
                fontWeight: 500,
                color: 'var(--color-ink)',
                lineHeight: 1.25,
                letterSpacing: '-0.02em',
                mt: idx === 0 ? 0 : 4,
                mb: 2,
              }}
            >
              {section.heading}
            </Typography>
          )}

          {section.subheading && (
            <Typography
              variant="h3"
              sx={{
                fontSize: { xs: '1.125rem', sm: '1.25rem' },
                fontWeight: 600,
                color: 'var(--color-ink)',
                mt: 2,
                mb: 1.5,
              }}
            >
              {section.subheading}
            </Typography>
          )}

          {section.paragraphs.map((para, pIdx) => (
            <Typography
              key={pIdx}
              variant="body1"
              sx={{
                fontSize: { xs: '1.0625rem', sm: '1.125rem' },
                color: 'var(--color-body)',
                lineHeight: 1.75,
                mb: 2.5,
              }}
            >
              {para}
            </Typography>
          ))}

          {section.codeSnippet && (
            <CodeBlock
              code={section.codeSnippet.code}
              language={section.codeSnippet.language}
              caption={section.codeSnippet.caption}
            />
          )}

          {section.callout && (
            <Box
              sx={{
                my: 3,
                p: 2.5,
                borderRadius: '8px',
                bgcolor:
                  section.callout.type === 'tip'
                    ? 'rgba(217, 119, 87, 0.08)'
                    : 'var(--color-surface-soft)',
                borderLeft: '4px solid',
                borderLeftColor:
                  section.callout.type === 'tip'
                    ? 'var(--color-primary)'
                    : 'var(--color-ink)',
                borderTop: '1px solid var(--color-hairline)',
                borderRight: '1px solid var(--color-hairline)',
                borderBottom: '1px solid var(--color-hairline)',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.75 }}>
                {section.callout.type === 'tip' ? (
                  <Lightbulb size={16} color="var(--color-primary)" />
                ) : section.callout.type === 'warning' ? (
                  <AlertTriangle size={16} color="#eab308" />
                ) : (
                  <Info size={16} color="var(--color-ink)" />
                )}
                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'var(--color-ink)' }}>
                  {section.callout.title}
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: 'var(--color-body)', lineHeight: 1.6 }}>
                {section.callout.message}
              </Typography>
            </Box>
          )}
        </Box>
      ))}
    </Box>
  )
}
