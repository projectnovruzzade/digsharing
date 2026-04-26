import type { UserRole } from '@/types/common.types'
import { useRole } from './useRole'

export function usePermission(allowed: UserRole[]): boolean {
  const role = useRole()
  return role != null && allowed.includes(role)
}
