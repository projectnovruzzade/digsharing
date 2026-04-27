from fastapi import APIRouter
from app.services.ai_logic import get_ai_match_explanation

router = APIRouter()

@router.get("/career/{employee_id}")
async def get_career_path(employee_id: str):
    # Mock data üçün sadə cavab
    return [
        {"title": "Senior Frontend Developer", "path": "Current"},
        {"title": "Lead Frontend Architect", "path": "Next 12 months"},
        {"title": "Tech Lead", "path": "Next 24 months"}
    ]
