from datetime import timedelta
from typing import Any
from fastapi import APIRouter, Depends, HTTPException, status, Header
from fastapi.security import OAuth2PasswordRequestForm
from app.schemas.user import UserOut, UserCreate, Token, UserUpdate

router = APIRouter()

# Demo hesabları (Frontend-lə eyni)
DEMO_USERS = {
    "employee@demo.az": {
        "id": "emp_001", 
        "role": "employee", 
        "firstName": "Ayten", 
        "lastName": "Mammadova",
        "company": {"id": "co_003", "name": "AZAL"},
        "department": "Frontend Engineering",
        "position": "Senior Frontend Developer",
        "skills": [
            {
                "id": "sk_001",
                "name": "React",
                "category": "technical",
                "level": "senior",
                "yearsOfExperience": 5,
                "verified": True,
            },
            {
                "id": "sk_002",
                "name": "TypeScript",
                "category": "technical",
                "level": "senior",
                "yearsOfExperience": 4,
                "verified": True,
            },
            {
                "id": "sk_003",
                "name": "Node.js",
                "category": "technical",
                "level": "mid",
                "yearsOfExperience": 3,
                "verified": True,
            },
            {
                "id": "sk_004",
                "name": "Git",
                "category": "technical",
                "level": "mid",
                "yearsOfExperience": 4,
                "verified": True,
            },
            {
                "id": "sk_005",
                "name": "Docker",
                "category": "technical",
                "level": "mid",
                "yearsOfExperience": 3,
                "verified": True,
            },
            {
                "id": "sk_006",
                "name": "Postman",
                "category": "technical",
                "level": "mid",
                "yearsOfExperience": 3,
                "verified": True,
            },
        ],
        "allocation": [
            {
                "companyId": "co_003",
                "companyName": "AZAL",
                "projectName": "Passenger Digital Platform",
                "percent": 70,
                "startDate": "2025-11-01",
            },
            {
                "companyId": "co_001",
                "companyName": "Azİntelecom",
                "projectName": "Shared Services UI",
                "percent": 30,
                "startDate": "2026-01-10",
            },
        ],
        "performanceScore": 87,
        "workloadPercent": 40,
        "joinedAt": "2021-03-10",
        "bio": "Frontend developer focused on scalable UI architecture and design system quality.",
    },
    "hr@demo.az": {
        "id": "emp_hr", 
        "role": "hr_manager", 
        "firstName": "Leyla", 
        "lastName": "Hasanova",
        "company": {"id": "co_001", "name": "Azİntelecom"},
        "department": "People Operations",
        "position": "HR Director",
        "skills": [],
        "allocation": [],
        "performanceScore": 91,
        "workloadPercent": 70
    },
    "manager@demo.az": {
        "id": "emp_002", 
        "role": "dept_manager", 
        "firstName": "Rashad", 
        "lastName": "Aliyev",
        "company": {"id": "co_002", "name": "ADY"},
        "department": "IT Department",
        "position": "IT Manager",
        "skills": [],
        "allocation": [],
        "performanceScore": 92,
        "workloadPercent": 75
    },
    "cfo@demo.az": {
        "id": "emp_cfo", 
        "role": "cfo", 
        "firstName": "Elchin", 
        "lastName": "Rahimov",
        "company": {"id": "co_005", "name": "Azercosmos"},
        "department": "Finance",
        "position": "CFO",
        "skills": [],
        "allocation": [],
        "performanceScore": 95,
        "workloadPercent": 85
    },
    "admin@demo.az": {
        "id": "emp_admin", 
        "role": "admin", 
        "firstName": "Nigar", 
        "lastName": "Suleymanova",
        "company": {"id": "co_001", "name": "Azİntelecom"},
        "department": "IT Operations",
        "position": "Platform Admin",
        "skills": [],
        "allocation": [],
        "performanceScore": 88,
        "workloadPercent": 55
    },
}


def _build_default_experience(user_data: dict) -> list[dict]:
    current_company = user_data.get("company", {}).get("name", "Current Company")
    current_position = user_data.get("position", "Specialist")
    return [
        {
            "id": "exp_001",
            "title": current_position,
            "company": current_company,
            "period": "2023 - Present",
            "summary": "Leading cross-team initiatives and delivering critical milestones on schedule.",
        },
        {
            "id": "exp_002",
            "title": "Associate Specialist",
            "company": "Teleradio",
            "period": "2021 - 2023",
            "summary": "Improved process quality, reduced rework, and supported platform modernization.",
        },
    ]


def _build_default_performance_history(user_data: dict) -> list[dict]:
    score = int(user_data.get("performanceScore", 0))
    return [
        {
            "period": "Q4 2025",
            "score": max(score - 4, 0),
            "managerNote": "Strong ownership and consistent delivery.",
        },
        {
            "period": "Q1 2026",
            "score": max(score - 2, 0),
            "managerNote": "Improved collaboration and faster execution.",
        },
        {
            "period": "Q2 2026",
            "score": score,
            "managerNote": "Maintains high quality and supports team mentoring.",
        },
    ]


def _normalize_skills_for_position(user_data: dict) -> list[dict]:
    skills = user_data.get("skills", [])
    position = str(user_data.get("position", "")).lower()

    normalized = [
        {
            "id": s.get("id") or f"sk_{i+1:03d}",
            "name": s.get("name", "Unknown"),
            "category": s.get("category", "technical"),
            "level": s.get("level", "mid"),
            "yearsOfExperience": int(s.get("yearsOfExperience", 1)),
            "verified": bool(s.get("verified", True)),
        }
        for i, s in enumerate(skills)
    ]

    if "developer" in position or "engineer" in position:
        design_keywords = ("ui/ux", "ui ux", "ux", "figma", "design")
        normalized = [
            s
            for s in normalized
            if not any(keyword in s["name"].lower() for keyword in design_keywords)
        ]

        required_tools = [
            {
                "id": "sk_tool_git",
                "name": "Git",
                "category": "technical",
                "level": "mid",
                "yearsOfExperience": 3,
                "verified": True,
            },
            {
                "id": "sk_tool_docker",
                "name": "Docker",
                "category": "technical",
                "level": "mid",
                "yearsOfExperience": 2,
                "verified": True,
            },
            {
                "id": "sk_tool_postman",
                "name": "Postman",
                "category": "technical",
                "level": "mid",
                "yearsOfExperience": 2,
                "verified": True,
            },
        ]

        existing_names = {s["name"].lower() for s in normalized}
        for tool in required_tools:
            if tool["name"].lower() not in existing_names:
                normalized.append(tool)

    return normalized


def _serialize_user(email: str, user_data: dict) -> dict:
    return {
        "id": user_data["id"],
        "email": email,
        "firstName": user_data["firstName"],
        "lastName": user_data["lastName"],
        "role": user_data["role"],
        "company": user_data.get("company"),
        "department": user_data.get("department"),
        "position": user_data.get("position"),
        "status": "active",
        "skills": _normalize_skills_for_position(user_data),
        "allocation": user_data.get("allocation", []),
        "performanceScore": user_data.get("performanceScore", 0),
        "workloadPercent": user_data.get("workloadPercent", 0),
        "joinedAt": user_data.get("joinedAt", "2021-01-01"),
        "bio": user_data.get("bio", "Focused on measurable impact and internal mobility growth."),
        "experience": user_data.get("experience", _build_default_experience(user_data)),
        "performanceHistory": user_data.get(
            "performanceHistory", _build_default_performance_history(user_data)
        ),
    }

@router.post("/login", response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends()) -> Any:
    username = form_data.username.lower().strip()
    if username in DEMO_USERS and form_data.password == "demo123":
        return {
            "access_token": username,
            "token_type": "bearer",
        }
    
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Incorrect email or password",
    )

@router.get("/me", response_model=UserOut)
async def get_me(authorization: str = Header(None)) -> Any:
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Unauthorized")
    
    token = authorization.split(" ")[1]
    
    if token not in DEMO_USERS:
        raise HTTPException(status_code=401, detail="Invalid session")
    
    user_data = DEMO_USERS[token]
    return _serialize_user(token, user_data)

@router.patch("/me", response_model=UserOut)
async def update_me(user_in: UserUpdate, authorization: str = Header(None)) -> Any:
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Unauthorized")
    
    token = authorization.split(" ")[1]
    if token not in DEMO_USERS:
        raise HTTPException(status_code=401, detail="Invalid session")
    
    # Update logic (demo)
    user_data = DEMO_USERS[token]
    update_data = user_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        user_data[field] = value
        
    return _serialize_user(token, user_data)
