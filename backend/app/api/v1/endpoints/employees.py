from typing import List, Optional
from fastapi import APIRouter, HTTPException, Query
from app.schemas.employee import EmployeeOut, EmployeeUpdate, AllocationSchema

router = APIRouter()

# Mock Verilənlər (Frontend-dəki MOCK_EMPLOYEES ilə eyni struktur)
MOCK_EMPLOYEES = [
    {
        "id": "emp_001",
        "firstName": "Ayten",
        "lastName": "Mammadova",
        "email": "ayten.m@azal.az",
        "company": {"id": "co_001", "name": "Azcon Tech"},
        "department": "Frontend Engineering",
        "role": "employee",
        "position": "Senior Frontend Developer",
        "skills": [
            {"id": "sk_001", "name": "React", "category": "technical", "level": "senior", "yearsOfExperience": 4, "verified": True},
            {"id": "sk_002", "name": "TypeScript", "category": "technical", "level": "senior", "yearsOfExperience": 3, "verified": True}
        ],
        "performanceScore": 87,
        "workloadPercent": 40,
        "status": "active",
        "allocation": [
            {"companyId": "co_001", "companyName": "Azcon Tech", "projectName": "ERP Modernization", "percent": 100, "startDate": "2024-01-15"}
        ],
        "joinedAt": "2021-03-10",
        "bio": "Frontend developer with 5 years of experience."
    },
    {
        "id": "emp_002",
        "firstName": "Rashad",
        "lastName": "Aliyev",
        "email": "rashad.a@ady.az",
        "company": {"id": "co_002", "name": "Azcon Construction"},
        "department": "IT Department",
        "role": "dept_manager",
        "position": "IT Manager",
        "skills": [
            {"id": "sk_005", "name": "Project Management", "category": "soft", "level": "expert", "yearsOfExperience": 7, "verified": True}
        ],
        "performanceScore": 92,
        "workloadPercent": 75,
        "status": "active",
        "allocation": [
            {"companyId": "co_002", "companyName": "Azcon Construction", "projectName": "Digital Transformation", "percent": 100, "startDate": "2022-06-01"}
        ],
        "joinedAt": "2019-09-15",
        "bio": "Experienced IT Manager."
    }
]

@router.get("/", response_model=List[EmployeeOut])
async def get_employees(
    company_id: Optional[str] = None,
    skill_id: Optional[str] = None,
    min_performance: int = Query(0, ge=0, le=100)
):
    results = MOCK_EMPLOYEES
    if company_id:
        results = [e for e in results if e["company"]["id"] == company_id]
    if skill_id:
        results = [e for e in results if any(s["id"] == skill_id for s in e["skills"])]
    if min_performance:
        results = [e for e in results if e["performanceScore"] >= min_performance]
    return results

@router.get("/{employee_id}", response_model=EmployeeOut)
async def get_employee(employee_id: str):
    employee = next((e for e in MOCK_EMPLOYEES if e["id"] == employee_id), None)
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    return employee

@router.patch("/{employee_id}", response_model=EmployeeOut)
async def update_employee(employee_id: str, employee_in: EmployeeUpdate):
    employee_idx = next((i for i, e in enumerate(MOCK_EMPLOYEES) if e["id"] == employee_id), None)
    if employee_idx is None:
        raise HTTPException(status_code=404, detail="Employee not found")
    
    # Update logic (Hackathon üçün mock list-də dəyişirik)
    update_data = employee_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        MOCK_EMPLOYEES[employee_idx][field] = value
        
    return MOCK_EMPLOYEES[employee_idx]

@router.get("/{employee_id}/allocations", response_model=List[AllocationSchema])
async def get_employee_allocations(employee_id: str):
    employee = next((e for e in MOCK_EMPLOYEES if e["id"] == employee_id), None)
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    return employee["allocation"]
