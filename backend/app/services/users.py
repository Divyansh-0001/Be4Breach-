from __future__ import annotations

from dataclasses import dataclass
import logging

from app.core.config import get_settings
from app.core.security import get_password_hash, verify_password

logger = logging.getLogger("be4breach.users")


@dataclass
class UserRecord:
    email: str
    hashed_password: str
    role: str
    name: str | None = None
    company: str | None = None
    auth_provider: str = "password"
    is_active: bool = True


USER_STORE: dict[str, UserRecord] = {}


def bootstrap_admin_user() -> None:
    settings = get_settings()
    if not settings.admin_email or not settings.admin_password:
        logger.warning("Admin credentials not configured. Admin login disabled.")
        return

    if settings.admin_email in USER_STORE:
        return

    USER_STORE[settings.admin_email] = UserRecord(
        email=settings.admin_email,
        hashed_password=get_password_hash(settings.admin_password),
        role="Admin",
        auth_provider="password",
    )
    logger.info("Admin user bootstrapped for %s", settings.admin_email)


def get_user_by_email(email: str) -> UserRecord | None:
    return USER_STORE.get(email.lower())


def create_user(
    email: str,
    password: str,
    role: str,
    name: str | None = None,
    company: str | None = None,
    auth_provider: str = "password",
) -> UserRecord:
    normalized = email.lower()
    record = UserRecord(
        email=normalized,
        hashed_password=get_password_hash(password),
        role=role,
        name=name,
        company=company,
        auth_provider=auth_provider,
    )
    USER_STORE[normalized] = record
    return record


def create_google_user(
    email: str,
    role: str,
    name: str | None = None,
) -> UserRecord:
    normalized = email.lower()
    record = UserRecord(
        email=normalized,
        hashed_password="",
        role=role,
        name=name,
        auth_provider="google",
    )
    USER_STORE[normalized] = record
    return record


def authenticate_user(email: str, password: str, role: str) -> UserRecord | None:
    record = get_user_by_email(email)
    if not record or record.role != role or record.auth_provider != "password":
        return None
    if not verify_password(password, record.hashed_password):
        return None
    return record
