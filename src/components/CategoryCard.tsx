import type { Category } from "@/data/categories";
import { buildWhatsAppLink } from "@/utils/whatsapp";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/Icons";

/**
 * Kartu kategori — menampilkan judul, deskripsi, daftar item produk,
 * dan CTA WhatsApp kontekstual yang menyebut nama kategori di pesan.
 */
export function CategoryCard({ category }: { category: Category }) {
  return (
    <article
      id={category.id}
      className="flex scroll-mt-24 flex-col rounded-2xl border border-navy/10 bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-md"
    >
      <h3 className="text-xl font-bold text-navy">{category.title}</h3>

      <p className="mt-2 text-sm leading-6 text-navy/70">
        {category.description}
      </p>

      <ul className="mt-5 flex-1 space-y-3">
        {category.items.map((item) => (
          <li key={item.name} className="border-l-2 border-cream pl-3">
            <p className="text-sm font-semibold text-navy">{item.name}</p>
            <p className="text-sm text-navy/60">{item.description}</p>
          </li>
        ))}
      </ul>

      <Button
        variant="outline"
        href={buildWhatsAppLink(category.title)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Konsultasi via WhatsApp untuk kategori ${category.title}`}
        className="mt-6 w-full"
      >
        <WhatsAppIcon className="h-5 w-5" />
        Konsultasi via WhatsApp
      </Button>
    </article>
  );
}
