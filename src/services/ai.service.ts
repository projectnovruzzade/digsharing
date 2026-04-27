import type { AICareerRecommendation, SkillGapAnalysis } from '@/types/ai.types'
import type { Employee } from '@/types/employee.types'
import { api } from './api'

export async function analyzeCareerPath(
  employeeId: string,
): Promise<AICareerRecommendation[]> {
  const response = await api.get<AICareerRecommendation[]>(`/ai/career/${employeeId}`)
  return response.data
}

export async function runSkillGapAnalysis(
  companyId: string,
  departmentId?: string,
): Promise<SkillGapAnalysis> {
  const response = await api.get<SkillGapAnalysis>('/hr/skill-gap', {
    params: { companyId, departmentId }
  })
  return response.data
}

export async function findReplacements(
  employeeId: string,
): Promise<Employee[]> {
  const response = await api.get<any>(`/hr/instant-replacement/${employeeId}`)
  return response.data.candidates
}
