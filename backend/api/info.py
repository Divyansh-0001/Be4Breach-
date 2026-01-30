from fastapi import APIRouter

router = APIRouter(prefix="/api")


@router.get("/info")
def info() -> dict[str, str]:
    return {
        "name": "Be4Breach",
        "description": "Security awareness and breach readiness platform",
    }
