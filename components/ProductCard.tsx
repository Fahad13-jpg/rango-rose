interface ProductCardProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
  price: string;
  badge?: string;
}

export default function ProductCard({
  imageSrc,
  imageAlt,
  title,
  description,
  price,
  badge,
}: ProductCardProps) {
  return (
    <article className="bg-[#FFFDFB] rounded-xl border border-[#F9EAE1] shadow-[0_20px_40px_-10px_rgba(176,42,80,0.04)] hover:-translate-y-1 hover:shadow-[0_30px_50px_-15px_rgba(176,42,80,0.08)] overflow-hidden group cursor-pointer flex flex-col h-full transition-all duration-300">
      <div className="p-8 bg-[#F9EAE1]/30 flex-grow flex items-center justify-center relative">
        <img
          src={imageSrc}
          alt={imageAlt}
          className="w-full aspect-[4/5] object-cover rounded-lg group-hover:scale-105 transition-transform duration-500"
        />
        {badge && (
          <div className="absolute top-4 right-4 bg-primary text-on-primary font-label-sm text-label-sm px-3 py-1 rounded-full">
            {badge}
          </div>
        )}
      </div>
      <div className="p-6 text-center">
        <h3 className="font-headline-md text-headline-md text-primary mb-2">
          {title}
        </h3>
        <p className="font-body-md text-body-md text-on-surface-variant mb-4">
          {description}
        </p>
        <p className="font-label-sm text-label-sm text-primary-container mb-6">
          {price}
        </p>
        <button className="w-full py-3 rounded-full border border-primary-container text-primary-container font-label-sm text-label-sm hover:bg-primary-container hover:text-on-primary transition-colors hover:scale-[1.02] active:scale-95 duration-300">
          Add to Cart
        </button>
      </div>
    </article>
  );
}
