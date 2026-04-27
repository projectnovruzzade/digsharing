import {
  ArrowLeftRight,
  BarChart2,
  Bot,
  Briefcase,
  Building2,
  Calculator,
  ChevronLeft,
  ChevronRight,
  DollarSign,
  FileCheck,
  FileText,
  LayoutDashboard,
  LogOut,
  PieChart,
  PlusSquare,
  Settings,
  Star,
  TrendingUp,
  User,
  Users,
  Zap,
  Share2,
  type LucideIcon,
} from 'lucide-react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/auth.store'
import { useUIStore } from '@/store/ui.store'
import type { UserRole } from '@/types/common.types'
import { cn } from '@/utils/cn'
import { ROUTES } from '@/router/routes'
import { Button } from '@/components/ui'

const NAV_ITEMS: Record<UserRole, { icon: LucideIcon; label: string; path: string }[]> = {
  employee: [
    { icon: LayoutDashboard, label: 'Dashboard', path: ROUTES.DASHBOARD },
    { icon: User, label: 'My Profile', path: ROUTES.PROFILE },
    { icon: Bot, label: 'AI Advisor', path: ROUTES.ADVISOR },
    { icon: Briefcase, label: 'Marketplace', path: ROUTES.MARKETPLACE },
    { icon: FileText, label: 'My Applications', path: ROUTES.APPLICATIONS },
    { icon: ArrowLeftRight, label: 'Swap Proposals', path: ROUTES.SWAP_PROPOSALS },
    { icon: PieChart, label: 'My Allocations', path: ROUTES.ALLOCATIONS },
  ],
  hr_manager: [
    { icon: LayoutDashboard, label: 'Dashboard', path: ROUTES.DASHBOARD },
    { icon: Users, label: 'Workforce', path: ROUTES.HR_WORKFORCE },
    { icon: Star, label: 'Talent Pool', path: ROUTES.HR_TALENT_POOL },
    { icon: ArrowLeftRight, label: 'Swap Management', path: ROUTES.HR_SWAP },
    { icon: Zap, label: 'Instant Replace', path: ROUTES.HR_REPLACEMENT },
    { icon: FileCheck, label: 'Transfer Requests', path: ROUTES.HR_TRANSFERS },
    { icon: Share2, label: 'Talent Referral', path: ROUTES.HR_REFERRAL },
  ],
  dept_manager: [
    { icon: LayoutDashboard, label: 'Dashboard', path: ROUTES.DASHBOARD },
    { icon: Users, label: 'My Team', path: ROUTES.DEPT_TEAM },
    { icon: PlusSquare, label: 'Post a Role', path: ROUTES.POST_ROLE },
    { icon: FileCheck, label: 'Approve Requests', path: ROUTES.HR_TRANSFERS },
  ],
  cfo: [
    { icon: LayoutDashboard, label: 'Dashboard', path: ROUTES.DASHBOARD },
    { icon: DollarSign, label: 'Cost Analysis', path: ROUTES.COST_DASHBOARD },
    { icon: Calculator, label: 'Savings', path: ROUTES.SAVINGS },
    { icon: BarChart2, label: 'Reports', path: ROUTES.REPORTS },
    { icon: TrendingUp, label: 'ROI Tracker', path: ROUTES.ROI_TRACKER },
  ],
  admin: [
    { icon: LayoutDashboard, label: 'Dashboard', path: ROUTES.ADMIN },
    { icon: Building2, label: 'Companies', path: ROUTES.ADMIN_COMPANIES },
    { icon: Users, label: 'Users', path: ROUTES.ADMIN_USERS },
    { icon: Settings, label: 'AI Config', path: ROUTES.ADMIN_AI_CONFIG },
  ],
}

function NavItemLink({
  item,
  collapsed,
}: {
  item: { icon: LucideIcon; label: string; path: string }
  collapsed: boolean
}) {
  const Icon = item.icon
  return (
    <NavLink
      to={item.path}
      title={collapsed ? item.label : undefined}
      className={({ isActive }) =>
        cn(
          'flex min-w-0 items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors duration-150',
          'text-fg-inverse/90 hover:bg-white/10',
          isActive && 'bg-primary text-white',
          collapsed && 'justify-center px-2',
        )
      }
    >
      <Icon className="h-4 w-4 shrink-0" aria-hidden />
      {!collapsed ? (
        <span className="min-w-0 truncate">{item.label}</span>
      ) : null}
    </NavLink>
  )
}

export function Sidebar() {
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)
  const navigate = useNavigate()
  const { sidebarCollapsed, toggleSidebar } = useUIStore()

  if (!user) return null

  const items = NAV_ITEMS[user.role]

  const onLogout = () => {
    logout()
    navigate(ROUTES.LOGIN)
  }

  return (
    <aside
        className={cn(
          'flex h-screen min-w-0 flex-col overflow-x-hidden border-r border-white/10 bg-primary-dark transition-[width] duration-200',
          sidebarCollapsed ? 'w-16 shrink-0' : 'w-64 shrink-0',
        )}
      >
        <div
          className={cn(
            'flex h-16 items-center border-b border-white/10 px-4',
            sidebarCollapsed && 'justify-center px-2',
          )}
        >
          <div className="flex items-center gap-2">
            <span className="font-display text-lg font-bold text-fg-inverse">
              {sidebarCollapsed ? 'S' : 'SWE'}
            </span>
            {!sidebarCollapsed ? (
              <span
                className="h-2 w-2 rounded-full bg-accent"
                aria-hidden
                title="Online"
              />
            ) : null}
          </div>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-2" aria-label="Main">
          {items.map((item) => (
            <NavItemLink
              key={item.path}
              item={item}
              collapsed={sidebarCollapsed}
            />
          ))}
        </nav>

        <div className="min-w-0 border-t border-white/10 p-2">
          <button
            type="button"
            onClick={toggleSidebar}
            className="mb-2 flex w-full min-w-0 items-center justify-center rounded-md py-2 text-fg-inverse/80 hover:bg-white/10"
            aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {sidebarCollapsed ? (
              <ChevronRight className="h-4 w-4 shrink-0" />
            ) : (
              <ChevronLeft className="h-4 w-4 shrink-0" />
            )}
          </button>

          <div
            className={cn(
              'grid min-w-0 w-full items-center gap-x-2 gap-y-1 rounded-md p-2',
              sidebarCollapsed ? 'grid-cols-1 justify-items-center' : 'grid-cols-[2.25rem_1fr_auto]',
            )}
          >
            <div className="flex justify-center">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-medium text-fg-inverse">
                {user.firstName?.[0] || 'U'}
                {user.lastName?.[0] || ''}
              </span>
            </div>
            {!sidebarCollapsed ? (
              <div className="min-w-0 overflow-hidden">
                <p className="truncate text-sm font-medium leading-tight text-fg-inverse">
                  {user.firstName || 'User'} {user.lastName || ''}
                </p>
                <p className="truncate text-xs leading-tight text-fg-inverse/70">
                  {user.role.replace('_', ' ')}
                </p>
              </div>
            ) : null}
            {!sidebarCollapsed ? (
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 shrink-0 justify-self-end p-0 text-fg-inverse hover:bg-white/10"
                onClick={onLogout}
                aria-label="Sign out"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            ) : null}
          </div>
          {sidebarCollapsed ? (
            <Button
              variant="ghost"
              size="sm"
              className="mt-1 w-full p-0 text-fg-inverse hover:bg-white/10"
              onClick={onLogout}
              aria-label="Sign out"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          ) : null}
        </div>
      </aside>
  )
}
