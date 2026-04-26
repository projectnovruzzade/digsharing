import { Card } from '@/components/ui'
import { PageHeader } from '@/components/layout/PageHeader'
import { EmptyState } from '@/components/layout/EmptyState'

export default function SwapProposalsPage() {
  const hasItems = false
  return (
    <div>
      <PageHeader title="Swap proposals" />
      {hasItems ? (
        <Card>…</Card>
      ) : (
        <EmptyState
          title="No swap proposals"
          description="When HR or AI suggests a swap, it will appear here."
        />
      )}
    </div>
  )
}
