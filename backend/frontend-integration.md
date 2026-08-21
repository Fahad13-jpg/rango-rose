# Wiring the Next.js frontend to this API

## 1. Env var

`.env.local` in the Next.js project root:
```
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

## 2. Shop page — fetch products instead of the hardcoded array

Replace `app/shop/page.tsx`:

```tsx
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Newsletter from "@/components/Newsletter";
import ProductCard from "@/components/ProductCard";

interface Product {
  id: number;
  title: string;
  slug: string;
  description: string;
  price: string;
  imageSrc: string | null;
  badge: string;
}

async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/`, {
    next: { revalidate: 60 }, // ISR: re-fetch at most once a minute
  });
  if (!res.ok) throw new Error("Failed to load products");
  return res.json();
}

export default async function Shop() {
  const products = await getProducts();

  return (
    <>
      <Navbar />
      <main className="pt-32 md:pt-40 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex-grow">
        <section className="text-center mb-16 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <h1 className="font-display-lg text-display-lg text-primary mb-6">
            Shop the Collection
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            Discover our curated selection of premium botanical infusions. Each bottle is a symphony of delicate flavors and natural elegance.
          </p>
        </section>

        <section className="mb-section-gap">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                imageSrc={product.imageSrc ?? "/images/product-placeholder.jpg"}
                imageAlt={product.title}
                title={product.title}
                description={product.description}
                price={`$${Number(product.price).toFixed(2)}`}
                badge={product.badge || undefined}
              />
            ))}
          </div>
        </section>

        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
```

Note: this makes `Shop` a Server Component fetch (no `"use client"` needed) —
it already wasn't a client component, so this is a drop-in swap.

## 3. Newsletter form — POST to the API

`components/Newsletter.tsx` needs `"use client"` since it now has state/handlers:

```tsx
"use client";

import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/newsletter/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setErrorMsg(data.email?.[0] ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      setStatus("success");
      setEmail("");
    } catch {
      setErrorMsg("Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  return (
    <section className="bg-gradient-to-b from-transparent to-[#f4ebec] py-24 px-6">
      <div className="max-w-2xl mx-auto text-center">
        {/* ...icon unchanged... */}

        <h2 className="font-serif text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
          Join The Rose Club
        </h2>
        <p className="text-gray-600 mb-8 font-light text-sm md:text-base">
          Subscribe to receive exclusive offers, early access to new flavours,
          and notes on elegant living.
        </p>

        {status === "success" ? (
          <p className="text-gray-900 font-medium">You&apos;re on the list. Welcome to the Rose Club!</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row max-w-md mx-auto gap-3">
            <input
              className="flex-1 rounded-full border-none px-6 py-3 text-sm focus:ring-2 focus:ring-rose-brand shadow-sm bg-white outline-none"
              placeholder="Enter your email address"
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              className="bg-gray-900 hover:bg-black text-white rounded-full px-8 py-3 text-sm font-medium transition-colors shadow-sm disabled:opacity-50"
              type="submit"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
        )}

        {status === "error" && (
          <p className="text-red-600 text-xs mt-3">{errorMsg}</p>
        )}

        <p className="text-[10px] text-gray-400 mt-4">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
}
```

## 4. Contact form — POST to the API

In `app/contact/page.tsx`, the form is currently server-rendered with no
handler. Easiest approach: extract just the `<form>` into its own small
Client Component, e.g. `components/ContactForm.tsx`, keep everything else
in `contact/page.tsx` as-is, and swap in the same fetch/status pattern as the
Newsletter form above, POSTing to
`${process.env.NEXT_PUBLIC_API_URL}/api/contact/` with
`{ name, email, subject, message }`. Reuse the exact same field names/ids
already in the markup — the API expects those field names directly.
