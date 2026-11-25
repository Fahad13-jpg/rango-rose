This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


## Vercel deployment

Deploy the Next.js storefront from the **repository root** using the **Next.js**
framework preset (`npm ci`, `npm run build`, default `.next` output).
The `backend/` directory is a separate Django REST API, not the frontend root.

Set `NEXT_PUBLIC_API_URL` to the deployed Django API origin (HTTPS, no `/api`
suffix), then redeploy. `API_URL` can override this origin for server-side catalog
requests; browser contact and newsletter forms still use `NEXT_PUBLIC_API_URL`.
The catalog is rendered at request time, with a 60-second data cache and an
8-second API timeout. Missing configuration or an unavailable API displays an
unavailable message instead of breaking deployment or returning an application
error. An empty API catalog has its own empty state; no demo products are shown
as real inventory.

The Django deployment needs its own persistent database, migrations, seeded or
admin-created products, an exact `ALLOWED_HOSTS` entry for its deployed domain,
and CORS origins for the frontend domain. See `backend/README.md` for API setup.
