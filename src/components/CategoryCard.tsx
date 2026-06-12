"use client";

import { motion } from "framer-motion";
import type { Category } from "@/data/categories";
import { buildWhatsAppLink } from "@/utils/whatsapp";
import { MessageCircle, ChevronRight } from "lucide-react";

/**
 * Category Card (client) — hover lift + scale micro-interaction.
 * Menerima data kategori, menampilkan item list, CTA WhatsApp kontekstual.
 */
export function CategoryCard({ category }: { category: Category }) {
  return (
    <motion.article
      id={category.id}
      whileHover={{ y: -6, scale: 1.015 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className="flex scroll-mt-24 flex-col rounded-2xl border border-navy/8 bg-white p-7 shadow-sm"
    >
      <h3 className="text-lg font-bold leading-snug text-navy">
        {category.title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-navy/55">
        {category.description}
      </p>

      <ul className="mt-6 flex-1 space-y-3.5">
        {category.items.map((item) => (
          <li key={item.name} className="flex gap-3">
            <ChevronRight
              className="mt-0.5 h-4 w-4 shrink-0 text-navy/25"
              strokeWidth={2}
            />
            <div>
              <p className="text-sm font-semibold text-navy">{item.name}</p>
              <p className="text-xs leading-5 text-navy/50">
                {item.description}
              </p>
            </div>
          </li>
        ))}
      </ul>

      <motion.a
        href={buildWhatsAppLink(category.title)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Konsultasi via WhatsApp untuk kategori ${category.title}`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full border border-navy/15 py-3 text-sm font-semibold text-navy transition-colors duration-200 hover:bg-navy hover:text-white hover:border-navy"
      >
        <MessageCircle className="h-4 w-4" strokeWidth={1.75} />
        Konsultasi via WhatsApp
      </motion.a>
    </motion.article>
  );
}
