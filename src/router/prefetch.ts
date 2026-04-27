/**
 * Preload lazy route chunks to reduce wait on first navigation (esp. HR panel + @dnd-kit).
 */
import type { UserRole } from '@/types/common.types'
import { ROUTES } from '@/router/routes'

type Loader = () => Promise<unknown>

const LOADERS: Record<string, Loader> = {
  [ROUTES.DASHBOARD]: () => import('@/features/dashboard/pages/DashboardPage'),
  [ROUTES.PROFILE]: () => import('@/features/employee/pages/ProfilePage'),
  [ROUTES.MARKETPLACE]: () => import('@/features/marketplace/pages/MarketplacePage'),
  [ROUTES.APPLICATIONS]: () => import('@/features/marketplace/pages/MyApplicationsPage'),
  [ROUTES.SWAP_PROPOSALS]: () => import('@/features/employee/pages/SwapProposalsPage'),
  [ROUTES.ALLOCATIONS]: () => import('@/features/employee/pages/AllocationsPage'),
  [ROUTES.DEPT_TEAM]: () => import('@/features/dept/pages/DeptTeamPage'),
  [ROUTES.POST_ROLE]: () => import('@/features/marketplace/pages/PostRolePage'),
  [ROUTES.HR_WORKFORCE]: () => import('@/features/hr-panel/pages/HRWorkforcePage'),
  [ROUTES.HR_TALENT_POOL]: () => import('@/features/hr-panel/pages/TalentPoolPage'),
  [ROUTES.HR_SWAP]: () => import('@/features/hr-panel/pages/SwapManagementPage'),
  [ROUTES.HR_REPLACEMENT]: () => import('@/features/hr-panel/pages/InstantReplacementPage'),
  [ROUTES.HR_TRANSFERS]: () => import('@/features/hr-panel/pages/TransferRequestsPage'),
  [ROUTES.HR_REFERRAL]: () => import('@/features/hr-panel/pages/TalentReferralPage'),
  [ROUTES.COST_DASHBOARD]: () => import('@/features/cost-dashboard/pages/CFODashboardPage'),
  [ROUTES.SAVINGS]: () => import('@/features/cost-dashboard/pages/SavingsPage'),
  [ROUTES.REPORTS]: () => import('@/features/cost-dashboard/pages/ReportsPage'),
  [ROUTES.ROI_TRACKER]: () => import('@/features/cost-dashboard/pages/ROIPage'),
  [ROUTES.ADMIN]: () => import('@/features/admin/pages/AdminDashboardPage'),
  [ROUTES.ADMIN_COMPANIES]: () => import('@/features/admin/pages/CompanyManagementPage'),
  [ROUTES.ADMIN_USERS]: () => import('@/features/admin/pages/UserManagementPage'),
  [ROUTES.ADMIN_AI_CONFIG]: () => import('@/features/admin/pages/AIConfigPage'),
  [ROUTES.NOTIFICATIONS]: () => import('@/features/misc/NotificationsPage'),
  [ROUTES.SETTINGS]: () => import('@/features/misc/SettingsPage'),
}

/** Warm a single route’s JS chunk (safe to call often). */
export function prefetchPath(path: string): void {
  const load = LOADERS[path]
  if (load) void load()
}

const BY_ROLE: Record<UserRole, string[]> = {
  employee: [
    ROUTES.DASHBOARD,
    ROUTES.PROFILE,
    ROUTES.MARKETPLACE,
    ROUTES.APPLICATIONS,
    ROUTES.SWAP_PROPOSALS,
    ROUTES.ALLOCATIONS,
  ],
  hr_manager: [
    ROUTES.DASHBOARD,
    ROUTES.HR_WORKFORCE,
    ROUTES.HR_TALENT_POOL,
    ROUTES.HR_SWAP,
    ROUTES.HR_REPLACEMENT,
    ROUTES.HR_TRANSFERS,
    ROUTES.HR_REFERRAL,
  ],
  dept_manager: [
    ROUTES.DASHBOARD,
    ROUTES.DEPT_TEAM,
    ROUTES.POST_ROLE,
    ROUTES.HR_TRANSFERS,
  ],
  cfo: [ROUTES.DASHBOARD, ROUTES.COST_DASHBOARD, ROUTES.SAVINGS, ROUTES.REPORTS, ROUTES.ROI_TRACKER],
  admin: [
    ROUTES.DASHBOARD,
    ROUTES.ADMIN,
    ROUTES.ADMIN_COMPANIES,
    ROUTES.ADMIN_USERS,
    ROUTES.ADMIN_AI_CONFIG,
  ],
}

/** After login, preload this role’s common routes during idle time. */
export function prefetchRoutesForRole(role: UserRole): void {
  const paths = BY_ROLE[role]
  const run = () => {
    void Promise.all(paths.map((p) => LOADERS[p]?.() ?? Promise.resolve()))
  }
  if (typeof requestIdleCallback === 'function') {
    requestIdleCallback(run, { timeout: 2000 })
  } else {
    window.setTimeout(run, 300)
  }
}
