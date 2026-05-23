



import { cn } from '../../lib/utils'
import { clamp } from '../../utils/format'
import { Skeleton } from '../ui/Skeleton'

interface UsageBarProps {
  label: string
  used: number
  limit?: number
  percentage: number
  unit?: string
  icon?: React.ReactNode
  colorClass?: string
  loading?: boolean
  className?: string
}

function getBarColor(pct: number): string {
  if (pct >= 90) return 'bg-red-500'
  if (pct >= 70) return 'bg-amber-500'
  return 'bg-indigo-500'
}

export function UsageBar({
  label,
  used,
  limit,
  percentage,
  unit = '',
  icon,
  colorClass,
  loading = false,
  className,
}: UsageBarProps) {
  if (loading) {
    return (
      <div className={cn('rounded-xl border border-slate-200 bg-white p-5 shadow-sm', className)}>
        <div className="flex items-center gap-2 mb-3">
          <Skeleton className="h-8 w-8 rounded-lg" />
          <Skeleton className="h-4 w-32" />
        </div>
        <Skeleton className="h-2 w-full rounded-full" />
        <div className="mt-2 flex justify-between">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-20" />
        </div>
      </div>
    )
  }

  const clampedPct = clamp(percentage, 0, 100)
  const barColor = colorClass ?? getBarColor(clampedPct)

  return (
    <div
      className={cn(
        'rounded-xl border border-slate-200 bg-white p-5 shadow-sm',
        'transition-all duration-200 hover:shadow-md hover:-translate-y-0.5',
        className,
      )}
    >
      
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          {icon && (
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-600 shrink-0">
              {icon}
            </div>
          )}
          <span className="text-sm font-medium text-slate-700">{label}</span>
        </div>
        <span
          className={cn(
            'text-xs font-semibold',
            clampedPct >= 90 ? 'text-red-600' : clampedPct >= 70 ? 'text-amber-600' : 'text-slate-500',
          )}
        >
          {clampedPct.toFixed(0)}%
        </span>
      </div>

      
      <div
        className="h-2 w-full overflow-hidden rounded-full bg-slate-100"
        role="progressbar"
        aria-valuenow={clampedPct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${label}: ${clampedPct.toFixed(0)}% used`}
      >
        <div
          className={cn('h-full rounded-full transition-all duration-700 ease-out', barColor)}
          style={{ width: `${clampedPct}%` }}
        />
      </div>

      {/* Footer */}
      <div className="mt-2 flex items-center justify-between">
        <span className="text-xs text-slate-400">
          {used.toLocaleString()}{unit} used
        </span>
        {limit !== undefined && (
          <span className="text-xs text-slate-400">
            of {limit.toLocaleString()}{unit}
          </span>
        )}
      </div>
    </div>
  )
}
