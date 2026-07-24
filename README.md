# Telegram Mini App Boilerplate

React + Shadcn/ui + FastAPI + Postgres, set up specifically for a Telegram
Mini App: theme follows Telegram automatically (light/dark), layout respects
Telegram's safe areas, and the backend verifies real Telegram identity
instead of trusting whatever the frontend claims.

## Stack

| Layer | Tech |
|---|---|
| Build tool | Vite |
| UI | React + TypeScript + Tailwind CSS + Shadcn/ui |
| Telegram integration | `@tma.js/sdk-react` |
| Data fetching | TanStack Query + Axios |
| Routing | React Router |
| Backend | FastAPI (async) |
| Database | PostgreSQL + SQLAlchemy (async) + Alembic |
| Auth | Telegram `initData` HMAC verification (no passwords, no separate login) |

## Project structure

```
telegram-mini-app/
├── frontend/                  # React app
│   └── src/
│       ├── components/ui/     # Shadcn primitives (Button, Card, Input, ...)
│       ├── components/layout/ # AppLayout, BottomTabBar
│       ├── telegram/          # SDK bootstrap + theme binding
│       ├── hooks/             # React Query hooks
│       ├── lib/                # api.ts (axios client), utils.ts
│       └── pages/              # HomePage, ProfilePage
├── backend/                   # FastAPI app
│   └── app/
│       ├── api/v1/            # Route handlers
│       ├── api/deps.py        # Auth dependency (verifies Telegram initData)
│       ├── services/telegram_auth.py  # HMAC signature verification
│       ├── models/            # SQLAlchemy models
│       ├── schemas/           # Pydantic response models
│       └── core/config.py     # Settings from .env
│   └── migrations/            # Alembic
└── docker-compose.yml         # Local Postgres
```

## 1. Run Postgres

```bash
docker compose up -d
```

This starts Postgres on `localhost:5432` with a `telegram_app` database.
(No Docker? Install Postgres locally and update `DATABASE_URL` in
`backend/.env` to match.)

## 2. Backend setup

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate        # Windows: .venv\Scripts\activate
pip install -r requirements.txt

cp .env.example .env
# Edit .env: paste your real bot token from @BotFather into TELEGRAM_BOT_TOKEN.
# Leave ALLOW_DEV_AUTH_BYPASS=true for now — lets you test without Telegram.

alembic revision --autogenerate -m "create users table"
alembic upgrade head

uvicorn app.main:app --reload --port 8000
```

Visit `http://localhost:8000/docs` — FastAPI's interactive API docs. You
should see `/health` and `/api/v1/users/me`.

## 3. Frontend setup

```bash
cd frontend
npm install
cp .env.example .env   # defaults already point at localhost:8000
npm run dev
```

Visit `http://localhost:5173`. Outside Telegram, the app still renders
(with a light-theme fallback) so you can build UI without launching
Telegram every time. The Profile tab will show "couldn't reach the
backend" until you also set `ALLOW_DEV_AUTH_BYPASS=true` on the backend
(already the default in `.env.example`) — that returns a fake dev user
instead of requiring a real Telegram signature.

## 4. Testing inside real Telegram

Telegram requires HTTPS, so `localhost` alone won't work from the Telegram
app. Tunnel your local dev server:

```bash
# in a new terminal, from anywhere
npx localtunnel --port 5173
# or: ngrok http 5173
```

Then:
1. Message **@BotFather** → `/newbot` (if you haven't already) to get a bot + token.
2. `/newapp` (or `/mybots` → your bot → Bot Settings → Mini App) and paste your
   tunnel's HTTPS URL as the Mini App URL.
3. Open your bot in Telegram and launch the Mini App from its menu button.

Once this works, set `ALLOW_DEV_AUTH_BYPASS=false` on the backend — real
Telegram launches will authenticate through actual `initData` verification.

## How auth works

1. Telegram gives the frontend a signed `initData` string on launch, containing the user's Telegram id, name, etc.
2. `src/lib/api.ts` attaches it to every request: `Authorization: tma <initData>`.
3. `app/api/deps.py` verifies the signature using your bot token (`app/services/telegram_auth.py`) — this proves the request really came from Telegram and wasn't forged.
4. On first verified request, a `User` row is created automatically. No signup form, no password.

## Adding a new Shadcn component

The Shadcn CLI needs network access to `ui.shadcn.com`. If that's reachable
in your environment:

```bash
cd frontend
npx shadcn@latest add dialog
```

`components.json` is already configured, so it'll drop straight into
`src/components/ui/`.

## Adding a new page

1. Create `src/pages/YourPage.tsx`.
2. Add a route in `src/router.tsx`.
3. Optionally add a tab in `src/components/layout/BottomTabBar.tsx`.

## Adding a new backend endpoint

1. Add a Pydantic schema in `app/schemas/`.
2. Add a route in `app/api/v1/` (new file, or add to `users.py`).
3. Register it in `app/api/v1/__init__.py` if it's a new router.
4. If it touches new tables, add a model in `app/models/`, then:
   ```bash
   alembic revision --autogenerate -m "describe your change"
   alembic upgrade head
   ```
