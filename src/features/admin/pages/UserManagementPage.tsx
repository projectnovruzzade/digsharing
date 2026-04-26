import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { Badge, Card } from '@/components/ui'
import { PageHeader } from '@/components/layout/PageHeader'
import { getEmployees } from '@/services/employee.service'

export default function UserManagementPage() {
  const { data = [] } = useQuery({ queryKey: ['employees'], queryFn: getEmployees })

  return (
    <div>
      <PageHeader title="Users" />
      <Card className="overflow-x-auto p-0">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-border bg-surface-2">
            <tr>
              <th className="px-4 py-3" scope="col">
                Name
              </th>
              <th className="px-4 py-3" scope="col">
                Email
              </th>
              <th className="px-4 py-3" scope="col">
                Role
              </th>
              <th className="px-4 py-3" scope="col">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data.slice(0, 12).map((e, i) => (
              <tr key={e.id} className={i % 2 === 0 ? 'bg-surface' : 'bg-surface-2/80'}>
                <td className="px-4 py-3 font-medium text-fg">
                  {e.firstName} {e.lastName}
                </td>
                <td className="px-4 py-3 text-fg-secondary">{e.email}</td>
                <td className="px-4 py-3">
                  <Badge variant="primary">{e.role}</Badge>
                </td>
                <td className="px-4 py-3">
                  <button
                    type="button"
                    className="text-sm text-primary hover:underline"
                    onClick={() => toast.info('Reset link sent (mock).')}
                  >
                    Reset password
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}
