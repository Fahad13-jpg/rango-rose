import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Ingredients() {
  return (
    <>
      <Navbar />

      <main className="pt-28 md:pt-40 pb-section-gap">
        {/* Hero Section */}
        <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mb-section-gap text-center animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <span className="text-primary font-label-sm text-label-sm uppercase tracking-widest block mb-6">The Essence</span>
          <h1 className="font-headline-lg-mobile md:font-display-lg text-headline-lg-mobile md:text-display-lg text-primary mb-8 max-w-3xl mx-auto">
            Nature's Perfect Harmony
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-12">
            Every drop of Rango Rose is a testament to purity. We rely on just two extraordinary elements, sourced with uncompromising integrity, to deliver an experience of profound botanical indulgence.
          </p>
          <div className="w-full h-[50vh] rounded-xl overflow-hidden relative">
            <div
              className="bg-cover bg-center w-full h-full transform hover:scale-105 transition-transform duration-1000"
              style={{ backgroundImage: "url('/images/bowl.jpg')" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface/50 to-transparent"></div>
          </div>
        </section>

        {/* Alternating Section 1: Milk */}
        <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mb-section-gap animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter md:gap-16 items-center">
            <div className="order-2 md:order-1 relative rounded-xl overflow-hidden h-[350px] sm:h-[450px] md:h-[600px]">
              <img
                className="object-cover w-full h-full rounded-xl hover:scale-105 transition-transform duration-700"
                alt="A serene, sunlit scene of a vintage glass milk bottle resting on a rustic, pale wooden table in a pristine, airy farmhouse kitchen."
                src="/images/mypro2.jpg"
              />
              <div className="absolute inset-0 border border-outline-variant/20 rounded-xl pointer-events-none"></div>
            </div>
            <div className="order-1 md:order-2 space-y-8">
              <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 0" }}>water_drop</span>
              </div>
              <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">100% Farm Fresh Milk</h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Our foundation is built on uncompromising quality. We source exclusively from small, sustainable, family-owned dairies where herds are pasture-raised. This commitment ensures a rich, velvety texture that serves as the perfect canvas for our delicate floral infusions.
              </p>
              <ul className="space-y-4 font-body-md text-body-md text-on-surface-variant">
                <li className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 0" }}>check_circle</span>
                  Ethically sourced from local pastures
                </li>
                <li className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 0" }}>check_circle</span>
                  Un-homogenized for natural cream separation
                </li>
                <li className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 0" }}>check_circle</span>
                  Delivered fresh within 24 hours of milking
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Alternating Section 2: Rose Petals */}
        <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mb-section-gap animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter md:gap-16 items-center">
            <div className="space-y-8">
              <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 0" }}>local_florist</span>
              </div>
              <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">Real Rose Petals</h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                We capture the ephemeral beauty of a spring garden in every bottle. Our petals are hand-harvested at dawn, when their essential oils are most potent. Through a proprietary, cold-steep infusion process, we extract the purest floral notes without the bitterness of traditional heating methods.
              </p>
              <ul className="space-y-4 font-body-md text-body-md text-on-surface-variant">
                <li className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 0" }}>check_circle</span>
                  Hand-picked Damask roses
                </li>
                <li className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 0" }}>check_circle</span>
                  Cold-steeped for 48 hours
                </li>
                <li className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 0" }}>check_circle</span>
                  Zero artificial flavorings or extracts
                </li>
              </ul>
            </div>
            <div className="relative rounded-xl overflow-hidden h-[350px] sm:h-[450px] md:h-[600px]">
              <img
                className="object-cover w-full h-full rounded-xl hover:scale-105 transition-transform duration-700"
                alt="A close-up, highly detailed shot of dew-kissed, velvet-textured deep crimson rose petals resting delicately in a pristine white ceramic bowl."
                src="/images/mypro1.jpg"
              />
              <div className="absolute inset-0 border border-outline-variant/20 rounded-xl pointer-events-none"></div>
            </div>
          </div>
        </section>

        {/* Bento Grid / Details */}
        <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="text-center mb-16">
            <h2 className="font-headline-md text-headline-md text-primary mb-4">The Art of the Blend</h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-xl mx-auto">It's not just about what goes in, but how they come together.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-surface-container-highest p-8 rounded-2xl border border-surface-variant hover:shadow-[0_10px_40px_-10px_rgba(176,42,80,0.08)] hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center">
              <span className="material-symbols-outlined text-primary text-4xl mb-6" style={{ fontVariationSettings: "'FILL' 0" }}>ac_unit</span>
              <h3 className="font-headline-sm text-headline-sm text-on-surface mb-3">Cold Extraction</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">We never apply heat, preserving the delicate volatile compounds of the rose petals for a crisper, truer flavor.</p>
            </div>
            {/* Card 2 */}
            <div className="bg-surface-container-highest p-8 rounded-2xl border border-surface-variant hover:shadow-[0_10px_40px_-10px_rgba(176,42,80,0.08)] hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center">
              <span className="material-symbols-outlined text-primary text-4xl mb-6" style={{ fontVariationSettings: "'FILL' 0" }}>eco</span>
              <h3 className="font-headline-sm text-headline-sm text-on-surface mb-3">Zero Additives</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">No stabilizers, no preservatives, and absolutely no refined sugars. Just milk, petals, and a touch of raw honey.</p>
            </div>
            {/* Card 3 */}
            <div className="bg-surface-container-highest p-8 rounded-2xl border border-surface-variant hover:shadow-[0_10px_40px_-10px_rgba(176,42,80,0.08)] hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center">
              <span className="material-symbols-outlined text-primary text-4xl mb-6" style={{ fontVariationSettings: "'FILL' 0" }}>spa</span>
              <h3 className="font-headline-sm text-headline-sm text-on-surface mb-3">Micro-Batches</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">Crafted in small quantities daily to ensure that every bottle you open tastes as fresh as the morning it was made.</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}