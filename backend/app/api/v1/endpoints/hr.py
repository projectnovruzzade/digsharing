from typing import List, Optional
from datetime import datetime
from fastapi import APIRouter, HTTPException
from app.schemas.hr import SkillGapAnalysisOut, SwapProposalOut, SwapProposalCreate, InstantReplacementOut
from app.api.v1.endpoints.employees import MOCK_EMPLOYEES

router = APIRouter()

MOCK_SWAPS = []

@router.get("/skill-gap", response_model=SkillGapAnalysisOut)
async def get_skill_gap():
    return {
        "departmentId": "dept_fe",
        "missingSkills": [
            {
                "skill": {"id": "sk_gap1", "name": "React", "category": "technical", "level": "senior", "yearsOfExperience": 4, "verified": True},
                "urgency": "critical",
                "headcountNeeded": 2
            }
        ],
        "trainingCandidates": MOCK_EMPLOYEES[:2],
        "estimatedHiringCost": 12000,
        "estimatedTrainingCost": 3500,
        "recommendation": "train"
    }

@router.post("/swaps", response_model=SwapProposalOut)
async def create_swap(swap_in: SwapProposalCreate):
    from_emp = next((e for e in MOCK_EMPLOYEES if e["id"] == swap_in.fromEmployeeId), None)
    to_emp = next((e for e in MOCK_EMPLOYEES if e["id"] == swap_in.toEmployeeId), None)
    
    if not from_emp or not to_emp:
        raise HTTPException(status_code=404, detail="Employee not found")

    new_swap = {
        "id": f"swp_{len(MOCK_SWAPS) + 1}",
        "fromEmployee": from_emp,
        "toEmployee": to_emp,
        "status": "pending",
        "skillMatchScore": 85,
        "createdAt": datetime.now().isoformat()
    }
    MOCK_SWAPS.append(new_swap)
    return new_swap

@router.patch("/swaps/{swap_id}", response_model=SwapProposalOut)
async def update_swap_status(swap_id: str, status: str):
    swap = next((s for s in MOCK_SWAPS if s["id"] == swap_id), None)
    if not swap:
        raise HTTPException(status_code=404, detail="Swap not found")
    
    swap["status"] = status
    return swap

@router.get("/instant-replacement/{emp_id}", response_model=InstantReplacementOut)
async def get_instant_replacement(emp_id: str):
    original = next((e for e in MOCK_EMPLOYEES if e["id"] == emp_id), None)
    if not original:
        raise HTTPException(status_code=404, detail="Employee not found")
    
    candidates = [e for e in MOCK_EMPLOYEES if e["id"] != emp_id]
    return {
        "originalEmployeeId": emp_id,
        "candidates": candidates[:3],
        "matchScores": {c["id"]: 90 for c in candidates[:3]}
    }
