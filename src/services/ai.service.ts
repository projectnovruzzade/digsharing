import type { AICareerRecommendation, SkillGapAnalysis } from '@/types/ai.types'
import type { Employee, Skill } from '@/types/employee.types'
import { delay } from './api'
import { MOCK_EMPLOYEES } from './mock/employees.mock'

const MOCK_AI_RECOMMENDATIONS: AICareerRecommendation[] = [
  {
    type: 'training',
    priority: 'high',
    title: 'Advance Node.js for full-stack path',
    description:
      'Closing the gap to Staff Engineer requires stronger service design.',
    estimatedTimeline: '3 months',
    potentialImpact: 'Unlock internal full-stack gigs',
    actions: ['Enroll in internal Node workshop', 'Pair on API design reviews'],
  },
  {
    type: 'transfer',
    priority: 'medium',
    title: 'Short retail analytics rotation',
    description:
      'Exposure to merchandising data would diversify your domain skills.',
    estimatedTimeline: '6 weeks',
    potentialImpact: 'Broader internal mobility score',
    actions: ['Talk to HR about 20% allocation', 'Shadow Samira’s team'],
  },
]

const MOCK_SKILL_GAP: SkillGapAnalysis = {
  departmentId: 'dept_fe',
  missingSkills: [
    {
      skill: {
        id: 'sk_gap1',
        name: 'React',
        category: 'technical',
        level: 'senior',
        yearsOfExperience: 4,
        verified: true,
      },
      urgency: 'critical',
      headcountNeeded: 2,
    },
    {
      skill: {
        id: 'sk_gap2',
        name: 'Kubernetes',
        category: 'technical',
        level: 'mid',
        yearsOfExperience: 2,
        verified: false,
      },
      urgency: 'moderate',
      headcountNeeded: 1,
    },
  ],
  trainingCandidates: MOCK_EMPLOYEES.slice(0, 3),
  estimatedHiringCost: 8400,
  estimatedTrainingCost: 2100,
  recommendation: 'train',
}

export async function analyzeCareerPath(
  _employeeId: string,
): Promise<AICareerRecommendation[]> {
  await delay(2000)
  return MOCK_AI_RECOMMENDATIONS
}

export async function runSkillGapAnalysis(
  _companyId: string,
  _departmentId?: string,
): Promise<SkillGapAnalysis> {
  await delay(2000)
  return MOCK_SKILL_GAP
}

export async function findReplacements(
  employeeId: string,
): Promise<Employee[]> {
  await delay(2000)
  return MOCK_EMPLOYEES.filter(
    (e) => e.id !== employeeId && e.workloadPercent < 80,
  ).slice(0, 5)
}

/** Mock match score from skill name overlap */
export function mockSkillMatchScore(
  required: Skill[],
  employee: Employee,
): number {
  if (!required.length) return 0
  const names = new Set(employee.skills.map((s) => s.name.toLowerCase()))
  const hit = required.filter((r) =>
    names.has(r.name.toLowerCase()),
  ).length
  return Math.round((hit / required.length) * 100)
}
