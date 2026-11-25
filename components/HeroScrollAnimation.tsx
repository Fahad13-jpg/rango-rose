"use client";
/* eslint-disable @next/next/no-img-element -- The pixel-identical poster shares the canvas source and must not be recompressed or resized. */

import { useEffect, useRef } from "react";
import Link from "next/link";

type DecodedFrame = ImageBitmap | HTMLImageElement;
const FRAME_COUNT = 140;
const OVERVIEW_FRAMES = [139, 70, 35, 105, 17, 52, 87, 122];

export default function HeroScrollAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const posterRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const poster = posterRef.current;
    const text = textRef.current;
    if (!container || !canvas || !poster || !text) return;
    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobile = window.matchMedia("(max-width: 767px)");
    const frames = new Map<number, DecodedFrame>();
    const loading = new Map<number, AbortController>();
    const warmed = new Set<number>();
    const failures = new Map<number, number>();
    let queue: number[] = [];
    let disposed = false;
    let visible = true;
    let raf = 0;
    let previousTime = 0;
    let current = 0;
    let target = 0;
    let requestedFrame = -1;
    let drawnFrame = -1;
    let start = 0;
    let distance = 1;

    const release = (frame: DecodedFrame) => {
      if ("close" in frame) frame.close();
    };
    const trimCache = () => {
      const limit = mobile.matches ? 12 : 20;
      const desired = Math.round(target * (FRAME_COUNT - 1));
      const evictable = [...frames.keys()].filter(index => index !== 0)
        .sort((a, b) => Math.abs(b - desired) - Math.abs(a - desired));
      while (frames.size > limit && evictable.length) {
        const index = evictable.shift()!;
        release(frames.get(index)!);
        frames.delete(index);
      }
    };
    const canAnimate = () => !disposed && visible && !document.hidden && !motion.matches;
    const schedule = () => {
      if (!raf && canAnimate()) raf = requestAnimationFrame(tick);
    };
    const decode = async (blob: Blob): Promise<DecodedFrame> => {
      if (typeof createImageBitmap === "function") {
        try { return await createImageBitmap(blob); } catch { /* Safari fallback below. */ }
      }
      const url = URL.createObjectURL(blob);
      try {
        const image = new Image();
        image.decoding = "async";
        image.src = url;
        await image.decode();
        return image;
      } finally { URL.revokeObjectURL(url); }
    };
    const pump = () => {
      if (!canAnimate()) return;
      const concurrency = mobile.matches ? 2 : 3;
      while (loading.size < concurrency && queue.length) {
        const index = queue.shift()!;
        if (frames.has(index) || loading.has(index) || (failures.get(index) || 0) >= 2) continue;
        const controller = new AbortController();
        loading.set(index, controller);
        const timeout = window.setTimeout(() => controller.abort(), 15000);
        void fetch(`/frames/sequence-v1/frame_${String(index + 1).padStart(3, "0")}.webp`, {
          signal: controller.signal,
          cache: "force-cache",
        }).then(response => {
          if (!response.ok) throw new Error("Frame unavailable");
          return response.blob();
        }).then(decode).then(image => {
          if (disposed) { release(image); return; }
          frames.set(index, image);
          warmed.add(index);
          trimCache();
          schedule(); // Retry the desired frame when its decode completes.
        }).catch(() => {
          if (!disposed) failures.set(index, (failures.get(index) || 0) + 1);
        }).finally(() => {
          window.clearTimeout(timeout);
          loading.delete(index);
          pump();
        });
      }
    };
    const requestFrames = (desired: number) => {
      const radius = mobile.matches ? 3 : 5;
      const priorities = [desired];
      for (let offset = 1; offset <= radius; offset++) {
        priorities.push(desired + offset, desired - offset);
      }
      priorities.push(...OVERVIEW_FRAMES.filter(index => !warmed.has(index)));
      queue = [...new Set(priorities)].filter(index => index > 0 && index < FRAME_COUNT &&
        !frames.has(index) && !loading.has(index) && (failures.get(index) || 0) < 2);
      pump();
    };
    const draw = (desired: number) => {
      let nearest = -1;
      for (const index of frames.keys()) {
        if (nearest < 0 || Math.abs(index - desired) < Math.abs(nearest - desired)) nearest = index;
      }
      if (nearest < 0 || nearest === drawnFrame) return;
      const image = frames.get(nearest)!;
      const width = "naturalWidth" in image ? image.naturalWidth : image.width;
      const height = "naturalHeight" in image ? image.naturalHeight : image.height;
      const scale = Math.max(canvas.width / width, canvas.height / height);
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, (canvas.width - width * scale) / 2,
        (canvas.height - height * scale) / 2, width * scale, height * scale);
      drawnFrame = nearest; // Never mark an unavailable frame as drawn.
      canvas.style.visibility = "visible";
      poster.style.visibility = "hidden";
    };
    function tick(time: number) {
      raf = 0;
      if (!canAnimate()) return;
      const elapsed = previousTime ? Math.min(time - previousTime, 50) : 16.67;
      previousTime = time;
      // Time-based easing feels consistent on 60Hz and 120Hz screens.
      current += (target - current) * (1 - Math.exp(-elapsed / 55));
      if (Math.abs(target - current) < 0.0001) current = target;
      const desired = Math.round(current * (FRAME_COUNT - 1));
      if (desired !== requestedFrame) {
        requestedFrame = desired;
        requestFrames(desired);
      }
      draw(desired);
      text!.style.opacity = String(Math.max(0, 1 - current / 0.3));
      text!.style.transform = `translate3d(0, ${current * 100}px, 0)`;
      text!.style.visibility = current >= 0.3 ? "hidden" : "visible";
      if (current !== target) schedule(); // No perpetual idle animation loop.
      else previousTime = 0;
    }
    const updateTarget = () => {
      target = Math.max(0, Math.min(1, (window.scrollY - start) / distance));
      schedule();
    };
    const measure = () => {
      const rect = container.getBoundingClientRect();
      start = rect.top + window.scrollY;
      distance = Math.max(1, rect.height - window.innerHeight);
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      // Backing pixels above the source resolution add cost, not detail.
      const ratio = Math.min(window.devicePixelRatio || 1, 2, 1280 / width, 720 / height);
      canvas.width = Math.max(1, Math.round(width * ratio));
      canvas.height = Math.max(1, Math.round(height * ratio));
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = "high";
      drawnFrame = -1;
      requestedFrame = -1;
      trimCache();
      updateTarget();
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
      previousTime = 0;
    };
    const visibilityChange = () => {
      if (document.hidden) stop();
      else { updateTarget(); pump(); }
    };
    const motionChange = () => {
      stop();
      if (motion.matches) {
        queue = [];
        for (const controller of loading.values()) controller.abort();
        canvas.style.visibility = "hidden";
        poster.style.visibility = "visible";
        text.style.opacity = "1";
        text.style.transform = "none";
        text.style.visibility = "visible";
      } else { measure(); pump(); }
    };
    const posterReady = () => {
      if (disposed || !poster.naturalWidth) return;
      frames.set(0, poster);
      schedule();
    };
    poster.addEventListener("load", posterReady);
    if (poster.complete) posterReady();
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(container);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) { updateTarget(); pump(); } else stop();
    });
    intersectionObserver.observe(container);
    window.addEventListener("scroll", updateTarget, { passive: true });
    window.addEventListener("resize", measure, { passive: true });
    document.addEventListener("visibilitychange", visibilityChange);
    motion.addEventListener("change", motionChange);
    measure();
    return () => {
      disposed = true;
      stop();
      queue = [];
      for (const controller of loading.values()) controller.abort();
      for (const image of frames.values()) release(image);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      poster.removeEventListener("load", posterReady);
      window.removeEventListener("scroll", updateTarget);
      window.removeEventListener("resize", measure);
      document.removeEventListener("visibilitychange", visibilityChange);
      motion.removeEventListener("change", motionChange);
    };
  }, []);

  return (
    <div ref={containerRef} className="hero-sequence relative w-full bg-[#f8eef1]">
      <div className="hero-sequence-stage sticky top-0 w-full overflow-hidden curved-bottom">

        {/* Soft Pink Gradient & Glow */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#fadce5] via-[#f7bacd] to-[#fae0e4]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-[#ffffff] opacity-30 blur-[100px] rounded-full z-0 pointer-events-none"></div>

        {/* The first frame is visible before JavaScript or the sequence loads. */}
        <img
          ref={posterRef}
          src="/frames/sequence-v1/frame_001.webp"
          width={1280}
          height={720}
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          decoding="async"
          className="hero-sequence-media z-10 mix-blend-multiply opacity-90 object-cover"
        />
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="hero-sequence-media z-10 mix-blend-multiply opacity-90 invisible"
        />

        {/* Text Overlay */}
        <div className="absolute inset-0 z-20 flex items-center justify-center pt-20 pb-32 px-6 pointer-events-none">
          <div
            ref={textRef}
            className="flex flex-col items-center text-center animate-in fade-in duration-1000 ease-out"
          >
            <h1 className="font-serif text-5xl md:text-7xl font-semibold text-rose-950 [text-shadow:0_2px_16px_rgba(255,255,255,0.85),0_1px_4px_rgba(255,255,255,0.9)] mb-6 leading-tight">
              Indulge in Floral <br /> Sophistication
            </h1>
            <p className="text-lg md:text-xl text-rose-950/90 [text-shadow:0_1px_10px_rgba(255,255,255,0.8)] mb-10 max-w-xl leading-relaxed">
              Rose petals steeped slow, folded into fresh milk until it&apos;s
              smooth enough to sip and <span className="text-rose-brand font-medium">rich enough to remember</span>.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pointer-events-auto">
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