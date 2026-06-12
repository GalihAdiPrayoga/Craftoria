"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { categories } from "@/data/categories";
import { CategoryCard } from "@/components/CategoryCard";

export function CatalogSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="categories" className="scroll-mt-20 bg-cream-light py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Heading */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-flex items-center gap-1.5 rounded-full border border-navy/10 bg-cream px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-navy/50">
            Layanan &amp; Produk Unggulan
          </span>
          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl lg:text-5xl">
            Tiga kategori utama
          </h2>
          <p className="mt-4 text-base leading-7 text-navy/50">
            Pilihan produk dirancang agar fungsional, estetik, dan bisa
            disesuaikan penuh dengan tema momen berharga Anda.
          </p>
        </motion.div>

        {/* Cards — equal height grid */}
        <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-3">
          {categories.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.15 + i * 0.1, ease: "easeOut" }}
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
