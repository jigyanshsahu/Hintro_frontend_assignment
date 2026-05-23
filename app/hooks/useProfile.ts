



import { useQuery } from '@tanstack/react-query'
import { useAppStore } from '../store/useAppStore'
import { profileQueryOptions } from '../services/queries/queryOptions'

export function useProfile() {
  const activeUserId = useAppStore((s) => s.activeUserId)
  return useQuery(profileQueryOptions(activeUserId))
}
