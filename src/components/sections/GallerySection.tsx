"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { galleryImages } from "@/data/gallery";
import { GalleryTabs, type GalleryFilter } from "@/components/molecules/GalleryTabs";
import { Lightbox } from "@/components/organisms/Lightbox";
import { useFadeUp } from "@/hooks/useScrollAnimation";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function GallerySection() {
  const [filter, setFilter] = useState<GalleryFilter>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const headingRef = useFadeUp(0);
  const gridRef = useRef<HTMLDivElement>(null);

  const visible = useMemo(
    () =>
      filter === "all"
        ? galleryImages
        : galleryImages.filter((g) => g.category === filter),
    [filter]
  );

  // Re-animate grid items every time `visible` changes (filter switch or initial mount)
  useEffect(() => {
    if (!gridRef.current) return;

    const items = gridRef.current.querySelectorAll<HTMLElement>(".gallery-item");
    if (!items.length) return;

    // Kill any running tweens on these elements first to avoid conflicts
    gsap.killTweensOf(items);

    // Reset to invisible, then stagger reveal
    gsap.fromTo(
      items,
      { opacity: 0, y: 16, scale: 0.97 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.055,
        clearProps: "transform", // Clean up inline transform after animation
      }
    );
  }, [visible]);

  const handleFilterChange = (f: GalleryFilter) => {
    setFilter(f);
    setLightboxIndex(null);
  };

  return (
    <section id="gallery" className="relative z-20 scroll-mt-20 bg-white pt-24 pb-8 lg:pt-32 lg:pb-10 border-t border-navy/5">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Heading */}
     <div ref={headingRef} className="reveal-fade opacity-0">
  <div className="flex flex-col items-center text-center space-y-4 max-w-2xl mx-auto">
    <h2 className="font-display text-4xl sm:text-5xl font-semibold leading-[1.06] tracking-tight text-navy">
      Koleksi Karya Kami
    </h2>
    <p className="text-base leading-relaxed text-navy/50 font-sans max-w-md">
      Hasil nyata souvenir &amp; merchandise custom Craftoria. Klik foto untuk memperbesar.
    </p>
  </div>
</div>
        {/* Tabs */}
        <div className="mt-10">
          <GalleryTabs active={filter} onChange={handleFilterChange} />
        </div>

        {/* Masonry grid (CSS columns) */}
        {visible.length === 0 ? (
          <p className="mt-16 text-center text-navy/50">Belum ada foto untuk kategori ini.</p>
        ) : (
          <div ref={gridRef} className="mt-10 gap-4 [column-count:2] md:[column-count:3] lg:[column-count:4]">
            {visible.map((img, i) => {
              const aspectClasses = [
                "aspect-[3/4]",
                "aspect-square",
                "aspect-[4/5]",
                "aspect-[4/3]",
                "aspect-[5/7]",
                "aspect-[1/1]",
              ];
              const isAll = filter === "all";
              const aspectClass = isAll
                ? aspectClasses[(i * 7) % aspectClasses.length]
                : "aspect-[3/4]";

              return (
                <button
                  key={`${img.src}-${filter}`}
                  type="button"
                  onClick={() => setLightboxIndex(i)}
                  aria-label={`Perbesar: ${img.alt}`}
                  className={`gallery-item reveal-fade group mb-4 block w-full overflow-hidden rounded-xl border border-navy/8 bg-cream-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy ${aspectClass}`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={600}
                    height={800}
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    priority={i < 4}
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
