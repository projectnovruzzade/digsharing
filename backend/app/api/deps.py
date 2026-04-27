"""Shared FastAPI dependencies (demo auth from bearer token)."""

from typing import Any, Optional

from fastapi import Header

from app.api.v1.endpoints.auth import DEMO_USERS


def get_optional_demo_user(
    authorization: Optional[str] = Header(None),
) -> Optional[dict[str, Any]]:
    if not authorization or not authorization.startswith("Bearer "):
        return None
    token = authorization.split(" ", 1)[1].strip()
    if not token or token not in DEMO_USERS:
        return None
    return DEMO_USERS[token]
