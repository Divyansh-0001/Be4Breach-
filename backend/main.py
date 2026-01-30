import os

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware

from backend.api.auth import router as auth_router
from backend.api.routes import router as routes_router
from backend.api.secure_routes import admin_router, user_router

load_dotenv()

app = FastAPI(title="Be4Breach API")

origins_env = os.getenv("CORS_ALLOW_ORIGINS", "http://localhost:3000")
origins = [origin.strip() for origin in origins_env.split(",") if origin.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["Authorization", "Content-Type"],
)
app.add_middleware(
    SessionMiddleware,
    secret_key=os.getenv("SESSION_SECRET", "dev-session-secret"),
)


@app.get("/health")
def health_check() -> dict:
    return {"status": "ok"}


app.include_router(auth_router, tags=["auth"])
app.include_router(routes_router, tags=["content"])
app.include_router(admin_router, tags=["admin"])
app.include_router(user_router, tags=["user"])
