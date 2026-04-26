import { Card } from '@/components/ui'
import { PageHeader } from '@/components/layout/PageHeader'

export default function SettingsPage() {
  return (
    <div>
      <PageHeader title="Settings" />
      <Card>
        <p className="text-sm text-fg-secondary">
          Notification preferences and security — placeholder for MVP.
        </p>
      </Card>
    </div>
  )
}
