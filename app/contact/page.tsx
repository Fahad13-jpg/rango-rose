import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Contact() {
  return (
    <>
      <Navbar />

      <main className="flex-grow pt-[120px] pb-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full flex flex-col md:flex-row gap-section-gap items-start relative z-10">
        {/* Decorative subtle background */}
        <div className="absolute inset-0 pointer-events-none z-[-1] opacity-50 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-surface-container to-transparent w-full h-[500px]"></div>

        {/* Left Column: Contact Form */}
        <section className="w-full md:w-1/2 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <h1 className="font-display-lg text-display-lg text-on-surface mb-6 md:mb-10">Get in Touch</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-12 max-w-md">We would love to hear from you. Whether you have a question about our botanical infusions, a press inquiry, or simply want to share your Rango Rose experience.</p>
          <form className="space-y-8 max-w-md bg-surface-container-lowest p-8 rounded-lg shadow-[0_10px_40px_rgba(176,42,80,0.04)] border border-[#F9EAE1]">
            <div className="relative group pt-4">
              <input 
                  className="w-full bg-transparent border-0 border-b border-[#F9EAE1] pb-2 pt-2 text-on-surface font-body-md focus:outline-none focus:border-primary focus:ring-0 transition-colors peer" 
                  id="name" 
                  name="name" 
                  required 
                  type="text"
                  placeholder=" "
              />
              <label 
                  className="absolute left-0 top-6 text-on-secondary-container font-label-sm text-label-sm transition-all duration-300 peer-focus:-top-1 peer-focus:text-primary peer-focus:text-[0.75rem] peer-[&:not(:placeholder-shown)]:-top-1 peer-[&:not(:placeholder-shown)]:text-primary peer-[&:not(:placeholder-shown)]:text-[0.75rem] pointer-events-none" 
                  htmlFor="name"
              >
                  Name
              </label>
            </div>
            
            <div className="relative group pt-4">
              <input 
                  className="w-full bg-transparent border-0 border-b border-[#F9EAE1] pb-2 pt-2 text-on-surface font-body-md focus:outline-none focus:border-primary focus:ring-0 transition-colors peer" 
                  id="email" 
                  name="email" 
                  required 
                  type="email"
                  placeholder=" "
              />
              <label 
                  className="absolute left-0 top-6 text-on-secondary-container font-label-sm text-label-sm transition-all duration-300 peer-focus:-top-1 peer-focus:text-primary peer-focus:text-[0.75rem] peer-[&:not(:placeholder-shown)]:-top-1 peer-[&:not(:placeholder-shown)]:text-primary peer-[&:not(:placeholder-shown)]:text-[0.75rem] pointer-events-none" 
                  htmlFor="email"
              >
                  Email Address
              </label>
            </div>
            
            <div className="relative pt-4 mb-4">
              <label className="font-label-sm text-label-sm text-on-secondary-container mb-2 block" htmlFor="subject">Subject</label>
              <select className="w-full bg-transparent border-0 border-b border-[#F9EAE1] pb-2 pt-2 text-on-surface font-body-md focus:outline-none focus:border-primary focus:ring-0 transition-colors" id="subject" name="subject">
                <option value="general">General Inquiry</option>
                <option value="wholesale">Wholesale</option>
                <option value="press">Press & Media</option>
                <option value="support">Customer Support</option>
              </select>
            </div>
            
            <div className="relative pt-4">
              <label className="font-label-sm text-label-sm text-on-secondary-container mb-2 block" htmlFor="message">Message</label>
              <textarea className="w-full bg-transparent border-0 border-b border-[#F9EAE1] pb-2 pt-2 text-on-surface font-body-md focus:outline-none focus:border-primary focus:ring-0 transition-colors resize-none" id="message" name="message" required rows={4}></textarea>
            </div>
            
            <button className="bg-primary-container text-on-primary font-label-sm text-label-sm rounded-full px-8 py-4 w-full md:w-auto hover:shadow-lg hover:-translate-y-[1px] transition-all duration-300 min-h-[48px] flex items-center justify-center gap-2" type="submit">
                Send Message <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </form>
        </section>

        {/* Right Column: Location & Info */}
        <section className="w-full md:w-1/2 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 mt-12 md:mt-0">
          {/* Glassmorphism Image Card */}
          <div className="relative rounded-xl overflow-hidden shadow-[0_10px_40px_rgba(176,42,80,0.04)] border border-[#F9EAE1] mb-12 bg-surface-container-lowest p-2 aspect-[4/3]">
            <div 
                className="w-full h-full rounded-lg bg-cover bg-center" 
                style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCW9wgaUczqKWoCqzMwIhwzHNXaf4c0nqcZIa-p9oQ20jof-kSkWoqM1rJhur7rc55dqSpcjilbjebfiDoHohsujnJlUmhV8Sr6nEeU3gCZevO-2O85sBFv_9Ps_WdrsaNdN8SU00WmTYe9lxM6LA4e4rL5iOTw_doh-K5i8snNJN7mMw90L7RowgX87LEy0bzArKu8QW69RSfF4zo2dGiBQ12_BsZZ73dQJwQAwyQjJd3iqABtTqwa')"}}
                title="A serene, minimalist botanical workspace bathed in soft natural light."
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/80 to-transparent flex items-end p-6 m-2 rounded-lg pointer-events-none">
              <p className="font-headline-md text-headline-md text-on-surface">Our Studio</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <h3 className="font-label-sm text-label-sm text-on-surface-variant mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px]">location_on</span> Visit Us
              </h3>
              <address className="font-body-md text-body-md text-on-surface not-italic leading-relaxed">
                  123 Botanical Way<br/>
                  Suite 400<br/>
                  Los Angeles, CA 90012
              </address>
            </div>
            <div>
              <h3 className="font-label-sm text-label-sm text-on-surface-variant mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px]">mail</span> Contact
              </h3>
              <p className="font-body-md text-body-md text-on-surface mb-2">hello@rangorose.com</p>
              <p className="font-body-md text-body-md text-on-surface">+1 (555) 123-4567</p>
            </div>
          </div>
          
          <div className="mt-12 pt-12 border-t border-[#F9EAE1]">
            <h3 className="font-label-sm text-label-sm text-on-surface-variant mb-6">Follow Our Journey</h3>
            <div className="flex gap-4">
              <a className="w-12 h-12 rounded-full border border-outline-variant flex items-center justify-center text-on-surface hover:border-primary hover:text-primary transition-colors duration-300" href="#">
                <span className="material-symbols-outlined">photo_camera</span>
              </a>
              <a className="w-12 h-12 rounded-full border border-outline-variant flex items-center justify-center text-on-surface hover:border-primary hover:text-primary transition-colors duration-300" href="#">
                <span className="material-symbols-outlined">forum</span>
              </a>
              <a className="w-12 h-12 rounded-full border border-outline-variant flex items-center justify-center text-on-surface hover:border-primary hover:text-primary transition-colors duration-300" href="#">
                <span className="material-symbols-outlined">mail</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
