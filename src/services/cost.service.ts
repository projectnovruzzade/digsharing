import { delay } from './api'
import {
  MOCK_COMPANY_COSTS,
  MOCK_HEADCOUNT_SPLIT,
  MOCK_MONTHLY_HIRING_COST,
} from './mock/analytics.mock'

export interface CostSummary {
  monthlyHiringCost: number
  internalSavings: number
  allocationCost: number
  externalHireCount: number
  monthlyTrend: typeof MOCK_MONTHLY_HIRING_COST
  headcountSplit: typeof MOCK_HEADCOUNT_SPLIT
  companyCosts: typeof MOCK_COMPANY_COSTS
}

export async function getCostSummary(): Promise<CostSummary> {
  await delay(450)
  return {
    monthlyHiringCost: 302000,
    internalSavings: 124000,
    allocationCost: 890000,
    externalHireCount: 12,
    monthlyTrend: MOCK_MONTHLY_HIRING_COST,
    headcountSplit: MOCK_HEADCOUNT_SPLIT,
    companyCosts: MOCK_COMPANY_COSTS,
  }
}

export function exportCostRowsForExcel(): Record<string, string | number>[] {
  return MOCK_MONTHLY_HIRING_COST.map((m) => ({
    Month: m.month,
    Cost: m.cost,
    Budget: m.budget,
  }))
}
