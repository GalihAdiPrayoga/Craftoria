"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { categories } from "@/data/categories";
import { CategoryCard } from "@/components/organisms/CategoryCard";
import { Heading } from "@/components/atoms/Heading";

export function CatalogSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="categories" className="scroll-mt-20 bg-cream-light py-28 lg:py-36">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Heading */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-navy/15 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-navy/70 shadow-sm">
            Layanan &amp; Produk Unggulan
          </span>
          <Heading level="h2" className="mt-6 text-navy">
            Koleksi Terkurasi Kami
          </Heading>
          <p className="mt-6 text-lg leading-relaxed text-navy/85 font-sans">
            Setiap lini produk kami dirancang agar fungsional, estetik, dan bisa
            disesuaikan sepenuhnya dengan tema momen berharga Anda.
          </p>
        </motion.div>

        {/* Cards — equal height grid */}
        <div className="mt-16 grid items-stretch gap-8 lg:grid-cols-3">
          {categories.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="flex"
            >
              <CategoryCard category={c} index={i} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
