import { categories } from "@/data/categories";
import { CategoryCard } from "@/components/CategoryCard";

/**
 * Catalog Section — grid container yang memetakan data categories
 * ke dalam komponen CategoryCard.
 * Anchor: #categories (sesuai navItems).
 */
export function CatalogSection() {
  return (
    <section id="categories" className="scroll-mt-20 bg-cream-light py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-navy/50">
            Layanan &amp; Produk Unggulan
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            Tiga kategori utama
          </h2>
          <p className="mt-4 text-base leading-7 text-navy/60">
            Pilihan produk kami dirancang agar fungsional, estetik, dan bisa
            disesuaikan penuh dengan tema momen berharga Anda.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {categories.map((c) => (
            <CategoryCard key={c.id} category={c} />
          ))}
        </div>
      </div>
    </section>
  );
}
