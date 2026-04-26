import { Link } from 'react-router-dom'
import { Card } from '@/components/ui'
import { ROUTES } from '@/router/routes'

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface-3 p-6">
      <Card className="max-w-md text-center">
        <h1 className="font-display text-xl font-semibold text-fg">
          Registration
        </h1>
        <p className="mt-2 text-sm text-fg-secondary">
          Registration is not enabled in the demo. Please use{' '}
          <Link className="text-primary" to={ROUTES.LOGIN}>
            Sign in
          </Link>{' '}
          with a demo account.
        </p>
      </Card>
    </div>
  )
}
