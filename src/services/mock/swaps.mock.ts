import type { SwapProposal } from '@/types/marketplace.types'
import { companyById } from './companies.mock'

export const MOCK_SWAPS: SwapProposal[] = [
  {
    id: 'swp_001',
    fromEmployeeId: 'emp_005',
    toEmployeeId: 'emp_009',
    fromCompany: companyById('co_001'),
    toCompany: companyById('co_001'),
    skillMatchScore: 88,
    proposedBy: 'ai',
    status: 'pending',
    duration: '1 month',
    salarySplit: { companyA: 70, companyB: 30 },
    createdAt: '2024-11-18',
  },
  {
    id: 'swp_002',
    fromEmployeeId: 'emp_004',
    toEmployeeId: 'emp_015',
    fromCompany: companyById('co_004'),
    toCompany: companyById('co_004'),
    skillMatchScore: 72,
    proposedBy: 'hr',
    status: 'active',
    duration: '3 months',
    salarySplit: { companyA: 50, companyB: 50 },
    createdAt: '2024-10-01',
  },
  {
    id: 'swp_003',
    fromEmployeeId: 'emp_006',
    toEmployeeId: 'emp_012',
    fromCompany: companyById('co_002'),
    toCompany: companyById('co_002'),
    skillMatchScore: 65,
    proposedBy: 'manager',
    status: 'completed',
    duration: '2 weeks',
    salarySplit: { companyA: 60, companyB: 40 },
    createdAt: '2024-08-15',
  },
]
