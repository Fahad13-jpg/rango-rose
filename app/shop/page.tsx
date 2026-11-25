import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Newsletter from "@/components/Newsletter";
import ProductCard from "@/components/ProductCard";
import { connection } from "next/server";

interface Product {
  id: number;
  title: string;
  slug: string;
  description: string;
  price: string;
  imageSrc: string | null;
  badge: string;
}

// Fallback images while no image has been uploaded per-product in Django
// admin. Matches the fixed order products are seeded in.
const FALLBACK_IMAGES = [
  "/images/product1.jpg",
  "/images/product2.jpg",
  "/images/product3.jpg",
];

async function getProducts(): Promise<Product[] | null> {
  const apiUrl = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) return null;

  try {
    const url = new URL(`${apiUrl.replace(/\/$/, "")}/api/products/`);
    if (!["http:", "https:"].includes(url.protocol)) return null;
    const res = await fetch(url, {
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return null;
    const products: unknown = await res.json();
    if (!Array.isArray(products)) return null;
    return products as Product[];
  } catch {
    // A backend outage should not take down the storefront.
    return null;
  }
}

export default async function Shop() {
  // The catalog depends on a separately deployed API, not the build machine.
  await connection();
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
          {products === null && (
            <p role="status" className="text-center text-on-surface-variant py-12">
              Our collection is temporarily unavailable. Please try again shortly.
            </p>
          )}
          {products?.length === 0 && (
            <p className="text-center text-on-surface-variant py-12">
              New additions are on their way. Please check back soon.
            </p>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            {products?.map((product, index) => (
              <ProductCard
                key={product.id}
                imageSrc={product.imageSrc ?? FALLBACK_IMAGES[index % FALLBACK_IMAGES.length]}
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