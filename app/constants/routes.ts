



export const ROUTES = {
  ROOT: '/',
  DASHBOARD: '/dashboard',
  ANALYTICS: '/analytics',
  HISTORY: '/history',
  SETTINGS: '/settings',
} as const

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES]
