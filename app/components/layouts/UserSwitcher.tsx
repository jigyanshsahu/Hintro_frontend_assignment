



import { useAppStore } from '../../store/useAppStore'
import { cn } from '../../lib/utils'
import { useQueryClient } from '@tanstack/react-query'

export function UserSwitcher() {
  const { activeUserId, setActiveUserId } = useAppStore()
  const queryClient = useQueryClient()

  const switchUser = (userId: 'u1' | 'u2') => {
    if (userId === activeUserId) return
    setActiveUserId(userId)
    
    queryClient.invalidateQueries()
  }

  return (
    <div className="rounded-lg border border-slate-800 bg-slate-800/60 p-2">
      <p className="mb-2 px-1 text-[11px] font-semibold uppercase tracking-widest text-black">
        Test User
      </p>
      <div className="flex gap-1.5">
        {(['u1', 'u2'] as const).map((uid) => (
          <button
            key={uid}
            onClick={() => switchUser(uid)}
            className={cn(
              'flex-1 rounded-md px-2 py-1.5 text-xs font-medium transition-all duration-150',
              activeUserId === uid
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-white hover:bg-slate-700 hover:text-slate-200',
            )}
            aria-pressed={activeUserId === uid}
          >
            {uid === 'u1' ? '🆕 U1 (Empty)' : '📊 U2 (Active)'}
          </button>
        ))}
      </div>
      <p className="mt-1.5 px-1 text-[10px] text-slate-600">
        {activeUserId === 'u1' ? 'Simulates a new user' : 'Simulates an active user'}
      </p>
    </div>
  )
}
