import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#f0e9e7] py-16 px-6 md:px-12 border-t border-rose-200/50">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand Col - spans 2 */}
        <div className="md:col-span-2">
          <div className="font-serif italic font-bold text-2xl text-gray-800 mb-4">
            Rango Rose
          </div>
          <p className="text-sm text-gray-600 font-light max-w-xs leading-relaxed mb-8">
            Elevating the everyday with the delicate fusion of creamy dairy and
            aromatic rose.
          </p>
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} Rango Rose. Indulge in Floral
            Sophistication.
          </p>
        </div>

        {/* Explore Col */}
        <div>
          <h4 className="font-semibold text-xs tracking-wider text-gray-900 uppercase mb-4">
            Explore
          </h4>
          <ul className="space-y-3 text-sm text-gray-600 font-light">
            <li>
              <Link
                href="/shop"
                className="hover:text-rose-brand transition-colors"
              >
                Shop
              </Link>
            </li>
            <li>
              <Link
                href="/our-story"
                className="hover:text-rose-brand transition-colors"
              >
                Our Story
              </Link>
            </li>
            <li>
              <Link
                href="/ingredients"
                className="hover:text-rose-brand transition-colors"
              >
                Ingredients
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal Col */}
        <div>
          <h4 className="font-semibold text-xs tracking-wider text-gray-900 uppercase mb-4">
            Contact
          </h4>
          <ul className="space-y-3 text-sm text-gray-600 font-light">
            <li>
              <Link
                href="/contact"
                className="hover:text-rose-brand transition-colors underline decoration-gray-300 underline-offset-2"
              >
                General enquiries
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-rose-brand transition-colors underline decoration-gray-300 underline-offset-2"
              >
                Customer support
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-rose-brand transition-colors underline decoration-gray-300 underline-offset-2"
              >
                Press enquiries
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-rose-brand transition-colors underline decoration-gray-300 underline-offset-2"
              >
                Wholesale
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
