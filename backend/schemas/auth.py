from pydantic import BaseModel, Field


class LoginRequest(BaseModel):
    email: str = Field(..., min_length=3, max_length=255)
    password: str = Field(..., min_length=8, max_length=72)


class SSOLoginRequest(BaseModel):
    id_token: str = Field(..., min_length=10)


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    role: str


class TokenPayload(BaseModel):
    sub: str
    role: str
