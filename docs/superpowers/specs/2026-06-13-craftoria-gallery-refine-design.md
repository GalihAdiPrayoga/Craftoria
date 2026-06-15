# Spec — Craftoria Landing Refine (Plan A + Gallery)

> **Tanggal:** 2026-06-13
> **Status:** Approved (brainstorm) — siap masuk plan
> **Scope:** Polish layout landing single-page + ubah section Katalog menjadi Gallery image-forward.
> **Sumber:** Hasil sesi `/brainstorm` 2026-06-13.

---

## 1. Konteks & Masalah

Craftoria.co adalah landing page single-page (company profile) untuk studio souvenir & merchandise. Kontak satu-satunya via WhatsApp. Tujuan situs: **menampilkan koleksi produk (gallery) + kontak**.

Masalah pada desain saat ini:

1. **Ritme layout monoton** — `AboutSection.tsx` memuat 3 sub-section (About, Vision & Mission, Why Us) yang memakai pola identik (label + headline serif di kiri `col-span-5`, konten di kanan `col-span-6`). Tiga kali struktur sama → terasa datar.
2. **Stats Hero tidak terverifikasi** — `500+ Klien / 1000+ Produk / 8+ Tahun` (HeroSection.tsx:89-102) berisiko merusak trust untuk bisnis baru.
3. **CTA mati** — tombol "Lihat Katalog" (HeroSection.tsx:83-85) `<button>` tanpa aksi.
4. **Katalog masih placeholder & terlalu teksual** — `CategoryCard` pakai `DummyImage` (Unsplash) + daftar produk panjang, padahal **30 foto produk asli** sudah tersedia di `public/image/catalog/`.

---

## 2. Keputusan Desain

| # | Keputusan | Alasan |
|---|---|---|
| D1 | Katalog → **Gallery image-forward** dengan tab filter kategori + lightbox | Foto adalah alasan utama pengunjung datang; selaras tujuan "tampilkan gallery + kontak" |
| D2 | **Why-Us** diubah dari list-kanan → **grid 3-kolom kartu** | Memecah monotoni 3 section beruntun, perubahan minimal |
| D3 | Stats Hero → **value-props jujur** (100% Custom · Cetak Digital Premium · Konsultasi Gratis) | Hindari klaim angka yang belum tentu akurat |
| D4 | CTA "Lihat Katalog" → anchor `#gallery` | Perbaiki CTA mati |
| D5 | **Lightbox custom** (tanpa library eksternal) | Hindari dependency; kebutuhan sederhana |
| D6 | Pemetaan foto→kategori **dikurasi manual** (lihat tiap foto), disimpan di `gallery.ts` | Nama file generik (`souvenir-craftoria (N)`) tak punya metadata |
| D7 | Komponen lama yang tak terpakai (`CategoryCard`, `DummyImage`, `ProductItemRow`) **dihapus** | Kurangi permukaan & dead code |

> **Catatan kurasi (D6):** mapping awal dikerjakan agent dengan melihat tiap foto; user me-review & koreksi saat QA. Kategori: `drinkware` · `home-decor` · `essentials` (sesuai `data/categories.ts`).

---

## 3. Struktur Halaman (Final)

```
Hero → About → Vision & Mission → Why Us (grid) → GALLERY (eks-Katalog) → Footer/Kontak
```

Urutan & jumlah section tidak berubah. `CatalogSection` berganti wujud menjadi `GallerySection`.

### Anchor ID Map (update)

| navItems href (lama → baru) | Section id | Komponen |
|---|---|---|
| `#about` | `about` | AboutSection |
| `#vision-mission` | `vision-mission` | AboutSection |
| `#why-us` | `why-us` | AboutSection (grid) |
| `#categories` → **`#gallery`** | **`gallery`** | **GallerySection** |
| `#contact` | `contact` | Footer |

---

## 4. Spesifikasi Komponen

### 4.1 GallerySection (baru) — `src/components/sections/GallerySection.tsx`
- Section `id="gallery"`, gantikan `CatalogSection`.
- **Heading**: label `04 / GALLERY` + judul + subjudul singkat (gaya konsisten dengan section lain).
- **GalleryTabs**: filter `Semua · Drinkware · Decor · Daily`. State `activeCategory`. Tab "Semua" default.
- **Grid masonry**: menampung aspect-ratio campuran (CSS columns atau grid auto), `next/image` dengan `sizes` responsif, `loading="lazy"` (kecuali beberapa item awal).
- Klik foto → buka **Lightbox** pada index foto tsb.
- **CTA WhatsApp** di bawah grid → `buildWhatsAppLink()`.
- Animasi: pola stagger/`FadeUp` konsisten dengan section lain (GSAP ScrollTrigger), dengan cleanup `ctx.revert()`.

### 4.2 Lightbox (baru) — `src/components/organisms/Lightbox.tsx`
- Overlay fullscreen (fixed, backdrop gelap).
- Props: `images[]`, `index`, `onClose`, `onNext`, `onPrev`.
- Kontrol: tombol close, prev/next; keyboard Esc (close), ←/→ (navigasi); klik backdrop = close.
- Lock body scroll saat terbuka. Fokus-trap sederhana opsional.
- `next/image` atau `<img>` dengan `object-contain`.
- **A11y**: `role="dialog"`, `aria-modal="true"`, `aria-label`.

### 4.3 GalleryTabs (baru) — `src/components/molecules/GalleryTabs.tsx`
- Daftar kategori sebagai tombol; highlight aktif; `aria-pressed`.

### 4.4 Data Gallery (baru) — `src/data/gallery.ts`
```ts
export type GalleryCategory = "drinkware" | "home-decor" | "essentials";
export type GalleryImage = { src: string; alt: string; category: GalleryCategory };
export const galleryImages: GalleryImage[] = [ /* 30 entri hasil kurasi */ ];
```

### 4.5 HeroSection (edit)
- Stats `500+/1000+/8+` → 3 value-props (struktur grid sama).
- "Lihat Katalog" `<button>` → `<a href="#gallery">` (atau Button polymorphic) dengan scroll-smooth.

### 4.6 AboutSection (edit — Why-Us)
- Sub-section `#why-us`: layout list-kanan → **grid `sm:grid-cols-3`** kartu (icon + nomor `r.no` + judul + deskripsi). Data `reasons[]` tetap.

### 4.7 page.tsx / data/site.ts (edit)
- `page.tsx`: `CatalogSection` → `GallerySection`.
- `data/site.ts`: navItem `#categories` → `#gallery`, label jadi "Gallery"/"Koleksi".

### 4.8 Footer / Kontak (edit ringan)
- Pastikan isi sesuai konten final: WA `0851-1315-3923`, IG/TikTok `@craftoria.co`, Shopee "Craftoria.co Official Shop", Lokasi "Mojokerto, Jawa Timur, Indonesia".

### 4.9 Penghapusan
- Hapus `CategoryCard.tsx`, `DummyImage.tsx`, `ProductItemRow.tsx` bila tak ada konsumen tersisa.
- `next.config.ts`: hapus remote pattern Unsplash bila DummyImage dibuang.
- `data/categories.ts`: pertahankan (dipakai sebagai sumber label/urutan kategori) atau ramping seperlunya.

---

## 5. Data Flow

- Gallery 100% **statik** dari `src/data/gallery.ts`. Tidak ada DB/CMS/API.
- Filter & lightbox murni state client (React `useState`).
- Tidak ada input user, tidak ada secret, tidak ada mutation. (Permukaan security: minimal.)

---

## 6. Error Handling & Edge Cases

- Foto gagal load → `next/image` fallback / alt text tampil.
- Kategori tanpa foto → tab tetap muncul tapi grid kosong diberi pesan ringkas ("Belum ada foto").
- Lightbox di item pertama/terakhir → next/prev wrap atau disable di ujung (pilih: wrap).
- Mobile: tab bisa horizontal-scroll; lightbox tombol cukup besar (≥44px touch target).

---

## 7. Testing / Validasi

- `npm run typecheck` — exit 0.
- `npm run lint` — exit 0.
- `npm run build` — sukses (pertama kali dijalankan untuk project; verifikasi tak ada error SSR pada komponen client).
- QA manual (Playwright opsional): tab filter berfungsi, lightbox buka/tutup/navigasi, CTA WA membuka `wa.me` benar, anchor `#gallery` scroll tepat.
- Cek a11y dasar: keyboard nav lightbox, alt text foto.

---

## 8. Docs-as-Code (Definition of Done)

Dalam commit yang sama dengan code:
- `MEMORY_BANK.md`: § Recent Changes (tanggal+hash), § Current Status, § Anchor Map (`#categories`→`#gallery`), § Struktur File.
- `CLAUDE.md`: § Fitur yang Sudah Dibangun, § (Anchor map bila direferensikan).

---

## 9. Out of Scope (YAGNI)

- Tidak ada DB/CMS, auth, deployment.
- Tidak ada library lightbox/carousel eksternal.
- Tidak ada perubahan urutan/konsep Hero/About/Vision.
- Tidak ada e-commerce/cart — pemesanan tetap via WhatsApp.

---

## 10. Open Questions (untuk review)

1. Mapping foto→kategori final (hasil kurasi agent) — perlu konfirmasi user saat QA.
2. Lightbox navigasi di ujung: **wrap** (default) atau disable? (asumsi: wrap)
3. Apakah subjudul ringkasan per kategori masih diinginkan, atau cukup tab polos?
