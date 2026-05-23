import { createFileRoute } from '@tanstack/react-router'
import { EmptyState } from '../../app/components/shared/EmptyState'
import { FileText } from 'lucide-react'

export const Route = createFileRoute('/knowledge-base')({
  component: () => (
    <div className="p-6">
      <EmptyState
        icon={<FileText className="h-8 w-8" />}
        title="Knowledge Base"
        description="This page is under construction."
        className="bg-white border border-slate-200 rounded-xl"
      />
    </div>
  ),
})
