from __future__ import annotations

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError

from app.core.config import get_settings
from app.core.security import decode_access_token
from app.services.users import get_user_by_email

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/login")


class AuthContext:
    def __init__(self, email: str, role: str):
        self.email = email
        self.role = role


def get_current_user(token: str = Depends(oauth2_scheme)) -> AuthContext:
    settings = get_settings()
    try:
        token_data = decode_access_token(
            token, settings.jwt_secret_key, settings.jwt_algorithm
        )
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired authentication token.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    user = get_user_by_email(token_data.subject)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User account is inactive.",
        )

    return AuthContext(email=user.email, role=user.role)


def require_role(role: str):
    def _role_guard(user: AuthContext = Depends(get_current_user)) -> AuthContext:
        if user.role != role:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You do not have permission to access this resource.",
            )
        return user

    return _role_guard
