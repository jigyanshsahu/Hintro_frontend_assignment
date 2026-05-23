



import { Link, useRouterState } from '@tanstack/react-router'
import {
  LayoutDashboard,
  PhoneCall,
  FileText,
  MessageSquare,
  Settings2,
  Info,
  Archive,
  Gift,
  Menu,
} from 'lucide-react'
import { cn } from '../../lib/utils'
import { useAppStore } from '../../store/useAppStore'
import { UserSwitcher } from './UserSwitcher'

const NAV_LINKS = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, hasInfo: false },
  { to: '/analytics', label: 'Call Insights', icon: PhoneCall, hasInfo: false },
  { to: '/knowledge-base', label: 'Knowledge Base', icon: FileText, hasInfo: true },
  { to: '/prompts', label: 'Prompts', icon: MessageSquare, hasInfo: true },
  { to: '/boxy-controls', label: 'Boxy Controls', icon: Settings2, hasInfo: true },
] as const

export function Sidebar() {
  const { sidebarOpen, toggleSidebar, setFeedbackModalOpen } = useAppStore()
  const routerState = useRouterState()
  const currentPath = routerState.location.pathname

  return (
    <>
      
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={() => toggleSidebar()}
          aria-hidden="true"
        />
      )}

      
      <aside
        className={cn(
          'fixed left-0 top-0 z-30 flex h-full flex-col',
          'bg-white text-slate-900 border-r border-slate-200',
          'transition-[width] duration-300 ease-in-out',
          'shadow-sm',
          sidebarOpen ? 'w-64' : 'w-16',
          
          'lg:relative lg:translate-x-0 lg:shadow-none',
          !sidebarOpen && '-translate-x-full lg:translate-x-0',
        )}
        aria-label="Sidebar navigation"
      >
        
        <div className="flex h-16 shrink-0 items-center justify-between px-6">
          <div className={cn('flex items-center', !sidebarOpen && 'hidden')}>
            <span className="text-xl font-bold text-slate-900 tracking-tight">Hintro</span>
          </div>
          {!sidebarOpen && (
            <span className="text-sm font-bold text-slate-900 mx-auto tracking-tight lg:block hidden">H</span>
          )}
          
          
          <button
            onClick={toggleSidebar}
            className="lg:hidden flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 transition-colors -ml-2"
            aria-label="Close menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x h-5 w-5"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>

          
          <button
            onClick={toggleSidebar}
            className={cn(
              'hidden lg:flex h-8 w-8 items-center justify-center rounded-md',
              'text-slate-500 hover:bg-slate-100 transition-colors',
              !sidebarOpen && 'mx-auto',
            )}
            aria-label={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>

        
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1" role="navigation">
          {NAV_LINKS.map(({ to, label, icon: Icon, hasInfo }) => {
            const isActive = currentPath === to || currentPath.startsWith(`${to}/`)
            return (
              <Link
                key={to}
                to={to}
                className={cn(
                  'group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium',
                  'transition-all duration-150',
                  isActive
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900',
                  !sidebarOpen && 'justify-center px-2',
                )}
                title={!sidebarOpen ? label : undefined}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon
                  className={cn(
                    'h-4 w-4 shrink-0 transition-colors',
                    isActive ? 'text-indigo-600' : 'text-slate-500 group-hover:text-slate-700',
                  )}
                />
                {sidebarOpen && <span className="flex-1">{label}</span>}
                {sidebarOpen && hasInfo && (
                  <Info className="h-4 w-4 text-slate-400 shrink-0" />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Bottom section */}
        <div className="p-4 space-y-4">
          <div className="space-y-1">
            <Link
              to="/history"
              className={cn(
                'group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium',
                'text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all duration-150',
                !sidebarOpen && 'justify-center px-2',
              )}
              title={!sidebarOpen ? 'Feedback History' : undefined}
            >
              <Archive className="h-4 w-4 shrink-0 text-slate-500 group-hover:text-slate-700 transition-colors" />
              {sidebarOpen && <span>Feedback History</span>}
            </Link>
            
            <button
              onClick={() => setFeedbackModalOpen(true)}
              className={cn(
                'group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium',
                'text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all duration-150',
                !sidebarOpen && 'justify-center px-2',
              )}
              title={!sidebarOpen ? 'Feedback' : undefined}
              id="feedback-btn"
            >
              <Gift className="h-4 w-4 shrink-0 text-slate-500 group-hover:text-slate-700 transition-colors" />
              {sidebarOpen && <span>Feedback</span>}
            </button>
          </div>

          <button
            className={cn(
              'w-full rounded-xl bg-gray-500 hover:bg-gray-600 text-white font-medium py-2.5 transition-colors',
              !sidebarOpen && 'p-2',
            )}
            title={!sidebarOpen ? 'Upgrade' : undefined}
          >
            {sidebarOpen ? 'Upgrade' : '↑'}
          </button>

          {/* User Switcher for mock environment testing */}
          {sidebarOpen && (
            <div className="pt-2 border-t border-slate-100">
              <UserSwitcher />
            </div>
          )}
        </div>
      </aside>
    </>
  )
}
