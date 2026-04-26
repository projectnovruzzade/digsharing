import { useQuery } from '@tanstack/react-query'
import { Badge, Card } from '@/components/ui'
import { PageHeader } from '@/components/layout/PageHeader'
import { useAuthStore } from '@/store/auth.store'
import { getEmployees } from '@/services/employee.service'

export default function DeptTeamPage() {
  const user = useAuthStore((s) => s.user)
  const { data = [] } = useQuery({ queryKey: ['employees'], queryFn: getEmployees })
  const team = data.filter(
    (e) => e.company.id === user?.company.id && e.department === user?.department,
  )

  return (
    <div>
      <PageHeader title="My team" description="Peers in your department (mock)." />
      <div className="grid gap-3 md:grid-cols-2">
        {team.map((e) => (
          <Card key={e.id}>
            <p className="font-medium text-fg">
              {e.firstName} {e.lastName}
            </p>
            <p className="text-sm text-fg-secondary">{e.position}</p>
            <div className="mt-2 flex flex-wrap gap-1">
              {e.skills.slice(0, 3).map((s) => (
                <Badge key={s.id} variant="muted">
                  {s.name}
                </Badge>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
