



import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { UserId } from '../types/api.types'

interface AppState {
  
  activeUserId: UserId
  setActiveUserId: (userId: UserId) => void

  
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
  toggleSidebar: () => void

  
  feedbackModalOpen: boolean
  setFeedbackModalOpen: (open: boolean) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      
      activeUserId: 'u1',
      setActiveUserId: (userId) => set({ activeUserId: userId }),

      
      sidebarOpen: true,
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

      
      feedbackModalOpen: false,
      setFeedbackModalOpen: (open) => set({ feedbackModalOpen: open }),
    }),
    {
      name: 'hintro-app-state',
      
      partialize: (state) => ({ activeUserId: state.activeUserId }),
    },
  ),
)
