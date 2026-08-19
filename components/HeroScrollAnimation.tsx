"use client";

import { useEffect, useRef, useCallback } from "react";
import Link from "next/link";

export default function HeroScrollAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);
  const rafIdRef = useRef<number>(0);
  const lastDrawnFrameRef = useRef(-1);
  const canvasSizeRef = useRef({ w: 0, h: 0 });
  const totalFrames = 140;
  const frameStep = 2;
  const frameCount = Math.floor(totalFrames / frameStep); // 70 frames

  // Lerp helper for smooth interpolation
  const lerp = (start: number, end: number, factor: number) =>
    start + (end - start) * factor;

  // Draw a specific frame to canvas
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const img = imagesRef.current[frameIndex];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    // Only resize canvas when display size actually changes (expensive operation)
    const displayW = canvas.clientWidth;
    const displayH = canvas.clientHeight;
    if (canvasSizeRef.current.w !== displayW || canvasSizeRef.current.h !== displayH) {
      canvas.width = displayW;
      canvas.height = displayH;
      canvasSizeRef.current = { w: displayW, h: displayH };
    }

    // Cover mode: fill full width/height, no side padding
    const scale = Math.max(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight);
    const x = (canvas.width - img.naturalWidth * scale) / 2;
    const y = (canvas.height - img.naturalHeight * scale) / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, x, y, img.naturalWidth * scale, img.naturalHeight * scale);
  }, []);

  // Preload images with priority: first frame loads first, then rest in order
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = new Array(frameCount);

    // Load first frame with highest priority
    const firstImg = new Image();
    const firstFrameNumber = "001";
    firstImg.src = `/frames/frame_${firstFrameNumber}.png`;
    firstImg.onload = () => {
      loadedImages[0] = firstImg;
      imagesRef.current = loadedImages;
      drawFrame(0);
    };
    loadedImages[0] = firstImg;

    // Load remaining frames
    for (let idx = 1; idx < frameCount; idx++) {
      const frameNum = (idx * frameStep + 1).toString().padStart(3, "0");
      const img = new Image();
      img.src = `/frames/frame_${frameNum}.png`;
      loadedImages[idx] = img;
    }

    imagesRef.current = loadedImages;
  }, [frameCount, drawFrame]);

  // Continuous animation loop using lerp for buttery smooth frame transitions
  useEffect(() => {
    const animate = () => {
      // Smoothly interpolate current frame toward target frame
      // Factor of 0.12 gives a nice smooth ease-out feel
      currentFrameRef.current = lerp(
        currentFrameRef.current,
        targetFrameRef.current,
        0.12
      );

      const roundedFrame = Math.round(currentFrameRef.current);

      // Only redraw if the frame actually changed
      if (roundedFrame !== lastDrawnFrameRef.current) {
        const clampedFrame = Math.max(0, Math.min(frameCount - 1, roundedFrame));
        drawFrame(clampedFrame);
        lastDrawnFrameRef.current = roundedFrame;
      }

      // Update text opacity and parallax
      const progress = currentFrameRef.current / (frameCount - 1);
      const textContainer = document.getElementById("hero-text-content");
      if (textContainer) {
        const textOpacity = Math.max(0, Math.min(1, 1 - progress / 0.3));
        textContainer.style.opacity = textOpacity.toString();
        textContainer.style.transform = `translateY(${progress * 100}px)`;
      }

      rafIdRef.current = requestAnimationFrame(animate);
    };

    rafIdRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [frameCount, drawFrame]);

  // Scroll handler: only updates the target frame (lightweight)
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const scrollPosition = -rect.top;
      const totalScrollableDistance = rect.height - window.innerHeight;

      let progress = scrollPosition / totalScrollableDistance;
      progress = Math.max(0, Math.min(1, progress));

      // Set the target frame — the animation loop will smoothly interpolate to it
      targetFrameRef.current = progress * (frameCount - 1);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => window.removeEventListener("scroll", handleScroll);
  }, [frameCount]);

  return (
    <div ref={containerRef} className="relative h-[400vh] w-full bg-[#f8eef1]">
      <div className="sticky top-0 h-screen w-full overflow-hidden curved-bottom">

        {/* Soft Pink Gradient & Glow */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#fadce5] via-[#f7bacd] to-[#fae0e4]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-[#ffffff] opacity-30 blur-[100px] rounded-full z-0 pointer-events-none"></div>

        {/* Canvas for sequence animation */}
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
            <h1 className="font-serif text-5xl md:text-7xl font-semibold text-rose-brand drop-shadow-sm mb-6 leading-tight">
              Indulge in Floral <br /> Sophistication
            </h1>
            <p className="text-lg md:text-xl text-on-surface-variant drop-shadow-sm mb-10 font-light max-w-2xl">
              The perfect harmony of farm-fresh milk and delicate rose petals, crafted for an elevated sensory experience.
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
