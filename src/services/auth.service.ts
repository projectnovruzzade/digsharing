import type { Employee } from '@/types/employee.types'
import { api } from './api'

export interface LoginResponse {
  access_token: string
  token_type: string
}

export async function login(email: string, password: string): Promise<LoginResponse> {
  // FastAPI OAuth2 expects form data
  const formData = new URLSearchParams()
  formData.append('username', email)
  formData.append('password', password)

  const response = await api.post<LoginResponse>('/auth/login', formData, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
  return response.data
}

export async function register(userData: any): Promise<Employee> {
  const response = await api.post<Employee>('/auth/register', userData)
  return response.data
}

export async function getMe(): Promise<Employee> {
  const response = await api.get<Employee>('/auth/me')
  return response.data
}

export async function updateProfile(data: Partial<Employee>): Promise<Employee> {
  const response = await api.patch<Employee>('/auth/me', data)
  return response.data
}
