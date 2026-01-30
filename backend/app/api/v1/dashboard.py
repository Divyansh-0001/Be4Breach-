from __future__ import annotations

from fastapi import APIRouter, Depends

from app.api.deps import require_role

router = APIRouter(tags=["dashboard"])


@router.get("/user/dashboard")
@router.get("/dashboard/user")
def user_dashboard(_user=Depends(require_role("User"))) -> dict[str, str]:
    return {
        "message": "User dashboard data is ready for integration.",
        "status": "pending",
    }


@router.get("/admin/dashboard")
@router.get("/dashboard/admin")
def admin_dashboard(_user=Depends(require_role("Admin"))) -> dict[str, str]:
    return {
        "message": "Admin dashboard insights are ready for integration.",
        "status": "pending",
    }


@router.get("/dashboard/user/summary")
def user_dashboard_summary(
    _user=Depends(require_role("User")),
) -> dict[str, int | str]:
    return {
        "alerts": 0,
        "complianceScore": 0,
        "monitoringStatus": "Standby",
    }


@router.get("/dashboard/admin/summary")
def admin_dashboard_summary(
    _user=Depends(require_role("Admin")),
) -> dict[str, int]:
    return {
        "incidents": 0,
        "complianceScore": 0,
        "activeClients": 0,
    }
