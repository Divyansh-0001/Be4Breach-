from __future__ import annotations

from typing import Literal
import logging

import httpx
from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, EmailStr, Field

from app.core.config import get_settings
from app.core.security import create_access_token
from app.services.users import (
    authenticate_user,
    create_google_user,
    create_user,
    get_user_by_email,
)

logger = logging.getLogger("be4breach.auth")

router = APIRouter(prefix="/auth", tags=["auth"])

AuthRole = Literal["User", "Admin"]


class AuthUser(BaseModel):
    email: EmailStr
    name: str | None = None
    role: AuthRole


class AuthResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    role: AuthRole
    user: AuthUser


class RequestModel(BaseModel):
    class Config:
        anystr_strip_whitespace = True


class RegisterRequest(RequestModel):
    name: str = Field(min_length=2, max_length=100)
    email: EmailStr
    password: str = Field(min_length=8, max_length=128)
    company: str | None = Field(default=None, max_length=120)


class LoginRequest(RequestModel):
    email: EmailStr
    password: str = Field(min_length=8, max_length=128)


class GoogleLoginRequest(RequestModel):
    id_token: str = Field(min_length=10)
    role: AuthRole = "User"


def _build_auth_response(email: str, role: AuthRole, name: str | None) -> AuthResponse:
    settings = get_settings()
    token = create_access_token(
        subject=email,
        role=role,
        secret_key=settings.jwt_secret_key,
        algorithm=settings.jwt_algorithm,
        expires_minutes=settings.access_token_expire_minutes,
    )
    return AuthResponse(
        access_token=token,
        role=role,
        user=AuthUser(email=email, name=name, role=role),
    )


def _is_admin_email_allowed(email: str) -> bool:
    settings = get_settings()
    normalized = email.lower()
    if settings.admin_allowed_emails and normalized in {
        value.lower() for value in settings.admin_allowed_emails
    }:
        return True
    if settings.admin_allowed_domains:
        domain = normalized.split("@")[-1]
        return domain in {value.lower() for value in settings.admin_allowed_domains}
    return not settings.admin_allowed_emails and not settings.admin_allowed_domains


@router.post("/register", response_model=AuthResponse)
def register_user(payload: RegisterRequest) -> AuthResponse:
    existing = get_user_by_email(payload.email)
    if existing:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="An account with this email already exists.",
        )

    user = create_user(
        email=payload.email,
        password=payload.password,
        role="User",
        name=payload.name,
        company=payload.company,
    )
    logger.info("New user registered: %s", user.email)
    return _build_auth_response(user.email, user.role, user.name)


@router.post("/login", response_model=AuthResponse)
def login_user(payload: LoginRequest) -> AuthResponse:
    user = authenticate_user(payload.email, payload.password, role="User")
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials or role.",
        )

    return _build_auth_response(user.email, user.role, user.name)


@router.post("/admin/login", response_model=AuthResponse)
def login_admin(payload: LoginRequest) -> AuthResponse:
    user = authenticate_user(payload.email, payload.password, role="Admin")
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials or role.",
        )

    return _build_auth_response(user.email, user.role, user.name)


@router.get("/google/url")
def get_google_oauth_url(role: AuthRole = "User") -> dict[str, str]:
    settings = get_settings()
    if not settings.google_client_id or not settings.google_redirect_uri:
        raise HTTPException(
            status_code=status.HTTP_501_NOT_IMPLEMENTED,
            detail="Google SSO is not configured.",
        )

    base_url = "https://accounts.google.com/o/oauth2/v2/auth"
    params = {
        "client_id": settings.google_client_id,
        "redirect_uri": settings.google_redirect_uri,
        "response_type": "code",
        "scope": "openid email profile",
        "access_type": "offline",
        "prompt": "consent",
        "state": role,
    }
    query = httpx.QueryParams(params)
    return {"url": f"{base_url}?{query}"}


@router.post("/google", response_model=AuthResponse)
async def login_google(payload: GoogleLoginRequest) -> AuthResponse:
    settings = get_settings()
    async with httpx.AsyncClient(timeout=8.0) as client:
        response = await client.get(
            "https://oauth2.googleapis.com/tokeninfo",
            params={"id_token": payload.id_token},
        )

    if response.status_code != 200:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Unable to verify Google identity token.",
        )

    token_info = response.json()
    email = token_info.get("email")
    email_verified = token_info.get("email_verified")
    audience = token_info.get("aud")
    name = token_info.get("name") or token_info.get("given_name")

    if not email or not email_verified:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Google account email is not verified.",
        )

    if settings.google_client_id and audience != settings.google_client_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Google token audience mismatch.",
        )

    if payload.role == "Admin" and not _is_admin_email_allowed(email):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access requires allowlist approval.",
        )

    user = get_user_by_email(email)
    if not user:
        user = create_google_user(email=email, role=payload.role, name=name)
        logger.info("Google SSO user created: %s", user.email)
    elif user.role != payload.role:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Role mismatch for existing user account.",
        )

    return _build_auth_response(user.email, user.role, user.name)
