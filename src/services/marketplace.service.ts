import type {
  Application,
  ApplicationPayload,
  Listing,
  ListingFilters,
} from '@/types/marketplace.types'
import { delay } from './api'
import { MOCK_APPLICATIONS, MOCK_LISTINGS } from './mock/marketplace.mock'

function matchesDuration(
  listing: Listing,
  bucket?: ListingFilters['durationBucket'],
) {
  if (!bucket) return true
  const d = listing.duration?.toLowerCase() ?? ''
  let months = 3
  if (d.includes('week')) months = 0.25
  else if (d.includes('permanent')) months = 12
  else {
    const n = parseInt(d, 10)
    if (!Number.isNaN(n)) months = n
  }
  if (bucket === '<1m') return months < 1
  if (bucket === '1-3m') return months >= 1 && months <= 3
  if (bucket === '3-6m') return months > 3 && months <= 6
  return months > 6
}

export async function getListings(
  filters?: ListingFilters,
): Promise<Listing[]> {
  await delay(400)
  let results = [...MOCK_LISTINGS]

  if (filters?.search) {
    const q = filters.search.toLowerCase()
    results = results.filter(
      (l) =>
        l.title.toLowerCase().includes(q) ||
        l.description.toLowerCase().includes(q) ||
        l.requiredSkills.some((s) => s.name.toLowerCase().includes(q)),
    )
  }
  if (filters?.type?.length) {
    results = results.filter((l) => filters.type!.includes(l.type))
  }
  if (filters?.companyIds?.length) {
    results = results.filter((l) =>
      filters.companyIds!.includes(l.company.id),
    )
  }
  if (filters?.minWorkload != null) {
    results = results.filter((l) => l.workloadPercent >= filters.minWorkload!)
  }
  if (filters?.maxWorkload != null) {
    results = results.filter((l) => l.workloadPercent <= filters.maxWorkload!)
  }
  if (filters?.skillNames?.length) {
    results = results.filter((l) =>
      filters.skillNames!.every((sn) =>
        l.requiredSkills.some(
          (s) => s.name.toLowerCase() === sn.toLowerCase(),
        ),
      ),
    )
  }
  if (filters?.durationBucket) {
    results = results.filter((l) =>
      matchesDuration(l, filters.durationBucket),
    )
  }
  if (filters?.minMatch != null) {
    results = results.filter(
      (l) => (l.aiMatchScore ?? 0) >= filters.minMatch!,
    )
  }
  return results
}

export async function applyToListing(
  payload: ApplicationPayload,
): Promise<Application> {
  await delay(600)
  const listing = MOCK_LISTINGS.find((l) => l.id === payload.listingId)
  if (!listing) throw new Error('Listing not found')
  return {
    id: `app_${Date.now()}`,
    listingId: payload.listingId,
    listing,
    applicantId: payload.applicantId,
    status: 'pending',
    appliedAt: new Date().toISOString(),
    note: payload.note,
  }
}

export async function getApplicationsForUser(
  applicantId: string,
): Promise<Application[]> {
  await delay(300)
  return MOCK_APPLICATIONS.filter((a) => a.applicantId === applicantId)
}
