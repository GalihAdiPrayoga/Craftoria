"use client";

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

const INDEX_LABELS = ["01", "02", "03"];

/**
 * ORGANISM — CategoryCard
 * Assembles: DummyImage (zoom on hover) + header band + ProductItemRow list + Button CTA.
 * Full h-full flex-col for equal heights in grid.
 */
export function CategoryCard({ category, index }: CategoryCardProps) {
  const label = INDEX_LABELS[index % INDEX_LABELS.length];
  const imageSrc =
    categoryImages[category.id as keyof typeof categoryImages] ??
    categoryImages.drinkware;

  return (
    <article
      id={category.id}
      className="group flex h-full scroll-mt-24 flex-col overflow-hidden bg-transparent border border-navy/10 hover:border-navy/30 transition-colors duration-500"
    >
      {/* ── Image with muted zoom ── */}
      <DummyImage
        src={imageSrc}
        alt={category.title}
        aspectRatio="4/3"
        zoomOnHover
      />

      {/* ── Minimal header ── */}
      <div className="px-8 py-6 border-b border-navy/5">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs font-bold text-navy/30">
            {label}
          </span>
          <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-navy/40">
            {category.items.length} produk
          </span>
        </div>
        <h3 className="mt-4 font-serif text-2xl text-navy">
          {category.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-navy/60 font-sans">
          {category.description}
        </p>
      </div>

      {/* ── Product list ── */}
      <div className="flex flex-1 flex-col px-8 pt-6 pb-8">
        <ul className="flex-1 space-y-4">
          {category.items.map((item) => (
            <ProductItemRow key={item.name} item={item} />
          ))}
        </ul>

        {/* ── CTA Button ── */}
        <Button
          variant="outline"
          size="md"
          icon={MessageCircle}
          href={buildWhatsAppLink(category.title)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Konsultasi via WhatsApp untuk ${category.title}`}
          className="mt-10 w-full border-navy/20 text-navy hover:bg-navy hover:text-white transition-colors"
        >
          Tanya &amp; Pesan
        </Button>
      </div>
    </article>
  );
}
