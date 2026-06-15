"use client";

import { cn } from "@/lib/utils";
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
              "whitespace-nowrap rounded-full px-5 py-2 text-sm font-semibold transition-colors duration-200",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy",
              isActive
                ? "bg-navy text-white"
                : "bg-navy/5 text-navy/60 hover:bg-navy/10 hover:text-navy"
            )}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}
