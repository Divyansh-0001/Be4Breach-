from typing import List

from fastapi import APIRouter, Depends

from backend.schemas.auth import TokenPayload
from backend.schemas.common import MessageResponse, ServiceItem
from backend.utils.security import ROLE_ADMIN, ROLE_USER, require_role

router = APIRouter()

SERVICES: List[ServiceItem] = [
    ServiceItem(
        id="phishing-sim",
        name="Phishing Simulations",
        description="Run simulations to assess employee readiness.",
    ),
    ServiceItem(
        id="training",
        name="Security Training",
        description="Interactive security awareness training modules.",
    ),
    ServiceItem(
        id="reporting",
        name="Incident Reporting",
        description="Centralized reporting for security incidents.",
    ),
]


@router.get("/services", response_model=List[ServiceItem])
def get_services(_: TokenPayload = Depends(require_role(ROLE_USER))):
    return SERVICES


@router.get("/about", response_model=MessageResponse)
def get_about():
    return MessageResponse(
        message="Be4Breach helps teams build stronger security awareness."
    )


@router.get("/contact", response_model=MessageResponse)
def get_contact(_: TokenPayload = Depends(require_role(ROLE_ADMIN))):
    return MessageResponse(
        message="Admin contact: security-ops@be4breach.example"
    )
