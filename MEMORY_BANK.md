# MEMORY_BANK.md — Craftoria

> **Tujuan file ini:** Snapshot operasional project yang selalu aktual.
> Dibaca PERTAMA oleh AI agent baru sebelum menyentuh kode apapun.
> Wajib di-update setiap akhir sesi kerja (lihat protokol di `AGENTS.md § Memory Sync Protocol`).
>
> **Last updated:** 2026-06-15 · Agent: Claude Code (Gemini CLI) — UI Polish v2 Finalized

---

## Current Status

**Phase:** UI Polish v2 — ✅ Fully Implemented & Validated (2026-06-15).
**Next Sprint:** Deployment (Vercel); opsional `metadataBase` + OG image
**Dev Server:** `npm run dev` → http://localhost:3000
**Build:** ✅ production build sukses (Next.js 16, fully static). `npm run predeploy` (lint/typecheck/build) hijau.

---

## Tech Stack (Final — Sprint 00)

| Area | Tech | Versi |
|---|---|---|
| Framework | Next.js (App Router, Turbopack) | 16.2.9 |
| UI Library | React | 19.2.4 |
| Bahasa | TypeScript | 5.x |
| Styling | Tailwind CSS v4 (`@theme` tokens) | ^4 |
| Animation | Framer Motion | (latest, installed 2026-06-12) |
| Icons | lucide-react | (latest, installed 2026-06-12) |
| Font | Open Sans (300–800) & Playfair Display (400-900) | via `next/font/google` |
| Linting | ESLint 9 | `eslint-config-next` |
| Package Manager | npm | — |
| Database | ❌ Belum ada | — |
| Auth | ❌ Belum ada | — |
| Deployment | ❌ Belum ada | — |

**Import alias:** `@/*` → `src/*`

---

## Struktur File (Sprint 00 Final)

```
src/
├── app/
│   ├── globals.css          # @theme tokens (colors, fonts, premium shadows)
│   ├── layout.tsx           # Root: Organisms (Navbar, Footer) + FloatingWhatsApp + metadata SEO
│   └── page.tsx             # Assembly: Sections (Hero, About, Gallery)
├── components/
│   ├── atoms/
│   │   ├── Button.tsx       # Global polymorphic button (variants: primary-navy, outline, whatsapp, dsb)
│   │   └── Heading.tsx      # Global typography scale (h1-h4, serif/sans)
│   ├── molecules/
│   │   ├── NavLink.tsx      # Desktop nav item, slide-underline + prop `scrolled` (putih di hero, navy setelah scroll)
│   │   └── GalleryTabs.tsx  # Filter kategori gallery (Semua/Drinkware/Decor/Daily)
│   ├── organisms/
│   │   ├── FloatingWhatsApp.tsx # Fixed bottom-right CTA (react-icons)
│   │   ├── Lightbox.tsx     # Overlay perbesar foto (keyboard Esc/←/→, a11y dialog, wrap nav)
│   │   ├── Footer.tsx       # 4-col dark footer (#contact), kontak WA/IG/TikTok/Shopee/lokasi
│   │   └── Navbar.tsx       # Sticky blur, mobile accordion, nav transparan→putih saat scroll
│   └── sections/
│       ├── HeroSection.tsx      # Hero dark, photocard, value-props (bukan stats), CTA → #gallery
│       ├── AboutSection.tsx     # About + Visi/Misi + Why-Us (grid 3-kolom kartu)
│       └── GallerySection.tsx   # Tabs + masonry grid (CSS columns) + lightbox + CTA WA
├── data/
│   ├── site.ts              # Brand config, WA number, socials, navItems[] (#gallery)
│   ├── gallery.ts           # 30 foto produk asli + metadata kategori (galleryImages[])
│   └── categories.ts        # (legacy) 3 categories + ProductItem[] — tak lagi dirender
├── lib/
│   └── utils.ts             # cn() = clsx + twMerge
└── utils/
    └── whatsapp.ts          # buildWhatsAppLink(categoryTitle?) → wa.me URL
```

> **Aset:** `public/image/catalog/souvenir-craftoria (1..30).jpeg` (foto gallery), `public/image/hero/Hero.webp`.

---

## Design Tokens (`src/app/globals.css`)

| Token | Hex | Usage |
|---|---|---|
| `--color-white` | `#ffffff` | Background utama, kartu |
| `--color-cream` | `#f4edd9` | Aksen lembut, border item list |
| `--color-cream-light` | `#faf7f2` | Background section alternatif, why-us cards |
| `--color-navy` | `#0f172a` | Teks utama, navbar, footer bg, CTA primer |
| `--color-navy-mid` | `#1e293b` | Footer main bg |
| `--color-navy-soft` | `#334155` | Footer decorative blobs |
| `--color-whatsapp` | `#25d366` | Tombol WA, floating button |

**ATURAN:** Jangan tambah warna di luar token di atas tanpa update `globals.css` and tabel ini.

---

## Anchor ID Map (navItems ↔ sections)

| `navItems` href | Section `id` | Komponen |
|---|---|---|
| `#about` | `about` | AboutSection (sub-section 1) |
| `#vision-mission` | `vision-mission` | AboutSection (sub-section 2) |
| `#why-us` | `why-us` | AboutSection (sub-section 3) |
| `#gallery` | `gallery` | GallerySection |
| `#contact` | `contact` | Footer |

**ATURAN:** Jika menambah nav item baru, tambahkan juga di `src/data/site.ts` navItems[] DAN buat section/komponen dengan `id` yang cocok.

---

## WhatsApp Logic

```
Nomor: 6285113153923 (public, aman di-hardcode)
Fungsi: buildWhatsAppLink(categoryTitle?: string)
  - Tanpa arg → pesan generik konsultasi
  - Dengan arg → pesan menyebut nama kategori
```

---

## Recent Changes

### 2026-06-15 — Claude Code (UI Polish v2)

**UI Polish v2 finalized** ✅ — feat(ui): hero serif, diagonal dividers, navbar contrast fix, anti-FOUC
- `Navbar.tsx`: Fix bug kontras via `IntersectionObserver` pada `#hero` (robust vs magic scroll numbers).
- `HeroSection.tsx`: Judul `font-serif` (Playfair); `min-h-[88vh]`; CTA `buildWhatsAppLink()`; **REPLACED wave SVG dengan diagonal clip-path** (`edge-diagonal-bottom`).
- `Footer.tsx`: **REPLACED wave SVG dengan diagonal clip-path** (`edge-diagonal-top`).
- `globals.css`: Implementasi helper `.edge-diagonal-*` dan anti-FOUC `.reveal-fade` / `.animate-item` dengan media queries (`prefers-reduced-motion` & `scripting:none`).
- **Cleaned up:** Menghapus unused imports (`Sparkles`, `AtSign`) dan memvalidasi codebase.
- **Validasi SELESAI:** `typecheck`/`lint`/`build` sukses.

### 2026-06-15 — Antigravity (Gemini)

**Visual Enhancements & Animation Overhaul** ✅ — feat(ui): bento box vision-mission, GSAP hooks, and logo polish
- `AboutSection.tsx`: Rombak total Visi & Misi menjadi "Bento Box" Grid modern (`bg-white`) asimetris dengan efek *inverted hover* pada kartu utama.
- `hooks/useScrollAnimation.ts`: Hook terpusat GSAP (`useFadeUp`, `useStaggerReveal`, `useColumnReveal`) untuk konsistensi.
- `HeroSection.tsx` & `globals.css`: Menerapkan *stagger entrance* pada teks. Memperbaiki efek *glow* (`blur-3xl`) yang membuat ombak (wave) bawah terlihat terpotong dengan menaikkannya ke `top-1/2`. Menambahkan animasi kustom `animate-float` (naik turun secara kontinu), memiringkan foto (`rotate-6`), memberikan efek interaktif saat *hover*, serta menurunkan posisi foto (`mt-16 lg:mt-8`).
- `Footer.tsx`: User mengubah Footer menjadi Server Component (statis). Animasi GSAP dihapus.ter invert cerdas.
- `src/app/icon.png`: Favicon otomatis dari logo.

### 2026-06-13 — Claude Code (Gallery Refine)

**Katalog → Gallery image-forward** — feat(ui): ganti CatalogSection teksual jadi GallerySection berbasis 30 foto produk asli.
- Baru: `data/gallery.ts` (30 foto), `sections/GallerySection.tsx` (masonry + filter), `organisms/Lightbox.tsx`.
- Hero: stats → value-props; CTA "Lihat Galeri" aktif.
- Why-Us: grid 3-kolom kartu.
- Validasi: `npm run predeploy` ✅.

---

## Next Action Items

- [ ] **Deployment:** Setup Vercel/Cloudflare Pages dan CI/CD.
- [ ] **SEO & Metadata:** Tambah `metadataBase`, `opengraph-image.tsx`, dan JSON-LD.
- [ ] **Performance:** Optimasi `next/image` untuk catalog images jika diperlukan.
- [ ] **Sprint 01 scope:** Diskusi penambahan fitur (mis. Blog/Testimonial).

---

## Known Issues / Catatan Penting

- **Utang teknis animasi:** 3 sistem animasi co-exist (GSAP + Framer Motion + CSS). Anti-FOUC sudah dimitigasi, tapi konsolidasi ke satu sistem disarankan di masa depan.
- `data/categories.ts` kini **legacy** (tak lagi digunakan).
- `trivy` scan harus skip `.next` folder di Windows karena file-lock.

---

## Dev Commands

```bash
npm run dev          # http://localhost:3000
npm run typecheck    # tsc --noEmit
npm run lint         # ESLint
npm run build        # Production build
npm run predeploy    # lint + typecheck + build
```
