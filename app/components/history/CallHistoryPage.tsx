



import { useState } from 'react'
import { Search, History, Phone, Users, Clock } from 'lucide-react'
import { useCallHistory } from '../../hooks/useCallHistory'
import { EmptyState } from '../shared/EmptyState'
import { ErrorState } from '../shared/ErrorState'
import { Pagination } from '../shared/Pagination'
import { StatusBadge } from '../ui/Badge'
import { Input } from '../ui/Input'
import { SkeletonRow } from '../ui/Skeleton'
import { formatDuration, formatDateTime } from '../../utils/format'
import type { CallSession } from '../../types/api.types'


function CallTable({
  sessions,
  loading,
}: {
  sessions: CallSession[]
  loading: boolean
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50">
            <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
              Client
            </th>
            <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
              Status
            </th>
            <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
              Duration
            </th>
            <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
              Participants
            </th>
            <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
              Date
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
          ) : (
            sessions.map((session) => (
              <tr
                key={session._id}
                className="group hover:bg-slate-50 transition-colors"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 shrink-0">
                      <Phone className="h-3.5 w-3.5 text-indigo-500" />
                    </div>
                    <span className="font-medium text-slate-800">
                      {session.client}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={session.status as any} />
                </td>
                <td className="px-4 py-3 tabular-nums text-slate-600">
                  {formatDuration(session.total_duration_seconds)}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1.5 text-slate-600">
                    <Users className="h-3.5 w-3.5 text-slate-400" />
                    <span>{session.participants.length}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-slate-500 text-xs">
                  {formatDateTime(session.createdAt)}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}


function CallCard({ session }: { session: CallSession }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 shrink-0">
            <Phone className="h-4 w-4 text-indigo-500" />
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-slate-800 truncate">{session.client}</p>
            <p className="text-xs text-slate-400 mt-0.5">{formatDateTime(session.createdAt)}</p>
          </div>
        </div>
        <StatusBadge status={session.status as any} />
      </div>
      <div className="mt-3 flex items-center gap-4 text-xs text-slate-500">
        <div className="flex items-center gap-1">
          <Clock className="h-3.5 w-3.5" />
          <span>{formatDuration(session.total_duration_seconds)}</span>
        </div>
        <div className="flex items-center gap-1">
          <Users className="h-3.5 w-3.5" />
          <span>{session.participants.length} participant{session.participants.length !== 1 ? 's' : ''}</span>
        </div>
      </div>
    </div>
  )
}

export function CallHistoryPage() {
  const [page, setPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')

  const { data, isLoading, error, refetch } = useCallHistory(page, 10)

  const sessions = data?.callSessions ?? []
  const pagination = data?.pagination

  
  const filtered = searchQuery
    ? sessions.filter((s) =>
        s.client.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : sessions

  const isEmpty = !isLoading && !error && sessions.length === 0

  if (error) {
    return <ErrorState error={error} onRetry={refetch} />
  }

  return (
    <div className="space-y-5">
      
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Call History</h2>
          <p className="mt-0.5 text-sm text-slate-500">
            {pagination?.totalCount
              ? `${pagination.totalCount} call sessions total`
              : 'Your complete call log'}
          </p>
        </div>
        {/* Search */}
        {!isEmpty && (
          <div className="sm:w-64">
            <Input
              placeholder="Search by client name..."
              leftElement={<Search className="h-4 w-4" />}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search call sessions"
            />
          </div>
        )}
      </div>

      {isEmpty ? (
        <EmptyState
          icon={<History className="h-8 w-8" />}
          title="No call history yet"
          description="Your call sessions will appear here once you start making calls with Hintro."
          className="rounded-xl border border-slate-200 bg-white py-20"
        />
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden md:block">
            <CallTable
              sessions={filtered}
              loading={isLoading}
            />
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-3">
            {isLoading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="rounded-xl border border-slate-200 bg-white p-4">
                    <div className="flex gap-3">
                      <div className="h-9 w-9 rounded-lg bg-slate-200 animate-pulse" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 w-32 rounded bg-slate-200 animate-pulse" />
                        <div className="h-3 w-24 rounded bg-slate-200 animate-pulse" />
                      </div>
                    </div>
                  </div>
                ))
              : filtered.map((session) => (
                  <CallCard key={session._id} session={session} />
                ))}
          </div>

          {/* Pagination */}
          {pagination && (
            <div className="flex items-center justify-between border-t border-slate-200 pt-4">
              <p className="text-xs text-slate-500">
                Showing {((pagination.page - 1) * pagination.limit) + 1}–
                {Math.min(pagination.page * pagination.limit, pagination.totalCount)} of{' '}
                {pagination.totalCount}
              </p>
              <Pagination
                currentPage={pagination.page}
                totalPages={pagination.totalPages}
                hasNextPage={pagination.hasNextPage}
                hasPrevPage={pagination.hasPrevPage}
                onPageChange={setPage}
              />
            </div>
          )}
        </>
      )}
    </div>
  )
}
