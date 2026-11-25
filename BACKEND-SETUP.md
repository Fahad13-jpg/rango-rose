# Connect the Rango Rose backend

The frontend works as a collection preview until a backend is configured. The three preview products come from the existing Django seed command. Prices are labelled indicative. There is no cart, checkout or payment integration. Contact and newsletter areas explain that submissions are not open; they never report a successful submission without an API response.

## Local development

1. Create a Python virtual environment in `backend/`, then install `requirements.txt`.
2. Copy `backend/.env.example` to `backend/.env`. The example is for local development only.
3. Run `python manage.py migrate`, `python manage.py seed_products`, and `python manage.py createsuperuser`.
4. Run `python manage.py runserver`.
5. At the repository root, copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_API_URL=http://127.0.0.1:8000`.
6. Run `npm ci` and `npm run dev`. Submit test-only contact/newsletter data locally and check it in `/admin/`.

## Production

Deploy `backend/` as a Django service using its existing WSGI application (`core.wsgi:application`). Provision a persistent PostgreSQL database with the hosting provider before enabling submissions. Do not use local SQLite or ephemeral serverless storage for customer messages or subscriptions.

Configure these secrets/settings through the hosting provider, not Git:

- `DEBUG=False`
- `SECRET_KEY`: a newly generated random production key
- `DATABASE_URL`: the provider's PostgreSQL URL, with TLS as required by that provider
- `ALLOWED_HOSTS`: the exact public API hostname
- `CORS_ALLOWED_ORIGINS=https://rango-rose-3zz3.vercel.app`
- `CSRF_TRUSTED_ORIGINS`: the API's own HTTPS origin for Django admin

Run migrations, collect static files, create an administrator and add real products. The seed command loads the original demonstration collection; review it before treating entries as stock. Configure media storage for uploaded product images with persistent storage.

Check `GET /api/products/` returns a JSON array and confirm contact/newsletter submissions are stored. Then set `NEXT_PUBLIC_API_URL` in the **frontend** Vercel project's Production environment to the public API origin (no trailing `/api`), and redeploy. This public variable enables both browser forms. Optional `API_URL` overrides product requests only; it cannot enable browser submissions by itself.

The frontend's framework preset must remain **Next.js**, with the repository root as the root directory. The existing `rango-rose` Vercel project is separate from the `rango-rose-3zz3` storefront.

## Before opening submissions

Verify database persistence across deployments, backups, the real business contact details/privacy notice, and spam protection suitable for the traffic. The supplied placeholder address, telephone number and unconfigured social links have been removed. Add verified details when available. No production database or customer records were created during frontend performance work.
