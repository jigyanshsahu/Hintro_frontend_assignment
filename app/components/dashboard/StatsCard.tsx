



import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { cn } from '../../lib/utils'
import { Skeleton } from '../ui/Skeleton'

type TrendDirection = 'up' | 'down' | 'neutral'

interface StatsCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: React.ReactNode
  iconBgClass?: string
  trend?: {
    value: string
    direction: TrendDirection
  }
  loading?: boolean
  className?: string
}

const trendConfig: Record<TrendDirection, { icon: React.ElementType; colorClass: string }> = {
  up: { icon: TrendingUp, colorClass: 'text-emerald-600' },
  down: { icon: TrendingDown, colorClass: 'text-red-500' },
  neutral: { icon: Minus, colorClass: 'text-slate-400' },
}

export function StatsCard({
  title,
  value,
  subtitle,
  icon,
  iconBgClass = 'bg-indigo-50 text-indigo-600',
  trend,
  loading = false,
  className,
}: StatsCardProps) {
  if (loading) {
    return (
      <div className={cn('rounded-xl border border-slate-200 bg-white p-5 shadow-sm', className)}>
        <div className="flex items-start justify-between">
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-8 w-20" />
          </div>
          <Skeleton className="h-10 w-10 rounded-lg shrink-0" />
        </div>
        <Skeleton className="mt-4 h-3 w-36" />
      </div>
    )
  }

  const TrendIcon = trend ? trendConfig[trend.direction].icon : null

  return (
    <div
      className={cn(
        'group rounded-xl border border-slate-200 bg-white p-5 shadow-sm',
        'transition-all duration-200 hover:shadow-md hover:-translate-y-0.5',
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-medium text-slate-500 truncate">{title}</p>
          <p className="mt-1 text-2xl font-bold text-slate-900 tracking-tight">{value}</p>
        </div>
        <div
          className={cn(
            'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl',
            iconBgClass,
          )}
          aria-hidden="true"
        >
          {icon}
        </div>
      </div>

      {(trend || subtitle) && (
        <div className="mt-3 flex items-center gap-1.5">
          {trend && TrendIcon && (
            <>
              <TrendIcon
                className={cn('h-3.5 w-3.5', trendConfig[trend.direction].colorClass)}
              />
              <span className={cn('text-xs font-medium', trendConfig[trend.direction].colorClass)}>
                {trend.value}
              </span>
            </>
          )}
          {subtitle && (
            <span className="text-xs text-slate-400">{trend ? `· ${subtitle}` : subtitle}</span>
          )}
        </div>
      )}
    </div>
  )
}
