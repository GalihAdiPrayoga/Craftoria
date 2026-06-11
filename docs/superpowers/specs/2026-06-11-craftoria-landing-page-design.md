# Craftoria.co — Landing Page Design Spec

> **Tanggal:** 2026-06-11
> **Status:** Approved (siap masuk implementation plan)
> **Topik:** Landing page profil (marketing site) untuk Craftoria.co
> **Arsitektur dipilih:** Pendekatan A — Single-page statik, section-based, data-driven

---

## 1. Ringkasan & Tujuan

Craftoria.co adalah studio kreatif penyedia **Souvenir & Merchandise** (Mojokerto, Jawa Timur). Penjualan transaksional tetap berjalan di Shopee; situs ini adalah **landing page profil** untuk:

1. Memperkenalkan brand (Tentang, Visi & Misi, alasan memilih).
2. Menampilkan **3 kategori produk unggulan** beserta daftar itemnya.
3. Mendorong **konsultasi langsung via WhatsApp** dengan pesan pre-filled kontekstual.

**Non-tujuan:** bukan e-commerce. Tidak ada keranjang, checkout, pembayaran, atau akun pengguna.

---

## 2. Arsitektur

**Pendekatan A — Single-page statik (SSG).** Satu route `/` tersusun dari komponen section. Karena tidak ada database/transaksi, layer `server/repositories` pada CLAUDE.md **tidak dipakai pada fase ini**; prinsip yang dipertahankan: **konten tersentralisasi** di `src/data/` dan **section terisolasi** sebagai komponen lepasan (mudah dipindah/diurut, siap berkembang ke multi-page bila katalog membesar).

### Struktur Folder

```
src/
├── app/
│   ├── layout.tsx          # root: lang="id", metadata/SEO, font, render FloatingWhatsApp
│   ├── page.tsx            # merakit semua section secara berurutan
│   └── globals.css         # Tailwind v4 + design tokens (@theme)
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx       # sticky, anchor links + smooth scroll, hamburger mobile ('use client')
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── VisionMission.tsx
│   │   ├── WhyUs.tsx
│   │   ├── Categories.tsx   # map dari data → CategoryCard
│   │   └── Contact.tsx
│   └── ui/
│       ├── WhatsAppButton.tsx     # <a> reusable, menerima `message` & `variant`
│       ├── FloatingWhatsApp.tsx   # tombol floating selalu tampil ('use client')
│       ├── CategoryCard.tsx       # kartu + daftar item
│       └── SectionHeading.tsx
├── data/
│   ├── site.ts            # brand, no. WA, sosmed, lokasi, daftar nav anchor
│   └── categories.ts      # 3 kategori + item list (typed)
└── lib/
    └── whatsapp.ts        # buildWhatsAppLink(message)
```

---

## 3. Komponen & Tanggung Jawab

| Komponen | Tipe | Tanggung jawab |
|---|---|---|
| `app/layout.tsx` | Server | Root HTML `lang="id"`, font, metadata/SEO, JSON-LD opsional, render `FloatingWhatsApp` global |
| `app/page.tsx` | Server | Merakit urutan section: Hero → About → VisionMission → WhyUs → Categories → Contact |
| `sections/*` | Server | Statik, tanpa JS client; tiap section `<section id>` untuk anchor |
| `layout/Navbar.tsx` | **Client** | Sticky bar, anchor links + smooth scroll, toggle menu hamburger mobile, state scroll |
| `layout/Footer.tsx` | Server | Info kontak ringkas, sosmed, copyright |
| `ui/WhatsAppButton.tsx` | Server | `<a href>` ke `wa.me`; props `message`, `variant`; tanpa JS client |
| `ui/FloatingWhatsApp.tsx` | **Client** | Tombol floating selalu tampil (pojok kanan-bawah), pesan generik |
| `ui/CategoryCard.tsx` | Server | Render 1 kategori: judul, deskripsi, daftar item, CTA WA kontekstual |
| `ui/SectionHeading.tsx` | Server | Judul + subjudul section yang konsisten |

**Prinsip:** hanya `Navbar` & `FloatingWhatsApp` yang client component. Sisanya statik → JS browser minimal, perf & SEO optimal.

---

## 4. Section (urutan final) + Navbar

Urutan pada `page.tsx`:

1. **Hero** — nama brand, tagline, 1 CTA WhatsApp inline (pesan generik konsultasi).
2. **About (Tentang Kami)** — deskripsi studio kreatif & pendekatan personalized + cetak digital.
3. **VisionMission (Visi & Misi)** — 1 visi + 3 poin misi (Solusi Desain Kustom, Kualitas Terjaga, Pelayanan Fleksibel).
4. **WhyUs (Kenapa Memilih Craftoria.co)** — 3 nilai: Flexible Custom Design, Modern Aesthetic, Friendly Service.
5. **Categories (Layanan & Produk Unggulan)** — 3 kartu kategori (lihat §6).
6. **Contact (Hubungi Kami)** — no. telp, Instagram/TikTok `@craftoria.co`, Shopee, lokasi Mojokerto + CTA WA.

**Navbar:** sticky di atas, anchor link ke tiap section dengan smooth scroll. Mobile → hamburger menu. Daftar nav diambil dari `site.ts.navItems`.

---

## 5. Model Data (single source of truth)

```ts
// src/data/categories.ts
export type ProductItem = { name: string; description: string };
export type Category = {
  id: string;            // utk anchor & React key, mis. "drinkware"
  title: string;         // "Dinings & Drinkware Premium"
  description: string;   // ringkasan kategori
  items: ProductItem[];  // daftar produk dalam kategori
};
export const categories: Category[] = [ /* 3 kategori, lihat §6 */ ];
```

```ts
// src/data/site.ts
export const site = {
  name: "Craftoria.co",
  tagline: "Studio kreatif Souvenir & Merchandise",
  whatsappNumber: "6285113153923",   // 0851-1315-3923 → format internasional
  instagram: "https://instagram.com/craftoria.co",
  tiktok: "https://tiktok.com/@craftoria.co",
  shopee: "Craftoria.co Official Shop",   // URL final dilengkapi saat dev
  phoneDisplay: "0851-1315-3923",
  location: "Mojokerto, Jawa Timur, Indonesia",
  navItems: [ /* { label, href: "#about" } ... */ ],
};
```

Edit konten = ubah data file; JSX tidak tersentuh.

---

## 6. Konten Kategori (kartu + daftar item)

**1. Dinings & Drinkware Premium** — Souvenir berbahan keramik, kaca, & kebutuhan minum harian; populer untuk suvenir pernikahan eksklusif & hadiah korporat.
- Gelas & Mug Kustom — mug estetik dengan cetakan logo/ilustrasi kustom.
- Mangkuk & Piring Keramik — set perangkat makan minimalis mewah untuk hampers hari raya.
- Tumbler Custom — botol minum fungsional untuk merchandise seminar/kantoran.

**2. Aesthetic Home Decor** — Pemanis sudut rumah berbahan kain premium (suede) dicetak motif penuh teknik sublimasi; kesan hangat & mewah.
- Table Runner — pemanis meja makan/tamu sesuai tema interior.
- Tatakan Gelas (Coaster) — aksesoris meja lembut, pelengkap suvenir kafe/ruang tamu.
- Sarung Bantal Sofa (Cushion Cover) — sarung bantal kustom estetik.
- Sajadah Muka & Travel Slim — alas sujud praktis, favorit suvenir tasyakuran/umrah.

**3. Functional & Daily Essentials** — Produk kain pelengkap gaya hidup & mobilitas harian; diminati komunitas, instansi, & anak muda.
- Totebag & Pouch — tas jinjing & dompet serbaguna untuk kosmetik/mukena/seminar kit.
- Lanyard Kustom — tali id-card premium untuk merchandise kepanitiaan/seragam kantor.
- Lifestyle Essentials — aksesoris kain harian ringkas & travel-friendly.

---

## 7. Logika WhatsApp

```ts
// src/lib/whatsapp.ts
import { site } from "@/data/site";
export function buildWhatsAppLink(message: string): string {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
```

- **FloatingWhatsApp:** pesan generik, mis. `"Halo Craftoria, saya ingin berkonsultasi mengenai souvenir/merchandise."`
- **Hero CTA inline:** pesan generik konsultasi.
- **CategoryCard CTA inline:** pesan kontekstual, mis. `"Halo Craftoria, saya tertarik dengan kategori Aesthetic Home Decor."`

No. WhatsApp adalah **nomor bisnis publik** → aman di-hardcode di `site.ts` (bukan secret).

---

## 8. Styling, SEO & Aksesibilitas

### Palet Warna (final)
| Token | Hex | Penggunaan |
|---|---|---|
| Putih | `#ffffff` | Background utama / kartu |
| Cream terang | `#faf7f2` | Background section alternatif |
| Cream | `#f4edd9` | Aksen lembut / blok highlight |
| Biru Navy | `#0f172a` | Teks utama, navbar, footer, CTA primer |

Diterapkan sebagai design tokens di `globals.css` (Tailwind v4 `@theme`). Aksen WhatsApp tetap hijau brand WA pada tombol terkait.

### SEO
- `metadata` di `layout.tsx`: title, description, OpenGraph (judul/deskripsi/locale `id_ID`).
- `lang="id"` pada `<html>`.
- Opsional: JSON-LD `LocalBusiness` (nama, alamat Mojokerto, kontak).
- Tiap section `<section id>` semantik untuk anchor & struktur heading rapi.

### Responsif & A11y
- Mobile-first; navbar collapse → hamburger di mobile.
- `aria-label` pada semua tombol WhatsApp; kontras navy-on-cream memadai (WCAG AA).
- Smooth scroll via anchor; fokus keyboard pada nav.

---

## 9. Di Luar Scope (YAGNI)

Tidak diimplementasikan pada fase ini: form kontak (kanal = WhatsApp), keranjang/checkout, pembayaran, database, CMS/MDX, halaman detail produk, i18n/multi-bahasa, autentikasi. Penjualan transaksional tetap di Shopee.

---

## 10. Kriteria Sukses

- [ ] Satu route `/` menampilkan 6 section dengan urutan benar.
- [ ] Navbar sticky + anchor smooth scroll berfungsi (desktop & hamburger mobile).
- [ ] 3 kategori tampil sebagai kartu beserta daftar item dari `data/categories.ts`.
- [ ] Tombol WhatsApp floating + inline kontekstual membuka `wa.me` dengan pesan pre-filled benar.
- [ ] Palet Putih/Cream/Navy diterapkan via design tokens.
- [ ] Responsif di mobile & desktop; `aria-label` pada tombol WA.
- [ ] `npm run typecheck`, `npm run lint`, `npm run build` lulus tanpa error.
- [ ] Metadata SEO & `lang="id"` terpasang.
