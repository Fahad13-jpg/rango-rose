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
With no API configured, the collection is statically rendered as a labelled preview of the original seed products. Contact/newsletter submissions remain unavailable with clear messages. With an API configured, the catalog is rendered at request time with a 60-second data cache and an 8-second timeout. API failures display an unavailable state; an empty catalog has its own empty state.

The Django deployment needs its own persistent database, migrations, seeded or
admin-created products, an exact `ALLOWED_HOSTS` entry for its deployed domain,
and CORS origins for the frontend domain. See `backend/README.md` for API setup.


## Performance and verification

The scroll hero keeps the original 1280 x 720 RGBA pixels in lossless WebP files. It loads nearby frames with at most 2 concurrent requests on phones and 3 on desktop, retains at most 12/20 decoded frames respectively, and stops animation work while idle, hidden or offscreen. Reduced-motion visitors receive only the first frame. `sequence-v1` URLs are immutable; create a new versioned directory if the artwork changes.

The 140 optimized frames total 61,377,768 bytes, compared with 140,762,482 bytes of original PNGs. These are full-sequence payloads, not initial-page downloads. Initial loading requests only a small nearby/overview set; other frames are fetched on demand. Pixels were compared after decoding every frame. This does not establish a field Core Web Vitals score or guarantee 60fps on every device.

Run `npm test`, `npm run lint` and `npm run build` before deploying. The animation tests cover idle scheduling, late frame arrival, reverse scrolling, bounded concurrency and decoded-cache limits, visibility handling and reduced motion. See [BACKEND-SETUP.md](BACKEND-SETUP.md) to activate real product and form data.
