from fastapi import APIRouter

from api.health import router as health_router
from api.info import router as info_router

api_router = APIRouter()
api_router.include_router(health_router)
api_router.include_router(info_router)
