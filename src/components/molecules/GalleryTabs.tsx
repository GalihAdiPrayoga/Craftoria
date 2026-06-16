"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { galleryCategories, type GalleryCategory } from "@/data/gallery";

export type GalleryFilter = "all" | GalleryCategory;

const tabs: { id: GalleryFilter; label: string }[] = [
  { id: "all", label: "Semua" },
  ...galleryCategories,
];

type GalleryTabsProps = {
  active: GalleryFilter;
  onChange: (next: GalleryFilter) => void;
};

/**
 * MOLECULE — GalleryTabs
 * Filter kategori untuk GallerySection. Horizontal-scroll di mobile.
 * Active tab menggunakan Framer Motion `layoutId` untuk sliding pill indicator.
 */
export function GalleryTabs({ active, onChange }: GalleryTabsProps) {
  return (
    <div className="flex flex-nowrap gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:justify-center">
      {tabs.map((t) => {
        const isActive = t.id === active;
        return (
          <button
            key={t.id}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(t.id)}
            className={cn(
              "relative whitespace-nowrap rounded-full px-5 py-2 text-sm font-semibold",
              "transition-colors duration-200",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy",
              isActive
                ? "text-white"
                : "bg-navy/5 text-navy/60 hover:bg-navy/10 hover:text-navy"
            )}
          >
            {/* Sliding pill background */}
            {isActive && (
              <motion.span
                layoutId="gallery-tab-pill"
                className="absolute inset-0 bg-navy rounded-full"
                transition={{ type: "spring", stiffness: 400, damping: 38 }}
              />
            )}
            <span className="relative z-10">{t.label}</span>
          </button>
        );
      })}
    </div>
  );
}
