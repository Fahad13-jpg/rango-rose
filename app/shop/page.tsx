import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Newsletter from "@/components/Newsletter";
import ProductCard from "@/components/ProductCard";

export default function Shop() {
  const products = [
    {
      id: 1,
      title: "Signature Rose Milk",
      description: "Our classic infusion, delicate and subtly sweet.",
      price: "$24.00",
      imageSrc: "/images/product3.jpg",
      imageAlt: "A meticulously styled product shot of a minimalist glass bottle containing pale pink rose milk.",
    },
    {
      id: 2,
      title: "Lavender Dream",
      description: "A calming blend of French lavender and rose.",
      price: "$28.00",
      imageSrc: "/images/product1.jpg",
      imageAlt: "A meticulously styled product shot of a minimalist glass bottle containing pale lavender milk.",
      badge: "Limited Edition"
    },
    {
      id: 3,
      title: "Golden Saffron",
      description: "Infused with rare saffron for a warm, earthy finish.",
      price: "$32.00",
      imageSrc: "/images/product2.jpg",
      imageAlt: "A meticulously styled product shot of a minimalist glass bottle containing a creamy golden milk.",
    }
  ];

  return (
    <>
      <Navbar />

      <main className="pt-32 md:pt-40 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex-grow">
        {/* Shop Header */}
        <section className="text-center mb-16 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <h1 className="font-display-lg text-display-lg text-primary mb-6">
            Shop the Collection
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            Discover our curated selection of premium botanical infusions. Each bottle is a symphony of delicate flavors and natural elegance.
          </p>
        </section>

        {/* Product Grid */}
        <section className="mb-section-gap">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                imageSrc={product.imageSrc}
                imageAlt={product.imageAlt}
                title={product.title}
                description={product.description}
                price={product.price}
                badge={product.badge}
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
