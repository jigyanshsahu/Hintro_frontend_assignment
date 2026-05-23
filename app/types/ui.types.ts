



export type NavItem = {
  label: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  end?: boolean
}

export type CallStatus = 'completed' | 'missed' | 'ongoing' | 'failed'

export type StatusVariant = 'success' | 'warning' | 'error' | 'info' | 'default'

export interface BreadcrumbItem {
  label: string
  href?: string
}

export interface ToastMessage {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  description?: string
  duration?: number
}

export interface FeedbackFormData {
  rating: number
  message: string
}
