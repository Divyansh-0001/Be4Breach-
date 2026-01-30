# Be4Breach — Full Stack Cybersecurity Platform

Be4Breach is a professional cybersecurity platform with a modern Next.js
frontend and a FastAPI backend. The project includes role-based authentication,
Google SSO, JWT-secured APIs, and responsive SaaS-style UI ready for deployment.

## Tech Stack

- **Frontend:** Next.js (Node.js >= 20), Tailwind CSS, Framer Motion
- **Backend:** FastAPI (Python 3.11+), JWT auth, Google SSO

## Project Structure

```
/frontend  -> Next.js frontend (Vercel-ready)
/backend   -> FastAPI backend (Render/Heroku-ready)
```

## Environment Variables

Copy the template and update values:

```bash
cp .env.example .env
```

### Frontend

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
NEXT_PUBLIC_GOOGLE_CLIENT_ID=
```

### Backend

```
APP_NAME=Be4Breach API
ENVIRONMENT=development
CORS_ORIGINS=http://localhost:3000
ALLOWED_HOSTS=localhost,127.0.0.1
HTTPS_REDIRECT=false

JWT_SECRET_KEY=change-me
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REDIRECT_URI=http://localhost:3000/login

ADMIN_EMAIL=
ADMIN_PASSWORD=
ADMIN_ALLOWED_EMAILS=
ADMIN_ALLOWED_DOMAINS=
```

## Local Development

### Backend (FastAPI)

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend (Next.js)

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:3000` and connects to the backend at
`http://localhost:8000`.

## Core Features

- JWT authentication (User & Admin roles)
- Google SSO login
- Role-based dashboards (`/dashboard/user`, `/dashboard/admin`)
- Contact form integration
- Security headers, input validation, and CORS protection

## Deployment

### Frontend (Vercel)

1. Deploy the **/frontend** folder as a Vercel project.
2. Set environment variables:
   - `NEXT_PUBLIC_API_BASE_URL`
   - `NEXT_PUBLIC_GOOGLE_CLIENT_ID`
3. Build command: `npm run build`
4. Output directory: default (Next.js managed)

### Backend (Render / Heroku)

1. Deploy the **/backend** folder as a Python service.
2. Set environment variables from `.env.example`.
3. Recommended start command:

```bash
uvicorn app.main:app --host 0.0.0.0 --port $PORT --proxy-headers
```

4. In production, set:
   - `HTTPS_REDIRECT=true`
   - `ALLOWED_HOSTS=your-domain.com`
   - Strong `JWT_SECRET_KEY`

## Security Best Practices (Built In)

- HTTPS redirect in production
- Trusted host enforcement
- CORS allowlist
- Input validation & trimming
- Secure JWT issuance with expiration
- Safety headers (HSTS, CSP, X-Frame-Options, etc.)

---

© 2026 Be4Breach. All rights reserved.
