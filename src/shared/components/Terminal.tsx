'use client'

import { useState, ReactNode } from 'react'
import { Box, Typography, IconButton, SxProps, Theme } from '@mui/material'
import { Copy, Check } from 'lucide-react'

interface TerminalProps {
  filename?: string
  codeSnippet: string
  children?: ReactNode
  sx?: SxProps<Theme>
}

export default function Terminal({ filename = 'terminal', codeSnippet, children, sx }: TerminalProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippet)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Box
      sx={{
        bgcolor: '#181715',
        borderRadius: '16px',
        color: '#faf9f5',
        boxShadow: '0 25px 50px -12px rgba(20, 20, 19, 0.35)',
        border: '1px solid rgba(250, 249, 245, 0.1)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        ...sx,
      }}
    >
      {/* Terminal Header (Mac Window Controls) */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          px: 2,
          py: 1.5,
          bgcolor: 'rgba(250, 249, 245, 0.03)',
          borderBottom: '1px solid rgba(250, 249, 245, 0.05)',
        }}
      >
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#ff5f56' }} />
          <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#ffbd2e' }} />
          <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#27c93f' }} />
        </Box>
        <Typography variant="caption" sx={{ flex: 1, textAlign: 'center', color: '#a09d96', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
          {filename}
        </Typography>
        <IconButton size="small" onClick={handleCopy} aria-label="Copy snippet" sx={{ color: '#a09d96', p: 0, width: 38, display: 'flex', justifyContent: 'flex-end' }}>
          {copied ? <Check size={14} color="#5db872" style={{ flexShrink: 0 }} /> : <Copy size={14} style={{ flexShrink: 0 }} />}
        </IconButton>
      </Box>

      {/* Terminal Body */}
      <Box sx={{ p: { xs: 3, sm: 4 }, bgcolor: '#1f1e1b', flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Optional Children */}
        {children && (
          <Box sx={{ mb: codeSnippet ? 4 : 0, display: 'flex', flexDirection: 'column', gap: 3 }}>
            {children}
          </Box>
        )}

        {/* Code Snippet */}
        <Box
          component="pre"
          sx={{
            fontFamily: 'var(--font-mono), monospace',
            fontSize: { xs: '0.8125rem', sm: '0.875rem' },
            lineHeight: 1.65,
            color: '#faf9f5',
            m: 0,
            mt: children ? 'auto' : 0,
            overflowX: 'auto',
            whiteSpace: 'pre',
          }}
        >
          <code>{codeSnippet}</code>
        </Box>
      </Box>
    </Box>
  )
}
