'use client'

import { useMemo } from 'react'
import { Box, Button, IconButton, SxProps, Theme } from '@mui/material'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  siblingCount?: number
  showPrevNext?: boolean
  scrollTargetId?: string
  sx?: SxProps<Theme>
}

export const DOTS = '...'

function range(start: number, end: number): number[] {
  const length = end - start + 1
  return Array.from({ length }, (_, idx) => idx + start)
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  showPrevNext = true,
  scrollTargetId,
  sx,
}: PaginationProps) {
  const paginationRange = useMemo(() => {
    const totalPageNumbers = siblingCount + 5 // siblingCount + firstPage + lastPage + currentPage + 2*DOTS

    // Case 1: If total pages is less than page numbers we want to show
    if (totalPageNumbers >= totalPages) {
      return range(1, totalPages)
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages)

    const shouldShowLeftDots = leftSiblingIndex > 2
    const shouldShowRightDots = rightSiblingIndex < totalPages - 2

    const firstPageIndex = 1
    const lastPageIndex = totalPages

    // Case 2: No left dots to show, but right dots to be shown
    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount
      const leftRange = range(1, leftItemCount)
      return [...leftRange, DOTS, totalPages]
    }

    // Case 3: No right dots to show, but left dots to be shown
    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount
      const rightRange = range(totalPages - rightItemCount + 1, totalPages)
      return [firstPageIndex, DOTS, ...rightRange]
    }

    // Case 4: Both left and right dots to be shown
    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex)
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex]
    }

    return range(1, totalPages)
  }, [totalPages, siblingCount, currentPage])

  if (totalPages <= 1) return null

  const handlePageChange = (page: number) => {
    if (page === currentPage || page < 1 || page > totalPages) return
    onPageChange(page)

    if (scrollTargetId) {
      const element = document.getElementById(scrollTargetId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
    }

    // Fallback: smooth scroll to reasonable top if needed
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <Box
      component="nav"
      aria-label="Pagination Navigation"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: { xs: 0.75, sm: 1 },
        mt: { xs: 6, sm: 8 },
        pt: 4,
        borderTop: '1px solid var(--color-hairline)',
        ...sx,
      }}
    >
      {/* Previous Button */}
      {showPrevNext && (
        <IconButton
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous Page"
          size="small"
          sx={{
            color: 'var(--color-ink)',
            border: '1px solid var(--color-hairline)',
            borderRadius: '8px',
            bgcolor: 'var(--color-canvas)',
            p: 1,
            transition: 'all 0.2s ease-in-out',
            '&:hover:not(:disabled)': {
              bgcolor: 'var(--color-surface-card)',
              borderColor: 'var(--color-primary)',
              color: 'var(--color-primary)',
            },
            '&:disabled': {
              opacity: 0.4,
              cursor: 'not-allowed',
            },
          }}
        >
          <ChevronLeft size={18} />
        </IconButton>
      )}

      {/* Page Numbers */}
      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return (
            <Box
              key={`dots-${index}`}
              sx={{
                px: 1,
                py: 0.5,
                color: 'var(--color-muted)',
                fontSize: '0.875rem',
                fontWeight: 600,
                userSelect: 'none',
              }}
            >
              &#8230;
            </Box>
          )
        }

        const isCurrent = pageNumber === currentPage

        return (
          <Button
            key={pageNumber}
            onClick={() => handlePageChange(Number(pageNumber))}
            aria-current={isCurrent ? 'page' : undefined}
            variant={isCurrent ? 'contained' : 'outlined'}
            disableElevation
            sx={{
              minWidth: { xs: '36px', sm: '40px' },
              height: { xs: '36px', sm: '40px' },
              p: 0,
              borderRadius: '8px',
              fontWeight: isCurrent ? 700 : 500,
              fontSize: '0.875rem',
              bgcolor: isCurrent ? 'var(--color-primary)' : 'var(--color-canvas)',
              color: isCurrent ? 'var(--color-on-primary)' : 'var(--color-ink)',
              borderColor: isCurrent ? 'var(--color-primary)' : 'var(--color-hairline)',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                bgcolor: isCurrent ? 'var(--color-primary-active)' : 'var(--color-surface-card)',
                borderColor: 'var(--color-primary)',
                color: isCurrent ? 'var(--color-on-primary)' : 'var(--color-primary)',
                transform: 'translateY(-1px)',
              },
            }}
          >
            {pageNumber}
          </Button>
        )
      })}

      {/* Next Button */}
      {showPrevNext && (
        <IconButton
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next Page"
          size="small"
          sx={{
            color: 'var(--color-ink)',
            border: '1px solid var(--color-hairline)',
            borderRadius: '8px',
            bgcolor: 'var(--color-canvas)',
            p: 1,
            transition: 'all 0.2s ease-in-out',
            '&:hover:not(:disabled)': {
              bgcolor: 'var(--color-surface-card)',
              borderColor: 'var(--color-primary)',
              color: 'var(--color-primary)',
            },
            '&:disabled': {
              opacity: 0.4,
              cursor: 'not-allowed',
            },
          }}
        >
          <ChevronRight size={18} />
        </IconButton>
      )}
    </Box>
  )
}
