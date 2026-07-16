# Portfolio

Vue 3 (Vite) frontend + Node/Express backend (contact form), bilingual FR/EN.

```
frontend/   Vue 3 SPA (Vite, vue-i18n)
backend/    Express API — sends contact-form emails via SMTP
docker-compose.yml
```

## Local dev (without Docker)

```bash
# Backend
cd backend
cp .env.example .env   # then fill in real SMTP credentials
npm install
npm run dev             # http://localhost:3001

# Frontend (separate terminal)
cd frontend
npm install
npm run dev              # http://localhost:5173
```

## Run everything with Docker

```bash
cd backend
cp .env.example .env   # fill in real SMTP credentials

cd ..
docker compose up --build
```

- Frontend: http://localhost:8080
- Backend: http://localhost:3001

