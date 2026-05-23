



import { apiClient } from './client'
import type {
  UserProfile,
  DashboardData,
  CallStats,
  CallSessionsResponse,
} from '../../types/api.types'



export async function fetchProfile(): Promise<UserProfile> {
  const { data } = await apiClient.get<UserProfile>('/api/auth/profile')
  return data
}



export async function fetchDashboard(): Promise<DashboardData> {
  const { data } = await apiClient.get<DashboardData>('/api/auth/dashboard')
  return data
}



export const getCallStats = async (): Promise<CallStats> => {
  const { data } = await apiClient.get<CallStats>('/api/call-sessions/stats')
  return data
}

export interface FetchCallHistoryParams {
  page?: number
  limit?: number
}

export async function fetchCallHistory(params: FetchCallHistoryParams = {}): Promise<CallSessionsResponse> {
  const { page = 1, limit = 10 } = params
  const { data } = await apiClient.get<CallSessionsResponse>('/api/call-sessions', {
    params: { page, limit },
  })
  return data
}
