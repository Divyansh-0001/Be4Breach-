import os
from typing import Dict

from fastapi import APIRouter, HTTPException, Request, status

from backend.schemas.auth import LoginRequest, SSOLoginRequest, TokenResponse
from backend.utils.google_oauth import build_google_oauth, verify_google_id_token
from backend.utils.security import (
    ROLE_ADMIN,
    ROLE_USER,
    create_access_token,
    hash_password,
    verify_password,
)

router = APIRouter()


def _build_account_store(
    email_env: str,
    password_env: str,
    password_hash_env: str,
    default_email: str,
    default_password: str,
) -> Dict[str, Dict[str, str]]:
    email = os.getenv(email_env, default_email).strip().lower()
    password_hash = os.getenv(password_hash_env)
    if not password_hash:
        password = os.getenv(password_env, default_password)
        password_hash = hash_password(password)
    return {email: {"email": email, "password_hash": password_hash}}


USER_STORE = _build_account_store(
    "DEFAULT_USER_EMAIL",
    "DEFAULT_USER_PASSWORD",
    "DEFAULT_USER_PASSWORD_HASH",
    "user@be4breach.com",
    "UserPass123!",
)
ADMIN_STORE = _build_account_store(
    "DEFAULT_ADMIN_EMAIL",
    "DEFAULT_ADMIN_PASSWORD",
    "DEFAULT_ADMIN_PASSWORD_HASH",
    "admin@be4breach.com",
    "AdminPass123!",
)


def _authenticate(
    login: LoginRequest, account_store: Dict[str, Dict[str, str]]
) -> Dict[str, str]:
    account = account_store.get(login.email.strip().lower())
    if not account or not verify_password(login.password, account["password_hash"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return account


@router.post("/login/user", response_model=TokenResponse)
def login_user(payload: LoginRequest) -> TokenResponse:
    account = _authenticate(payload, USER_STORE)
    token = create_access_token(account["email"], ROLE_USER)
    return TokenResponse(access_token=token, role=ROLE_USER)


@router.post("/login/admin", response_model=TokenResponse)
def login_admin(payload: LoginRequest) -> TokenResponse:
    account = _authenticate(payload, ADMIN_STORE)
    token = create_access_token(account["email"], ROLE_ADMIN)
    return TokenResponse(access_token=token, role=ROLE_ADMIN)


@router.post("/login/sso", response_model=TokenResponse)
async def login_sso(payload: SSOLoginRequest) -> TokenResponse:
    user_info = await verify_google_id_token(payload.id_token)
    subject = user_info.get("email") or user_info.get("sub")
    if not subject:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Google token missing subject",
        )
    token = create_access_token(subject, ROLE_USER)
    return TokenResponse(access_token=token, role=ROLE_USER)


@router.get("/google/login")
async def google_login(request: Request):
    oauth = build_google_oauth()
    redirect_uri = os.getenv("GOOGLE_REDIRECT_URI") or str(
        request.url_for("google_callback")
    )
    return await oauth.google.authorize_redirect(request, redirect_uri)


@router.get("/google/callback", name="google_callback")
async def google_callback(request: Request):
    oauth = build_google_oauth()
    try:
        token = await oauth.google.authorize_access_token(request)
        user_info = await oauth.google.parse_id_token(request, token)
    except Exception as exc:  # pragma: no cover - surface OAuth errors
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Google OAuth failed",
        ) from exc
    return {"user": user_info, "token": token}
