"use client";

import { useState, useEffect } from "react";

const images = [
  "/images/experience-1.jpg",
  "/images/experience-2.jpg",
  "/images/experience-3.jpg",
];

export default function ExperienceCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative aspect-square w-full rounded-3xl shadow-xl overflow-hidden">
      {images.map((imgSrc, index) => (
        <img
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
      <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur text-gray-700 text-xs font-medium px-4 py-2 rounded-full shadow-sm flex items-center gap-2 z-10">
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
    </div>
  );
}
