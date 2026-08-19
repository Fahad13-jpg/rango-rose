import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Newsletter from "@/components/Newsletter";
import HeroScrollAnimation from "@/components/HeroScrollAnimation";
import ExperienceCarousel from "@/components/ExperienceCarousel";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Navbar />

      {/* Hero Scroll Animation Section */}
      <HeroScrollAnimation />

      {/* Ingredients Section */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto text-center">
        <h2 className="font-serif text-3xl md:text-4xl font-semibold text-rose-brand mb-4">Pure Ingredients, Elegant Taste</h2>
        <p className="text-gray-500 max-w-2xl mx-auto mb-16 font-light">
          We source only the finest elements to create a luxurious milk drink that delights the senses.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-[#f4edea] rounded-2xl p-10 flex flex-col items-center hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
            <div className="w-12 h-12 bg-rose-200 rounded-full flex items-center justify-center text-rose-brand mb-6">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11.25l-3-3m0 0l-3 3m3-3v7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-serif text-xl font-semibold mb-3">100% Farm Milk</h3>
            <p className="text-gray-600 text-sm font-light leading-relaxed">
              Sourced daily from local dairy farms, ensuring a rich, creamy, and velvety smooth base for our signature flavour.
            </p>
          </div>
          {/* Card 2 */}
          <div className="bg-[#f4edea] rounded-2xl p-10 flex flex-col items-center transform md:-translate-y-4 hover:shadow-xl transition-all duration-500 hover:-translate-y-5">
            <div className="w-12 h-12 bg-rose-brand rounded-full flex items-center justify-center text-white mb-6 shadow-md">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
              </svg>
            </div>
            <h3 className="font-serif text-xl font-semibold mb-3">Real Rose Petals</h3>
            <p className="text-gray-600 text-sm font-light leading-relaxed">
              Infused with natural essence extracted directly from hand-picked rose petals for an authentic, delicate taste.
            </p>
          </div>
          {/* Card 3 */}
          <div className="bg-[#f4edea] rounded-2xl p-10 flex flex-col items-center hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
            <div className="w-12 h-12 bg-rose-200 rounded-full flex items-center justify-center text-rose-brand mb-6">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
              </svg>
            </div>
            <h3 className="font-serif text-xl font-semibold mb-3">Floral Aroma</h3>
            <p className="text-gray-600 text-sm font-light leading-relaxed">
              A captivating scent that awakens the senses, offering a moment of calm and luxury before the first sip.
            </p>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-24 bg-[#f8f6f5]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <ExperienceCarousel />
          {/* Content Side */}
          <div>
            <h2 className="font-serif text-5xl font-bold text-gray-900 mb-2 tracking-tight">The Rose</h2>
            <h2 className="font-serif text-5xl font-bold text-rose-brand italic mb-6 tracking-tight">Experience</h2>
            <p className="text-gray-600 mb-8 font-light leading-relaxed">
              Elevate your daily refreshment routine. Rango Rose is more than just a drink; it's a carefully crafted sensory journey. The gentle sweetness of the milk perfectly balances the subtle, aromatic whispers of rose, creating a sophisticated profile that lingers beautifully on the palate.
            </p>
            <ul className="space-y-4 mb-10">
              <li className="flex items-start gap-3 text-sm text-gray-700">
                <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="#b72a54" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                Naturally sweetened, perfectly balanced.
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-700">
                <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="#b72a54" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                No artificial colours or heavy syrups.
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-700">
                <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="#b72a54" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                Best enjoyed chilled in a refined glass.
              </li>
            </ul>
            <Link href="/ingredients" className="inline-block bg-rose-brand hover:bg-rose-900 text-white px-8 py-3 rounded-full font-medium transition-colors">
              Explore the Craft
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl font-semibold text-gray-900 mb-4">Sips of Praise</h2>
          <div className="w-16 h-0.5 bg-rose-brand mx-auto opacity-50"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Review 1 */}
          <div className="bg-[#faf5f6] border border-rose-100 rounded-2xl p-8 relative pt-12 hover:-translate-y-2 hover:shadow-lg transition-all duration-500">
            <span className="quote-mark">"</span>
            <div className="flex text-rose-brand mb-4 gap-1">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"></path></svg>
              ))}
            </div>
            <p className="italic text-gray-600 text-sm mb-6 leading-relaxed">
              "Absolutely divine. It's not overly sweet like other flavoured milks. The rose flavor is subtle and incredibly refreshing, it feels like a treat."
            </p>
            <div className="flex items-center gap-3">
              <img alt="Eleanor V." className="w-10 h-10 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqzxWW4io7GTmEo3ewpkfh58Mr4lYl9a4Gz2n2Wj-6EustqhTLL1W879Vx5B5XkGXGsk2zFhDrhKNG0v3zyEEA_SzWteU0ZexE8-LcwzoWQ-RpnLJwXlpxY7rOlj-3yslOUtAm3mTnCMpiFvdaX4J3-jIJkvIQ5H9RIN3XvAOKu4NIVVsoZiXnFere0RUVg15FlyiEOPYCs5lkt_EgcBpwRyM4yb5b0_NnRDlpqgTdZ1S8YpiJ1Krp" />
              <div>
                <h4 className="font-semibold text-sm">Eleanor V.</h4>
                <p className="text-xs text-gray-500">Verified Buyer</p>
              </div>
            </div>
          </div>
          {/* Review 2 (Highlighted) */}
          <div className="bg-[#faedef] border border-rose-200 rounded-2xl p-8 relative pt-12 transform md:-translate-y-4 shadow-sm hover:-translate-y-6 hover:shadow-lg transition-all duration-500">
            <span className="quote-mark text-rose-200">"</span>
            <div className="flex text-rose-brand mb-4 gap-1">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"></path></svg>
              ))}
            </div>
            <p className="italic text-gray-800 text-sm mb-6 leading-relaxed font-medium">
              "I serve this at my weekend brunches now. It looks stunning in a glass and everyone always asks where I got it. A truly premium experience."
            </p>
            <div className="flex items-center gap-3">
              <img alt="James L." className="w-10 h-10 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5NiRltm3RQSOPGYwpSVEwOllEUeSWYYHuZeaLDOhNLR-FT-rqHP026IcB5FRI1aySMyGwU1VuOmbz7eE3yNa80LUQgy3AN_Kmqm5d2Bv9OmsxNqCgH3vV6vVd8C4rApahVnQvGY_uMafhwRxEdzZeeV3WawxytuioUxcQ-kPQd-RP5aZlZbzH2679xgGMMDrmdP5TEqpRoDapyI7e26zIM-VNNiqggVuBs02o9JG1tk5jf0QTWdvW" />
              <div>
                <h4 className="font-semibold text-sm">James L.</h4>
                <p className="text-xs text-gray-500">Food Blogger</p>
              </div>
            </div>
          </div>
          {/* Review 3 */}
          <div className="bg-[#faf5f6] border border-rose-100 rounded-2xl p-8 relative pt-12 hover:-translate-y-2 hover:shadow-lg transition-all duration-500">
            <span className="quote-mark">"</span>
            <div className="flex text-rose-brand mb-4 gap-1">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"></path></svg>
              ))}
            </div>
            <p className="italic text-gray-600 text-sm mb-6 leading-relaxed">
              "The texture is so creamy, and the floral aroma hits you before you even taste it. Perfect for unwinding after a long day."
            </p>
            <div className="flex items-center gap-3">
              <img alt="Sophia M." className="w-10 h-10 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD90bAwwUif-bBkKZ7oBDzEiPBWANEnI1BmOiqut1-_8LHGU5_sKo3RdkHHSopraj6SiVsIvx8ZC3hHMMBYFGRPbNc1dOeDvAvCD4KV0Y7U90f91ki5kWrwbsOvfex6JpY-vZlfGBGaQCTxss9pf8hSiWHnj3DrTW02UlNe4Piy24HQgRzQHj1tNWTqLYpvM9xDU8g4W7tqn4sSJv0P6vk9Ha_TME5X9M8PfbVgyBoR6cXwMfX3uRZh" />
              <div>
                <h4 className="font-semibold text-sm">Sophia M.</h4>
                <p className="text-xs text-gray-500">Verified Buyer</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Newsletter />
      <Footer />
    </>
  );
}
