import { createFileRoute } from '@tanstack/react-router'
import { lazy, Suspense } from 'react'
import { AppLayout } from '../../app/components/layouts/AppLayout'
import { Skeleton } from '../../app/components/ui/Skeleton'

const DashboardPage = lazy(() =>
  import('../../app/components/dashboard/DashboardPage').then((m) => ({
    default: m.DashboardPage,
  })),
)

export const Route = createFileRoute('/dashboard')({
  component: Dashboard,
  head: () => ({
    meta: [{ title: 'Dashboard – Hintro' }],
  }),
})

function Dashboard() {
  return (
    <AppLayout>
      <Suspense fallback={<PageSkeleton />}>
        <DashboardPage />
      </Suspense>
    </AppLayout>
  )
}

function PageSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-8 w-64" />
      <Skeleton className="h-24 w-full rounded-xl" />
      <div className="grid grid-cols-3 gap-4">
        <Skeleton className="h-28 rounded-xl" />
        <Skeleton className="h-28 rounded-xl" />
        <Skeleton className="h-28 rounded-xl" />
      </div>
    </div>
  )
}
