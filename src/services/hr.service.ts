import { delay } from './api'
import { MOCK_SWAPS } from './mock/swaps.mock'
import type { SwapProposal } from '@/types/marketplace.types'

export async function getSwaps(): Promise<SwapProposal[]> {
  await delay(300)
  return [...MOCK_SWAPS]
}

export async function updateSwapStatus(
  id: string,
  status: SwapProposal['status'],
): Promise<void> {
  await delay(200)
  const s = MOCK_SWAPS.find((x) => x.id === id)
  if (s) s.status = status
}
