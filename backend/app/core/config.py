from __future__ import annotations

from dataclasses import dataclass
from functools import lru_cache
import os


def _parse_cors_origins(raw_origins: str) -> list[str]:
    return [origin.strip() for origin in raw_origins.split(",") if origin.strip()]


@dataclass(frozen=True)
class Settings:
    app_name: str
    environment: str
    cors_origins: list[str]


@lru_cache(maxsize=1)
def get_settings() -> Settings:
    return Settings(
        app_name=os.getenv("APP_NAME", "Be4Breach API"),
        environment=os.getenv("ENVIRONMENT", "development"),
        cors_origins=_parse_cors_origins(
            os.getenv("CORS_ORIGINS", "http://localhost:3000")
        ),
    )
