import { site } from "@/data/site";

/**
 * Membangun URL WhatsApp (wa.me) dengan pesan pre-filled kontekstual.
 * Jika categoryTitle diberikan, pesan akan menyebut kategori tersebut.
 * Jika kosong/blank, pesan generik konsultasi digunakan.
 */
export function buildWhatsAppLink(categoryTitle?: string): string {
  const base = `https://wa.me/${site.whatsappNumber}`;
  const trimmed = categoryTitle?.trim();

  const message = trimmed
    ? `Halo Craftoria, saya tertarik dengan kategori ${trimmed}. Boleh minta info lebih lanjut?`
    : "Halo Craftoria, saya ingin berkonsultasi mengenai souvenir & merchandise.";

  return `${base}?text=${encodeURIComponent(message)}`;
}
