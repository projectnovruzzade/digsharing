import { Bell, ChevronRight, Search } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/store/auth.store'
import { ROUTES } from '@/router/routes'
import { cn } from '@/utils/cn'
import { Input } from '@/components/ui'
import { Avatar } from '@/components/ui'

function titleCase(s: string): string {
  return s.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

export function Header() {
  const location = useLocation()
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)

  const segments = location.pathname.split('/').filter(Boolean)
  const crumbs = segments.map((seg, i) => ({
    label: titleCase(seg),
    path: '/' + segments.slice(0, i + 1).join('/'),
  }))

  return (
    <header className="flex h-16 shrink-0 items-center gap-4 border-b border-border bg-surface px-4 md:px-6">
      <div className="hidden min-w-0 flex-1 items-center gap-1 text-sm md:flex">
        <Link
          to={ROUTES.DASHBOARD}
          className="text-fg-muted hover:text-primary"
        >
          Home
        </Link>
        {crumbs.map((c) => (
          <span key={c.path} className="flex items-center gap-1 text-fg-muted">
            <ChevronRight className="h-4 w-4 shrink-0" aria-hidden />
            <Link to={c.path} className="truncate hover:text-primary">
              {c.label}
            </Link>
          </span>
        ))}
      </div>

      <div className="mx-auto min-w-0 w-full max-w-md flex-1 md:mx-0">
        <Input
          placeholder="Search…"
          prefix={<Search className="h-4 w-4" aria-hidden />}
          compact
          aria-label="Global search"
        />
      </div>

      <div className="flex min-w-0 shrink-0 items-center gap-2">
        <Link
          to={ROUTES.NOTIFICATIONS}
          className="relative rounded-md p-2 text-fg-secondary hover:bg-surface-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-danger" />
        </Link>

        {user ? (
          <div className="flex min-w-0 items-center gap-2 rounded-md border border-border px-2 py-1">
            <Avatar name={`${user.firstName} ${user.lastName}`} size="sm" />
            <div className="hidden min-w-0 text-left text-xs sm:block">
              <p className="truncate font-medium text-fg">
                {user.firstName} {user.lastName}
              </p>
              <div className="hidden gap-2 md:flex">
                <Link
                  to={ROUTES.PROFILE}
                  className="text-fg-muted hover:text-primary"
                >
                  Profile
                </Link>
                <Link
                  to={ROUTES.SETTINGS}
                  className="text-fg-muted hover:text-primary"
                >
                  Settings
                </Link>
                <button
                  type="button"
                  onClick={logout}
                  className={cn('text-fg-muted hover:text-danger')}
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </header>
  )
}
