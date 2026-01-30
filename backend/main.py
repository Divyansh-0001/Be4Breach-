import os

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware

from backend.api.auth import router as auth_router

load_dotenv()

app = FastAPI(title="Be4Breach API")

origins_env = os.getenv("CORS_ORIGINS", "*")
origins = [origin.strip() for origin in origins_env.split(",") if origin.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins or ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.add_middleware(
    SessionMiddleware,
    secret_key=os.getenv("SESSION_SECRET", "change-me-in-production"),
)


@app.get("/health")
def health_check() -> dict:
    return {"status": "ok"}


app.include_router(auth_router, prefix="/auth", tags=["auth"])
