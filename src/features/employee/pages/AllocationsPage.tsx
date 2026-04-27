import { Card, Progress, Badge } from '@/components/ui'
import { PageHeader } from '@/components/layout/PageHeader'
import { useAuthStore } from '@/store/auth.store'
import { formatDate } from '@/utils/formatters'

export default function AllocationsPage() {
  const user = useAuthStore((s) => s.user)
  if (!user) return null
  return (
    <div>
      <PageHeader title="My allocations" />
      <div className="space-y-4">
        {(user.allocation || []).map((a) => (
          <Card key={`${a.companyId}-${a.projectName}`} className="p-5 flex flex-col gap-4">
            <div className="flex justify-between items-start gap-2">
              <div>
                <h3 className="text-lg font-semibold text-fg">{a.projectName}</h3>
                <p className="text-sm text-fg-secondary">{a.companyName}</p>
              </div>
              {a.effectiveness && (
                <Badge variant={a.effectiveness.includes('Excellent') || a.effectiveness.includes('Outstanding') ? 'success' : 'primary'}>
                  Effectiveness: {a.effectiveness}
                </Badge>
              )}
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-fg-secondary">Progress</span>
                <span className="font-mono text-sm text-fg">{a.percent}%</span>
              </div>
              <Progress value={a.percent} />
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm mt-2">
              <div className="flex flex-col">
                <span className="text-fg-muted text-xs uppercase tracking-wider font-semibold">Timeline</span>
                <span className="text-fg font-medium">
                  {formatDate(a.startDate)} — {a.endDate ? formatDate(a.endDate) : 'Ongoing'}
                </span>
              </div>
              {a.deadline && (
                <div className="flex flex-col">
                  <span className="text-fg-muted text-xs uppercase tracking-wider font-semibold">Deadline</span>
                  <span className="text-fg font-medium">{formatDate(a.deadline)}</span>
                </div>
              )}
              {a.branch && (
                <div className="flex flex-col">
                  <span className="text-fg-muted text-xs uppercase tracking-wider font-semibold">Branch</span>
                  <span className="text-fg font-medium font-mono text-sm bg-surface-2 border border-border px-2 py-0.5 rounded-md inline-block w-max mt-0.5">
                    {a.branch}
                  </span>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
