



import { cn } from '../../lib/utils'
import type { CallStatus } from '../../types/ui.types'

type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info' | 'purple'

interface BadgeProps {
  variant?: BadgeVariant
  children: React.ReactNode
  className?: string
  dot?: boolean
}

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-slate-100 text-slate-700 border-slate-200',
  success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  warning: 'bg-amber-50 text-amber-700 border-amber-200',
  error: 'bg-red-50 text-red-700 border-red-200',
  info: 'bg-blue-50 text-blue-700 border-blue-200',
  purple: 'bg-violet-50 text-violet-700 border-violet-200',
}

const dotClasses: Record<BadgeVariant, string> = {
  default: 'bg-slate-500',
  success: 'bg-emerald-500',
  warning: 'bg-amber-500',
  error: 'bg-red-500',
  info: 'bg-blue-500',
  purple: 'bg-violet-500',
}

export function Badge({ variant = 'default', children, className, dot = false }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium',
        variantClasses[variant],
        className,
      )}
    >
      {dot && (
        <span
          className={cn('h-1.5 w-1.5 shrink-0 rounded-full', dotClasses[variant])}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  )
}


const callStatusConfig: Record<CallStatus, { variant: BadgeVariant; label: string }> = {
  completed: { variant: 'success', label: 'Completed' },
  missed: { variant: 'warning', label: 'Missed' },
  ongoing: { variant: 'info', label: 'Ongoing' },
  failed: { variant: 'error', label: 'Failed' },
}

interface StatusBadgeProps {
  status: CallStatus
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = callStatusConfig[status] ?? { variant: 'default' as BadgeVariant, label: status }
  return (
    <Badge variant={config.variant} dot className={className}>
      {config.label}
    </Badge>
  )
}
