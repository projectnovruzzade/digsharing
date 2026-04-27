from typing import Any, List, Optional

from fastapi import APIRouter, Depends, HTTPException, Query

from app.api.deps import get_optional_demo_user
from app.data.workforce_mock import MOCK_EMPLOYEES
from app.schemas.employee import AllocationSchema, EmployeeOut, EmployeeUpdate

router = APIRouter()


def _scope_for_hr(auth_user: Optional[dict[str, Any]], rows: List[dict[str, Any]]) -> List[dict[str, Any]]:
    if auth_user and auth_user.get("role") == "hr_manager":
        cid = auth_user["company"]["id"]
        return [e for e in rows if e["company"]["id"] == cid]
    return rows


def _ensure_hr_can_access_employee(auth_user: Optional[dict[str, Any]], employee: dict[str, Any]) -> None:
    if auth_user and auth_user.get("role") == "hr_manager":
        if employee["company"]["id"] != auth_user["company"]["id"]:
            raise HTTPException(status_code=404, detail="Employee not found")


@router.get("/", response_model=List[EmployeeOut])
async def get_employees(
    company_id: Optional[str] = None,
    skill_id: Optional[str] = None,
    min_performance: int = Query(0, ge=0, le=100),
    auth_user: Optional[dict[str, Any]] = Depends(get_optional_demo_user),
):
    results = list(MOCK_EMPLOYEES)
    results = _scope_for_hr(auth_user, results)
    if company_id and (not auth_user or auth_user.get("role") != "hr_manager"):
        results = [e for e in results if e["company"]["id"] == company_id]
    if skill_id:
        results = [e for e in results if any(s["id"] == skill_id for s in e["skills"])]
    if min_performance:
        results = [e for e in results if e["performanceScore"] >= min_performance]
    return results


@router.get("/{employee_id}", response_model=EmployeeOut)
async def get_employee(
    employee_id: str,
    auth_user: Optional[dict[str, Any]] = Depends(get_optional_demo_user),
):
    employee = next((e for e in MOCK_EMPLOYEES if e["id"] == employee_id), None)
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    _ensure_hr_can_access_employee(auth_user, employee)
    return employee


@router.patch("/{employee_id}", response_model=EmployeeOut)
async def update_employee(
    employee_id: str,
    employee_in: EmployeeUpdate,
    auth_user: Optional[dict[str, Any]] = Depends(get_optional_demo_user),
):
    employee_idx = next((i for i, e in enumerate(MOCK_EMPLOYEES) if e["id"] == employee_id), None)
    if employee_idx is None:
        raise HTTPException(status_code=404, detail="Employee not found")
    _ensure_hr_can_access_employee(auth_user, MOCK_EMPLOYEES[employee_idx])

    update_data = employee_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        MOCK_EMPLOYEES[employee_idx][field] = value

    return MOCK_EMPLOYEES[employee_idx]


@router.get("/{employee_id}/allocations", response_model=List[AllocationSchema])
async def get_employee_allocations(
    employee_id: str,
    auth_user: Optional[dict[str, Any]] = Depends(get_optional_demo_user),
):
    employee = next((e for e in MOCK_EMPLOYEES if e["id"] == employee_id), None)
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    _ensure_hr_can_access_employee(auth_user, employee)
    return employee["allocation"]
