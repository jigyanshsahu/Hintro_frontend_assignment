



import React, { Suspense } from 'react'
import { Sidebar } from './Sidebar'
import { Navbar } from './Navbar'
import { FeedbackModal } from '../shared/FeedbackModal'
import { useAppStore } from '../../store/useAppStore'
import { cn } from '../../lib/utils'

interface AppLayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  const feedbackModalOpen = useAppStore((s) => s.feedbackModalOpen)

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      
      <Sidebar />

      
      <div
        className={cn(
          'flex flex-1 flex-col overflow-hidden',
          'transition-all duration-300',
          
        )}
      >
        <Navbar />
        <main
          className="flex-1 overflow-y-auto"
          id="main-content"
          tabIndex={-1}
        >
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <Suspense
              fallback={
                <div className="flex items-center justify-center py-24">
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent" />
                </div>
              }
            >
              {children}
            </Suspense>
          </div>
        </main>
      </div>

      
      {feedbackModalOpen && <FeedbackModal />}
    </div>
  )
}
