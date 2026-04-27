import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { Header } from './Header'
import { useUIStore } from '@/store/ui.store'
import { useAuthStore } from '@/store/auth.store'
import { prefetchRoutesForRole } from '@/router/prefetch'
import { cn } from '@/utils/cn'

export function AppLayout() {
  useUIStore((s) => s.sidebarCollapsed)
  const role = useAuthStore((s) => s.user?.role)

  useEffect(() => {
    if (role) prefetchRoutesForRole(role)
  }, [role])

  return (
    <div className="flex h-screen bg-bg text-fg">
      <Sidebar />
      <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
        <Header />
        <main 
          className={cn(
            "flex-1 overflow-y-auto bg-bg p-6 md:p-8 transition-[padding] duration-150 ease-out",
            "mx-auto w-full max-w-7xl"
          )}
        >
          <div className="mx-auto w-full max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
