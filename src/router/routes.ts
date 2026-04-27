import type { UserRole } from '@/types/common.types'

export const ROUTES = {
  LOGIN: '/login',
  REGISTER: '/register',
  ONBOARDING: '/onboarding',
  DASHBOARD: '/dashboard',
  NOTIFICATIONS: '/notifications',
  SETTINGS: '/settings',
  PROFILE: '/profile',
  MARKETPLACE: '/marketplace',
  APPLICATIONS: '/marketplace/applications',
  ALLOCATIONS: '/allocations',
  SWAP_PROPOSALS: '/swap-proposals',
  DEPT_TEAM: '/dept/team',
  POST_ROLE: '/marketplace/post',
  HR_WORKFORCE: '/hr/workforce',
  HR_TALENT_POOL: '/hr/talent-pool',
  HR_SWAP: '/hr/swap',
  HR_REPLACEMENT: '/hr/replacement',
  HR_TRANSFERS: '/hr/transfers',
  HR_TRANSFER_PROFILE: '/hr/transfers/:id',
  HR_REFERRAL: '/hr/referral',
  COST_DASHBOARD: '/finance/cost',
  SAVINGS: '/finance/savings',
  REPORTS: '/finance/reports',
  ROI_TRACKER: '/finance/roi',
  ADMIN: '/admin',
  ADMIN_COMPANIES: '/admin/companies',
  ADMIN_USERS: '/admin/users',
  ADMIN_AI_CONFIG: '/admin/ai-config',
} as const

export function getPostLoginPath(role: UserRole): string {
  switch (role) {
    case 'hr_manager':
      return ROUTES.HR_WORKFORCE
    case 'dept_manager':
      return ROUTES.DEPT_TEAM
    case 'cfo':
      return ROUTES.COST_DASHBOARD
    case 'admin':
      return ROUTES.ADMIN
    default:
      return ROUTES.DASHBOARD
  }
}
