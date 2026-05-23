



import { useMemo } from 'react'
import {
  PieChart,
  Clock,
  Sparkles,
  Calendar,
  Users,
  MoreVertical,
} from 'lucide-react'
import { useDashboard } from '../../hooks/useDashboard'
import { useCallStats } from '../../hooks/useCallStats'
import { useCallHistory } from '../../hooks/useCallHistory'
import { ErrorState } from '../shared/ErrorState'
import { Button } from '../ui/Button'
import { Skeleton } from '../ui/Skeleton'
import type { CallSession } from '../../types/api.types'
import {
  formatDurationVerbose,
  formatRelativeTimeVerbose,
  formatTime,
  formatGroupDate,
} from '../../utils/format'

export function DashboardPage() {
  const {
    data: dashData,
    isLoading: dashLoading,
    error: dashError,
    refetch: dashRefetch,
  } = useDashboard()

  const {
    data: statsData,
    isLoading: statsLoading,
    error: statsError,
    refetch: statsRefetch,
  } = useCallStats()

  const {
    data: historyData,
    isLoading: historyLoading,
    error: historyError,
    refetch: historyRefetch,
  } = useCallHistory(1, 10) 

  const hasError = dashError || statsError || historyError

  const user = dashData?.user

  const groupedCalls = useMemo(() => {
    if (!historyData?.callSessions) return []
    const groups: Record<string, CallSession[]> = {}

    
    const sorted = [...historyData.callSessions].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )

    for (const session of sorted) {
      const gDate = formatGroupDate(session.createdAt)
      if (!groups[gDate]) groups[gDate] = []
      groups[gDate].push(session)
    }
    return Object.entries(groups)
  }, [historyData])

  if (hasError) {
    return (
      <ErrorState
        error={dashError || statsError || historyError}
        onRetry={() => {
          dashRefetch()
          statsRefetch()
          historyRefetch()
        }}
      />
    )
  }

  return (
    <div className="max-w-6xl mx-auto py-2">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          {dashLoading ? (
            <Skeleton className="h-7 w-64 mb-2" />
          ) : (
            <h1 className="text-xl font-bold text-slate-900">
              Hi, {user?.firstName ? `${user.firstName} ` : ''}👋 Welcome to Hintro
            </h1>
          )}
          <p className="text-sm text-slate-600 mt-1">Ready to make your next call smarter ?</p>
        </div>
        <Button className="bg-black hover:bg-slate-900 text-white border-transparent rounded-lg shadow-sm">
          Start New Call
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {/* Total Sessions */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 flex items-center gap-4 shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-400 shrink-0">
            <PieChart className="h-6 w-6 fill-red-400 text-red-400" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 mb-0.5">Total Sessions</p>
            {statsLoading ? (
              <Skeleton className="h-6 w-12" />
            ) : (
              <p className="text-lg font-bold text-slate-900">{statsData?.totalSessions ?? 0}</p>
            )}
          </div>
        </div>

        {/* Average Duration */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 flex items-center gap-4 shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-50 text-cyan-500 shrink-0">
            <Clock className="h-6 w-6 fill-cyan-500 text-cyan-500" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 mb-0.5">Average Duration</p>
            {statsLoading ? (
              <Skeleton className="h-6 w-24" />
            ) : (
              <p className="text-lg font-bold text-slate-900">
                {formatDurationVerbose(statsData?.averageDuration ?? 0)}
              </p>
            )}
          </div>
        </div>

        {/* AI Used */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 flex items-center gap-4 shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-500 shrink-0">
            <Sparkles className="h-6 w-6 fill-green-500 text-green-500" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 mb-0.5">AI Used</p>
            {statsLoading ? (
              <Skeleton className="h-6 w-20" />
            ) : (
              <p className="text-lg font-bold text-slate-900">
                {statsData?.totalAIInteractions ?? 0} times
              </p>
            )}
          </div>
        </div>

        {/* Last Session */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 flex items-center gap-4 shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-purple-500 shrink-0">
            <Calendar className="h-6 w-6 fill-purple-500 text-purple-500" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 mb-0.5">Last Session</p>
            {statsLoading ? (
              <Skeleton className="h-6 w-24" />
            ) : (
              <p className="text-lg font-bold text-slate-900">
                {statsData?.lastSession?.[0] ? formatRelativeTimeVerbose(statsData.lastSession[0]) : '—'}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Recent Calls */}
      <div className="flex justify-center mb-8">
        <h2 className="text-sm font-semibold text-slate-800">Recent calls</h2>
      </div>

      <div className="max-w-2xl mx-auto space-y-10 pb-10">
        {historyLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-4 w-24 ml-2" />
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between px-2 py-1">
                <div className="flex items-center gap-4">
                  <Skeleton className="h-10 w-10 rounded-lg" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                </div>
                <Skeleton className="h-4 w-16" />
              </div>
            ))}
          </div>
        ) : groupedCalls.length === 0 ? (
          <div className="text-center text-slate-500 text-sm py-10">
            No recent calls found.
          </div>
        ) : (
          groupedCalls.map(([dateString, sessions]) => (
            <div key={dateString} className="space-y-4">
              <h3 className="text-[13px] font-medium text-slate-400 px-2">
                {dateString}
              </h3>
              <div className="space-y-4">
                {sessions.map((session) => (
                  <div
                    key={session._id}
                    className="flex items-center justify-between gap-4 px-2 group cursor-pointer"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600 text-white font-semibold shadow-sm shrink-0">
                        {session.client ? session.client.charAt(0).toUpperCase() : 'C'}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors truncate">
                          {session.client || 'Unknown Client'}
                        </p>
                        <div className="flex items-center -space-x-1 mt-1">
                          
                          {Array.from({
                            length: Math.min(3, session.participants?.length || 1),
                          }).map((_, i) => (
                            <div
                              key={i}
                              className="h-4 w-4 rounded-full bg-slate-200 border border-white flex items-center justify-center overflow-hidden z-10"
                            >
                              <Users className="h-2.5 w-2.5 text-slate-400" />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 shrink-0">
                      <span className="text-[13px] font-medium text-slate-600">
                        {formatTime(session.createdAt)}
                      </span>
                      <button className="text-slate-400 hover:text-slate-700">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
