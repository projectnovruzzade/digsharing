import { api } from './api'

export async function getCostSummary(): Promise<any> {
  const response = await api.get('/analytics/finance/savings')
  return response.data
}

export async function getWorkforceDistribution(): Promise<any> {
  const response = await api.get('/analytics/workforce-distribution')
  return response.data
}

export async function updateAIConfig(weights: Record<string, number>): Promise<any> {
  const response = await api.patch('/analytics/admin/ai-config', weights)
  return response.data
}
