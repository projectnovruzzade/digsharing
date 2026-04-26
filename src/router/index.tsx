import { lazy, Suspense } from 'react'
import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom'
import { AppLayout } from '@/components/layout/AppLayout'
import { PageSkeleton } from '@/components/layout/PageSkeleton'
import { RoleRoute } from '@/router/RoleRoute'
import { ProtectedRoute } from '@/router/ProtectedRoute'
import { ROUTES } from '@/router/routes'

const LoginPage = lazy(() => import('@/features/auth/pages/LoginPage'))
const RegisterPage = lazy(() => import('@/features/auth/pages/RegisterPage'))
const OnboardingPage = lazy(() => import('@/features/auth/pages/OnboardingPage'))
const DashboardPage = lazy(() => import('@/features/dashboard/pages/DashboardPage'))
const ProfilePage = lazy(() => import('@/features/employee/pages/ProfilePage'))
const AllocationsPage = lazy(() => import('@/features/employee/pages/AllocationsPage'))
const SwapProposalsPage = lazy(() => import('@/features/employee/pages/SwapProposalsPage'))
const AIAdvisorPage = lazy(() => import('@/features/ai-advisor/pages/AIAdvisorPage'))
const MarketplacePage = lazy(() => import('@/features/marketplace/pages/MarketplacePage'))
const MyApplicationsPage = lazy(() => import('@/features/marketplace/pages/MyApplicationsPage'))
const PostRolePage = lazy(() => import('@/features/marketplace/pages/PostRolePage'))
const DeptTeamPage = lazy(() => import('@/features/dept/pages/DeptTeamPage'))
const HRWorkforcePage = lazy(() => import('@/features/hr-panel/pages/HRWorkforcePage'))
const TalentPoolPage = lazy(() => import('@/features/hr-panel/pages/TalentPoolPage'))
const SwapManagementPage = lazy(() => import('@/features/hr-panel/pages/SwapManagementPage'))
const InstantReplacementPage = lazy(() => import('@/features/hr-panel/pages/InstantReplacementPage'))
const TransferRequestsPage = lazy(() => import('@/features/hr-panel/pages/TransferRequestsPage'))
const TransferProfilePage = lazy(() => import('@/features/hr-panel/pages/TransferProfilePage'))
const TalentReferralPage = lazy(() => import('@/features/hr-panel/pages/TalentReferralPage'))
const CFODashboardPage = lazy(() => import('@/features/cost-dashboard/pages/CFODashboardPage'))
const SavingsPage = lazy(() => import('@/features/cost-dashboard/pages/SavingsPage'))
const ReportsPage = lazy(() => import('@/features/cost-dashboard/pages/ReportsPage'))
const ROIPage = lazy(() => import('@/features/cost-dashboard/pages/ROIPage'))
const AdminDashboardPage = lazy(() => import('@/features/admin/pages/AdminDashboardPage'))
const CompanyManagementPage = lazy(() => import('@/features/admin/pages/CompanyManagementPage'))
const UserManagementPage = lazy(() => import('@/features/admin/pages/UserManagementPage'))
const AIConfigPage = lazy(() => import('@/features/admin/pages/AIConfigPage'))
const NotificationsPage = lazy(() => import('@/features/misc/NotificationsPage'))
const SettingsPage = lazy(() => import('@/features/misc/SettingsPage'))

function SuspenseLayout() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <Outlet />
    </Suspense>
  )
}

export const router = createBrowserRouter([
  {
    element: <SuspenseLayout />,
    children: [
      { path: ROUTES.LOGIN, element: <LoginPage /> },
      { path: ROUTES.REGISTER, element: <RegisterPage /> },
      { path: ROUTES.ONBOARDING, element: <OnboardingPage /> },
      {
        path: '/',
        element: <ProtectedRoute />,
        children: [
          {
            element: <AppLayout />,
            children: [
              { index: true, element: <Navigate to={ROUTES.DASHBOARD} replace /> },
              { path: 'dashboard', element: <DashboardPage /> },
              { path: 'notifications', element: <NotificationsPage /> },
              { path: 'settings', element: <SettingsPage /> },
              { path: 'profile', element: <ProfilePage /> },
              { path: 'advisor', element: <AIAdvisorPage /> },
              { path: 'marketplace', element: <MarketplacePage /> },
              { path: 'marketplace/applications', element: <MyApplicationsPage /> },
              { path: 'marketplace/post', element: <PostRolePage /> },
              { path: 'allocations', element: <AllocationsPage /> },
              { path: 'swap-proposals', element: <SwapProposalsPage /> },
              { path: 'dept/team', element: <DeptTeamPage /> },
              {
                path: 'hr/workforce',
                element: (
                  <RoleRoute allow={['hr_manager']}>
                    <HRWorkforcePage />
                  </RoleRoute>
                ),
              },
              {
                path: 'hr/talent-pool',
                element: (
                  <RoleRoute allow={['hr_manager']}>
                    <TalentPoolPage />
                  </RoleRoute>
                ),
              },
              {
                path: 'hr/swap',
                element: (
                  <RoleRoute allow={['hr_manager']}>
                    <SwapManagementPage />
                  </RoleRoute>
                ),
              },
              {
                path: 'hr/replacement',
                element: (
                  <RoleRoute allow={['hr_manager']}>
                    <InstantReplacementPage />
                  </RoleRoute>
                ),
              },
              {
                path: 'hr/transfers',
                element: (
                  <RoleRoute allow={['hr_manager', 'dept_manager']}>
                    <TransferRequestsPage />
                  </RoleRoute>
                ),
              },
              {
                path: 'hr/transfers/:id',
                element: (
                  <RoleRoute allow={['hr_manager']}>
                    <TransferProfilePage />
                  </RoleRoute>
                ),
              },
              {
                path: 'hr/referral',
                element: (
                  <RoleRoute allow={['hr_manager']}>
                    <TalentReferralPage />
                  </RoleRoute>
                ),
              },
              {
                path: 'finance/cost',
                element: (
                  <RoleRoute allow={['cfo']}>
                    <CFODashboardPage />
                  </RoleRoute>
                ),
              },
              {
                path: 'finance/savings',
                element: (
                  <RoleRoute allow={['cfo']}>
                    <SavingsPage />
                  </RoleRoute>
                ),
              },
              {
                path: 'finance/reports',
                element: (
                  <RoleRoute allow={['cfo']}>
                    <ReportsPage />
                  </RoleRoute>
                ),
              },
              {
                path: 'finance/roi',
                element: (
                  <RoleRoute allow={['cfo']}>
                    <ROIPage />
                  </RoleRoute>
                ),
              },
              {
                path: 'admin',
                element: (
                  <RoleRoute allow={['admin']}>
                    <AdminDashboardPage />
                  </RoleRoute>
                ),
              },
              {
                path: 'admin/companies',
                element: (
                  <RoleRoute allow={['admin']}>
                    <CompanyManagementPage />
                  </RoleRoute>
                ),
              },
              {
                path: 'admin/users',
                element: (
                  <RoleRoute allow={['admin']}>
                    <UserManagementPage />
                  </RoleRoute>
                ),
              },
              {
                path: 'admin/ai-config',
                element: (
                  <RoleRoute allow={['admin']}>
                    <AIConfigPage />
                  </RoleRoute>
                ),
              },
            ],
          },
        ],
      },
    ],
  },
])
