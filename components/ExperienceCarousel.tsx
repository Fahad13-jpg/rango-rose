"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const images = [
  "/images/experience-1.jpg",
  "/images/experience-2.jpg",
  "/images/experience-3.jpg",
];

export default function ExperienceCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const [paused, setPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let visible = false;
    let timer: ReturnType<typeof setInterval> | undefined;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      clearInterval(timer);
      if (visible && !document.hidden && !motion.matches && !paused) {
        timer = setInterval(() => setCurrentIndex(index => (index + 1) % images.length), 5000);
      }
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); });
    if (containerRef.current) observer.observe(containerRef.current);
    document.addEventListener("visibilitychange", update);
    motion.addEventListener("change", update);
    return () => { clearInterval(timer); observer.disconnect(); document.removeEventListener("visibilitychange", update); motion.removeEventListener("change", update); };
  }, [paused]);

  return (
    <div ref={containerRef} role="region" aria-label="Rose experience slideshow" className="relative aspect-square w-full rounded-3xl shadow-xl overflow-hidden">
      {images.map((imgSrc, index) => (
        <Image
          fill
          quality={90}
          sizes="(max-width: 767px) 90vw, 45vw"
          key={imgSrc}
          src={imgSrc}
          alt={`Rose Experience ${index + 1}`}
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div className="absolute top-8 right-8 bg-rose-100/90 backdrop-blur text-rose-brand text-xs font-medium px-4 py-2 rounded-full shadow-sm flex items-center gap-2 z-10">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.653 16.915l-.005-.003-.019-.01a20.759 20.759 0 01-1.162-.682 22.045 22.045 0 01-2.582-1.9C4.045 12.733 2 10.352 2 7.5a4.5 4.5 0 018-2.828A4.5 4.5 0 0118 7.5c0 2.852-2.044 5.233-3.885 6.82a22.049 22.049 0 01-3.744 2.582l-.019.01-.005.003h-.002a.739.739 0 01-.69.001l-.002-.001z"></path>
        </svg>
        Floral Notes
      </div>
      <div className="absolute bottom-20 left-8 bg-white/90 backdrop-blur text-gray-700 text-xs font-medium px-4 py-2 rounded-full shadow-sm flex items-center gap-2 z-10">
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        Velvety Texture
      </div>
      <div className="absolute bottom-4 inset-x-0 z-20 flex justify-center gap-2">
        <button type="button" aria-label="Previous image" onClick={() => { setPaused(true); setCurrentIndex(index => (index + images.length - 1) % images.length); }} className="w-11 h-11 rounded-full bg-white/95 text-rose-brand flex items-center justify-center"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="m14 6-6 6 6 6" /></svg></button>
        <button type="button" aria-label={paused ? "Play slideshow" : "Pause slideshow"} onClick={() => setPaused(value => !value)} className="min-w-20 h-11 px-4 rounded-full bg-white/95 text-rose-brand text-sm">{paused ? "Play" : "Pause"}</button>
        <button type="button" aria-label="Next image" onClick={() => { setPaused(true); setCurrentIndex(index => (index + 1) % images.length); }} className="w-11 h-11 rounded-full bg-white/95 text-rose-brand flex items-center justify-center"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="m10 6 6 6-6 6" /></svg></button>
      </div>
    </div>
  );
}
