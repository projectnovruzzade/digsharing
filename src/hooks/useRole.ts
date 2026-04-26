import { useAuthStore } from '@/store/auth.store'
import type { UserRole } from '@/types/common.types'

export function useRole(): UserRole | null {
  return useAuthStore((s) => s.user?.role ?? null)
}
