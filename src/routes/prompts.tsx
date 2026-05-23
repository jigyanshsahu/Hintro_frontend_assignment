import { createFileRoute } from '@tanstack/react-router'
import { EmptyState } from '../../app/components/shared/EmptyState'
import { MessageSquare } from 'lucide-react'

export const Route = createFileRoute('/prompts')({
  component: () => (
    <div className="p-6">
      <EmptyState
        icon={<MessageSquare className="h-8 w-8" />}
        title="Prompts"
        description="This page is under construction."
        className="bg-white border border-slate-200 rounded-xl"
      />
    </div>
  ),
})
