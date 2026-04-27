import { useQuery } from '@tanstack/react-query'
import { Badge, Card } from '@/components/ui'
import { PageHeader } from '@/components/layout/PageHeader'
import { EmptyState } from '@/components/layout/EmptyState'
import { useAuthStore } from '@/store/auth.store'
import { getApplicationsForUser } from '@/services/marketplace.service'
import { formatDate } from '@/utils/formatters'

export default function MyApplicationsPage() {
  const user = useAuthStore((s) => s.user)
  const { data = [] } = useQuery({
    queryKey: ['applications', user?.id],
    queryFn: () => getApplicationsForUser(user!.id),
    enabled: !!user,
    staleTime: 0,
    refetchOnMount: 'always',
    refetchOnWindowFocus: true,
  })

  if (!user) return null

  return (
    <div>
      <PageHeader title="My applications" />
      {data.length === 0 ? (
        <EmptyState
          title="No applications yet"
          description="Browse the marketplace and apply to internal roles."
        />
      ) : (
        <div className="space-y-3">
          {data.map((a) => (
            <Card key={a.id}>
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-medium text-fg">{a.listing.title}</p>
                  <p className="text-sm text-fg-secondary">
                    {a.listing.company.name}
                  </p>
                </div>
                <Badge variant="warning">{a.status}</Badge>
              </div>
              <p className="mt-2 text-xs text-fg-muted">
                Applied {formatDate(a.appliedAt)}
              </p>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
