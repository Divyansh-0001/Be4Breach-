# Be4Breach

Production-ready starter repo for the Be4Breach website with a clear
frontend/backend split.

## Project structure

- `frontend/` - Next.js (App Router) with Tailwind CSS and Framer Motion
- `backend/` - FastAPI service with a health endpoint
- `shared/` - (optional) shared types or configs

## Requirements

- Node.js `>= 20` (see `.nvmrc`)
- Python 3.10+ recommended

## Frontend (Next.js)

```bash
cd frontend
npm install
npm run dev
```

## Backend (FastAPI)

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Health check:

```
GET http://localhost:8000/health
```
