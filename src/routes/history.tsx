import { createFileRoute } from '@tanstack/react-router'
import { lazy, Suspense } from 'react'
import { AppLayout } from '../../app/components/layouts/AppLayout'
import { Skeleton } from '../../app/components/ui/Skeleton'

const CallHistoryPage = lazy(() =>
  import('../../app/components/history/CallHistoryPage').then((m) => ({
    default: m.CallHistoryPage,
  })),
)

export const Route = createFileRoute('/history')({
  component: History,
  head: () => ({
    meta: [{ title: 'Call History – Hintro' }],
  }),
})

function History() {
  return (
    <AppLayout>
      <Suspense fallback={<PageSkeleton />}>
        <CallHistoryPage />
      </Suspense>
    </AppLayout>
  )
}

function PageSkeleton() {
  return (
    <div className="space-y-5">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-10 w-64 rounded-lg" />
      <Skeleton className="h-80 w-full rounded-xl" />
    </div>
  )
}
