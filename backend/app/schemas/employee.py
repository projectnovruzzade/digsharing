from pydantic import BaseModel
from typing import List, Optional

class SkillSchema(BaseModel):
    id: str
    name: str
    category: str
    level: str
    yearsOfExperience: int
    verified: bool

class AllocationSchema(BaseModel):
    companyId: str
    companyName: str
    projectName: str
    percent: int
    startDate: str
    endDate: Optional[str] = None

class EmployeeBase(BaseModel):
    id: str
    firstName: str
    lastName: str
    email: str
    company: dict
    department: str
    position: str
    role: str
    status: str = "active"

class EmployeeOut(EmployeeBase):
    skills: List[SkillSchema]
    performanceScore: int
    workloadPercent: int
    allocation: List[AllocationSchema]
    joinedAt: str
    bio: Optional[str] = None

class EmployeeUpdate(BaseModel):
    firstName: Optional[str] = None
    lastName: Optional[str] = None
    skills: Optional[List[SkillSchema]] = None
    bio: Optional[str] = None
    careerGoals: Optional[str] = None
