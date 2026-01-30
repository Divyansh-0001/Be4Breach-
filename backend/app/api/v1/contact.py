from __future__ import annotations

import logging

from fastapi import APIRouter, status
from pydantic import BaseModel, EmailStr, Field

logger = logging.getLogger("be4breach.contact")

router = APIRouter(prefix="/contact", tags=["contact"])


class RequestModel(BaseModel):
    class Config:
        anystr_strip_whitespace = True


class ContactRequest(RequestModel):
    name: str = Field(min_length=2, max_length=100)
    email: EmailStr
    company: str | None = Field(default=None, max_length=120)
    message: str = Field(min_length=10, max_length=2000)


@router.post("", status_code=status.HTTP_202_ACCEPTED)
def submit_contact(payload: ContactRequest) -> dict[str, str]:
    logger.info(
        "Contact submission from %s (%s).", payload.name, payload.email
    )
    return {"status": "received", "message": "Contact request received."}
