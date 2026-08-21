"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import Link from "next/link";

export default function HeroScrollAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);
  const rafIdRef = useRef<number>(0);
  const lastDrawnFrameRef = useRef(-1);
  const canvasSizeRef = useRef({ w: 0, h: 0, dpr: 1 });
  const isVisibleRef = useRef(true);
  const scrollTickingRef = useRef(false);

  const totalFrames = 140;

  // Fewer frames on small screens: less bandwidth, faster first paint,
  // and a lighter scroll experience on phones.
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [ready, setReady] = useState(false);

  const frameStep = isMobile ? 4 : 2;
  const frameCount = Math.floor(totalFrames / frameStep);

  const lerp = (start: number, end: number, factor: number) =>
    start + (end - start) * factor;

  // Detect viewport size + reduced-motion preference once on mount.
  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 767px)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    setIsMobile(mobileQuery.matches);
    setReducedMotion(motionQuery.matches);
    setReady(true);

    const handleMobileChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    const handleMotionChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);

    mobileQuery.addEventListener("change", handleMobileChange);
    motionQuery.addEventListener("change", handleMotionChange);

    return () => {
      mobileQuery.removeEventListener("change", handleMobileChange);
      motionQuery.removeEventListener("change", handleMotionChange);
    };
  }, []);

  // Draw a specific frame to canvas, at device-pixel resolution for crisp
  // rendering on retina/high-DPR phones (capped at 2x to keep it cheap).
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const img = imagesRef.current[frameIndex];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const displayW = canvas.clientWidth;
    const displayH = canvas.clientHeight;
    const targetW = Math.round(displayW * dpr);
    const targetH = Math.round(displayH * dpr);

    const sizeChanged =
      canvasSizeRef.current.w !== targetW ||
      canvasSizeRef.current.h !== targetH ||
      canvasSizeRef.current.dpr !== dpr;

    if (sizeChanged) {
      canvas.width = targetW;
      canvas.height = targetH;
      canvasSizeRef.current = { w: targetW, h: targetH, dpr };
    }

    const scale = Math.max(
      canvas.width / img.naturalWidth,
      canvas.height / img.naturalHeight
    );
    const x = (canvas.width - img.naturalWidth * scale) / 2;
    const y = (canvas.height - img.naturalHeight * scale) / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, x, y, img.naturalWidth * scale, img.naturalHeight * scale);
  }, []);

  // Preload frames, adaptive to device. First frame loads with priority so
  // there's something on screen immediately.
  useEffect(() => {
    if (!ready) return;

    const loadedImages: HTMLImageElement[] = new Array(frameCount);

    const firstImg = new Image();
    firstImg.src = "/frames/frame_001.png";
    firstImg.onload = () => {
      loadedImages[0] = firstImg;
      imagesRef.current = loadedImages;
      drawFrame(0);
    };
    loadedImages[0] = firstImg;

    if (!reducedMotion) {
      for (let idx = 1; idx < frameCount; idx++) {
        const frameNum = (idx * frameStep + 1).toString().padStart(3, "0");
        const img = new Image();
        img.src = `/frames/frame_${frameNum}.png`;
        loadedImages[idx] = img;
      }
    }

    imagesRef.current = loadedImages;
  }, [ready, reducedMotion, frameCount, frameStep, drawFrame]);

  // Pause the animation loop entirely when the hero has scrolled out of
  // view — no point burning CPU/battery animating something unseen.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  // Continuous animation loop using lerp for smooth frame transitions.
  // Skipped entirely when the user prefers reduced motion.
  useEffect(() => {
    if (!ready || reducedMotion) return;

    const animate = () => {
      if (isVisibleRef.current) {
        currentFrameRef.current = lerp(
          currentFrameRef.current,
          targetFrameRef.current,
          0.18
        );

        const roundedFrame = Math.round(currentFrameRef.current);

        if (roundedFrame !== lastDrawnFrameRef.current) {
          const clampedFrame = Math.max(0, Math.min(frameCount - 1, roundedFrame));
          drawFrame(clampedFrame);
          lastDrawnFrameRef.current = roundedFrame;
        }

        const progress = currentFrameRef.current / (frameCount - 1);
        const textContainer = document.getElementById("hero-text-content");
        if (textContainer) {
          const textOpacity = Math.max(0, Math.min(1, 1 - progress / 0.3));
          textContainer.style.opacity = textOpacity.toString();
          textContainer.style.transform = `translateY(${progress * 100}px)`;
        }
      }

      rafIdRef.current = requestAnimationFrame(animate);
    };

    rafIdRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [ready, reducedMotion, frameCount, drawFrame]);

  // Scroll handler: throttled to one calculation per animation frame so it
  // never runs more often than the browser can actually paint.
  useEffect(() => {
    if (reducedMotion) return;

    const handleScroll = () => {
      if (scrollTickingRef.current) return;
      scrollTickingRef.current = true;

      requestAnimationFrame(() => {
        if (!containerRef.current) {
          scrollTickingRef.current = false;
          return;
        }

        const rect = containerRef.current.getBoundingClientRect();
        const scrollPosition = -rect.top;
        const totalScrollableDistance = rect.height - window.innerHeight;

        let progress = scrollPosition / totalScrollableDistance;
        progress = Math.max(0, Math.min(1, progress));

        targetFrameRef.current = progress * (frameCount - 1);
        scrollTickingRef.current = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [frameCount, reducedMotion]);

  // Reduced-motion users get a normal 100vh hero with a static image and no
  // scroll-jacking. Everyone else gets a shorter scroll distance on mobile
  // (250vh) than desktop (400vh) — long scroll-jacked sections feel heavy
  // and sluggish on a phone's shorter viewport and touch-scroll physics.
  const containerHeightClass = reducedMotion
    ? "h-screen"
    : isMobile
      ? "h-[250vh]"
      : "h-[400vh]";

  return (
    <div ref={containerRef} className={`relative ${containerHeightClass} w-full bg-[#f8eef1]`}>
      <div className="sticky top-0 h-screen w-full overflow-hidden curved-bottom">

        {/* Soft Pink Gradient & Glow */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#fadce5] via-[#f7bacd] to-[#fae0e4]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-[#ffffff] opacity-30 blur-[100px] rounded-full z-0 pointer-events-none"></div>

        {/* Canvas for sequence animation (static single frame if reduced motion) */}
        <canvas
          ref={canvasRef}
          className="absolute top-16 left-0 w-full h-[calc(100%-64px)] z-10 mix-blend-multiply opacity-90"
        />

        {/* Text Overlay */}
        <div className="absolute inset-0 z-20 flex items-center justify-center pt-20 pb-32 px-6">
          <div
            id="hero-text-content"
            className="flex flex-col items-center text-center animate-in fade-in duration-1000 ease-out"
          >
            <h1 className="font-serif text-5xl md:text-7xl font-semibold text-rose-950 [text-shadow:0_2px_16px_rgba(255,255,255,0.85),0_1px_4px_rgba(255,255,255,0.9)] mb-6 leading-tight">
              Indulge in Floral <br /> Sophistication
            </h1>
            <p className="text-lg md:text-xl text-rose-950/90 [text-shadow:0_1px_10px_rgba(255,255,255,0.8)] mb-10 max-w-xl leading-relaxed">
              Rose petals steeped slow, folded into fresh milk until it&apos;s
              smooth enough to sip and <span className="text-rose-brand font-medium">rich enough to remember</span>.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/shop"
                className="bg-rose-brand hover:bg-rose-900 text-white px-8 py-3 rounded-full font-medium transition-colors shadow-lg hover:scale-105 transform duration-300"
              >
                Shop Rango Rose
              </Link>
              <Link
                href="/our-story"
                className="bg-white/60 hover:bg-white/80 backdrop-blur-md text-rose-brand border border-rose-200 px-8 py-3 rounded-full font-medium transition-colors shadow-lg hover:scale-105 transform duration-300"
              >
                Discover the Flavour
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}