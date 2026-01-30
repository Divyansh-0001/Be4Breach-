# Be4Breach

Be4Breach is a cybersecurity platform focused on predictive defense, trusted
outcomes, and end-to-end security services. This repo contains a Next.js
frontend and a FastAPI backend with role-based access control.

## Tech Stack

- Frontend: Next.js (TypeScript), Tailwind CSS, Framer Motion
- Backend: FastAPI, JWT auth, Google SSO, Uvicorn

## Getting Started

### Prerequisites

- Node.js 20+
- Python 3.12+

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Optional environment variables:

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

### Backend

Run from the repository root so the `backend` package resolves correctly:

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r backend/requirements.txt
uvicorn backend.main:app --host 0.0.0.0 --port 8000 --reload
```

Required environment variables:

```
JWT_SECRET_KEY=replace-with-a-secure-secret
SESSION_SECRET=replace-with-a-secure-secret
```

Optional environment variables:

```
JWT_ALGORITHM=HS256
JWT_EXPIRE_MINUTES=60
CORS_ALLOW_ORIGINS=http://localhost:3000

GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_REDIRECT_URI=http://localhost:8000/google/callback

DEFAULT_USER_EMAIL=user@be4breach.com
DEFAULT_USER_PASSWORD=UserPass123!
DEFAULT_ADMIN_EMAIL=admin@be4breach.com
DEFAULT_ADMIN_PASSWORD=AdminPass123!
```

## API Highlights

- `POST /login/user` - User login (JWT)
- `POST /login/admin` - Admin login (JWT)
- `POST /login/sso` - Google SSO login (JWT)
- `GET /admin/*` - Admin-only routes
- `GET /user/*` - User-only routes

## Notes

- Use HTTPS in production and store tokens securely.
- Update CORS origins for your deployed frontend domain.
