"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { buildWhatsAppLink } from "@/utils/whatsapp";
import { CountUp } from "@/components/atoms/CountUp";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ── Particle Canvas ────────────────────────────────────────────
   Floating cream-colored dots that drift upward in the hero BG.
   Automatically skipped on prefers-reduced-motion.               */
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    interface Particle {
      x: number; y: number;
      r: number;
      vx: number; vy: number;
      opacity: number;
    }

    const COUNT = 55;
    const particles: Particle[] = Array.from({ length: COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.4 + 0.4,
      vx: (Math.random() - 0.5) * 0.25,
      vy: -(Math.random() * 0.35 + 0.08),
      opacity: Math.random() * 0.35 + 0.08,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(244,237,217,${p.opacity})`;
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy;

        if (p.y < -6) { p.y = canvas.height + 6; p.x = Math.random() * canvas.width; }
        if (p.x < -6) p.x = canvas.width + 6;
        if (p.x > canvas.width + 6) p.x = -6;
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}

/* ── HeroSection ─────────────────────────────────────────────── */
export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      /* Entrance stagger */
      const items = contentRef.current!.querySelectorAll(".animate-item");
      gsap.fromTo(
        items,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.12,
          delay: 0.15,
        }
      );

      /* Image parallax — image drifts up slower than page scroll */
      if (imageWrapRef.current && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.to(imageWrapRef.current, {
          yPercent: -12,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        id="hero"
        ref={sectionRef}
        className="relative flex min-h-[88vh] items-center overflow-hidden bg-navy pt-24 sm:pt-28 pb-16 lg:pb-20"
      >
        {/* ── Particles ── */}
        <ParticleCanvas />

        {/* ── Animated background orbs ── */}
        {/* Orb 1 — large, centre-right */}
        <div
          aria-hidden
          className="animate-orb-1 absolute right-[-80px] top-1/4 w-[480px] h-[480px] rounded-full bg-navy-mid opacity-60 blur-3xl z-0 pointer-events-none"
        />
        {/* Orb 2 — medium, left */}
        <div
          aria-hidden
          className="animate-orb-2 absolute left-[-60px] bottom-1/4 w-[320px] h-[320px] rounded-full bg-cream opacity-[0.04] blur-3xl pointer-events-none"
        />
        {/* Orb 3 — small, top-left accent */}
        <div
          aria-hidden
          className="animate-orb-3 absolute left-1/3 top-[10%] w-[200px] h-[200px] rounded-full bg-navy-soft opacity-40 blur-2xl pointer-events-none"
        />

        <div ref={contentRef} className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">

            {/* ── Left Content ── */}
            <div className="space-y-8 z-10">
              <div className="animate-item space-y-3">
                <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold text-white leading-[1.08] tracking-tight text-balance">
                  Desain Eksklusif untuk Setiap Momen
                </h1>
              </div>

              <p className="animate-item text-lg text-white/60 leading-relaxed max-w-xl">
                Kami menyediakan solusi souvenir dan merchandise premium dengan
                desain kustom yang estetik, berkualitas tinggi, dan disesuaikan
                dengan kebutuhan unik Anda.
              </p>

              {/* CTA Buttons */}
              <div className="animate-item flex flex-col sm:flex-row gap-4 pt-2">
                <a
                  href={buildWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-shimmer inline-flex items-center justify-center bg-cream text-navy px-8 py-4 rounded-lg font-semibold hover:bg-cream-light transition-all duration-300 group shadow-lg hover:shadow-xl"
                >
                  Konsultasi Sekarang
                  <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="#gallery"
                  className="inline-flex items-center justify-center border-2 border-white/30 text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 hover:border-white/60 transition-all duration-300 hover:shadow-lg"
                >
                  Lihat Galeri
                </a>
              </div>

              {/* Value props with CountUp */}
              <div className="animate-item grid grid-cols-3 gap-3 sm:gap-6 pt-8 border-t border-white/10">
                {[
                  {
                    label: <><CountUp target={100} suffix="%" /> Custom</>,
                    sub: "Desain milik Anda",
                  },
                  {
                    label: "Cetak Premium",
                    sub: "Hasil bersih & tajam",
                  },
                  {
                    label: "Konsultasi Gratis",
                    sub: "Dampingi dari ide",
                  },
                ].map((v, i) => (
                  <div key={i}>
                    <p className="font-display text-sm sm:text-base font-semibold text-white leading-tight">
                      {v.label}
                    </p>
                    <p className="text-xs sm:text-sm text-white/50 mt-1">{v.sub}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right Visual — product photo with parallax ── */}
            <div
              ref={imageWrapRef}
              className="animate-item relative h-96 md:h-[450px] lg:h-[480px] flex items-center lg:items-start justify-center mt-16 lg:mt-8"
            >
              <div className="animate-float z-10">
                <div className="relative w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px] lg:w-[450px] lg:h-[450px] rotate-6 bg-white p-3 md:p-5 pb-12 md:pb-16 rounded-xl shadow-2xl shadow-black/50 transition-all duration-500 hover:rotate-0 hover:scale-[1.03] hover:-translate-y-2 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] cursor-pointer">
                  <div className="relative w-full h-full overflow-hidden rounded-sm bg-navy/5">
                    <Image
                      src="/image/hero/Hero.webp"
                      alt="Premium souvenir merchandise collection"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}