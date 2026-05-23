



import { useQuery } from '@tanstack/react-query'
import { useAppStore } from '../store/useAppStore'
import { callHistoryQueryOptions } from '../services/queries/queryOptions'

export function useCallHistory(page = 1, limit = 10) {
  const activeUserId = useAppStore((s) => s.activeUserId)
  return useQuery(callHistoryQueryOptions(activeUserId, page, limit))
}
