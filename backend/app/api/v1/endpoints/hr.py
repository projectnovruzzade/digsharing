from typing import Any, List, Optional
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException

from app.api.deps import get_optional_demo_user
from app.api.v1.endpoints.employees import MOCK_EMPLOYEES
from app.data.companies_meta import company_full
from app.schemas.hr import (
    InstantReplacementOut,
    SkillGapAnalysisOut,
    SwapProposalCreate,
)

router = APIRouter()


def _mini_employee(emp: dict[str, Any]) -> dict[str, str]:
    return {"id": emp["id"], "firstName": emp["firstName"], "lastName": emp["lastName"]}


def _swap_payload(
    swap_id: str,
    from_emp: dict[str, Any],
    to_emp: dict[str, Any],
    *,
    proposed_by: str,
    status: str,
    duration: str,
    skill_match_score: int,
    created_at: str,
    company_a: int = 50,
    company_b: int = 50,
) -> dict[str, Any]:
    fc = company_full(from_emp["company"])
    tc = company_full(to_emp["company"])
    return {
        "id": swap_id,
        "fromEmployeeId": from_emp["id"],
        "toEmployeeId": to_emp["id"],
        "fromEmployee": _mini_employee(from_emp),
        "toEmployee": _mini_employee(to_emp),
        "fromCompany": fc,
        "toCompany": tc,
        "skillMatchScore": skill_match_score,
        "proposedBy": proposed_by,
        "status": status,
        "duration": duration,
        "salarySplit": {"companyA": company_a, "companyB": company_b},
        "createdAt": created_at,
    }


def _emp_by_id(eid: str) -> Optional[dict[str, Any]]:
    return next((e for e in MOCK_EMPLOYEES if e["id"] == eid), None)


def _build_seed_swaps() -> List[dict[str, Any]]:
    """Sample swaps for Kanban (pending / active / completed). All co_001 for HR demo."""
    seeds: List[tuple[str, str, str, str, str, str, int, str, int, int]] = [
        ("swp_001", "emp_azin_01", "emp_azin_02", "ai", "pending", "6 weeks", 88, "2025-10-12T10:00:00", 55, 45),
        ("swp_002", "emp_admin", "emp_hr", "hr", "pending", "1 month", 82, "2025-11-01T14:30:00", 50, 50),
        ("swp_003", "emp_azin_03", "emp_azin_04", "manager", "pending", "3 months", 79, "2025-11-18T09:15:00", 60, 40),
        ("swp_004", "emp_hr", "emp_azin_05", "ai", "active", "8 weeks", 91, "2025-09-20T11:00:00", 70, 30),
        ("swp_005", "emp_azin_06", "emp_azin_07", "hr", "active", "12 weeks", 74, "2025-10-05T16:45:00", 50, 50),
        ("swp_006", "emp_azin_08", "emp_azin_09", "manager", "completed", "2 weeks", 68, "2025-07-30T08:00:00", 65, 35),
        ("swp_007", "emp_azin_10", "emp_azin_01", "ai", "completed", "4 weeks", 85, "2025-06-14T12:00:00", 52, 48),
        # ADY-only (visible to admin / non–HR-scoped callers; hidden from Azİntelecom HR)
        ("swp_008", "emp_002", "emp_ady_01", "hr", "pending", "2 months", 80, "2025-11-22T10:00:00", 50, 50),
    ]
    out: List[dict[str, Any]] = []
    for (
        sid,
        fid,
        tid,
        proposer,
        st,
        dur,
        score,
        created,
        ca,
        cb,
    ) in seeds:
        fe, te = _emp_by_id(fid), _emp_by_id(tid)
        if fe and te:
            out.append(
                _swap_payload(
                    sid,
                    fe,
                    te,
                    proposed_by=proposer,
                    status=st,
                    duration=dur,
                    skill_match_score=score,
                    created_at=created,
                    company_a=ca,
                    company_b=cb,
                )
            )
    return out


MOCK_SWAPS: List[dict[str, Any]] = _build_seed_swaps()


def _next_swap_id() -> str:
    nums = [int(s["id"].replace("swp_", "")) for s in MOCK_SWAPS if s["id"].startswith("swp_")]
    n = max(nums, default=0) + 1
    return f"swp_{n:03d}"


def _swap_visible_for_hr(swap: dict[str, Any], hr_company_id: str) -> bool:
    return (
        swap.get("fromCompany", {}).get("id") == hr_company_id
        and swap.get("toCompany", {}).get("id") == hr_company_id
    )


@router.get("/swaps")
async def list_swaps(auth_user: Optional[dict[str, Any]] = Depends(get_optional_demo_user)):
    rows = list(MOCK_SWAPS)
    if auth_user and auth_user.get("role") == "hr_manager":
        cid = auth_user["company"]["id"]
        rows = [s for s in rows if _swap_visible_for_hr(s, cid)]
    return rows


@router.get("/workforce")
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

@router.get("/skill-gap", response_model=SkillGapAnalysisOut)
async def get_skill_gap(auth_user: Optional[dict[str, Any]] = Depends(get_optional_demo_user)):
    pool = list(MOCK_EMPLOYEES)
    if auth_user and auth_user.get("role") == "hr_manager":
        cid = auth_user["company"]["id"]
        pool = [e for e in pool if e["company"]["id"] == cid]
    return {
        "departmentId": "dept_fe",
        "missingSkills": [
            {
                "skill": {"id": "sk_gap1", "name": "React", "category": "technical", "level": "senior", "yearsOfExperience": 4, "verified": True},
                "urgency": "critical",
                "headcountNeeded": 2
            }
        ],
        "trainingCandidates": pool[:2],
        "estimatedHiringCost": 12000,
        "estimatedTrainingCost": 3500,
        "recommendation": "train"
    }

@router.post("/swaps")
async def create_swap(swap_in: SwapProposalCreate):
    from_emp = _emp_by_id(swap_in.fromEmployeeId)
    to_emp = _emp_by_id(swap_in.toEmployeeId)

    if not from_emp or not to_emp:
        raise HTTPException(status_code=404, detail="Employee not found")

    ss = swap_in.salarySplit or {"companyA": 50, "companyB": 50}
    new_swap = _swap_payload(
        _next_swap_id(),
        from_emp,
        to_emp,
        proposed_by="hr",
        status="pending",
        duration=swap_in.duration,
        skill_match_score=85,
        created_at=datetime.now().isoformat(),
        company_a=int(ss.get("companyA", 50)),
        company_b=int(ss.get("companyB", 50)),
    )
    MOCK_SWAPS.append(new_swap)
    return new_swap


@router.patch("/swaps/{swap_id}")
async def update_swap_status(
    swap_id: str,
    status: str,
    auth_user: Optional[dict[str, Any]] = Depends(get_optional_demo_user),
):
    swap = next((s for s in MOCK_SWAPS if s["id"] == swap_id), None)
    if not swap:
        raise HTTPException(status_code=404, detail="Swap not found")

    if auth_user and auth_user.get("role") == "hr_manager":
        cid = auth_user["company"]["id"]
        if not _swap_visible_for_hr(swap, cid):
            raise HTTPException(status_code=404, detail="Swap not found")

    allowed = {"pending", "active", "completed", "approved", "rejected"}
    if status not in allowed:
        raise HTTPException(status_code=400, detail="Invalid status")

    swap["status"] = status
    return swap

@router.get("/instant-replacement/{emp_id}", response_model=InstantReplacementOut)
async def get_instant_replacement(
    emp_id: str,
    auth_user: Optional[dict[str, Any]] = Depends(get_optional_demo_user),
):
    original = next((e for e in MOCK_EMPLOYEES if e["id"] == emp_id), None)
    if not original:
        raise HTTPException(status_code=404, detail="Employee not found")

    if auth_user and auth_user.get("role") == "hr_manager":
        if original["company"]["id"] != auth_user["company"]["id"]:
            raise HTTPException(status_code=404, detail="Employee not found")
        cid = auth_user["company"]["id"]
        candidates = [e for e in MOCK_EMPLOYEES if e["id"] != emp_id and e["company"]["id"] == cid]
    else:
        candidates = [e for e in MOCK_EMPLOYEES if e["id"] != emp_id]

    top = candidates[:3]
    return {
        "originalEmployeeId": emp_id,
        "candidates": top,
        "matchScores": {c["id"]: 90 for c in top},
    }
