"use client";

import { motion } from "framer-motion";
import type { Category } from "@/data/categories";
import { buildWhatsAppLink } from "@/utils/whatsapp";
import { MessageCircle, Check } from "lucide-react";

const CATEGORY_ACCENT = [
  { bg: "bg-cream", text: "text-navy" },
  { bg: "bg-navy", text: "text-cream" },
  { bg: "bg-cream-light", text: "text-navy" },
];

const CATEGORY_INDEX_LABEL = ["01", "02", "03"];

interface CategoryCardProps {
  category: Category;
  index: number;
}

export function CategoryCard({ category, index }: CategoryCardProps) {
  const accent = CATEGORY_ACCENT[index % CATEGORY_ACCENT.length];
  const label = CATEGORY_INDEX_LABEL[index % CATEGORY_INDEX_LABEL.length];

  return (
    <motion.article
      id={category.id}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="group flex scroll-mt-24 flex-col rounded-3xl border border-navy/8 bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl overflow-hidden"
    >
      {/* Card header band */}
      <div className={`${accent.bg} px-7 pt-8 pb-6`}>
        <div className="flex items-start justify-between">
          <span className={`text-xs font-bold uppercase tracking-widest ${accent.text} opacity-40`}>
            {label}
          </span>
          <span
            className={`rounded-full border px-3 py-1 text-xs font-semibold ${
              accent.bg === "bg-navy"
                ? "border-white/15 text-white/50"
                : "border-navy/15 text-navy/50"
            }`}
          >
            {category.items.length} produk
          </span>
        </div>
        <h3 className={`mt-3 text-xl font-extrabold leading-tight ${accent.text}`}>
          {category.title}
        </h3>
        <p className={`mt-2 text-sm leading-6 ${accent.text} opacity-60`}>
          {category.description}
        </p>
      </div>

      {/* Item list */}
      <div className="flex flex-1 flex-col px-7 py-6">
        <ul className="flex-1 space-y-3.5">
          {category.items.map((item) => (
            <li key={item.name} className="flex items-start gap-3">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cream">
                <Check className="h-3 w-3 text-navy/60" strokeWidth={2.5} />
              </span>
              <div>
                <p className="text-sm font-semibold text-navy leading-snug">{item.name}</p>
                <p className="text-xs leading-5 text-navy/45 mt-0.5">{item.description}</p>
              </div>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <motion.a
          href={buildWhatsAppLink(category.title)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Konsultasi via WhatsApp untuk kategori ${category.title}`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="mt-8 inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-navy px-6 py-3.5 text-sm font-bold text-white transition-colors duration-200 hover:bg-navy-mid"
        >
          <MessageCircle className="h-4 w-4" strokeWidth={1.75} />
          Tanya &amp; Pesan
        </motion.a>
      </div>
    </motion.article>
  );
}
