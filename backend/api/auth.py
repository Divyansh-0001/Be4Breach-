import os
import secrets
from typing import Literal

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from google.auth.transport import requests
from google.oauth2 import id_token
from pydantic import BaseModel

from core.security import create_access_token, decode_access_token

router = APIRouter()
security = HTTPBearer(auto_error=False)


class LoginRequest(BaseModel):
    username: str
    password: str


class GoogleLoginRequest(BaseModel):
    credential: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str
    role: Literal["user", "admin"]
    username: str


class UserResponse(BaseModel):
    username: str
    role: Literal["user", "admin"]
    token: str


class _ConfiguredUser(BaseModel):
    username: str
    password: str
    role: Literal["user", "admin"]


def _load_configured_users() -> list[_ConfiguredUser]:
    admin_username = os.getenv("BE4BREACH_ADMIN_USERNAME")
    admin_password = os.getenv("BE4BREACH_ADMIN_PASSWORD")
    user_username = os.getenv("BE4BREACH_USER_USERNAME")
    user_password = os.getenv("BE4BREACH_USER_PASSWORD")

    users: list[_ConfiguredUser] = []
    if admin_username and admin_password:
        users.append(
            _ConfiguredUser(
                username=admin_username, password=admin_password, role="admin"
            )
        )
    if user_username and user_password:
        users.append(
            _ConfiguredUser(username=user_username, password=user_password, role="user")
        )

    return users


def _authenticate_user(username: str, password: str) -> _ConfiguredUser:
    users = _load_configured_users()
    if not users:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Login credentials are not configured.",
        )

    for user in users:
        if secrets.compare_digest(user.username, username) and secrets.compare_digest(
            user.password, password
        ):
            return user

    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid username or password.",
    )


def _get_google_admins() -> set[str]:
    raw = os.getenv("GOOGLE_ADMIN_EMAILS", "")
    return {email.strip().lower() for email in raw.split(",") if email.strip()}


def _verify_google_credential(credential: str) -> dict[str, str]:
    client_id = os.getenv("GOOGLE_CLIENT_ID")
    if not client_id:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Google SSO is not configured.",
        )
    try:
        token_info = id_token.verify_oauth2_token(
            credential, requests.Request(), client_id
        )
    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid Google credential.",
        ) from exc

    email = token_info.get("email")
    if not email:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Google credential did not include an email.",
        )

    return {"email": str(email), "name": str(token_info.get("name", email))}


def _build_token_response(username: str, role: Literal["user", "admin"]) -> TokenResponse:
    try:
        token = create_access_token(username, role)
    except RuntimeError as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="JWT secret is not configured.",
        ) from exc
    return TokenResponse(
        access_token=token, token_type="bearer", role=role, username=username
    )


def _get_current_user(
    credentials: HTTPAuthorizationCredentials | None = Depends(security),
) -> UserResponse:
    if not credentials:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Missing credentials."
        )
    token = credentials.credentials
    try:
        payload = decode_access_token(token)
    except (ValueError, RuntimeError) as exc:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token."
        ) from exc
    return UserResponse(username=payload["subject"], role=payload["role"], token=token)


@router.post("/login", response_model=TokenResponse)
def login(payload: LoginRequest) -> TokenResponse:
    user = _authenticate_user(payload.username, payload.password)
    return _build_token_response(user.username, user.role)


@router.get("/me", response_model=UserResponse)
def me(current_user: UserResponse = Depends(_get_current_user)) -> UserResponse:
    return current_user


@router.post("/auth/google", response_model=TokenResponse)
def google_login(payload: GoogleLoginRequest) -> TokenResponse:
    profile = _verify_google_credential(payload.credential)
    email = profile["email"].lower()
    role: Literal["user", "admin"] = (
        "admin" if email in _get_google_admins() else "user"
    )
    return _build_token_response(email, role)
