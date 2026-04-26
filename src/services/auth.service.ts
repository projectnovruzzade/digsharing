import type { Employee } from '@/types/employee.types'
import { delay } from './api'
import { MOCK_EMPLOYEES } from './mock/employees.mock'

const DEMO_ACCOUNTS: Record<string, { password: string; userId: string }> = {
  'employee@demo.az': { password: 'demo123', userId: 'emp_001' },
  'hr@demo.az': { password: 'demo123', userId: 'emp_hr' },
  'manager@demo.az': { password: 'demo123', userId: 'emp_002' },
  'cfo@demo.az': { password: 'demo123', userId: 'emp_cfo' },
  'admin@demo.az': { password: 'demo123', userId: 'emp_admin' },
}

export async function login(email: string, password: string): Promise<Employee> {
  await delay(400)
  const normalized = email.trim().toLowerCase()
  const demo = DEMO_ACCOUNTS[normalized]
  if (demo && demo.password === password) {
    const user = MOCK_EMPLOYEES.find((e) => e.id === demo.userId)
    if (user) return user
  }
  const byEmail = MOCK_EMPLOYEES.find(
    (e) => e.email.toLowerCase() === normalized,
  )
  if (byEmail && password === 'demo123') return byEmail
  throw new Error('Invalid email or password.')
}
