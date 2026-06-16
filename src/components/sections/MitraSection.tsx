"use client";

import Image from "next/image";
import { useReveal } from "@/hooks/useScrollAnimation";

/* ── Daftar mitra dari public/image/mitra/ ── */
const mitraImages = [
  { src: "/image/mitra/maharatu.png",   alt: "Maharatu" },
  { src: "/image/mitra/packabagh.png",  alt: "Packabagh" },
  { src: "/image/mitra/teknos.png",     alt: "Teknos" },
  { src: "/image/mitra/woondypack.png", alt: "Woondypack" },
];

const HALF = [
  ...mitraImages,
  ...mitraImages,
  ...mitraImages,
  ...mitraImages,
];

function LogoItem({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="group relative shrink-0 w-32 h-14">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="128px"
        className="object-contain grayscale opacity-50 transition-all duration-500 ease-out group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
      />
    </div>
  );
}

export function MitraSection() {
  const eyebrowRef = useReveal(0);

  return (
    <section className="relative z-20 bg-white pt-2 pb-10 sm:pt-4 sm:pb-14">
      {/* ── Eyebrow label ── */}
      <div
        ref={eyebrowRef}
        className="reveal-fade opacity-0 mb-9 text-center"
      >
        <p className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.24em] text-navy/30 font-sans">
          <span className="block h-px w-8 bg-navy/15" />
          Dipercaya Oleh Mitra Terpercaya
          <span className="block h-px w-8 bg-navy/15" />
        </p>
      </div>

      {/* ── Marquee strip ── */}
      <div className="marquee-container relative overflow-hidden">
        {/* Fade — left edge */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 bottom-0 w-28 z-10 bg-linear-to-r from-white to-transparent"
        />
        {/* Fade — right edge */}
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 top-0 bottom-0 w-28 z-10 bg-linear-to-l from-white to-transparent"
        />

        <div className="animate-marquee flex items-center gap-16 w-max py-1">
          {/* Half A */}
          {HALF.map((m, i) => (
            <LogoItem key={`a-${i}`} src={m.src} alt={m.alt} />
          ))}
          {/* Half B — identical, creates the seamless loop */}
          {HALF.map((m, i) => (
            <LogoItem key={`b-${i}`} src={m.src} alt={m.alt} />
          ))}
        </div>
      </div>
    </section>
  );
}
