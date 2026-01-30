from fastapi import APIRouter, Depends

from backend.schemas.auth import TokenPayload
from backend.schemas.dashboard import DashboardSummary
from backend.schemas.common import MessageResponse, ServiceItem
from backend.utils.security import ROLE_ADMIN, ROLE_USER, require_role

admin_router = APIRouter(prefix="/admin")
user_router = APIRouter(prefix="/user")

ADMIN_HIGHLIGHTS = [
    "CERT-IN empanelled with trusted compliance delivery.",
    "50+ global clients across 20+ countries.",
    "CoE & SOC monitoring labs operational since 2023.",
]

USER_HIGHLIGHTS = [
    "Access proactive security awareness training.",
    "Monitor vulnerability and risk assessments.",
    "Engage with vCISO and incident readiness playbooks.",
]

USER_SERVICES = [
    ServiceItem(
        id="awareness",
        name="Security Awareness Training",
        description="Continuous education and phishing simulations.",
    ),
    ServiceItem(
        id="risk",
        name="Risk Assessment",
        description="Actionable reporting aligned to global frameworks.",
    ),
    ServiceItem(
        id="monitoring",
        name="SOC Monitoring",
        description="24/7 threat detection and response coverage.",
    ),
]


@admin_router.get("/dashboard", response_model=DashboardSummary)
def admin_dashboard(
    user: TokenPayload = Depends(require_role(ROLE_ADMIN)),
):
    return DashboardSummary(
        role=ROLE_ADMIN,
        welcome=f"Welcome back, {user.sub}.",
        highlights=ADMIN_HIGHLIGHTS,
    )


@admin_router.get("/alerts", response_model=MessageResponse)
def admin_alerts(
    _: TokenPayload = Depends(require_role(ROLE_ADMIN)),
):
    return MessageResponse(
        message="No critical alerts. Systems are operating within baseline."
    )


@user_router.get("/dashboard", response_model=DashboardSummary)
def user_dashboard(
    user: TokenPayload = Depends(require_role(ROLE_USER)),
):
    return DashboardSummary(
        role=ROLE_USER,
        welcome=f"Welcome back, {user.sub}.",
        highlights=USER_HIGHLIGHTS,
    )


@user_router.get("/services", response_model=list[ServiceItem])
def user_services(
    _: TokenPayload = Depends(require_role(ROLE_USER)),
):
    return USER_SERVICES
