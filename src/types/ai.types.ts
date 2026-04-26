import type { Employee, Skill } from './employee.types'

export interface AICareerRecommendation {
  type: 'role-change' | 'skill-gap' | 'training' | 'transfer'
  priority: 'high' | 'medium' | 'low'
  title: string
  description: string
  estimatedTimeline: string
  potentialImpact: string
  actions: string[]
}

export interface SkillGapAnalysis {
  departmentId: string
  missingSkills: {
    skill: Skill
    urgency: 'critical' | 'moderate' | 'low'
    headcountNeeded: number
  }[]
  trainingCandidates: Employee[]
  estimatedHiringCost: number
  estimatedTrainingCost: number
  recommendation: 'train' | 'hire' | 'transfer'
}
