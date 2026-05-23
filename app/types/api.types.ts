



export type UserId = 'u1' | 'u2'



export interface UserProfile {
  id: string
  email: string
  firstName: string
  lastName: string
  login_method: string
  status: 'active' | 'inactive'
  is_hintro_admin: boolean
  createdAt: string
  updatedAt: string
}



export interface KbFilesUsage {
  used: number
  limit: number
  percentage: number
}

export interface DashboardUsage {
  kb_files: KbFilesUsage
  vocab_terms: number
  notes: number
}

export interface Subscription {
  plan: string
  billing_cycle: string
  status: 'active' | 'canceled' | 'past_due'
}

export interface DashboardData {
  user: UserProfile
  subscription: Subscription | null
  usage: DashboardUsage
}



export interface CallSession {
  _id: string
  user_id: string
  status: string
  client: string
  description?: string
  started_at: string
  ended_at: string
  total_duration_seconds: number
  language: string[]
  auto_gen_ai_response: boolean
  save_transcript: boolean
  transcript: string | null
  transcript_final: boolean
  transcript_updated_at: string
  ai_interactions: number
  call_framework_id: string
  participants: Array<{
    name: string
    isUser: boolean
  }>
  ended_reason: string
  createdAt: string
  updatedAt: string
}

export interface CallStats {
  totalSessions: number
  averageDuration: number
  totalAIInteractions: number
  lastSession: string[]
}

export interface Pagination {
  page: number
  limit: number
  totalCount: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

export interface CallSessionsResponse {
  callSessions: CallSession[]
  pagination: Pagination
}



export interface FeedbackEntry {
  id: string
  userId: string
  rating: number
  message: string
  submittedAt: string
}
