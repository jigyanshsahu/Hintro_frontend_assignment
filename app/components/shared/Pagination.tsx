



import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '../../lib/utils'

interface PaginationProps {
  currentPage: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
  onPageChange: (page: number) => void
  className?: string
}

export function Pagination({
  currentPage,
  totalPages,
  hasNextPage,
  hasPrevPage,
  onPageChange,
  className,
}: PaginationProps) {
  if (totalPages <= 1) return null

  
  const getPages = () => {
    const range: (number | '...')[] = []
    const delta = 2

    const left = Math.max(1, currentPage - delta)
    const right = Math.min(totalPages, currentPage + delta)

    if (left > 2) {
      range.push(1, '...')
    } else {
      for (let i = 1; i < left; i++) range.push(i)
    }

    for (let i = left; i <= right; i++) range.push(i)

    if (right < totalPages - 1) {
      range.push('...', totalPages)
    } else {
      for (let i = right + 1; i <= totalPages; i++) range.push(i)
    }

    return range
  }

  return (
    <nav
      className={cn('flex items-center gap-1', className)}
      aria-label="Pagination"
    >
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!hasPrevPage}
        className={cn(
          'flex h-8 w-8 items-center justify-center rounded-lg text-sm transition-colors',
          'disabled:cursor-not-allowed disabled:opacity-40',
          hasPrevPage
            ? 'hover:bg-slate-100 text-slate-600'
            : 'text-slate-400',
        )}
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {getPages().map((page, i) =>
        page === '...' ? (
          <span key={`dots-${i}`} className="flex h-8 w-8 items-center justify-center text-sm text-slate-400">
            …
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page as number)}
            aria-current={page === currentPage ? 'page' : undefined}
            className={cn(
              'flex h-8 w-8 items-center justify-center rounded-lg text-sm font-medium transition-colors',
              page === currentPage
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'hover:bg-slate-100 text-slate-600',
            )}
          >
            {page}
          </button>
        ),
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNextPage}
        className={cn(
          'flex h-8 w-8 items-center justify-center rounded-lg text-sm transition-colors',
          'disabled:cursor-not-allowed disabled:opacity-40',
          hasNextPage
            ? 'hover:bg-slate-100 text-slate-600'
            : 'text-slate-400',
        )}
        aria-label="Next page"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  )
}
