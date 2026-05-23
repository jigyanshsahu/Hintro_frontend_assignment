



import type { FeedbackEntry } from '../types/api.types'

const FEEDBACK_KEY = 'hintro_feedback'

export function getFeedbackList(): FeedbackEntry[] {
  try {
    const raw = localStorage.getItem(FEEDBACK_KEY)
    if (!raw) return []
    return JSON.parse(raw) as FeedbackEntry[]
  } catch {
    return []
  }
}

export function saveFeedback(entry: FeedbackEntry): void {
  const existing = getFeedbackList()
  existing.push(entry)
  localStorage.setItem(FEEDBACK_KEY, JSON.stringify(existing))
}

export function clearFeedback(): void {
  localStorage.removeItem(FEEDBACK_KEY)
}
