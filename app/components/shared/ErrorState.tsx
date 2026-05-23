



import { AlertTriangle, RefreshCw } from 'lucide-react'
import { cn } from '../../lib/utils'
import { Button } from '../ui/Button'
import { getErrorMessage } from '../../utils/errors'

interface ErrorStateProps {
  error?: unknown
  onRetry?: () => void
  className?: string
  compact?: boolean
}

export function ErrorState({ error, onRetry, className, compact = false }: ErrorStateProps) {
  const message = error ? getErrorMessage(error) : 'Something went wrong'

  if (compact) {
    return (
      <div className={cn('flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3', className)}>
        <AlertTriangle className="h-4 w-4 shrink-0 text-red-500" />
        <p className="text-sm text-red-700">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="ml-auto shrink-0 rounded p-1 text-red-500 hover:bg-red-100 transition-colors"
            aria-label="Retry"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        )}
      </div>
    )
  }

  return (
    <div className={cn('flex flex-col items-center justify-center py-16 px-6 text-center', className)}>
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100">
        <AlertTriangle className="h-7 w-7 text-red-500" />
      </div>
      <h3 className="text-base font-semibold text-slate-800">Something went wrong</h3>
      <p className="mt-1.5 max-w-sm text-sm text-slate-500">{message}</p>
      {onRetry && (
        <div className="mt-5">
          <Button
            variant="outline"
            size="sm"
            onClick={onRetry}
            leftIcon={<RefreshCw className="h-4 w-4" />}
          >
            Try again
          </Button>
        </div>
      )}
    </div>
  )
}
