"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { categories } from "@/data/categories";
import { CategoryCard } from "@/components/organisms/CategoryCard";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function CatalogSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    // Heading animation
    if (headingRef.current) {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );
    }

    // Cards stagger
    if (cardsRef.current.length > 0) {
      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          stagger: 0.15,
          delay: 0.2,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );
    }
  }, []);

  return (
    <section id="categories" className="scroll-mt-20 bg-white py-32 lg:py-40 border-t border-navy/5">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Heading */}
        <div
          ref={headingRef}
          className="mx-auto max-w-3xl text-center opacity-0"
        >
          <div className="flex items-center justify-center gap-4 text-xs font-bold uppercase tracking-[0.25em] text-navy/40 mb-8">
            <span className="h-px w-8 bg-navy/20" />
            <span>04 / CATALOGUE</span>
            <span className="h-px w-8 bg-navy/20" />
          </div>
          <p className="mt-8 font-serif text-3xl md:text-4xl leading-snug text-navy">
            Koleksi Terkurasi Kami
          </p>
          <p className="mt-6 text-lg leading-relaxed text-navy/60 font-sans">
            Setiap lini produk kami dirancang agar fungsional, estetik, dan bisa
            disesuaikan sepenuhnya dengan tema momen berharga Anda.
          </p>
        </div>

        {/* Cards — equal height grid */}
        <div ref={containerRef} className="mt-20 lg:mt-24 grid items-stretch gap-8 lg:grid-cols-3">
          {categories.map((c, i) => (
            <div
              key={c.id}
              ref={(el) => {
                if (el) cardsRef.current[i] = el;
              }}
              className="flex opacity-0"
            >
              <CategoryCard category={c} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
