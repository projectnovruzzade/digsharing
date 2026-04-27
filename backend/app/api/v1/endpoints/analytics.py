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
        {"company": "Azİntelecom", "avgWorkload": 65, "headcount": 45},
        {"company": "ADY", "avgWorkload": 78, "headcount": 120},
        {"company": "AZAL", "avgWorkload": 55, "headcount": 80},
        {"company": "Aztelekom", "avgWorkload": 62, "headcount": 68},
        {"company": "Azercosmos", "avgWorkload": 58, "headcount": 32},
        {"company": "Metro", "avgWorkload": 71, "headcount": 95},
        {"company": "BakuBus", "avgWorkload": 64, "headcount": 28},
        {"company": "Bakı gəmiqayırma zavodu", "avgWorkload": 73, "headcount": 140},
        {"company": "Teleradio", "avgWorkload": 59, "headcount": 52},
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
