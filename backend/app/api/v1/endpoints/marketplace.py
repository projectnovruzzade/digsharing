from typing import List, Optional
from datetime import datetime
from fastapi import APIRouter, HTTPException, Query
from app.schemas.marketplace import ListingOut, ListingCreate, ApplicationOut, ApplicationCreate
from app.api.v1.endpoints.employees import MOCK_EMPLOYEES
from app.services.ai_logic import get_ai_match_explanation

router = APIRouter()

# Mock Verilənlər
MOCK_LISTINGS = [
    {
        "id": "lst_001",
        "title": "React Developer — 3-Month Project",
        "description": "ADY needs an experienced React developer.",
        "company": {"id": "co_002", "name": "ADY"},
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
    },
    {
        "id": "lst_002",
        "title": "Data Analyst — Sales Insights",
        "description": "Build internal analytics dashboards and automate weekly sales insight reporting.",
        "company": {"id": "co_003", "name": "AZAL"},
        "companyId": "co_003",
        "department": "Business Intelligence",
        "type": "project",
        "requiredSkills": [
            {"id": "sk_011", "name": "SQL", "category": "technical", "level": "senior", "yearsOfExperience": 4, "verified": True},
            {"id": "sk_012", "name": "Power BI", "category": "technical", "level": "mid", "yearsOfExperience": 3, "verified": True},
            {"id": "sk_013", "name": "Data Storytelling", "category": "soft", "level": "mid", "yearsOfExperience": 2, "verified": True}
        ],
        "duration": "4 months",
        "workloadPercent": 60,
        "allocationSplit": True,
        "status": "open",
        "postedBy": "emp_010",
        "postedAt": "2026-03-05",
        "applicants": 1,
        "aiMatchScore": 81
    },
    {
        "id": "lst_003",
        "title": "Backend Engineer — Internal API Revamp",
        "description": "Refactor legacy internal services to FastAPI and improve service-to-service performance.",
        "company": {"id": "co_001", "name": "Azİntelecom"},
        "companyId": "co_001",
        "department": "Platform Engineering",
        "type": "temporary-role",
        "requiredSkills": [
            {"id": "sk_021", "name": "Python", "category": "technical", "level": "senior", "yearsOfExperience": 5, "verified": True},
            {"id": "sk_022", "name": "FastAPI", "category": "technical", "level": "mid", "yearsOfExperience": 2, "verified": True},
            {"id": "sk_023", "name": "PostgreSQL", "category": "technical", "level": "mid", "yearsOfExperience": 3, "verified": True}
        ],
        "duration": "6 months",
        "workloadPercent": 100,
        "allocationSplit": False,
        "status": "open",
        "postedBy": "emp_014",
        "postedAt": "2026-02-18",
        "applicants": 3,
        "aiMatchScore": 88
    },
    {
        "id": "lst_004",
        "title": "UI/UX Designer — Mobile Journey",
        "description": "Design a new mobile-first onboarding and self-service flow for internal mobility requests.",
        "company": {"id": "co_004", "name": "Aztelekom"},
        "companyId": "co_004",
        "department": "Product Design",
        "type": "task",
        "requiredSkills": [
            {"id": "sk_031", "name": "Figma", "category": "technical", "level": "senior", "yearsOfExperience": 4, "verified": True},
            {"id": "sk_032", "name": "UX Research", "category": "domain", "level": "mid", "yearsOfExperience": 2, "verified": True},
            {"id": "sk_033", "name": "Interaction Design", "category": "technical", "level": "mid", "yearsOfExperience": 3, "verified": False}
        ],
        "duration": "6 weeks",
        "workloadPercent": 40,
        "allocationSplit": True,
        "status": "open",
        "postedBy": "emp_021",
        "postedAt": "2026-03-22",
        "applicants": 4,
        "aiMatchScore": 76
    },
    {
        "id": "lst_005",
        "title": "Cloud Engineer — Cost Optimization",
        "description": "Lead a cross-company cloud cost reduction initiative and optimize Kubernetes workloads.",
        "company": {"id": "co_005", "name": "Azercosmos"},
        "companyId": "co_005",
        "department": "Infrastructure",
        "type": "permanent-role",
        "requiredSkills": [
            {"id": "sk_041", "name": "AWS", "category": "technical", "level": "senior", "yearsOfExperience": 5, "verified": True},
            {"id": "sk_042", "name": "Kubernetes", "category": "technical", "level": "senior", "yearsOfExperience": 4, "verified": True},
            {"id": "sk_043", "name": "FinOps", "category": "domain", "level": "mid", "yearsOfExperience": 2, "verified": True}
        ],
        "duration": "Long-term",
        "workloadPercent": 100,
        "allocationSplit": False,
        "status": "open",
        "postedBy": "emp_030",
        "postedAt": "2026-01-12",
        "applicants": 5,
        "aiMatchScore": 90
    },
    {
        "id": "lst_006",
        "title": "SCADA Integrator — Tunnel Systems",
        "description": "Integrate tunnel ventilation telemetry with central Metro operations dashboard.",
        "company": {"id": "co_006", "name": "Metro"},
        "companyId": "co_006",
        "department": "Operations Control",
        "type": "project",
        "requiredSkills": [
            {"id": "sk_051", "name": "Industrial Networks", "category": "technical", "level": "senior", "yearsOfExperience": 4, "verified": True}
        ],
        "duration": "3 months",
        "workloadPercent": 80,
        "allocationSplit": True,
        "status": "open",
        "postedBy": "emp_002",
        "postedAt": "2024-11-25",
        "applicants": 1,
        "aiMatchScore": 74
    },
    {
        "id": "lst_007",
        "title": "Fleet Dispatcher — Peak Season",
        "description": "Support BakuBus dispatch during peak hours; coordination and basic rider analytics.",
        "company": {"id": "co_007", "name": "BakuBus"},
        "companyId": "co_007",
        "department": "Operations",
        "type": "temporary-role",
        "requiredSkills": [
            {"id": "sk_052", "name": "Operations Planning", "category": "soft", "level": "mid", "yearsOfExperience": 3, "verified": True}
        ],
        "duration": "2 months",
        "workloadPercent": 50,
        "allocationSplit": True,
        "status": "open",
        "postedBy": "emp_006",
        "postedAt": "2024-11-26",
        "applicants": 2,
        "aiMatchScore": 51
    },
    {
        "id": "lst_008",
        "title": "Welding QA Inspector",
        "description": "Hull section inspection and documentation for classification compliance.",
        "company": {"id": "co_008", "name": "Bakı gəmiqayırma zavodu"},
        "companyId": "co_008",
        "department": "Quality",
        "type": "project",
        "requiredSkills": [
            {"id": "sk_053", "name": "NDT Basics", "category": "technical", "level": "mid", "yearsOfExperience": 3, "verified": True}
        ],
        "duration": "4 months",
        "workloadPercent": 100,
        "allocationSplit": False,
        "status": "open",
        "postedBy": "emp_017",
        "postedAt": "2024-11-14",
        "applicants": 0,
        "aiMatchScore": 33
    },
    {
        "id": "lst_009",
        "title": "Broadcast Engineer — Transmission",
        "description": "Regional transmission equipment maintenance and outage response.",
        "company": {"id": "co_009", "name": "Teleradio"},
        "companyId": "co_009",
        "department": "Engineering",
        "type": "permanent-role",
        "requiredSkills": [
            {"id": "sk_054", "name": "RF Systems", "category": "technical", "level": "senior", "yearsOfExperience": 5, "verified": True}
        ],
        "duration": "Long-term",
        "workloadPercent": 100,
        "allocationSplit": False,
        "status": "open",
        "postedBy": "emp_hr",
        "postedAt": "2024-11-19",
        "applicants": 4,
        "aiMatchScore": 69
    },
]

MOCK_APPLICATIONS = []

DEVELOPER_POSITION_KEYWORDS = (
    "developer",
    "engineer",
    "software",
    "frontend",
    "backend",
    "fullstack",
    "full stack",
)

DEVELOPMENT_LISTING_KEYWORDS = (
    "developer",
    "engineer",
    "frontend",
    "backend",
    "fullstack",
    "full stack",
    "api",
    "node",
    "react",
    "typescript",
    "python",
    "fastapi",
    "django",
    "flask",
    "devops",
    "docker",
    "kubernetes",
    "cloud",
    "microservice",
)

DESIGN_LISTING_KEYWORDS = (
    "designer",
    "design",
    "ui/ux",
    "ui ux",
    "ux",
    "figma",
    "prototype",
)


def _listing_search_text(listing: dict) -> str:
    skill_names = " ".join(s.get("name", "") for s in listing.get("requiredSkills", []))
    return " ".join(
        [
            str(listing.get("title", "")),
            str(listing.get("description", "")),
            str(listing.get("department", "")),
            skill_names,
        ]
    ).lower()


def _is_developer_profile(employee: dict) -> bool:
    position = str(employee.get("position", "")).lower()
    return any(k in position for k in DEVELOPER_POSITION_KEYWORDS)


def _is_design_listing(listing: dict) -> bool:
    listing_text = _listing_search_text(listing)
    return any(k in listing_text for k in DESIGN_LISTING_KEYWORDS)


def _is_development_listing(listing: dict) -> bool:
    listing_text = _listing_search_text(listing)
    has_dev_signal = any(k in listing_text for k in DEVELOPMENT_LISTING_KEYWORDS)
    return has_dev_signal and not _is_design_listing(listing)


def _calculate_match_score(employee: dict, listing: dict) -> int:
    employee_skills = {
        s.get("name", "").strip().lower()
        for s in employee.get("skills", [])
        if s.get("name")
    }
    required_skills = [
        s.get("name", "").strip().lower()
        for s in listing.get("requiredSkills", [])
        if s.get("name")
    ]

    if required_skills:
        matched = sum(1 for skill in required_skills if skill in employee_skills)
        skill_ratio = matched / len(required_skills)
    else:
        skill_ratio = 0.4

    score = 30 + int(skill_ratio * 60)

    position = str(employee.get("position", "")).lower().replace("/", " ").replace("-", " ")
    listing_text = _listing_search_text(listing)
    position_tokens = [token for token in position.split() if len(token) > 3]
    if any(token in listing_text for token in position_tokens):
        score += 10

    if _is_developer_profile(employee) and not _is_development_listing(listing):
        score -= 40
    elif _is_developer_profile(employee) and _is_development_listing(listing) and skill_ratio < 0.34:
        score -= 8

    return max(12, min(98, score))


@router.get("/applications", response_model=List[ApplicationOut])
async def get_applications(
    applicant_id: Optional[str] = None,
    status: Optional[str] = None,
):
    results = MOCK_APPLICATIONS
    if applicant_id:
        results = [a for a in results if a.get("applicantId") == applicant_id]
    if status:
        results = [a for a in results if a.get("status") == status]

    # Make sure each application has listing payload for frontend cards.
    hydrated = []
    for app in results:
        listing = app.get("listing")
        if listing is None:
            listing = next((l for l in MOCK_LISTINGS if l["id"] == app.get("listingId")), None)
        hydrated.append({**app, "listing": listing})

    return sorted(hydrated, key=lambda x: x.get("appliedAt", ""), reverse=True)

@router.get("/listings", response_model=List[ListingOut])
async def get_listings(
    type: Optional[str] = None,
    company_id: Optional[str] = None,
    min_workload: Optional[int] = None,
    search: Optional[str] = None,
    minMatch: Optional[int] = Query(None, ge=0, le=100),
    employee_id: Optional[str] = None,
):
    results = [dict(item) for item in MOCK_LISTINGS]
    if type:
        results = [l for l in results if l["type"] == type]
    if company_id:
        results = [l for l in results if l["company"]["id"] == company_id]
    if min_workload is not None:
        results = [l for l in results if l.get("workloadPercent", 0) >= min_workload]
    if search:
        search_query = search.strip().lower()
        results = [l for l in results if search_query in _listing_search_text(l)]

    employee = None
    if employee_id:
        employee = next((e for e in MOCK_EMPLOYEES if e["id"] == employee_id), None)

    if employee:
        personalized: List[dict] = []
        for listing in results:
            if _is_developer_profile(employee) and not _is_development_listing(listing):
                continue

            listing_copy = dict(listing)
            listing_copy["aiMatchScore"] = _calculate_match_score(employee, listing)
            personalized.append(listing_copy)

        results = sorted(
            personalized,
            key=lambda x: (x.get("aiMatchScore", 0), x.get("postedAt", "")),
            reverse=True,
        )

    if minMatch is not None:
        results = [l for l in results if int(l.get("aiMatchScore", 0)) >= minMatch]

    return results

@router.post("/listings", response_model=ListingOut)
async def create_listing(listing_in: ListingCreate):
    new_listing = {
        **listing_in.model_dump(),
        "id": f"lst_{len(MOCK_LISTINGS) + 1}",
        "company": {"id": listing_in.companyId, "name": "BakuBus"},
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

    existing = next(
        (
            a for a in MOCK_APPLICATIONS
            if a.get("listingId") == listing_id and a.get("applicantId") == app_in.applicantId
        ),
        None,
    )
    if existing:
        return existing
    
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

@router.get("/listings/{listing_id}/ai-analysis")
async def get_listing_ai_analysis(listing_id: str, employee_id: str):
    listing = next((l for l in MOCK_LISTINGS if l["id"] == listing_id), None)
    employee = next((e for e in MOCK_EMPLOYEES if e["id"] == employee_id), None)
    
    if not listing or not employee:
        raise HTTPException(status_code=404, detail="Listing or Employee not found")
    
    score = _calculate_match_score(employee, listing)
    skills = [s["name"] for s in employee["skills"]]
    try:
        analysis = get_ai_match_explanation(listing["title"], skills)
    except Exception:
        analysis = ""
    
    # AI-dan gələn cavabı parçalayırıq (Format: Score: [X] | Explanation: [Y])
    try:
        explanation_part = analysis.split("|")[1].replace("Explanation:", "").strip()
        return {"score": score, "explanation": explanation_part}
    except:
        required_skills = [s.get("name", "") for s in listing.get("requiredSkills", [])]
        employee_skills = {s.get("name", "") for s in employee.get("skills", [])}
        matched = [s for s in required_skills if s in employee_skills]
        if matched:
            explanation = f"Matched skills: {', '.join(matched)}. Other required skills need improvement."
        else:
            explanation = "This role is development-related but currently has low skill overlap with your profile."
        return {"score": score, "explanation": explanation}
