from __future__ import annotations

from dataclasses import dataclass
from functools import lru_cache
import os


def _parse_csv(value: str | None) -> list[str]:
    if not value:
        return []
    return [item.strip() for item in value.split(",") if item.strip()]


def _get_int(value: str | None, default: int) -> int:
    try:
        return int(value) if value is not None else default
    except ValueError:
        return default


def _get_bool(value: str | None, default: bool) -> bool:
    if value is None:
        return default
    return value.strip().lower() in {"1", "true", "yes", "on"}


@dataclass(frozen=True)
class Settings:
    app_name: str
    environment: str
    cors_origins: list[str]
    allowed_hosts: list[str]
    https_redirect: bool
    jwt_secret_key: str
    jwt_algorithm: str
    access_token_expire_minutes: int
    google_client_id: str | None
    google_client_secret: str | None
    google_redirect_uri: str | None
    admin_email: str | None
    admin_password: str | None
    admin_allowed_emails: list[str]
    admin_allowed_domains: list[str]


@lru_cache(maxsize=1)
def get_settings() -> Settings:
    return Settings(
        app_name=os.getenv("APP_NAME", "Be4Breach API"),
        environment=os.getenv("ENVIRONMENT", "development"),
        cors_origins=_parse_csv(os.getenv("CORS_ORIGINS", "http://localhost:3000")),
        allowed_hosts=_parse_csv(os.getenv("ALLOWED_HOSTS", "localhost,127.0.0.1")),
        https_redirect=_get_bool(os.getenv("HTTPS_REDIRECT"), False),
        jwt_secret_key=os.getenv("JWT_SECRET_KEY", "change-me"),
        jwt_algorithm=os.getenv("JWT_ALGORITHM", "HS256"),
        access_token_expire_minutes=_get_int(
            os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES"), 60
        ),
        google_client_id=os.getenv("GOOGLE_CLIENT_ID"),
        google_client_secret=os.getenv("GOOGLE_CLIENT_SECRET"),
        google_redirect_uri=os.getenv("GOOGLE_REDIRECT_URI"),
        admin_email=os.getenv("ADMIN_EMAIL"),
        admin_password=os.getenv("ADMIN_PASSWORD"),
        admin_allowed_emails=_parse_csv(os.getenv("ADMIN_ALLOWED_EMAILS")),
        admin_allowed_domains=_parse_csv(os.getenv("ADMIN_ALLOWED_DOMAINS")),
    )
