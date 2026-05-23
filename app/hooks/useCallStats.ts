



import { useQuery } from '@tanstack/react-query'
import { useAppStore } from '../store/useAppStore'
import { callStatsQueryOptions } from '../services/queries/queryOptions'

export function useCallStats() {
  const activeUserId = useAppStore((s) => s.activeUserId)
  return useQuery(callStatsQueryOptions(activeUserId))
}
