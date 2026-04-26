import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Employee } from '@/types/employee.types'
import * as authService from '@/services/auth.service'

interface AuthState {
  user: Employee | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  updateProfile: (data: Partial<Employee>) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      login: async (email, password) => {
        set({ isLoading: true })
        try {
          const user = await authService.login(email, password)
          set({ user, isAuthenticated: true, isLoading: false })
        } catch (e) {
          set({ isLoading: false })
          throw e
        }
      },
      logout: () => set({ user: null, isAuthenticated: false }),
      updateProfile: (data) => {
        const u = get().user
        if (u) set({ user: { ...u, ...data } as Employee })
      },
    }),
    { name: 'swe-auth' },
  ),
)
