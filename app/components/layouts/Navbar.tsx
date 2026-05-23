



import { useState, useRef, useEffect } from 'react'
import { Menu, LogOut, User, Play, ChevronDown } from 'lucide-react'
import { useRouterState } from '@tanstack/react-router'
import { useAppStore } from '../../store/useAppStore'
import { useProfile } from '../../hooks/useProfile'
import { LogoutModal } from '../ui/LogoutModal'
import { cn } from '../../lib/utils'

const PAGE_LABELS: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/analytics': 'Analytics',
  '/history': 'Call History',
  '/settings': 'Settings',
}

function getInitials(firstName?: string, lastName?: string) {
  const f = firstName?.[0] ?? ''
  const l = lastName?.[0] ?? ''
  return (f + l).toUpperCase() || 'U'
}

export function Navbar() {
  const { toggleSidebar } = useAppStore()
  const routerState = useRouterState()
  const currentPath = routerState.location.pathname
  const pageTitle = PAGE_LABELS[currentPath] ?? 'Hintro'

  const { data: profile } = useProfile()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [logoutModalOpen, setLogoutModalOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false)
      }
    }
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dropdownOpen])

  return (
    <>
      <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-3 border-b border-slate-200 bg-white/90 backdrop-blur-sm px-4 sm:px-6">
        
        <button
          onClick={toggleSidebar}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 transition-colors lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        
        <div className="flex-1 min-w-0">
          <h1 className="text-lg font-semibold text-slate-900 truncate">{pageTitle}</h1>
        </div>

        
        <div className="flex items-center gap-4">
          
          <button className="hidden sm:flex items-center gap-2 px-3 py-1.5 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
            <Play className="h-3.5 w-3.5 fill-slate-800 text-slate-800" />
            Watch Tutorial
          </button>

          
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1.5 cursor-pointer group focus:outline-none"
              aria-expanded={dropdownOpen}
            >
              <div
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-full',
                  'bg-gradient-to-br from-indigo-500 to-violet-600 text-white text-xs font-semibold',
                  'ring-2 ring-white shadow-sm group-hover:ring-indigo-100 transition-all',
                )}
                title={profile ? `${profile.firstName} ${profile.lastName}` : 'User'}
                aria-label={profile ? `${profile.firstName} ${profile.lastName}` : 'User avatar'}
              >
                {getInitials(profile?.firstName, profile?.lastName)}
              </div>
              <ChevronDown className="h-4 w-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black/5 focus:outline-none z-50">
                <div className="p-2 border-b border-slate-100">
                  <p className="text-sm font-medium text-slate-900 truncate">
                    {profile ? `${profile.firstName} ${profile.lastName}` : 'User'}
                  </p>
                  <p className="text-xs text-slate-500 truncate mt-0.5">
                    {profile?.email ?? 'user@example.com'}
                  </p>
                </div>
                <div className="p-1">
                  <button
                    onClick={() => setDropdownOpen(false)}
                    className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                  >
                    <User className="h-4 w-4 text-slate-400" />
                    Profile Settings
                  </button>
                  <button
                    onClick={() => {
                      setDropdownOpen(false)
                      setLogoutModalOpen(true)
                    }}
                    className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors mt-1"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Logout Modal */}
      {logoutModalOpen && (
        <LogoutModal
          onClose={() => setLogoutModalOpen(false)}
          onConfirm={() => {
            setLogoutModalOpen(false)
            window.location.href = '/'
          }}
        />
      )}
    </>
  )
}
