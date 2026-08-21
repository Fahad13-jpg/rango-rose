import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function OurStory() {
  return (
    <>
      <Navbar />

      <main className="pt-32 md:pt-40 pb-section-gap max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        {/* Hero Section */}
        <section className="text-center mb-section-gap animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <h1 className="font-display-lg text-headline-lg-mobile md:text-display-lg text-on-surface mb-6 mx-auto max-w-3xl leading-tight text-balance">
            The Art of Botanical Infusion
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-12 text-balance">
            A journey from soil to sip, rooted in heritage and a deep respect
            for the delicate nature of florals. Rango Rose is more than a
            beverage; it's a sensory ritual.
          </p>
          <div className="relative w-full h-[60vh] md:h-[70vh] rounded-xl overflow-hidden shadow-[0_10px_40px_-10px_rgba(176,42,80,0.04)] group">
            <img
              alt="A sweeping, cinematic photograph of a vast, misty rose farm at dawn."
              className="w-full h-full object-cover transition-transform duration-[10s] hover:scale-105 ease-out group-hover:scale-110"
              src="/images/img.jpg"
            />
          </div>
        </section>

        {/* The Beginning (Asymmetric Layout) */}
        <section className="mb-section-gap grid grid-cols-1 md:grid-cols-12 gap-gutter items-center animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
          <div className="md:col-span-5 md:col-start-2 order-2 md:order-1">
            <h2 className="font-label-sm text-label-sm text-primary uppercase tracking-[0.2em] mb-4">
              The Beginning
            </h2>
            <h3 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-6">
              Roots in the Valley
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant mb-6 text-pretty">
              It began with a single clipping, passed down through three
              generations. Our founder's grandmother understood the subtle
              language of petals, steeping them in spring water and rich cream
              to capture their fleeting essence.
            </p>
            <p className="font-body-md text-body-md text-on-surface-variant text-pretty">
              Today, we honor that legacy by maintaining the original estate,
              cultivating our heirloom varieties with the same slow, deliberate
              patience that defined the very first infusion.
            </p>
          </div>
          <div className="md:col-span-5 order-1 md:order-2 mb-8 md:mb-0 relative">
            <div className="aspect-[4/5] rounded-xl overflow-hidden border border-outline-variant/50 bg-[#F9EAE1] p-4 shadow-[0_10px_40px_-10px_rgba(176,42,80,0.04)]">
              <img
                alt="A highly detailed, macro photograph of a single, heirloom rose being gently held by a pair of weathered, yet elegant hands."
                className="w-full h-full object-cover rounded-lg"
                src="/images/roots-in-valley.jpg"
              />
            </div>
          </div>
        </section>

        {/* Our Philosophy (Bento Grid) */}
        <section className="mb-section-gap animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
          <div className="text-center mb-16">
            <h2 className="font-label-sm text-label-sm text-primary uppercase tracking-[0.2em] mb-4">
              Our Philosophy
            </h2>
            <h3 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface max-w-2xl mx-auto">
              Elevating the Everyday
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(300px,_auto)]">
            {/* Large Feature */}
            <div className="md:col-span-2 rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-8 shadow-[0_10px_40px_-10px_rgba(176,42,80,0.04)] hover:shadow-[0_15px_50px_-10px_rgba(176,42,80,0.08)] transition-all duration-300 flex flex-col justify-end relative overflow-hidden group hover:-translate-y-1">
              <div className="absolute inset-0 z-0">
                <img
                  alt="A minimalist, top-down photograph of delicate rose petals scattered gracefully across a pristine, textured cream canvas."
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCIC88-9PMkZUIdf8OsngpSByQ2wS35jE5eWVnoe0nyT39XJje8Lnnj4LpVPvQOujrdiOFLneohv1tmmdcGQLHT5INkqTulJLqKA0cQlgc2OLKDtciwbieD7CsOJc3Jxms7zvhQRGsrlaD5aSOazTbbgTbHrZAcvuhvQsWqepztsmF-U49Sfc63K74NAQPH7g2HDvrK_xNXiJWNYzlLJvG-5OJZjNfKVrSLut_Cga2RB4vWHbXqyBfv"
                />
              </div>
              <div className="relative z-10 bg-surface-container-lowest/90 backdrop-blur-sm p-6 rounded-lg self-start md:w-2/3 border border-outline-variant/20">
                <span
                  className="material-symbols-outlined text-primary mb-4"
                  style={{ fontVariationSettings: "'FILL' 0", fontSize: "32px" }}
                >
                  spa
                </span>
                <h4 className="font-headline-md text-headline-md text-on-surface mb-2">
                  Patience is an Ingredient
                </h4>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  We never rush the bloom. Our cold-steep process takes 48
                  hours, allowing the complex notes of the floral profile to
                  gently integrate without bitterness.
                </p>
              </div>
            </div>

            {/* Small Feature 1 */}
            <div className="rounded-xl border border-outline-variant/30 bg-[#F9EAE1] p-8 shadow-[0_10px_40px_-10px_rgba(176,42,80,0.04)] hover:shadow-[0_15px_50px_-10px_rgba(176,42,80,0.08)] transition-all duration-300 flex flex-col items-center justify-center text-center hover:-translate-y-1">
              <span
                className="material-symbols-outlined text-primary mb-4"
                style={{ fontVariationSettings: "'FILL' 0", fontSize: "32px" }}
              >
                water_drop
              </span>
              <h4 className="font-headline-md text-headline-md text-on-surface mb-2 text-xl">
                Pure Alchemy
              </h4>
              <p className="font-body-md text-body-md text-on-surface-variant text-sm">
                Sourced entirely from alpine spring water and sustainably farmed
                oat milk.
              </p>
            </div>

            {/* Small Feature 2 */}
            <div className="rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-8 shadow-[0_10px_40px_-10px_rgba(176,42,80,0.04)] hover:shadow-[0_15px_50px_-10px_rgba(176,42,80,0.08)] transition-all duration-300 flex flex-col items-center justify-center text-center relative overflow-hidden group hover:-translate-y-1">
              <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors duration-300 z-0"></div>
              <div className="relative z-10">
                <span
                  className="material-symbols-outlined text-primary mb-4"
                  style={{ fontVariationSettings: "'FILL' 0", fontSize: "32px" }}
                >
                  eco
                </span>
                <h4 className="font-headline-md text-headline-md text-on-surface mb-2 text-xl">
                  Regenerative Soil
                </h4>
                <p className="font-body-md text-body-md text-on-surface-variant text-sm">
                  Giving back more to the earth than we take, ensuring vitality
                  for decades.
                </p>
              </div>
            </div>

            {/* Medium Feature */}
            <div className="md:col-span-2 rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-8 shadow-[0_10px_40px_-10px_rgba(176,42,80,0.04)] hover:shadow-[0_15px_50px_-10px_rgba(176,42,80,0.08)] transition-all duration-300 flex flex-col sm:flex-row items-center gap-6 sm:gap-8 text-center sm:text-left hover:-translate-y-1">
              <div className="w-32 h-32 sm:w-1/3 aspect-square rounded-full overflow-hidden shrink-0 border-4 border-[#F9EAE1]">
                <img
                  alt="A close-up abstract photograph of milky white liquid swirling gracefully with a vibrant, deep rose infusion."
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQpnm6gjSbsgDROvKJbZQSDGpzjZF3fqDVCC8CEFtXsL86dzowm7hgMqcVFQTT-0EXGIT-xRLDqeSDoG46-gsQvkpV0oe2RzPpVW61uCeUH2vsxTx7AoTU2oebvShrUA0N8ivyz6yfCioylvM6eJ94uiLhNLGhMD6_9UsupZEOdPBA_HusmMURehmSkxSNPAQSc7PxoSw0mYAS1-BkM9_4CG2fPjuQiKi0R5KNkICHG6G9Mv5nOldL"
                />
              </div>
              <div>
                <h4 className="font-headline-md text-headline-md text-on-surface mb-2">
                  The Sensory Experience
                </h4>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Design for the palate. Every bottle is crafted to deliver a
                  layered tasting profile—beginning with bright floral top notes
                  and finishing with a creamy, grounded base.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}