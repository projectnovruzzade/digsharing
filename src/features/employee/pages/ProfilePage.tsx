import { useState } from 'react'
import { Badge, Button, Card, Progress, Modal, Input } from '@/components/ui'
import { PageHeader } from '@/components/layout/PageHeader'
import { useAuthStore } from '@/store/auth.store'
import { formatDate } from '@/utils/formatters'
import { cn } from '@/utils/cn'

const TABS = ['Skills', 'Experience', 'Allocations', 'Performance'] as const

export default function ProfilePage() {
  const user = useAuthStore((s) => s.user)
  const updateProfile = useAuthStore((s) => s.updateProfile)
  const [tab, setTab] = useState<(typeof TABS)[number]>('Skills')
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [formData, setFormData] = useState({ firstName: user?.firstName || '', lastName: user?.lastName || '' })

  if (!user) return null

  const handleSave = async () => {
    await updateProfile(formData)
    setIsEditOpen(false)
  }

  return (
    <div>
      <div className="mb-6 overflow-hidden rounded-lg border border-border bg-gradient-to-r from-primary-dark to-primary text-fg-inverse">
        <div className="p-6 md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="flex items-start gap-4">
              <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-primary-light text-2xl font-semibold text-primary-dark">
                {user.firstName[0]}
                {user.lastName[0]}
              </span>
              <div>
                <h1 className="font-display text-xl font-semibold">
                  {user.firstName} {user.lastName}
                </h1>
                <p className="mt-1 text-sm text-fg-inverse/80">
                  {user.position} · {user.company.name}
                </p>
                <Badge variant="success" className="mt-2 border-accent-dark/30">
                  {user.status}
                </Badge>
              </div>
            </div>
            <Button
              variant="secondary"
              className="border-fg-inverse/30 bg-white/10 text-fg-inverse hover:bg-white/20"
              onClick={() => setIsEditOpen(true)}
            >
              Edit profile
            </Button>
          </div>
          <div className="mt-6 flex flex-wrap gap-6 text-sm">
            <span>{(user.skills || []).length} skills</span>
            <span>Performance {user.performanceScore || 0}</span>
            <span>Joined {user.joinedAt ? formatDate(user.joinedAt) : 'N/A'}</span>
          </div>
        </div>
      </div>
      
      <Modal open={isEditOpen} onClose={() => setIsEditOpen(false)} title="Edit Profile">
        <div className="space-y-4">
          <Input label="First Name" value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} />
          <Input label="Last Name" value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} />
          <Button onClick={() => void handleSave()}>Save Changes</Button>
        </div>
      </Modal>

      <PageHeader title="Profile details" />

      <div className="mb-4 flex flex-wrap gap-2 border-b border-border pb-2">
        {TABS.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={cn(
              'rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
              tab === t
                ? 'bg-primary text-fg-inverse'
                : 'text-fg-secondary hover:bg-surface-2',
            )}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === 'Skills' ? (
        <Card>
          <div className="flex flex-wrap gap-2">
            {(user.skills || []).map((s) => (
              <Badge key={s.id} variant="primary">
                {s.name} · {s.level}
              </Badge>
            ))}
          </div>
        </Card>
      ) : null}

      {tab === 'Experience' ? (
        <Card>
          <p className="text-sm text-fg-secondary">
            Timeline mock — add achievements and roles in production.
          </p>
        </Card>
      ) : null}

      {tab === 'Allocations' ? (
        <Card className="space-y-4">
          {(user.allocation || []).map((a) => (
            <div key={`${a.companyId}-${a.projectName}`}>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-fg">{a.projectName}</span>
                <span className="font-mono text-fg-secondary">{a.percent}%</span>
              </div>
              <Progress value={a.percent} className="mt-2" />
              <p className="mt-1 text-xs text-fg-muted">
                {a.companyName} · since {formatDate(a.startDate)}
              </p>
            </div>
          ))}
        </Card>
      ) : null}

      {tab === 'Performance' ? (
        <Card>
          <p className="text-sm text-fg-secondary">
            KPI breakdown and manager feedback would appear here.
          </p>
        </Card>
      ) : null}
    </div>
  )
}
