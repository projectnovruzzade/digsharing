import { Card } from '@/components/ui'
import { PageHeader } from '@/components/layout/PageHeader'

export default function TrainingPage() {
  return (
    <div>
      <PageHeader title="Training plans" />
      <Card>
        <p className="text-sm text-fg-secondary">
          Training suggestions and internal L&D workflows — scaffold per specification.
        </p>
      </Card>
    </div>
  )
}
