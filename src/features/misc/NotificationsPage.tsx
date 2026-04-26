import { Card } from '@/components/ui'
import { PageHeader } from '@/components/layout/PageHeader'

export default function NotificationsPage() {
  return (
    <div>
      <PageHeader title="Notifications" />
      <Card>
        <ul className="space-y-4 text-sm text-fg">
          <li className="flex gap-3">
            <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-success"></span>
            <div>
              <p className="font-medium">Təbrik edirik! Sizin Talent Referral sorğunuz nəticəsində Teymur Qasımlı Azİntelecom HR-ı tərəfindən təsdiqlənmişdir.</p>
              <p className="text-xs text-fg-muted mt-1">2 hours ago</p>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-accent"></span>
            <div>
              <p className="font-medium">New marketplace match: React Developer — 3-Month Project</p>
              <p className="text-xs text-fg-muted mt-1">1 day ago</p>
            </div>
          </li>
          <li className="flex gap-3 text-fg-secondary">
            <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-border"></span>
            <div>
              <p>Your application was received.</p>
              <p className="text-xs text-fg-muted mt-1">2 days ago</p>
            </div>
          </li>
          <li className="flex gap-3 text-fg-secondary">
            <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-border"></span>
            <div>
              <p>Monthly workforce report is ready.</p>
              <p className="text-xs text-fg-muted mt-1">1 week ago</p>
            </div>
          </li>
        </ul>
      </Card>
    </div>
  )
}
