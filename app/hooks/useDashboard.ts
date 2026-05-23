



import { useQuery } from '@tanstack/react-query'
import { useAppStore } from '../store/useAppStore'
import { dashboardQueryOptions } from '../services/queries/queryOptions'

export function useDashboard() {
  const activeUserId = useAppStore((s) => s.activeUserId)
  return useQuery(dashboardQueryOptions(activeUserId))
}
