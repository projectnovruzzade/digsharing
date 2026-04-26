import { Navigate } from 'react-router-dom'
import type { ReactNode } from 'react'
import { useRole } from '@/hooks/useRole'
import type { UserRole } from '@/types/common.types'
import { ROUTES } from './routes'

export function RoleRoute({
  allow,
  children,
}: {
  allow: UserRole[]
  children: ReactNode
}) {
  const role = useRole()
  if (!role || !allow.includes(role)) {
    return <Navigate to={ROUTES.DASHBOARD} replace />
  }
  return <>{children}</>
}
