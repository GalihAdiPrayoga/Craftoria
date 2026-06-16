"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { buildWhatsAppLink } from "@/utils/whatsapp";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Entrance animations
      const items = contentRef.current!.querySelectorAll(".animate-item");
      gsap.fromTo(
        items,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.12,
          delay: 0.15,
        }
      );
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
        <div ref={contentRef} className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8 z-10">
              <div className="animate-item space-y-3">
                <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold text-white leading-[1.08] tracking-tight text-balance">
                  Desain Eksklusif untuk Setiap Momen
                </h1>
              </div>

              <p className="animate-item text-lg text-white/60 leading-relaxed max-w-xl">
                Kami menyediakan solusi souvenir dan merchandise premium dengan desain kustom yang estetik, berkualitas tinggi, dan disesuaikan dengan kebutuhan unik Anda.
              </p>

              {/* CTA Buttons */}
              <div className="animate-item flex flex-col sm:flex-row gap-4 pt-2">
                <a
                  href={buildWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-cream text-navy px-8 py-4 rounded-lg font-semibold hover:bg-cream-light transition-all duration-300 group shadow-lg hover:shadow-xl"
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

              {/* Value props */}
              <div className="animate-item grid grid-cols-3 gap-3 sm:gap-6 pt-8 border-t border-white/10">
                {[
                  { label: "100% Custom", sub: "Desain milik Anda" },
                  { label: "Cetak Premium", sub: "Hasil bersih & tajam" },
                  { label: "Konsultasi Gratis", sub: "Dampingi dari ide" },
                ].map((v) => (
                  <div key={v.label}>
                    <p className="font-display text-sm sm:text-base font-semibold text-white leading-tight">{v.label}</p>
                    <p className="text-xs sm:text-sm text-white/50 mt-1">{v.sub}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Visual with Image and Shadow Effect */}
            <div className="animate-item relative h-96 md:h-[450px] lg:h-[480px] flex items-center lg:items-start justify-center mt-16 lg:mt-8">
              {/* Glow effects */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white/5 rounded-full blur-3xl -z-10"></div>
              <div className="absolute -left-10 top-1/4 w-60 h-60 bg-cream/10 rounded-full blur-3xl -z-10"></div>

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

        {/* Decorative bottom gradient */}
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-navy-mid rounded-full blur-3xl opacity-30 -z-10"></div>
      </section>
    </>
  );
}