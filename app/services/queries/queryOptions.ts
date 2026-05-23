



import { queryOptions } from '@tanstack/react-query'
import { fetchProfile, fetchDashboard, getCallStats, fetchCallHistory } from '../api/endpoints'
import { QUERY_KEYS } from '../../constants/queryKeys'
import type { UserId } from '../../types/api.types'

const STALE_TIME = 1000 * 60 * 2 

export function profileQueryOptions(userId: UserId) {
  return queryOptions({
    queryKey: QUERY_KEYS.profile(userId),
    queryFn: fetchProfile,
    staleTime: STALE_TIME,
    retry: 2,
  })
}

export function dashboardQueryOptions(userId: UserId) {
  return queryOptions({
    queryKey: QUERY_KEYS.dashboard(userId),
    queryFn: fetchDashboard,
    staleTime: STALE_TIME,
    retry: 2,
  })
}

export function callStatsQueryOptions(userId: UserId) {
  return queryOptions({
    queryKey: QUERY_KEYS.callStats(userId),
    queryFn: getCallStats,
    staleTime: STALE_TIME,
    retry: 2,
  })
}

export function callHistoryQueryOptions(userId: UserId, page = 1, limit = 10) {
  return queryOptions({
    queryKey: QUERY_KEYS.callHistory(userId, page, limit),
    queryFn: () => fetchCallHistory({ page, limit }),
    staleTime: STALE_TIME,
    retry: 2,
    placeholderData: (prev) => prev,
  })
}
