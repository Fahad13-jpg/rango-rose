import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import Image from "next/image";

export default function Contact() {
  return (
    <>
      <Navbar />

      <main className="flex-grow pt-[120px] pb-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full flex flex-col md:flex-row gap-section-gap items-start relative z-10">
        {/* Decorative subtle background */}
        <div className="absolute inset-0 pointer-events-none z-[-1] opacity-50 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-surface-container to-transparent w-full h-[500px]"></div>

        {/* Left Column: Contact Form */}
        <section className="w-full md:w-1/2 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <h1 className="font-display-lg text-headline-lg-mobile md:text-display-lg text-on-surface mb-6 md:mb-10">Get in Touch</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-12 max-w-md">We would love to hear from you. Whether you have a question about our botanical infusions, a press inquiry, or simply want to share your Rango Rose experience.</p>
          <ContactForm />
        </section>

        {/* Right Column: Location & Info */}
        <section className="w-full md:w-1/2 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 mt-12 md:mt-0">
          {/* Glassmorphism Image Card */}
          <div className="relative w-full aspect-square overflow-hidden rounded-lg">
            <Image src="/images/bowl.jpg" alt="Rose petals and the ingredients of Rango Rose" fill sizes="(max-width: 767px) 100vw, 45vw" className="object-cover" />
          </div>
          <div className="mt-8">
            <h2 className="font-headline-md text-headline-md text-primary mb-4">Stay in touch</h2>
            <p className="text-on-surface-variant leading-relaxed">For product questions, wholesale enquiries and press requests, our contact options will be available here when we open.</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
