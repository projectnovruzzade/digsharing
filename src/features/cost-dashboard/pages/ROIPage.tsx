import { Card } from '@/components/ui'
import { PageHeader } from '@/components/layout/PageHeader'

export default function ROIPage() {
  return (
    <div>
      <PageHeader title="ROI tracker" />
      <Card>
        <p className="text-sm text-fg-secondary">
          Transfer ROI timelines and payback — connect charts when finance data is available.
        </p>
      </Card>
    </div>
  )
}
