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

  // Lock the background page from scrolling while the full-screen mobile
  // menu is open, and always release the lock on unmount / route change.
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-margin-desktop h-16 bg-surface/50 backdrop-blur-lg border-b border-outline-variant/30 shadow-sm transition-all duration-300 ease-in-out md:flex hidden">
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
        <button className="bg-primary-container text-on-primary font-label-sm text-label-sm uppercase tracking-widest px-6 py-3 rounded-full hover:opacity-90 transition-opacity min-h-[48px] flex items-center justify-center hover:scale-105 active:scale-95 duration-300">
          Order Now
        </button>
      </nav>

      {/* Mobile Top Bar */}
      <div className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-margin-mobile h-16 bg-surface/50 backdrop-blur-lg border-b border-outline-variant/30 md:hidden">
        <Link
          href="/"
          className="font-headline-md text-headline-md text-primary italic"
        >
          Rango Rose
        </Link>
        <button
          className="text-on-surface p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span
            className="material-symbols-outlined"
            style={{ fontVariationSettings: "'FILL' 0" }}
          >
            {isMobileMenuOpen ? "close" : "menu"}
          </span>
        </button>
      </div>

      {/* Mobile Full Screen Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-surface pt-24 px-margin-mobile flex flex-col items-center md:hidden">
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
          <button className="mt-12 bg-primary-container text-on-primary font-label-sm text-label-sm uppercase tracking-widest px-8 py-4 rounded-full">
            Order Now
          </button>
        </div>
      )}
    </>
  );
}