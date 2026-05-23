



import { useState, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { saveFeedback, getFeedbackList } from '../utils/localStorage'
import { useAppStore } from '../store/useAppStore'
import type { FeedbackEntry } from '../types/api.types'


const feedbackSchema = z.object({
  rating: z.number().min(1, 'Please select a rating').max(5),
  message: z
    .string()
    .min(10, 'Feedback must be at least 10 characters')
    .max(500, 'Feedback must be at most 500 characters'),
})

export type FeedbackFormValues = z.infer<typeof feedbackSchema>

export function useFeedback() {
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const activeUserId = useAppStore((s) => s.activeUserId)
  const setFeedbackModalOpen = useAppStore((s) => s.setFeedbackModalOpen)

  const form = useForm<FeedbackFormValues>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      rating: 0,
      message: '',
    },
  })

  const submitFeedback = useCallback(
    async (values: FeedbackFormValues) => {
      setIsSubmitting(true)
      try {
        
        await new Promise((resolve) => setTimeout(resolve, 600))

        const entry: FeedbackEntry = {
          id: crypto.randomUUID(),
          userId: activeUserId,
          rating: values.rating,
          message: values.message,
          submittedAt: new Date().toISOString(),
        }
        saveFeedback(entry)
        setSubmitted(true)
      } finally {
        setIsSubmitting(false)
      }
    },
    [activeUserId],
  )

  const resetFeedback = useCallback(() => {
    setSubmitted(false)
    form.reset()
  }, [form])

  const closeFeedbackModal = useCallback(() => {
    setFeedbackModalOpen(false)
    
    setTimeout(() => {
      resetFeedback()
    }, 300)
  }, [setFeedbackModalOpen, resetFeedback])

  const feedbackHistory = getFeedbackList().filter((f) => f.userId === activeUserId)

  return {
    form,
    submitted,
    isSubmitting,
    submitFeedback,
    resetFeedback,
    closeFeedbackModal,
    feedbackHistory,
  }
}
