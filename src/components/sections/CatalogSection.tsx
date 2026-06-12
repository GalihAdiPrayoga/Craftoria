"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { categories } from "@/data/categories";
import { CategoryCard } from "@/components/CategoryCard";

/**
 * Catalog Section (client) — fade-in-up pada grid kartu.
 * Anchor: #categories sesuai navItems.
 */
export function CatalogSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="categories" className="scroll-mt-20 bg-cream-light py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Heading */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-navy/40">
            Layanan &amp; Produk Unggulan
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            Tiga kategori utama
          </h2>
          <p className="mt-4 text-base leading-7 text-navy/50">
            Pilihan produk kami dirancang agar fungsional, estetik, dan bisa
            disesuaikan penuh dengan tema momen berharga Anda.
          </p>
        </motion.div>

        {/* Cards grid — staggered */}
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {categories.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.15 + i * 0.1, ease: "easeOut" }}
            >
              <CategoryCard category={c} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
