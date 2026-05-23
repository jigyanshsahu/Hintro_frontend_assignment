import { createFileRoute } from '@tanstack/react-router'
import { lazy, Suspense } from 'react'
import { AppLayout } from '../../app/components/layouts/AppLayout'
import { Skeleton } from '../../app/components/ui/Skeleton'

const AnalyticsPage = lazy(() =>
  import('../../app/components/analytics/AnalyticsPage').then((m) => ({
    default: m.AnalyticsPage,
  })),
)

export const Route = createFileRoute('/analytics')({
  component: Analytics,
  head: () => ({
    meta: [{ title: 'Analytics – Hintro' }],
  }),
})

function Analytics() {
  return (
    <AppLayout>
      <Suspense fallback={<PageSkeleton />}>
        <AnalyticsPage />
      </Suspense>
    </AppLayout>
  )
}

function PageSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-8 w-48" />
      <div className="grid grid-cols-3 gap-4">
        <Skeleton className="h-28 rounded-xl" />
        <Skeleton className="h-28 rounded-xl" />
        <Skeleton className="h-28 rounded-xl" />
      </div>
      <Skeleton className="h-56 w-full rounded-xl" />
    </div>
  )
}
