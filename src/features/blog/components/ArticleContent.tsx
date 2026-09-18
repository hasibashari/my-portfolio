'use client'

import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/github-dark.css'
import { Box, Typography, IconButton, Tooltip } from '@mui/material'
import { Check, Copy, Info, Lightbulb, AlertTriangle } from 'lucide-react'

interface ArticleContentProps {
  content: string
}

function CodeBlockWithCopy({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLElement> & { className?: string; children?: React.ReactNode }) {
  const [copied, setCopied] = useState(false)
  const match = /language-(\w+)/.exec(className || '')
  const language = match ? match[1] : ''

  // If inline code (no language- match and not inside pre block styling directly)
  const isInline = !match && !className?.includes('hljs')

  // Extract raw text for copy
  const rawCode = React.Children.toArray(children)
    .map((child) => {
      if (typeof child === 'string') return child
      if (React.isValidElement(child) && typeof child.props === 'object' && child.props && 'children' in child.props) {
        return String((child.props as { children: React.ReactNode }).children)
      }
      return ''
    })
    .join('')

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(rawCode.trim())
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback
    }
  }

  if (isInline) {
    return (
      <Box
        component="code"
        sx={{
          bgcolor: 'var(--color-surface-soft)',
          color: 'var(--color-primary)',
          px: 1,
          py: 0.3,
          borderRadius: '4px',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.875em',
          border: '1px solid var(--color-hairline)',
        }}
        {...props}
      >
        {children}
      </Box>
    )
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
      {/* Code Header Bar */}
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
          {language || 'code'}
        </Typography>

        <Tooltip title={copied ? 'Copied to clipboard!' : 'Copy snippet'}>
          <IconButton
            size="small"
            onClick={handleCopy}
            sx={{ color: '#a0a09e', '&:hover': { color: '#ffffff' } }}
          >
            {copied ? <Check size={14} color="#4ade80" /> : <Copy size={14} />}
          </IconButton>
        </Tooltip>
      </Box>

      {/* Code Area */}
      <Box
        component="div"
        sx={{
          p: 2.5,
          m: 0,
          overflowX: 'auto',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.875rem',
          lineHeight: 1.6,
          color: '#e6e4df',
          tabSize: 2,
          '& pre': { m: 0, p: 0, bgcolor: 'transparent' },
          '& code': { bgcolor: 'transparent', p: 0, fontFamily: 'inherit' },
        }}
      >
        <pre>
          <code className={className} {...props}>
            {children}
          </code>
        </pre>
      </Box>
    </Box>
  )
}

export default function ArticleContent({ content }: ArticleContentProps) {
  return (
    <Box sx={{ mb: { xs: 6, md: 8 } }}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          h1: ({ children }) => (
            <Typography
              variant="h1"
              className="font-serif-display"
              sx={{
                fontSize: { xs: '2rem', sm: '2.5rem' },
                fontWeight: 600,
                color: 'var(--color-ink)',
                lineHeight: 1.2,
                letterSpacing: '-0.025em',
                mt: 4,
                mb: 2,
              }}
            >
              {children}
            </Typography>
          ),
          h2: ({ children }) => (
            <Typography
              variant="h2"
              className="font-serif-display"
              sx={{
                fontSize: { xs: '1.625rem', sm: '2rem' },
                fontWeight: 500,
                color: 'var(--color-ink)',
                lineHeight: 1.25,
                letterSpacing: '-0.02em',
                mt: 4,
                mb: 2,
              }}
            >
              {children}
            </Typography>
          ),
          h3: ({ children }) => (
            <Typography
              variant="h3"
              sx={{
                fontSize: { xs: '1.125rem', sm: '1.25rem' },
                fontWeight: 600,
                color: 'var(--color-ink)',
                mt: 3,
                mb: 1.5,
              }}
            >
              {children}
            </Typography>
          ),
          h4: ({ children }) => (
            <Typography
              variant="h4"
              sx={{
                fontSize: '1rem',
                fontWeight: 600,
                color: 'var(--color-ink)',
                mt: 2.5,
                mb: 1,
              }}
            >
              {children}
            </Typography>
          ),
          p: ({ children }) => (
            <Typography
              variant="body1"
              component="p"
              sx={{
                fontSize: { xs: '1.0625rem', sm: '1.125rem' },
                color: 'var(--color-body)',
                lineHeight: 1.75,
                mb: 2.5,
              }}
            >
              {children}
            </Typography>
          ),
          ul: ({ children }) => (
            <Box
              component="ul"
              sx={{
                fontSize: { xs: '1.0625rem', sm: '1.125rem' },
                color: 'var(--color-body)',
                lineHeight: 1.75,
                pl: 3,
                mb: 2.5,
                '& li': { mb: 1 },
              }}
            >
              {children}
            </Box>
          ),
          ol: ({ children }) => (
            <Box
              component="ol"
              sx={{
                fontSize: { xs: '1.0625rem', sm: '1.125rem' },
                color: 'var(--color-body)',
                lineHeight: 1.75,
                pl: 3,
                mb: 2.5,
                '& li': { mb: 1 },
              }}
            >
              {children}
            </Box>
          ),
          blockquote: ({ children }) => {
            // Check content to render friendly callout styling
            return (
              <Box
                component="blockquote"
                sx={{
                  my: 3,
                  p: 2.5,
                  borderRadius: '8px',
                  bgcolor: 'var(--color-surface-soft)',
                  borderLeft: '4px solid var(--color-primary)',
                  borderTop: '1px solid var(--color-hairline)',
                  borderRight: '1px solid var(--color-hairline)',
                  borderBottom: '1px solid var(--color-hairline)',
                  '& p': { mb: 0, color: 'var(--color-ink)', fontWeight: 500 },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.25 }}>
                  <Lightbulb size={20} color="var(--color-primary)" style={{ flexShrink: 0, marginTop: 2 }} />
                  <Box sx={{ flexGrow: 1 }}>{children}</Box>
                </Box>
              </Box>
            )
          },
          a: ({ href, children }) => (
            <a
              href={href}
              target={href?.startsWith('http') ? '_blank' : undefined}
              rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
              style={{
                color: 'var(--color-primary)',
                textDecoration: 'underline',
                textUnderlineOffset: '3px',
              }}
            >
              {children}
            </a>
          ),
          table: ({ children }) => (
            <Box sx={{ overflowX: 'auto', my: 3, borderRadius: '8px', border: '1px solid var(--color-hairline)' }}>
              <Box
                component="table"
                sx={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  textAlign: 'left',
                  fontSize: '0.95rem',
                  color: 'var(--color-ink)',
                }}
              >
                {children}
              </Box>
            </Box>
          ),
          thead: ({ children }) => (
            <Box component="thead" sx={{ bgcolor: 'var(--color-surface-soft)', borderBottom: '1px solid var(--color-hairline)' }}>
              {children}
            </Box>
          ),
          th: ({ children }) => (
            <Box component="th" sx={{ p: 1.5, fontWeight: 600, borderBottom: '1px solid var(--color-hairline)' }}>
              {children}
            </Box>
          ),
          td: ({ children }) => (
            <Box component="td" sx={{ p: 1.5, borderBottom: '1px solid var(--color-hairline)' }}>
              {children}
            </Box>
          ),
          hr: () => (
            <Box component="hr" sx={{ my: 4, border: 'none', borderTop: '1px solid var(--color-hairline)' }} />
          ),
          // Code & Syntax Highlight handler
          code: CodeBlockWithCopy,
        }}
      >
        {content}
      </ReactMarkdown>
    </Box>
  )
}
