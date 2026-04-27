import type { Company } from '@/types/company.types'

export const MOCK_COMPANIES: Company[] = [
  {
    id: 'co_001',
    name: 'Azİntelecom',
    industry: 'Information Technology',
    employeeCount: 1500,
    holdingId: 'holding_001',
  },
  {
    id: 'co_002',
    name: 'ADY',
    industry: 'Transportation',
    employeeCount: 2000,
    holdingId: 'holding_001',
  },
  {
    id: 'co_003',
    name: 'AZAL',
    industry: 'Aviation',
    employeeCount: 300,
    holdingId: 'holding_001',
  },
  {
    id: 'co_004',
    name: 'Aztelekom',
    industry: 'Telecommunications',
    employeeCount: 800,
    holdingId: 'holding_001',
  },
  {
    id: 'co_005',
    name: 'Azercosmos',
    industry: 'Space',
    employeeCount: 400,
    holdingId: 'holding_001',
  },
  {
    id: 'co_006',
    name: 'Metro',
    industry: 'Urban Rail Transport',
    employeeCount: 1200,
    holdingId: 'holding_001',
  },
  {
    id: 'co_007',
    name: 'BakuBus',
    industry: 'Public Transportation',
    employeeCount: 50,
    holdingId: 'holding_001',
  },
  {
    id: 'co_008',
    name: 'Bakı gəmiqayırma zavodu',
    industry: 'Shipbuilding',
    employeeCount: 2500,
    holdingId: 'holding_001',
  },
  {
    id: 'co_009',
    name: 'Teleradio',
    industry: 'Broadcasting',
    employeeCount: 600,
    holdingId: 'holding_001',
  },
]

export function companyById(id: string): Company {
  const c = MOCK_COMPANIES.find((x) => x.id === id)
  if (!c) throw new Error(`Unknown company ${id}`)
  return c
}
