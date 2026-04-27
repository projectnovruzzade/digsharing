from pydantic import BaseModel
from typing import Optional, List, Any

class UserOut(BaseModel):
    id: str
    email: str
    firstName: str
    lastName: str
    role: str
    company: Optional[Any] = None
    department: Optional[str] = None
    position: Optional[str] = None
    status: Optional[str] = "active"
    skills: List[Any] = []
    allocation: List[Any] = []
    performanceScore: int = 0
    workloadPercent: int = 0
    joinedAt: Optional[str] = None
    bio: Optional[str] = None
    experience: List[Any] = []
    performanceHistory: List[Any] = []

    class Config:
        from_attributes = True

class UserCreate(BaseModel):
    email: str
    firstName: str
    lastName: str
    password: str
    role: str = "employee"

class UserUpdate(BaseModel):
    firstName: Optional[str] = None
    lastName: Optional[str] = None
    position: Optional[str] = None

class Token(BaseModel):
    access_token: str
    token_type: str
