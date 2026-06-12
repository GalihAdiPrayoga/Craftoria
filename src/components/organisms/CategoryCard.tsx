"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import type { Category } from "@/data/categories";
import { buildWhatsAppLink } from "@/utils/whatsapp";
import { DummyImage, categoryImages } from "@/components/atoms/DummyImage";
import { Button } from "@/components/atoms/Button";
import { ProductItemRow } from "@/components/molecules/ProductItemRow";

interface CategoryCardProps {
  category: Category;
  index: number;
}

const HEADER_THEMES = [
  { bg: "bg-cream", text: "text-navy", sub: "text-navy/55", label: "text-navy/30" },
  { bg: "bg-navy", text: "text-white", sub: "text-white/55", label: "text-white/25" },
  { bg: "bg-cream-light", text: "text-navy", sub: "text-navy/55", label: "text-navy/30" },
];

const INDEX_LABELS = ["01", "02", "03"];

/**
 * ORGANISM — CategoryCard
 * Assembles: DummyImage (zoom on hover) + header band + ProductItemRow list + Button CTA.
 * Full h-full flex-col for equal heights in grid.
 */
export function CategoryCard({ category, index }: CategoryCardProps) {
  const theme = HEADER_THEMES[index % HEADER_THEMES.length];
  const label = INDEX_LABELS[index % INDEX_LABELS.length];
  const imageSrc =
    categoryImages[category.id as keyof typeof categoryImages] ??
    categoryImages.drinkware;

  return (
    <motion.article
      id={category.id}
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className="group flex h-full scroll-mt-24 flex-col overflow-hidden rounded-3xl border border-navy/8 bg-white shadow-[var(--shadow-card)] transition-shadow duration-300 hover:shadow-[var(--shadow-card-hover)]"
    >
      {/* ── Image with zoom ── */}
      <DummyImage
        src={imageSrc}
        alt={category.title}
        aspectRatio="4/3"
        zoomOnHover
      />

      {/* ── Coloured header ── */}
      <div className={`${theme.bg} px-6 py-5`}>
        <div className="flex items-center justify-between">
          <span className={`font-mono text-xs font-bold ${theme.label}`}>
            {label}
          </span>
          <span
            className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
              theme.bg === "bg-navy"
                ? "border-white/12 text-white/30"
                : "border-navy/12 text-navy/35"
            }`}
          >
            {category.items.length} produk
          </span>
        </div>
        <h3 className={`mt-2 text-lg font-bold leading-snug ${theme.text}`}>
          {category.title}
        </h3>
        <p className={`mt-1 text-xs leading-5 ${theme.sub}`}>
          {category.description}
        </p>
      </div>

      {/* ── Product list ── */}
      <div className="flex flex-1 flex-col px-6 pt-4 pb-6">
        <ul className="flex-1">
          {category.items.map((item) => (
            <ProductItemRow key={item.name} item={item} />
          ))}
        </ul>

        {/* ── CTA Button ── */}
        <Button
          variant="primary-navy"
          size="md"
          icon={MessageCircle}
          href={buildWhatsAppLink(category.title)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Konsultasi via WhatsApp untuk ${category.title}`}
          className="mt-6 w-full"
        >
          Tanya &amp; Pesan
        </Button>
      </div>
    </motion.article>
  );
}
