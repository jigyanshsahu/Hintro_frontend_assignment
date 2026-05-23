import { createFileRoute } from '@tanstack/react-router'
import { lazy, Suspense } from 'react'
import { AppLayout } from '../../app/components/layouts/AppLayout'
import { Skeleton } from '../../app/components/ui/Skeleton'

const SettingsPage = lazy(() =>
  import('../../app/components/settings/SettingsPage').then((m) => ({
    default: m.SettingsPage,
  })),
)

export const Route = createFileRoute('/settings')({
  component: Settings,
  head: () => ({
    meta: [{ title: 'Settings – Hintro' }],
  }),
})

function Settings() {
  return (
    <AppLayout>
      <Suspense fallback={<PageSkeleton />}>
        <SettingsPage />
      </Suspense>
    </AppLayout>
  )
}

function PageSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <Skeleton className="h-64 rounded-xl" />
      <div className="lg:col-span-2 space-y-4">
        <Skeleton className="h-16 rounded-xl" />
        <Skeleton className="h-64 rounded-xl" />
      </div>
    </div>
  )
}
