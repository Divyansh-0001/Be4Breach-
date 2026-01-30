import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api import api_router


def _parse_cors_origins() -> list[str]:
    raw_origins = os.getenv("CORS_ORIGINS", "")
    if not raw_origins:
        return ["http://localhost:3000", "http://127.0.0.1:3000"]
    return [origin.strip() for origin in raw_origins.split(",") if origin.strip()]


def create_app() -> FastAPI:
    app = FastAPI(title="Be4Breach API")
    app.add_middleware(
        CORSMiddleware,
        allow_origins=_parse_cors_origins(),
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    app.include_router(api_router)
    return app


app = create_app()
