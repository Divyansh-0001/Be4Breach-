import os
from datetime import datetime, timedelta, timezone

from jose import JWTError, jwt


def _get_jwt_secret() -> str:
    secret = os.getenv("JWT_SECRET")
    if not secret:
        raise RuntimeError("JWT_SECRET is not configured")
    return secret


def _get_jwt_algorithm() -> str:
    return os.getenv("JWT_ALGORITHM", "HS256")


def _get_access_token_expiry_minutes() -> int:
    raw_value = os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "60")
    try:
        return int(raw_value)
    except ValueError:
        return 60


def create_access_token(subject: str, role: str) -> str:
    expire = datetime.now(timezone.utc) + timedelta(
        minutes=_get_access_token_expiry_minutes()
    )
    payload = {"sub": subject, "role": role, "exp": expire}
    return jwt.encode(payload, _get_jwt_secret(), algorithm=_get_jwt_algorithm())


def decode_access_token(token: str) -> dict[str, str]:
    try:
        payload = jwt.decode(token, _get_jwt_secret(), algorithms=[_get_jwt_algorithm()])
    except JWTError as exc:
        raise ValueError("Invalid token") from exc
    subject = payload.get("sub")
    role = payload.get("role")
    if not subject or not role:
        raise ValueError("Invalid token")
    return {"subject": str(subject), "role": str(role)}
