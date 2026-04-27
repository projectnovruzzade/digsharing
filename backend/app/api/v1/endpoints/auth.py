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
        "company": {"id": "co_001", "name": "Azcon Tech"},
        "department": "Frontend Engineering",
        "position": "Senior Frontend Developer",
        "skills": [{"id": "sk_001", "name": "React"}],
        "allocation": [{"companyId": "co_001", "projectName": "ERP"}],
        "performanceScore": 87,
        "workloadPercent": 40
    },
    "hr@demo.az": {
        "id": "emp_hr", 
        "role": "hr_manager", 
        "firstName": "Leyla", 
        "lastName": "Hasanova",
        "company": {"id": "co_001", "name": "Azcon Tech"},
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
        "company": {"id": "co_002", "name": "Azcon Construction"},
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
        "company": {"id": "co_005", "name": "Azcon Finance"},
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
        "company": {"id": "co_001", "name": "Azcon Tech"},
        "department": "IT Operations",
        "position": "Platform Admin",
        "skills": [],
        "allocation": [],
        "performanceScore": 88,
        "workloadPercent": 55
    },
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
    return {
        "id": user_data["id"],
        "email": token,
        "firstName": user_data["firstName"],
        "lastName": user_data["lastName"],
        "role": user_data["role"],
        "company": user_data.get("company"),
        "department": user_data.get("department"),
        "position": user_data.get("position"),
        "status": "active",
        "skills": user_data.get("skills", []),
        "allocation": user_data.get("allocation", []),
        "performanceScore": user_data.get("performanceScore", 0),
        "workloadPercent": user_data.get("workloadPercent", 0)
    }

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
        
    return {
        "id": user_data["id"],
        "email": token,
        "firstName": user_data["firstName"],
        "lastName": user_data["lastName"],
        "role": user_data["role"],
        "company": user_data.get("company"),
        "department": user_data.get("department"),
        "position": user_data.get("position"),
        "status": "active"
    }
