'use client'

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  CircularProgress,
} from '@mui/material'
import { AlertTriangle } from 'lucide-react'

interface DeleteConfirmModalProps {
  open: boolean
  title: string
  itemName: string
  loading?: boolean
  onClose: () => void
  onConfirm: () => void
}

export default function DeleteConfirmModal({
  open,
  title,
  itemName,
  loading = false,
  onClose,
  onConfirm,
}: DeleteConfirmModalProps) {
  return (
    <Dialog
      open={open}
      onClose={loading ? undefined : onClose}
      slotProps={{
        paper: {
          sx: {
            bgcolor: 'var(--color-surface-card)',
            border: '1px solid var(--color-hairline)',
            borderRadius: '16px',
            p: 1,
            maxWidth: 440,
          },
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          color: 'var(--color-ink)',
          fontWeight: 600,
          fontSize: '1.125rem',
        }}
      >
        <AlertTriangle size={22} color="#dc2626" />
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ color: 'var(--color-muted)', fontSize: '0.925rem' }}>
          Are you sure you want to delete <strong>&ldquo;{itemName}&rdquo;</strong>? This action cannot be undone and will permanently remove the record from SQLite.
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          onClick={onClose}
          disabled={loading}
          sx={{
            color: 'var(--color-ink)',
            textTransform: 'none',
            fontWeight: 500,
            borderRadius: '8px',
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          disabled={loading}
          variant="contained"
          sx={{
            bgcolor: '#dc2626',
            color: '#fff',
            textTransform: 'none',
            fontWeight: 600,
            borderRadius: '8px',
            px: 2.5,
            '&:hover': {
              bgcolor: '#b91c1c',
            },
          }}
        >
          {loading ? <CircularProgress size={18} sx={{ color: '#fff' }} /> : 'Delete'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
