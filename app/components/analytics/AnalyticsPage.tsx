



import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { Phone, Clock, Bot, Activity } from 'lucide-react'
import { useCallStats } from '../../hooks/useCallStats'
import { useCallHistory } from '../../hooks/useCallHistory'
import { StatsCard } from '../dashboard/StatsCard'
import { EmptyState } from '../shared/EmptyState'
import { ErrorState } from '../shared/ErrorState'
import { StatusBadge } from '../ui/Badge'
import { formatDuration, formatDateTime } from '../../utils/format'
import { Skeleton } from '../ui/Skeleton'
import type { CallSession } from '../../types/api.types'


function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: Array<{ value: number }>
  label?: string
}) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-lg text-xs">
      <p className="font-medium text-slate-700 mb-1">{label}</p>
      <p className="text-indigo-600 font-semibold">{formatDuration(payload[0].value)}</p>
    </div>
  )
}

function LastSessionsList({
  sessions,
  loading,
}: {
  sessions: CallSession[]
  loading: boolean
}) {
  if (loading) {
    return (
      <div className="space-y-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-3">
            <Skeleton className="h-9 w-9 rounded-lg" />
            <div className="flex-1 space-y-1.5">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-3 w-28" />
            </div>
            <Skeleton className="h-5 w-20 rounded-full" />
          </div>
        ))}
      </div>
    )
  }

  if (!sessions.length) {
    return (
      <EmptyState
        icon={<Activity className="h-7 w-7" />}
        title="No recent sessions"
        description="Your recent call sessions will appear here once you start making calls."
        className="rounded-xl border border-slate-200 bg-white"
      />
    )
  }

  return (
    <div className="space-y-2">
      {sessions.map((session) => (
        <div
          key={session._id}
          className="flex items-center justify-between gap-4 rounded-lg border border-slate-200 bg-white p-3 hover:shadow-sm transition-shadow"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 shrink-0">
              <Phone className="h-4 w-4 text-indigo-600" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-slate-800 truncate">
                {session.client}
              </p>
              <p className="text-xs text-slate-500 truncate">
                {formatDateTime(session.createdAt)} · {session.participants.length} participant
                {session.participants.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-medium text-slate-600">
              {formatDuration(session.total_duration_seconds)}
            </span>
            <StatusBadge status={session.status as any} />
          </div>
        </div>
      ))}
    </div>
  )
}

export function AnalyticsPage() {
  const { data, isLoading, error, refetch } = useCallStats()
  const { data: historyData, isLoading: historyLoading } = useCallHistory(1, 3)

  const isEmpty = !isLoading && !error && (data?.totalSessions ?? 0) === 0

  if (error) {
    return <ErrorState error={error} onRetry={refetch} />
  }

  const recentSessions = historyData?.callSessions ?? []

  
  const chartData = [...recentSessions].reverse().map((s, i) => ({
    name: s.client || `Session ${i + 1}`,
    duration: s.total_duration_seconds,
  }))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-slate-900">Analytics</h2>
        <p className="mt-0.5 text-sm text-slate-500">
          Insights from your call activity
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatsCard
          title="Total Sessions"
          value={data?.totalSessions ?? 0}
          icon={<Phone className="h-5 w-5" />}
          iconBgClass="bg-indigo-50 text-indigo-600"
          loading={isLoading}
        />
        <StatsCard
          title="Avg. Duration"
          value={formatDuration(data?.averageDuration ?? 0)}
          icon={<Clock className="h-5 w-5" />}
          iconBgClass="bg-violet-50 text-violet-600"
          loading={isLoading}
        />
        <StatsCard
          title="AI Interactions"
          value={data?.totalAIInteractions ?? 0}
          icon={<Bot className="h-5 w-5" />}
          iconBgClass="bg-emerald-50 text-emerald-600"
          loading={isLoading}
        />
      </div>

      {isEmpty ? (
        <EmptyState
          icon={<BarChart className="h-8 w-8" />}
          title="No analytics data yet"
          description="Start making calls to see your analytics and performance metrics here."
          className="rounded-xl border border-slate-200 bg-white py-20"
        />
      ) : (
        <>
          {/* Duration chart */}
          {chartData.length > 0 && (
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="mb-4 text-sm font-semibold text-slate-700">
                Session Duration (recent)
              </h3>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 4, right: 4, bottom: 4, left: -20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis
                      dataKey="name"
                      tick={{ fontSize: 11, fill: '#94a3b8' }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tickFormatter={(v: number) => `${Math.round(v / 60)}m`}
                      tick={{ fontSize: 11, fill: '#94a3b8' }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar
                      dataKey="duration"
                      fill="#6366f1"
                      radius={[4, 4, 0, 0]}
                      maxBarSize={48}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Last sessions */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-slate-700">
              Recent Sessions
            </h3>
            <LastSessionsList
              sessions={recentSessions}
              loading={historyLoading}
            />
          </div>
        </>
      )}
    </div>
  )
}
