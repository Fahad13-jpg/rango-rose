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

// Fallback images while no image has been uploaded per-product in Django
// admin. Matches the fixed order products are seeded in.
const FALLBACK_IMAGES = [
  "/images/product1.jpg",
  "/images/product2.jpg",
  "/images/product3.jpg",
];

async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/`, {
    next: { revalidate: 60 },
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
            {products.map((product, index) => (
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