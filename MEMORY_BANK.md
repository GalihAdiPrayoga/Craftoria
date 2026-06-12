# MEMORY_BANK.md — Craftoria

> **Tujuan file ini:** Snapshot operasional project yang selalu aktual.
> Dibaca PERTAMA oleh AI agent baru sebelum menyentuh kode apapun.
> Wajib di-update setiap akhir sesi kerja (lihat protokol di `AGENTS.md § Memory Sync Protocol`).
>
> **Last updated:** 2026-06-12 · Agent: Antigravity (Gemini) — UI Redesign Sprint

---

## Current Status

**Phase:** Sprint 00 — Complete ✅
**Next Sprint:** Sprint 01 — belum ditentukan (lihat § Next Action Items)
**Dev Server:** `npm run dev` → http://localhost:3000 (sudah berjalan)
**Build:** belum dijalankan production build (`npm run build`) — belum diperlukan

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
| Font | Open Sans (300–800) | via `next/font/google` |
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
│   ├── globals.css          # @theme tokens: cream, cream-light, navy, whatsapp
│   ├── layout.tsx           # Root: Navbar + main + Footer + FloatingWhatsApp
│   └── page.tsx             # Assembly: HeroSection + AboutSection + CatalogSection
├── components/
│   ├── CategoryCard.tsx     # Client — hover spring animation, CTA WA kontekstual
│   ├── FloatingWhatsApp.tsx # Client — AnimatePresence spring, muncul setelah scroll 300px
│   ├── Footer.tsx           # Server — id="contact", lucide icons, 3-kolom grid
│   ├── Navbar.tsx           # Client — sticky blur, mobile accordion, underline hover
│   ├── sections/
│   │   ├── HeroSection.tsx      # Client — staggered entrance, blur blobs, dual CTA
│   │   ├── AboutSection.tsx     # Client — FadeUp useInView, lucide icons per card
│   │   └── CatalogSection.tsx   # Client — staggered cards useInView
│   └── ui/
│       ├── Button.tsx       # Server — 3 variant (primary/outline/ghost), renders <a> jika href
│       ├── Icons.tsx        # Server — WhatsAppIcon + ArrowRightIcon SVG
├── data/
│   ├── site.ts              # Brand config, WA number, socials, navItems[]
│   └── categories.ts        # 3 categories + ProductItem[] (typed)
├── lib/
│   └── utils.ts             # cn() = clsx + twMerge
└── utils/
    └── whatsapp.ts          # buildWhatsAppLink(categoryTitle?) → wa.me URL
```

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

**ATURAN:** Jangan tambah warna di luar token di atas tanpa update `globals.css` dan tabel ini.

---

## Anchor ID Map (navItems ↔ sections)

| `navItems` href | Section `id` | Komponen |
|---|---|---|
| `#about` | `about` | AboutSection (sub-section 1) |
| `#vision-mission` | `vision-mission` | AboutSection (sub-section 2) |
| `#why-us` | `why-us` | AboutSection (sub-section 3) |
| `#categories` | `categories` | CatalogSection |
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

### 2026-06-12 — Antigravity (Gemini)

**Batch 1** `335905e` — feat(ui): add WhatsApp util, icon/button primitives, and CategoryCard
- Buat `src/utils/whatsapp.ts` — `buildWhatsAppLink()`
- Buat `src/components/ui/Icons.tsx` — `WhatsAppIcon`, `ArrowRightIcon`
- Buat `src/components/ui/Button.tsx` — 3 variant, renders `<a>` jika href
- Buat `src/components/CategoryCard.tsx` — kartu kategori + item list + CTA WA

**Batch 2** `5de08cf` — feat(ui): assemble complete landing page layout sections and client components
- Buat `FloatingWhatsApp.tsx`, `Navbar.tsx`, `Footer.tsx`
- Buat `sections/HeroSection.tsx`, `AboutSection.tsx`, `CatalogSection.tsx`
- Update `page.tsx` (assembly final) dan `layout.tsx` (global chrome)
- Update `CLAUDE.md` — Sprint 00 ✅ Done, fitur Landing Page dicatat

**Batch 3** `a3f317c` — style(frontend): elevate UI with framer-motion animations and lucide-react icons
- Install: `framer-motion`, `lucide-react`, `clsx`, `tailwind-merge`
- Buat `src/lib/utils.ts` — `cn()` utility
- Upgrade semua komponen dengan Framer Motion + lucide icons
  - FloatingWhatsApp: `AnimatePresence` spring
  - Navbar: hamburger icon swap animation, mobile accordion
  - Footer: `Phone`, `AtSign`, `MapPin` icons
  - HeroSection: staggered entrance, blur blobs, scroll indicator
  - AboutSection: `FadeUp` + `useInView`, icon per card, spring hover-lift
  - CatalogSection: staggered cards
  - CategoryCard: spring hover lift+scale, fill-hover CTA
- Auto-fix: `Instagram` (tidak ada di lucide-react) → `AtSign`

**UI Redesign** `5b19618` — style(ui): major redesign - Open Sans, dark hero, two-zone cards, modern footer
- Font: Geist → **Open Sans** (300–800), token updated di `globals.css`
- `globals.css`: tambah `--color-navy-mid`, `--color-navy-soft`, custom `::selection`
- `HeroSection`: dark navy bg, dot-grid overlay, glassmorphism CTA, stats strip
- `AboutSection`: pill `SectionLabel`, feature strip 3-col, dark visi card full-width, watermark number on why-us
- `CategoryCard`: two-zone layout (colored header band + white body), accent cycling, `Check` item markers, product count badge, `index` prop baru
- `CatalogSection`: pass `index` ke CategoryCard, grid `items-stretch`
- `Footer`: full redesign — CTA band (dark card + WA button) + 4-col dark footer (`navy-mid`)

### 2026-06-11 — Claude Code
- `8a43bdd` — chore: scaffold Next.js 16 project and agent protocol
- `88cdde3` — feat(layout): add brand design tokens and base layout
- `1998211` — feat(data): add site config and product category data

---

## Next Action Items

> Sprint 00 selesai. Sprint 01 belum ditentukan. Items di bawah adalah saran — tunggu instruksi user.

- [ ] **Produksi build test:** `npm run build` — belum pernah dijalankan, perlu diverifikasi sebelum deploy
- [ ] **SEO tambahan:** JSON-LD `LocalBusiness` schema (opsional, dihindari karena butuh `dangerouslySetInnerHTML`)
- [ ] **OG Image:** Tambah `opengraph-image.tsx` agar preview share sosmed lebih menarik
- [ ] **Performance:** Tambah `next/image` jika ada gambar produk yang akan dimasukkan
- [ ] **Analytics:** Tambah Google Analytics / Vercel Analytics jika perlu tracking pengunjung
- [ ] **Deployment:** Tentukan platform (Vercel/Cloudflare/dll) dan setup CI/CD
- [ ] **Sprint 01 scope:** Belum ditentukan — tanya user

---

## Known Issues / Catatan Penting

- `npm audit` melaporkan **2 moderate severity vulnerabilities** dari dependencies — belum diverifikasi apakah dari framer-motion/lucide atau next.js itu sendiri. Tidak blocking untuk landing page statis.
- Komponen `Button.tsx` dan `Icons.tsx` di `src/components/ui/` saat ini tidak digunakan langsung (digantikan oleh lucide + motion.a inline). Boleh di-refactor atau hapus jika membingungkan, tapi tidak wajib.
- `lucide-react` tidak mengekspor `Instagram` — sudah diperbaiki ke `AtSign`. Cek icon lain jika ingin menambah.
- `MEMORY_BANK.md` sempat masuk status `D` (deleted) di git — sudah di-restore dalam commit ini.

---

## Dev Commands

```bash
npm run dev          # http://localhost:3000 (Turbopack)
npm run typecheck    # tsc --noEmit — wajib sebelum commit
npm run lint         # ESLint
npm run build        # Production build — belum pernah dijalankan
```

---

## Commit Log (Sprint 00)

```
5b19618 style(ui): major redesign - Open Sans, dark hero, two-zone cards, modern footer
a3f317c style(frontend): elevate UI with framer-motion animations and lucide-react icons
5de08cf feat(ui): assemble complete landing page layout sections and client components
335905e feat(ui): add WhatsApp util, icon/button primitives, and CategoryCard
1998211 feat(data): add site config and product category data
88cdde3 feat(layout): add brand design tokens and base layout
8a43bdd chore: scaffold Next.js 16 project and agent protocol
52157e2 docs(plan): add landing page implementation plan for craftoria
69d1c1a docs(spec): add landing page design spec for craftoria
```
