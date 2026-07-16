# Portfolio — Lucien Kalmogo

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

Stop everything: `docker compose down`

## Docker cheat sheet (since we're learning it together)

| Command | What it does |
|---|---|
| `docker compose up --build` | Build images from the Dockerfiles and start both containers |
| `docker compose up -d` | Same, but detached (runs in the background) |
| `docker compose down` | Stop and remove the containers (images stay cached) |
| `docker compose ps` | List running containers for this project |
| `docker compose logs -f backend` | Stream logs from one service |
| `docker compose exec backend sh` | Open a shell inside the running backend container |
| `docker images` | List all images built/pulled on this machine |
| `docker compose build --no-cache` | Force a full rebuild, ignoring layer cache |

Key ideas used here:
- **Layer caching**: `backend/Dockerfile` copies `package.json` before the rest of the code, so `npm install` only reruns when dependencies change, not on every code edit.
- **Multi-stage build** (`frontend/Dockerfile`): stage 1 uses a full Node image to compile the Vue app; stage 2 copies only the compiled static files into a tiny `nginx` image. The final image never contains Node.js or `node_modules`.
- **`docker-compose.yml`** wires the two containers together — a network is created automatically so they could reach each other by service name if needed (here the contact form calls the backend directly from the browser instead, since the frontend is a static SPA).

## SMTP setup for the contact form

`backend/.env` needs real credentials to actually send emails. For Gmail:
1. Enable 2-Step Verification on the Google account.
2. Create an [App Password](https://myaccount.google.com/apppasswords).
3. Use that as `SMTP_PASS` (not the normal account password).
