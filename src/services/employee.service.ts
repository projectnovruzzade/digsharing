import type { Employee, Allocation } from '@/types/employee.types'
import { api } from './api'

export interface EmployeeFilters {
  company_id?: string
  skill_id?: string
  min_performance?: number
}

export async function getEmployees(filters?: EmployeeFilters): Promise<Employee[]> {
  const response = await api.get<Employee[]>('/employees', { params: filters })
  return response.data
}

export async function getEmployeeById(id: string): Promise<Employee | null> {
  const response = await api.get<Employee | null>(`/employees/${id}`)
  return response.data
}

export async function updateEmployee(id: string, data: Partial<Employee>): Promise<Employee> {
  const response = await api.patch<Employee>(`/employees/${id}`, data)
  return response.data
}

export async function getEmployeeAllocations(id: string): Promise<Allocation[]> {
  const response = await api.get<Allocation[]>(`/employees/${id}/allocations`)
  return response.data
}
