import type {
  Application,
  ApplicationPayload,
  Listing,
  ListingFilters,
} from '@/types/marketplace.types'
import { api } from './api'

export async function getListings(
  filters?: ListingFilters,
): Promise<Listing[]> {
  const response = await api.get<Listing[]>('/marketplace/listings', { params: filters })
  return response.data
}

export async function getListingById(id: string): Promise<Listing> {
  const response = await api.get<Listing>(`/marketplace/listings/${id}`)
  return response.data
}

export async function applyToListing(
  payload: ApplicationPayload,
): Promise<Application> {
  const response = await api.post<Application>(`/marketplace/listings/${payload.listingId}/apply`, payload)
  return response.data
}

export async function getApplicationsForUser(
  applicantId: string,
): Promise<Application[]> {
  const response = await api.get<Application[]>('/marketplace/applications', {
    params: { applicant_id: applicantId }
  })
  return response.data
}

export async function createListing(data: any): Promise<Listing> {
  const response = await api.post<Listing>('/marketplace/listings', data)
  return response.data
}

export async function getListingAIAnalysis(listingId: string, employeeId: string): Promise<{ score: number; explanation: string }> {
  const response = await api.get(`/marketplace/listings/${listingId}/ai-analysis`, {
    params: { employee_id: employeeId }
  })
  return response.data
}
