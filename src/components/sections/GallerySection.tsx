"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { galleryImages } from "@/data/gallery";
import { GalleryTabs, type GalleryFilter } from "@/components/molecules/GalleryTabs";
import { Lightbox } from "@/components/organisms/Lightbox";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function GallerySection() {
  const [filter, setFilter] = useState<GalleryFilter>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  const visible = useMemo(
    () =>
      filter === "all"
        ? galleryImages
        : galleryImages.filter((g) => g.category === filter),
    [filter]
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: { trigger: headingRef.current, start: "top 85%", once: true },
          }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="gallery" className="relative z-20 scroll-mt-20 bg-white pt-24 pb-16 lg:pt-32 lg:pb-24 border-t border-navy/5">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Heading */}
        <div ref={headingRef} className="reveal-fade mx-auto max-w-2xl text-center opacity-0">
          <div className="flex items-center justify-center gap-4 text-xs font-bold uppercase tracking-[0.25em] text-navy/40 mb-6">
            <span className="h-px w-8 bg-navy/20" />
            <span>04 / GALERI</span>
            <span className="h-px w-8 bg-navy/20" />
          </div>
          <p className="font-serif text-3xl md:text-4xl leading-snug text-navy">
            Koleksi Karya Kami
          </p>
          <p className="mt-5 text-base leading-relaxed text-navy/60 font-sans">
            Hasil nyata souvenir &amp; merchandise custom Craftoria. Klik foto untuk memperbesar.
          </p>
        </div>

        {/* Tabs */}
        <div className="mt-10">
          <GalleryTabs active={filter} onChange={setFilter} />
        </div>

        {/* Masonry grid (CSS columns) */}
        {visible.length === 0 ? (
          <p className="mt-16 text-center text-navy/50">Belum ada foto untuk kategori ini.</p>
        ) : (
          <div className="mt-10 gap-4 [column-count:2] md:[column-count:3] lg:[column-count:4]">
            {visible.map((img, i) => {
              // Create varied aspect ratios to achieve a random masonry feel
              const aspectClasses = [
                "aspect-[3/4]",
                "aspect-square",
                "aspect-[4/5]",
                "aspect-[4/3]",
                "aspect-[5/7]",
                "aspect-[1/1]"
              ];
              // Only apply varied aspect ratios if filter is 'all'
              const isAll = filter === "all";
              const aspectClass = isAll ? aspectClasses[(i * 7) % aspectClasses.length] : "aspect-[3/4]";

              return (
                <button
                  key={img.src}
                  type="button"
                  onClick={() => setLightboxIndex(i)}
                  aria-label={`Perbesar: ${img.alt}`}
                  className={`group mb-4 block w-full overflow-hidden rounded-xl border border-navy/8 bg-cream-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy ${aspectClass}`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={600}
                    height={800}
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </button>
              );
            })}
          </div>
        )}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={visible}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </section>
  );
}
