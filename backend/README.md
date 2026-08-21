# Rango Rose — Backend (Django REST API)

A minimal Django + Django REST Framework API for the Rango Rose Next.js
frontend. It serves the product catalog and stores contact form / newsletter
submissions in a real database, with a Django admin panel to manage all of it.

## What this does (and doesn't) include

- ✅ `Product` model + admin, replacing the hardcoded array in `shop/page.tsx`
- ✅ Contact form submissions saved to the database, viewable in admin
- ✅ Newsletter subscriptions with resubscribe support
- ❌ No cart, checkout, or payments — out of scope for this pass

## Project layout

```
rango-rose-backend/
├── core/            # settings, root urls, wsgi/asgi
├── products/         # Product model, API, admin, seed command
├── inquiries/         # ContactMessage + NewsletterSubscriber, API, admin
├── requirements.txt
├── .env.example
└── manage.py
```

## Local setup

```bash
python -m venv .venv
# Windows (PowerShell):
.venv\Scripts\Activate.ps1
# macOS/Linux:
source .venv/bin/activate

pip install -r requirements.txt

cp .env.example .env      # Windows: copy .env.example .env

python manage.py migrate
python manage.py seed_products      # loads the 3 original demo products
python manage.py createsuperuser    # for /admin/ access

python manage.py runserver
```

API now runs at `http://127.0.0.1:8000/`. Admin at `/admin/`.

## API endpoints

| Method | URL                          | Purpose                              |
|--------|-------------------------------|---------------------------------------|
| GET    | `/api/products/`              | List active products (shop grid)      |
| GET    | `/api/products/<slug>/`       | Single product detail                 |
| POST   | `/api/contact/`               | Submit the Contact page form          |
| POST   | `/api/newsletter/`            | Subscribe an email                    |

`POST /api/contact/` body:
```json
{ "name": "Jane Doe", "email": "jane@example.com", "subject": "general", "message": "Hi!" }
```
`subject` must be one of: `general`, `wholesale`, `press`, `support`.

`POST /api/newsletter/` body:
```json
{ "email": "jane@example.com" }
```

## Connecting the Next.js frontend

Set an env var in the Next.js project (`.env.local` for dev, and in Vercel's
project settings for production):

```
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000   # dev
# NEXT_PUBLIC_API_URL=https://your-django-app.up.railway.app   # production
```

See `frontend-integration.md` (in this folder) for drop-in replacements for
`shop/page.tsx`, `Newsletter.tsx`, and `contact/page.tsx` that call this API.

## Deploying

**Important:** Vercel does not run a persistent Django app well (it's built
around Next.js and short-lived serverless functions, not a full WSGI app with
its own database + admin). Deploy Django separately:

1. **Railway** or **Render** (both have a free/cheap tier, one-click Postgres,
   and auto-detect Django via `requirements.txt` + a start command).
   - Start command: `gunicorn core.wsgi --log-file -`
   - Add a Postgres instance — both platforms inject `DATABASE_URL`
     automatically, which `core/settings.py` already reads.
   - Set env vars: `SECRET_KEY`, `DEBUG=False`, `ALLOWED_HOSTS` (your Railway/
     Render domain), `CORS_ALLOWED_ORIGINS` and `CSRF_TRUSTED_ORIGINS` (your
     Vercel domain).
   - Run `python manage.py migrate` and `seed_products` once via their shell/
     one-off command feature.
2. Keep the **Next.js frontend on Vercel** as planned, pointed at that API
   via `NEXT_PUBLIC_API_URL`.

## Notes

- `price` is returned as a decimal string (e.g. `"24.00"`), not pre-formatted
  with a `$` — format it in the frontend so currency stays a display concern.
- Product images are optional (`imageSrc` is `null` until you upload one via
  admin); the frontend should fall back to its existing placeholder images
  when `imageSrc` is `null`.
- `DEBUG=True` uses local SQLite automatically — no Postgres needed until you
  deploy.
