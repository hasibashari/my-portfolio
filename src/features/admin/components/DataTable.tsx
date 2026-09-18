'use client'

import React, { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
} from '@mui/material'
import DeleteConfirmModal from './DeleteConfirmModal'

export interface ColumnDef<T> {
  header: string
  align?: 'left' | 'center' | 'right'
  width?: string | number
  render: (item: T) => React.ReactNode
}

export interface DataTableEmptyState {
  title: string
  description: string
}

export interface DataTableDeleteConfig<T> {
  modalTitle?: string
  getItemName: (item: T) => string
  onDelete: (item: T) => Promise<void>
}

export interface DataTableProps<T> {
  data: T[]
  columns: ColumnDef<T>[]
  keyExtractor: (item: T) => string | number
  emptyState?: DataTableEmptyState
  deleteConfig?: DataTableDeleteConfig<T>
  renderActions?: (item: T, helpers: { openDeleteModal: (item: T) => void }) => React.ReactNode
  minWidth?: number | string
}

export default function DataTable<T>({
  data,
  columns,
  keyExtractor,
  emptyState,
  deleteConfig,
  renderActions,
  minWidth = 650,
}: DataTableProps<T>) {
  const [deleteTarget, setDeleteTarget] = useState<T | null>(null)
  const [deleting, setDeleting] = useState(false)

  const handleOpenDelete = (item: T) => {
    setDeleteTarget(item)
  }

  const handleConfirmDelete = async () => {
    if (!deleteTarget || !deleteConfig) return
    try {
      setDeleting(true)
      await deleteConfig.onDelete(deleteTarget)
      setDeleteTarget(null)
    } finally {
      setDeleting(false)
    }
  }

  if (data.length === 0) {
    return (
      <Box
        sx={{
          py: 8,
          textAlign: 'center',
          bgcolor: 'var(--color-surface-card)',
          borderRadius: '12px',
          border: '1px dashed var(--color-hairline)',
        }}
      >
        <Typography variant="h6" className="font-serif-display" sx={{ color: 'var(--color-ink)', mb: 1 }}>
          {emptyState?.title || 'No items found.'}
        </Typography>
        <Typography variant="body2" sx={{ color: 'var(--color-muted)' }}>
          {emptyState?.description || 'Get started by creating a new entry.'}
        </Typography>
      </Box>
    )
  }

  const hasActions = Boolean(renderActions)

  return (
    <>
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          bgcolor: 'var(--color-surface-card)',
          border: '1px solid var(--color-hairline)',
          borderRadius: '12px',
          overflow: 'hidden',
        }}
      >
        <Table sx={{ minWidth }}>
          <TableHead sx={{ bgcolor: 'var(--color-surface-soft)' }}>
            <TableRow>
              {columns.map((col, idx) => (
                <TableCell
                  key={idx}
                  align={col.align || 'left'}
                  sx={{
                    color: 'var(--color-ink)',
                    fontWeight: 600,
                    width: col.width,
                  }}
                >
                  {col.header}
                </TableCell>
              ))}
              {hasActions && (
                <TableCell align="right" sx={{ color: 'var(--color-ink)', fontWeight: 600 }}>
                  Actions
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => {
              const key = keyExtractor(item)
              return (
                <TableRow
                  key={key}
                  hover
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                    borderColor: 'var(--color-hairline)',
                  }}
                >
                  {columns.map((col, idx) => (
                    <TableCell key={idx} align={col.align || 'left'}>
                      {col.render(item)}
                    </TableCell>
                  ))}
                  {hasActions && renderActions && (
                    <TableCell align="right">
                      {renderActions(item, { openDeleteModal: handleOpenDelete })}
                    </TableCell>
                  )}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {deleteConfig && (
        <DeleteConfirmModal
          open={Boolean(deleteTarget)}
          title={deleteConfig.modalTitle || 'Confirm Deletion'}
          itemName={deleteTarget ? deleteConfig.getItemName(deleteTarget) : ''}
          loading={deleting}
          onClose={() => setDeleteTarget(null)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </>
  )
}
