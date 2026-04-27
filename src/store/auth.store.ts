import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Employee } from '@/types/employee.types'
import * as authService from '@/services/auth.service'

interface AuthState {
  user: Employee | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  updateProfile: (data: Partial<Employee>) => void
  refreshMe: () => Promise<void>
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, _get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      login: async (email, password) => {
        set({ isLoading: true })
        try {
          // 1. Login to get token
          const { access_token } = await authService.login(email, password)
          
          // 2. Set token temporarily to fetch user
          set({ token: access_token })
          
          // 3. Fetch current user data
          const user = await authService.getMe()
          
          set({ 
            user, 
            token: access_token, 
            isAuthenticated: true, 
            isLoading: false 
          })
        } catch (e) {
          set({ isLoading: false, token: null, user: null, isAuthenticated: false })
          throw e
        }
      },
      logout: () => set({ user: null, token: null, isAuthenticated: false }),
      updateProfile: async (data) => {
        try {
          const updatedUser = await authService.updateProfile(data)
          set({ user: updatedUser })
        } catch (e) {
          console.error("Failed to update profile", e)
          throw e
        }
      },
      refreshMe: async () => {
        try {
          const user = await authService.getMe()
          set({ user, isAuthenticated: true })
        } catch (e) {
          console.error('Failed to refresh current user', e)
        }
      },
    }),
    { name: 'swe-auth' },
  ),
)
