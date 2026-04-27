from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
from app.schemas.employee import SkillSchema

class ListingBase(BaseModel):
    title: str
    description: str
    companyId: str
    department: str
    type: str  # 'task' | 'project' | 'temporary-role' | 'permanent-role'
    workloadPercent: int
    duration: Optional[str] = None
    allocationSplit: bool = False

class ListingCreate(ListingBase):
    requiredSkills: List[SkillSchema]

class ListingOut(ListingBase):
    id: str
    company: dict
    requiredSkills: List[SkillSchema]
    status: str = "open"
    postedBy: str
    postedAt: str
    applicants: int = 0
    aiMatchScore: Optional[int] = None

class ApplicationCreate(BaseModel):
    listingId: str
    applicantId: str
    note: Optional[str] = None

class ApplicationOut(BaseModel):
    id: str
    listingId: str
    listing: Optional[ListingOut] = None
    applicantId: str
    status: str = "pending"
    appliedAt: str
    note: Optional[str] = None
