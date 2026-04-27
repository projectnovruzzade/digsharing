"""Full company objects for API responses (aligned with frontend holding)."""

from typing import Any

HOLDING_COMPANIES: dict[str, dict[str, Any]] = {
    "co_001": {
        "id": "co_001",
        "name": "Azİntelecom",
        "industry": "Information Technology",
        "employeeCount": 1500,
        "holdingId": "holding_001",
    },
    "co_002": {
        "id": "co_002",
        "name": "ADY",
        "industry": "Transportation",
        "employeeCount": 2000,
        "holdingId": "holding_001",
    },
    "co_003": {
        "id": "co_003",
        "name": "AZAL",
        "industry": "Aviation",
        "employeeCount": 300,
        "holdingId": "holding_001",
    },
    "co_004": {
        "id": "co_004",
        "name": "Aztelekom",
        "industry": "Telecommunications",
        "employeeCount": 800,
        "holdingId": "holding_001",
    },
    "co_005": {
        "id": "co_005",
        "name": "Azercosmos",
        "industry": "Space",
        "employeeCount": 400,
        "holdingId": "holding_001",
    },
    "co_006": {
        "id": "co_006",
        "name": "Metro",
        "industry": "Urban Rail Transport",
        "employeeCount": 1200,
        "holdingId": "holding_001",
    },
    "co_007": {
        "id": "co_007",
        "name": "BakuBus",
        "industry": "Public Transportation",
        "employeeCount": 50,
        "holdingId": "holding_001",
    },
    "co_008": {
        "id": "co_008",
        "name": "Bakı gəmiqayırma zavodu",
        "industry": "Shipbuilding",
        "employeeCount": 2500,
        "holdingId": "holding_001",
    },
    "co_009": {
        "id": "co_009",
        "name": "Teleradio",
        "industry": "Broadcasting",
        "employeeCount": 600,
        "holdingId": "holding_001",
    },
}


def company_full(company_ref: dict[str, Any]) -> dict[str, Any]:
    cid = company_ref.get("id", "")
    base = HOLDING_COMPANIES.get(cid, {})
    return {**base, **company_ref}
