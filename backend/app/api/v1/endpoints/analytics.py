from typing import List, Dict
from fastapi import APIRouter, HTTPException
from app.services.ai_logic import get_ai_match_explanation

router = APIRouter()

# Global AI Weights
AI_CONFIG = {
    "skillWeight": 40,
    "workloadWeight": 25,
    "performanceWeight": 20,
    "careerFitWeight": 15
}

@router.get("/finance/savings")
async def get_finance_savings():
    return {
        "monthlyHiringCost": 302000,
        "internalSavings": 124000,
        "allocationCost": 890000,
        "externalHireCount": 12,
        "savingsTrend": [
            {"month": "Jan", "savings": 45000},
            {"month": "Feb", "savings": 52000},
            {"month": "Mar", "savings": 61000}
        ]
    }

@router.get("/workforce-distribution")
async def get_workforce_distribution():
    return [
        {"company": "Azcon Tech", "avgWorkload": 65, "headcount": 45},
        {"company": "Azcon Construction", "avgWorkload": 78, "headcount": 120},
        {"company": "Azcon Retail", "avgWorkload": 55, "headcount": 80}
    ]

@router.patch("/admin/ai-config")
async def update_ai_config(new_weights: Dict[str, int]):
    global AI_CONFIG
    AI_CONFIG.update(new_weights)
    return {"status": "success", "updatedConfig": AI_CONFIG}

@router.get("/ai/test-match")
async def test_groq_match(listing: str, skills: str):
    """
    Groq AI-nı test etmək üçün gizli bir endpoint.
    Await silindi, çünki funksiya sinxrondur.
    """
    explanation = get_ai_match_explanation(listing, skills.split(","))
    return {"analysis": explanation}
