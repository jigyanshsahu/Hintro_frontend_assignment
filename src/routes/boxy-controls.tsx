import { createFileRoute } from '@tanstack/react-router'
import { EmptyState } from '../../app/components/shared/EmptyState'
import { Settings2 } from 'lucide-react'

export const Route = createFileRoute('/boxy-controls')({
  component: () => (
    <div className="p-6">
      <EmptyState
        icon={<Settings2 className="h-8 w-8" />}
        title="Boxy Controls"
        description="This page is under construction."
        className="bg-white border border-slate-200 rounded-xl"
      />
    </div>
  ),
})
