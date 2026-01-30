import os

from fastapi import APIRouter, HTTPException, Request

from utils.google_oauth import build_google_oauth

router = APIRouter()


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
        raise HTTPException(status_code=400, detail="Google OAuth failed") from exc
    return {"user": user_info, "token": token}
