from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime, timedelta, timezone
import logging

from jose import JWTError, jwt
from passlib.context import CryptContext

logger = logging.getLogger("be4breach.security")

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)


@dataclass(frozen=True)
class TokenData:
    subject: str
    role: str


def create_access_token(
    subject: str,
    role: str,
    secret_key: str,
    algorithm: str,
    expires_minutes: int,
) -> str:
    now = datetime.now(timezone.utc)
    payload = {
        "sub": subject,
        "role": role,
        "iat": int(now.timestamp()),
        "exp": int((now + timedelta(minutes=expires_minutes)).timestamp()),
    }
    return jwt.encode(payload, secret_key, algorithm=algorithm)


def decode_access_token(token: str, secret_key: str, algorithm: str) -> TokenData:
    try:
        payload = jwt.decode(token, secret_key, algorithms=[algorithm])
    except JWTError as exc:
        logger.info("Token decode failed: %s", exc)
        raise

    subject = payload.get("sub")
    role = payload.get("role")
    if not subject or not role:
        raise JWTError("Token missing required claims.")
    return TokenData(subject=subject, role=role)
