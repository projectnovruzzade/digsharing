import type { Company } from './company.types'
import type { UserRole } from './common.types'

export interface Skill {
  id: string
  name: string
  category: 'technical' | 'soft' | 'language' | 'domain'
  level: 'entry' | 'mid' | 'senior' | 'expert'
  yearsOfExperience: number
  verified: boolean
}

export interface Allocation {
  companyId: string
  companyName: string
  projectName: string
  percent: number
  startDate: string
  endDate?: string
  branch?: string
  deadline?: string
  effectiveness?: string
}

export interface ExperienceEntry {
  id: string
  title: string
  company: string
  period: string
  summary: string
}

export interface PerformanceHistoryEntry {
  period: string
  score: number
  managerNote: string
}

export interface Employee {
  id: string
  firstName: string
  lastName: string
  email: string
  avatar?: string
  company: Company
  department: string
  role: UserRole
  position: string
  skills: Skill[]
  performanceScore: number
  workloadPercent: number
  status: 'active' | 'on-transfer' | 'on-leave' | 'inactive'
  allocation: Allocation[]
  joinedAt: string
  bio?: string
  experience?: ExperienceEntry[]
  performanceHistory?: PerformanceHistoryEntry[]
}
