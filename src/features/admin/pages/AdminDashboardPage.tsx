import { Link } from 'react-router-dom'
import { Card } from '@/components/ui'
import { PageHeader } from '@/components/layout/PageHeader'
import { ROUTES } from '@/router/routes'

export default function AdminDashboardPage() {
  return (
    <div>
      <PageHeader title="Administration" />
      <div className="grid gap-4 md:grid-cols-3">
        <Card interactive>
          <Link to={ROUTES.ADMIN_COMPANIES} className="font-medium text-primary">
            Company management →
          </Link>
        </Card>
        <Card interactive>
          <Link to={ROUTES.ADMIN_USERS} className="font-medium text-primary">
            User management →
          </Link>
        </Card>
        <Card interactive>
          <Link to={ROUTES.ADMIN_AI_CONFIG} className="font-medium text-primary">
            AI configuration →
          </Link>
        </Card>
      </div>
    </div>
  )
}
