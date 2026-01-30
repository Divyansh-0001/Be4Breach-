import os
from datetime import datetime, timedelta, timezone
from typing import Iterable, Optional

import bcrypt
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jose import JWTError, jwt

from backend.schemas.auth import TokenPayload

ROLE_ADMIN = "admin"
ROLE_USER = "user"

auth_scheme = HTTPBearer(auto_error=False)


def _jwt_secret() -> str:
    secret = os.getenv("JWT_SECRET_KEY")
    if not secret:
        raise RuntimeError("JWT_SECRET_KEY is not configured")
    return secret


def _jwt_algorithm() -> str:
    return os.getenv("JWT_ALGORITHM", "HS256")


def _jwt_exp_minutes() -> int:
    return int(os.getenv("JWT_EXPIRE_MINUTES", "60"))


def hash_password(password: str) -> str:
    hashed = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())
    return hashed.decode("utf-8")


def verify_password(password: str, password_hash: str) -> bool:
    return bcrypt.checkpw(
        password.encode("utf-8"), password_hash.encode("utf-8")
    )


def create_access_token(subject: str, role: str) -> str:
    expire = datetime.now(timezone.utc) + timedelta(minutes=_jwt_exp_minutes())
    payload = {"sub": subject, "role": role, "exp": expire}
    return jwt.encode(payload, _jwt_secret(), algorithm=_jwt_algorithm())


def _unauthorized(detail: str) -> HTTPException:
    return HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail=detail,
        headers={"WWW-Authenticate": "Bearer"},
    )


def decode_access_token(token: str) -> TokenPayload:
    try:
        payload = jwt.decode(token, _jwt_secret(), algorithms=[_jwt_algorithm()])
        subject = payload.get("sub")
        role = payload.get("role")
        if not subject or not role:
            raise _unauthorized("Invalid authentication token")
        return TokenPayload(sub=subject, role=role)
    except JWTError as exc:
        raise _unauthorized("Invalid authentication token") from exc
    except RuntimeError as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(exc),
        ) from exc


def get_current_user(
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(auth_scheme),
) -> TokenPayload:
    if credentials is None:
        raise _unauthorized("Authorization header missing")
    return decode_access_token(credentials.credentials)


def require_role(required_role: str):
    role_label = "Admin" if required_role == ROLE_ADMIN else "User"

    def dependency(user: TokenPayload = Depends(get_current_user)) -> TokenPayload:
        if user.role != required_role:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"{role_label} access required",
            )
        return user

    return dependency


def require_any_role(allowed_roles: Iterable[str]):
    def dependency(user: TokenPayload = Depends(get_current_user)) -> TokenPayload:
        if user.role not in allowed_roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Insufficient permissions",
            )
        return user

    return dependency
