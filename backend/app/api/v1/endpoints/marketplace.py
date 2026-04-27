from typing import List, Optional
from datetime import datetime
from fastapi import APIRouter, HTTPException, Query
from app.schemas.marketplace import ListingOut, ListingCreate, ApplicationOut, ApplicationCreate

router = APIRouter()

# Mock Verilənlər
MOCK_LISTINGS = [
    {
        "id": "lst_001",
        "title": "React Developer — 3-Month Project",
        "description": "Azcon Construction needs an experienced React developer.",
        "company": {"id": "co_002", "name": "Azcon Construction"},
        "companyId": "co_002",
        "department": "IT Department",
        "type": "project",
        "requiredSkills": [{"id": "sk_001", "name": "React", "category": "technical", "level": "senior", "yearsOfExperience": 3, "verified": True}],
        "duration": "3 months",
        "workloadPercent": 100,
        "status": "open",
        "postedBy": "emp_002",
        "postedAt": "2024-11-20",
        "applicants": 2,
        "aiMatchScore": 94
    }
]

MOCK_APPLICATIONS = []

@router.get("/listings", response_model=List[ListingOut])
async def get_listings(
    type: Optional[str] = None,
    company_id: Optional[str] = None,
    min_workload: Optional[int] = None
):
    results = MOCK_LISTINGS
    if type:
        results = [l for l in results if l["type"] == type]
    if company_id:
        results = [l for l in results if l["company"]["id"] == company_id]
    return results

@router.post("/listings", response_model=ListingOut)
async def create_listing(listing_in: ListingCreate):
    new_listing = {
        **listing_in.model_dump(),
        "id": f"lst_{len(MOCK_LISTINGS) + 1}",
        "company": {"id": listing_in.companyId, "name": "External Company"},
        "status": "open",
        "postedBy": "current_user_id",
        "postedAt": datetime.now().isoformat(),
        "applicants": 0
    }
    MOCK_LISTINGS.append(new_listing)
    return new_listing

@router.get("/listings/{listing_id}", response_model=ListingOut)
async def get_listing(listing_id: str):
    listing = next((l for l in MOCK_LISTINGS if l["id"] == listing_id), None)
    if not listing:
        raise HTTPException(status_code=404, detail="Listing not found")
    return listing

@router.post("/listings/{listing_id}/apply", response_model=ApplicationOut)
async def apply_to_listing(listing_id: str, app_in: ApplicationCreate):
    listing = next((l for l in MOCK_LISTINGS if l["id"] == listing_id), None)
    if not listing:
        raise HTTPException(status_code=404, detail="Listing not found")
    
    new_app = {
        "id": f"app_{len(MOCK_APPLICATIONS) + 1}",
        "listingId": listing_id,
        "listing": listing,
        "applicantId": app_in.applicantId,
        "status": "pending",
        "appliedAt": datetime.now().isoformat(),
        "note": app_in.note
    }
    MOCK_APPLICATIONS.append(new_app)
    # Increment applicants count
    listing["applicants"] += 1
    return new_app

from app.services.ai_logic import get_ai_match_explanation
from app.api.v1.endpoints.employees import MOCK_EMPLOYEES

@router.get("/listings/{listing_id}/ai-analysis")
async def get_listing_ai_analysis(listing_id: str, employee_id: str):
    listing = next((l for l in MOCK_LISTINGS if l["id"] == listing_id), None)
    employee = next((e for e in MOCK_EMPLOYEES if e["id"] == employee_id), None)
    
    if not listing or not employee:
        raise HTTPException(status_code=404, detail="Listing or Employee not found")
    
    skills = [s["name"] for s in employee["skills"]]
    analysis = get_ai_match_explanation(listing["title"], skills)
    
    # AI-dan gələn cavabı parçalayırıq (Format: Score: [X] | Explanation: [Y])
    try:
        score_part = analysis.split("|")[0].replace("Score:", "").strip()
        explanation_part = analysis.split("|")[1].replace("Explanation:", "").strip()
        return {
            "score": int(score_part) if score_part.isdigit() else 85,
            "explanation": explanation_part
        }
    except:
        return {"score": 75, "explanation": analysis}
