import type { ProductItem } from "@/data/categories";
import { cn } from "@/lib/utils";

type ProductItemRowProps = {
  item: ProductItem;
  className?: string;
};

/**
 * MOLECULE — ProductItemRow
 * Baris list produk minimalis dengan diamond bullet estetik.
 * Digunakan di dalam CategoryCard organism.
 */
export function ProductItemRow({ item, className }: ProductItemRowProps) {
  return (
    <li
      className={cn(
        "flex items-start gap-3 border-b border-navy/6 py-3.5 last:border-0 last:pb-0",
        className
      )}
    >
      {/* Aesthetic bullet */}
      <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rotate-45 bg-navy/25" />
      <div className="min-w-0">
        <p className="text-sm font-semibold leading-snug text-navy">
          {item.name}
        </p>
        <p className="mt-0.5 text-xs leading-5 text-navy/55">
          {item.description}
        </p>
      </div>
    </li>
  );
}
