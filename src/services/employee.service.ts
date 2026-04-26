import type { Employee } from '@/types/employee.types'
import { delay } from './api'
import { MOCK_EMPLOYEES } from './mock/employees.mock'

export async function getEmployees(): Promise<Employee[]> {
  await delay(350)
  return [...MOCK_EMPLOYEES]
}

export async function getEmployeeById(id: string): Promise<Employee | null> {
  await delay(200)
  return MOCK_EMPLOYEES.find((e) => e.id === id) ?? null
}
