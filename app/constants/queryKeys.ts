



import type { UserId } from '../types/api.types'

export const QUERY_KEYS = {
  profile: (userId: UserId) => ['profile', userId] as const,
  dashboard: (userId: UserId) => ['dashboard', userId] as const,
  callStats: (userId: UserId) => ['callStats', userId] as const,
  callHistory: (userId: UserId, page?: number, limit?: number) => ['callHistory', userId, page ?? 1, limit ?? 10] as const,
} as const
