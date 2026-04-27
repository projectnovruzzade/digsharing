import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { Header } from './Header'
import { useUIStore } from '@/store/ui.store'
import { cn } from '@/utils/cn'

export function AppLayout() {
  useUIStore((s) => s.sidebarCollapsed)

  return (
    <div className="flex h-screen bg-bg text-fg">
      <Sidebar />
      <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
        <Header />
        <main 
          className={cn(
            "flex-1 overflow-y-auto bg-bg p-6 md:p-8 transition-all duration-300",
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
