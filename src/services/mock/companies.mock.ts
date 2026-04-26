import type { Company } from '@/types/company.types'

export const MOCK_COMPANIES: Company[] = [
  {
    id: 'co_001',
    name: 'AZAL',
    industry: 'Aviation',
    employeeCount: 1500,
    holdingId: 'holding_001',
  },
  {
    id: 'co_002',
    name: 'ADY(Azərbaycan Dəmir yolları)',
    industry: 'Transportation',
    employeeCount: 2000,
    holdingId: 'holding_001',
  },
  {
    id: 'co_003',
    name: 'Azərkosmos',
    industry: 'Space',
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
    name: 'Azİntelecom',
    industry: 'Information Technology',
    employeeCount: 400,
    holdingId: 'holding_001',
  },
  {
    id: 'co_006',
    name: 'Azərpoçt',
    industry: 'Postal Services',
    employeeCount: 1200,
    holdingId: 'holding_001',
  },
  {
    id: 'co_007',
    name: 'Milli suni intellekt mərkəzi',
    industry: 'Artificial Intelligence',
    employeeCount: 50,
    holdingId: 'holding_001',
  },
  {
    id: 'co_008',
    name: 'Baku Metropoliten',
    industry: 'Transportation',
    employeeCount: 2500,
    holdingId: 'holding_001',
  },
  {
    id: 'co_009',
    name: 'Bakı gəmiqayırma zavodu',
    industry: 'Shipbuilding',
    employeeCount: 600,
    holdingId: 'holding_001',
  },
]

export function companyById(id: string): Company {
  const c = MOCK_COMPANIES.find((x) => x.id === id)
  if (!c) throw new Error(`Unknown company ${id}`)
  return c
}
