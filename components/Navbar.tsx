"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/our-story", label: "Our Story" },
    { href: "/ingredients", label: "Ingredients" },
    { href: "/shop", label: "Shop" },
    { href: "/contact", label: "Contact" },
  ];

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const backgrounds = [...document.querySelectorAll<HTMLElement>("main, footer")];
    const previousInert = backgrounds.map(element => element.inert);
    backgrounds.forEach(element => { element.inert = true; });
    const toggle = document.querySelector<HTMLButtonElement>("button[aria-controls='mobile-navigation']");
    const links = [...document.querySelectorAll<HTMLAnchorElement>("#mobile-navigation a")];
    links[0]?.focus();
    const keydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setIsMobileMenuOpen(false); toggle?.focus(); }
      if (event.key === "Tab") {
        const last = links[links.length - 1];
        if (event.shiftKey && document.activeElement === toggle) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); toggle?.focus(); }
      }
    };
    const desktop = window.matchMedia("(min-width: 1024px)");
    const resize = () => { if (desktop.matches) setIsMobileMenuOpen(false); };
    window.addEventListener("keydown", keydown);
    desktop.addEventListener("change", resize);
    return () => {
      document.body.style.overflow = previousOverflow;
      backgrounds.forEach((element, index) => { element.inert = previousInert[index]; });
      window.removeEventListener("keydown", keydown);
      desktop.removeEventListener("change", resize);
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-margin-desktop h-16 bg-surface/50 backdrop-blur-lg border-b border-outline-variant/30 shadow-sm transition-all duration-300 ease-in-out lg:flex hidden">
        <Link
          href="/"
          className="font-headline-md text-headline-md text-primary tracking-tight italic"
        >
          Rango Rose
        </Link>
        <ul className="flex space-x-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`font-label-sm text-label-sm uppercase tracking-widest hover:opacity-80 transition-opacity ${isActive
                      ? "text-primary font-bold border-b-2 border-primary pb-1"
                      : "text-on-surface-variant hover:text-primary"
                    }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
        <Link href="/shop" className="bg-primary-container text-on-primary font-label-sm text-label-sm uppercase tracking-widest px-6 py-3 rounded-full hover:opacity-90 transition-opacity min-h-[48px] flex items-center justify-center hover:scale-105 active:scale-95 duration-300">
          Shop collection
        </Link>
      </nav>

      {/* Mobile Top Bar */}
      <div className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-margin-mobile h-16 bg-surface/50 backdrop-blur-lg border-b border-outline-variant/30 lg:hidden">
        <Link
          href="/"
          className="font-headline-md text-headline-md text-primary italic"
        >
          Rango Rose
        </Link>
        <button
          className="text-on-surface p-3 min-w-12 min-h-12"
          aria-label={isMobileMenuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d={isMobileMenuOpen ? "m6 6 12 12M6 18 18 6" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>

      {/* Mobile Full Screen Menu */}
      {isMobileMenuOpen && (
        <nav id="mobile-navigation" aria-label="Mobile navigation" className="fixed inset-0 z-40 bg-surface pt-24 px-margin-mobile flex flex-col items-center lg:hidden">
          <ul className="flex flex-col items-center space-y-8 mt-10">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`font-headline-md text-headline-md ${pathname === link.href
                      ? "text-primary"
                      : "text-on-surface-variant"
                    }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/shop" onClick={() => setIsMobileMenuOpen(false)} className="mt-12 bg-primary-container text-on-primary font-label-sm text-label-sm uppercase tracking-widest px-8 py-4 rounded-full">
            Shop collection
          </Link>
        </nav>
      )}
    </>
  );
}