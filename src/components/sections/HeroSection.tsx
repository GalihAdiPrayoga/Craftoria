"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { MessageCircle } from "lucide-react";
import { site } from "@/data/site";
import { buildWhatsAppLink } from "@/utils/whatsapp";
import { Heading } from "@/components/atoms/Heading";
import { Button } from "@/components/atoms/Button";

const meta = ["Custom Design", "Cetak Digital Premium", "Mojokerto, Jawa Timur"];

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const items = containerRef.current.querySelectorAll(".animate-item");
    gsap.fromTo(
      items,
      { opacity: 0, y: 12 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.12,
        delay: 0.1,
      }
    );
  }, []);

  return (
    <section id="hero" className="relative overflow-hidden bg-cream-light">
      <div className="mx-auto max-w-6xl px-6 pt-2 pb-32 lg:px-8 lg:pt-24 lg:pb-44">
        <div ref={containerRef} className="flex flex-col items-start">
          {/* Eyebrow — hairline + label */}
          <div className="animate-item mb-8 flex items-center gap-3">
            <span className="h-px w-8 bg-navy/30" />
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-navy/50">
              {site.tagline}
            </span>
          </div>

          {/* Headline — sans, restrained weight, sharp tracking */}
          <div className="animate-item">
            <Heading
              level="h1"
              variant="sans"
              className="max-w-3xl text-4xl font-medium leading-[1.12] tracking-tight text-navy/90 sm:text-5xl lg:text-6xl"
            >
              Souvenir &amp; merchandise yang berkesan,
              <span className="text-navy/40">
                {" "}
                untuk momen yang layak dikenang.
              </span>
            </Heading>
          </div>

          {/* Subheading */}
          <p className="animate-item mt-8 max-w-md text-base leading-relaxed text-navy/60">
            {site.description}
          </p>

          {/* CTAs — one solid pill + one quiet underline-grow link */}
          <div className="animate-item mt-12 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-8">
            <Button
              variant="primary-navy"
              size="lg"
              icon={MessageCircle}
              href={buildWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
            >
              Konsultasi Gratis
            </Button>

            <a
              href="#categories"
              className="group relative text-sm font-semibold tracking-wide text-navy/80 transition-colors duration-300 hover:text-navy"
            >
              Lihat Katalog
              <span className="ml-1 inline-block transition-transform duration-500 group-hover:translate-x-1">
                →
              </span>
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-navy transition-all duration-500 group-hover:w-full" />
            </a>
          </div>

          {/* Quiet meta strip — labels, not loud stat numbers */}
          <div className="animate-item mt-20 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-navy/10 pt-8 text-xs font-semibold uppercase tracking-[0.18em] text-navy/45">
            {meta.map((label, i) => (
              <span key={label} className="flex items-center gap-6">
                {i > 0 && (
                  <span className="hidden h-3 w-px bg-navy/15 sm:block" />
                )}
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
