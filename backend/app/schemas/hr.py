from pydantic import BaseModel
from typing import List, Optional
from app.schemas.employee import EmployeeOut, SkillSchema

class SkillGapItem(BaseModel):
    skill: SkillSchema
    urgency: str # 'critical' | 'moderate' | 'low'
    headcountNeeded: int

class SkillGapAnalysisOut(BaseModel):
    departmentId: str
    missingSkills: List[SkillGapItem]
    trainingCandidates: List[EmployeeOut]
    estimatedHiringCost: int
    estimatedTrainingCost: int
    recommendation: str

class SwapProposalCreate(BaseModel):
    fromEmployeeId: str
    toEmployeeId: str
    duration: str
    salarySplit: dict # {"companyA": 50, "companyB": 50}

class SwapProposalOut(BaseModel):
    id: str
    fromEmployee: EmployeeOut
    toEmployee: EmployeeOut
    status: str # 'pending' | 'approved' | 'rejected'
    skillMatchScore: int
    createdAt: str

class InstantReplacementOut(BaseModel):
    originalEmployeeId: str
    candidates: List[EmployeeOut]
    matchScores: dict # {emp_id: score}
