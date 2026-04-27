import { api } from './api'
import type { SwapProposal } from '@/types/marketplace.types'

export async function getSwaps(): Promise<SwapProposal[]> {
  const response = await api.get<SwapProposal[]>('/hr/swaps')
  return response.data
}

export async function createSwap(data: any): Promise<SwapProposal> {
  const response = await api.post<SwapProposal>('/hr/swaps', data)
  return response.data
}

export async function updateSwapStatus(
  id: string,
  status: SwapProposal['status'],
): Promise<void> {
  await api.patch(`/hr/swaps/${id}`, null, { params: { status } })
}
