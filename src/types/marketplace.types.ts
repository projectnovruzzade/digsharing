import type { Company } from './company.types'
import type { Skill } from './employee.types'

export interface Listing {
  id: string
  title: string
  description: string
  company: Company
  department: string
  type: 'task' | 'project' | 'temporary-role' | 'permanent-role'
  requiredSkills: Skill[]
  duration?: string
  workloadPercent: number
  allocationSplit?: boolean
  compensation?: string
  status: 'open' | 'in-review' | 'filled' | 'closed'
  postedBy: string
  postedAt: string
  applicants: number
  aiMatchScore?: number
}

export interface Application {
  id: string
  listingId: string
  listing: Listing
  applicantId: string
  status: 'pending' | 'shortlisted' | 'approved' | 'rejected'
  appliedAt: string
  note?: string
}

export interface SwapProposal {
  id: string
  fromEmployeeId: string
  toEmployeeId: string
  fromCompany: Company
  toCompany: Company
  skillMatchScore: number
  proposedBy: 'ai' | 'hr' | 'manager'
  status: 'pending' | 'approved' | 'rejected' | 'active' | 'completed'
  duration: string
  salarySplit: { companyA: number; companyB: number }
  createdAt: string
}

export interface ListingFilters {
  search?: string
  type?: Listing['type'][]
  companyIds?: string[]
  minWorkload?: number
  maxWorkload?: number
  skillNames?: string[]
  durationBucket?: '<1m' | '1-3m' | '3-6m' | '6m+'
  minMatch?: number
}

export interface ApplicationPayload {
  listingId: string
  applicantId: string
  note?: string
}
