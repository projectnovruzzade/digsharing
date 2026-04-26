import { useQuery } from '@tanstack/react-query'
import { Badge, Card } from '@/components/ui'
import { PageHeader } from '@/components/layout/PageHeader'
import { getEmployees } from '@/services/employee.service'

export default function TalentPoolPage() {
  const { data = [] } = useQuery({ queryKey: ['employees'], queryFn: getEmployees })
  const pool = data.filter((e) => e.workloadPercent < 70)

  return (
    <div>
      <PageHeader title="Talent pool" description="Employees with capacity under 70%." />
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {pool.map((e) => (
          <Card key={e.id} interactive>
            <p className="font-medium text-fg">
              {e.firstName} {e.lastName}
            </p>
            <p className="text-sm text-fg-secondary">{e.company.name}</p>
            <Badge variant="success" className="mt-2">
              {e.workloadPercent}% workload
            </Badge>
          </Card>
        ))}
      </div>
    </div>
  )
}
