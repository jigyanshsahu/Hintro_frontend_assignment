



import type { MouseEvent } from 'react'
import { X, Star, CheckCircle2, MessageSquarePlus } from 'lucide-react'
import { useFeedback } from '../../hooks/useFeedback'
import { Button } from '../ui/Button'
import { Textarea } from '../ui/Input'
import { cn } from '../../lib/utils'

export function FeedbackModal() {
  const { form, submitted, isSubmitting, submitFeedback, closeFeedbackModal } = useFeedback()

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = form

  const currentRating = watch('rating')
  const currentMessage = watch('message')

  const handleClose = () => {
    closeFeedbackModal()
  }

  
  const handleBackdropClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) handleClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="feedback-modal-title"
    >
      
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />

      
      <div
        className={cn(
          'relative w-full max-w-md rounded-2xl bg-white shadow-2xl',
          'animate-in fade-in slide-in-from-bottom-4 duration-300',
        )}
        onClick={(e) => e.stopPropagation()}
      >
        
        <div className="flex items-start justify-between border-b border-slate-100 p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50">
              <MessageSquarePlus className="h-5 w-5 text-indigo-600" />
            </div>
            <div>
              <h2 id="feedback-modal-title" className="text-base font-semibold text-slate-900">
                Send Feedback
              </h2>
              <p className="text-sm text-slate-500">Help us improve Hintro</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
            aria-label="Close feedback modal"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {submitted ? (
          
          <div className="flex flex-col items-center justify-center py-12 px-5 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
              <CheckCircle2 className="h-8 w-8 text-emerald-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">Thank you!</h3>
            <p className="mt-2 text-sm text-slate-500">
              Your feedback has been submitted. We really appreciate it!
            </p>
            <Button variant="primary" size="md" className="mt-6" onClick={handleClose}>
              Close
            </Button>
          </div>
        ) : (
          
          <form onSubmit={handleSubmit(submitFeedback)} className="p-5 space-y-5" noValidate>
            
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Overall Rating <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-1.5" role="group" aria-label="Rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setValue('rating', star, { shouldValidate: true })}
                    className={cn(
                      'rounded-lg p-1 transition-all duration-100',
                      'hover:scale-110 active:scale-95',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500',
                    )}
                    aria-label={`${star} star${star !== 1 ? 's' : ''}`}
                    aria-pressed={currentRating >= star}
                  >
                    <Star
                      className={cn(
                        'h-7 w-7 transition-colors',
                        currentRating >= star
                          ? 'fill-amber-400 text-amber-400'
                          : 'fill-slate-200 text-slate-200',
                      )}
                    />
                  </button>
                ))}
              </div>
              {errors.rating && (
                <p className="mt-1 text-xs text-red-600">{errors.rating.message}</p>
              )}
            </div>

            {/* Feedback message */}
            <Textarea
              label="Your Feedback"
              placeholder="Tell us what you love or what we can improve..."
              rows={4}
              showCount
              maxLength={500}
              error={errors.message?.message}
              {...register('message')}
              value={currentMessage}
            />

            {/* Submit */}
            <div className="flex gap-3 pt-1">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                className="flex-1"
                loading={isSubmitting}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Feedback'}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
