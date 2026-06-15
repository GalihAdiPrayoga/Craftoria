# MEMORY_BANK.md — Craftoria

> **Tujuan file ini:** Snapshot operasional project yang selalu aktual.
> Dibaca PERTAMA oleh AI agent baru sebelum menyentuh kode apapun.
> Wajib di-update setiap akhir sesi kerja (lihat protokol di `AGENTS.md § Memory Sync Protocol`).
>
> **Last updated:** 2026-06-12 · Agent: Antigravity (Gemini) — Atomic Design & Premium Company Profile Refine

---

## Current Status

**Phase:** UI Polish v2 — Implemented, **validasi pending** ⚠️ (2026-06-15). Sebelumnya: Gallery Refine ✅ (2026-06-13).
**Next Sprint:** Jalankan validasi UI Polish v2 (`typecheck`/`lint`/`build` + QA Playwright konfirmasi bug navbar) → lalu Deployment (Vercel); opsional `metadataBase` + OG image
**Dev Server:** `npm run dev` → http://localhost:3000
**Build:** ✅ production build sukses (Next.js 16, fully static). `npm run predeploy` hijau (lint/typecheck/build/gitleaks/semgrep).

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

**ATURAN:** Jangan tambah warna di luar token di atas tanpa update `globals.css` dan tabel ini.

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

**UI Polish v2** `pending` — feat(ui): hero serif, diagonal dividers, navy vision band, navbar contrast fix
- Spec: `docs/superpowers/specs/2026-06-15-craftoria-ui-polish-v2-design.md` · Plan: `docs/superpowers/plans/2026-06-15-craftoria-ui-polish-v2.md`. **Constraint: nol warna baru** (hanya token navy/cream/white).
- `Navbar.tsx`: fix bug kontras — ganti threshold `innerHeight-80` (rapuh saat hero < 100vh) → `IntersectionObserver` pada `#hero` (fallback `scrollY>24`).
- `HeroSection.tsx`: judul `font-sans` → `font-serif` (Playfair, konsisten editorial); `pt-24 pb-16` → `min-h-[88vh] flex items-center`; CTA hardcode `wa.me` → `buildWhatsAppLink()`; hapus wave SVG → divider diagonal `clip-path`.
- `Footer.tsx`: hapus wave SVG → divider diagonal `clip-path` (arah konsisten dgn Hero→About).
- `AboutSection.tsx`: section `#vision-mission` di-invert jadi **band navy gelap** (focal point, pecah ritme cream→white); `SectionLabel` dapat prop `light`.
- `globals.css` + `AboutSection`/`GallerySection`: anti-FOUC — class `.reveal-fade` + `@media (prefers-reduced-motion)` & `(scripting:none)` paksa konten visible bila JS gagal/reduced-motion.
- ⚠️ **Validasi BELUM dijalankan** (sandbox Bash down saat sesi): `typecheck`/`lint`/`build`/QA Playwright pending. Bug navbar G1 belum dikonfirmasi visual.

### 2026-06-15 — Antigravity (Gemini)
**Visual Enhancements Point 1 & 2** `pending` — feat(ui): improve about and vision-mission section aesthetics
- `AboutSection.tsx`: Diubah tampilan pada poin 1 (ABOUT) dan poin 2 (VISION & MISSION).
- Point 1: Menambahkan watermark besar "STUDIO" dan efek glassmorphism interaktif.
- Point 2 (Vision & Mission): User menolak background navy karena kurang kontras, diganti menjadi "Bento Box" Grid modern dengan latar belakang terang (`bg-white`) yang terstruktur secara asimetris. Kartu Visi Utama ditambahkan efek *inverted hover* (berubah menjadi gelap saat di-*hover*) menyerupai kartu di *section* Why Us.

### 2026-06-15 — Antigravity (Gemini)

**Visual & Interactive Enhancements** `pending` — feat(ui): improve about section interactivity and gallery masonry
- `GallerySection.tsx`: Diubah agar gambar pada filter "Semua" memiliki *aspect ratio* yang bervariasi secara deterministik (`aspect-square`, `aspect-[4/5]`, dll). Ini memaksa layout *masonry* terlihat lebih acak dan dinamis, tidak seperti grid seragam.
- `AboutSection.tsx`: Desain yang sebelumnya "polos" (teks linear) diubah menjadi elemen interaktif bergaya *bento box* atau kartu premium. Ditambahkan efek *hover* yang dinamis (translasi, bayangan, blob background yang membesar, serta ikon yang berputar/membesar) pada strip fitur, daftar Visi Misi, dan kartu Kenapa Kami.
- Validasi: `npm run typecheck` ✅.

### 2026-06-13 — Claude Code (Gallery Refine)

**Katalog → Gallery image-forward** — feat(ui): ganti CatalogSection teksual jadi GallerySection berbasis 30 foto produk asli.
- Baru: `data/gallery.ts` (30 foto + kategori, hasil kurasi visual), `sections/GallerySection.tsx` (tabs + masonry CSS columns + lightbox + CTA WA), `organisms/Lightbox.tsx` (keyboard + a11y), `molecules/GalleryTabs.tsx`.
- Hero: stats `500+/1000+/8+` → value-props jujur; CTA "Lihat Galeri" → anchor `#gallery` (sebelumnya tombol mati).
- Why-Us: layout list-kanan → grid 3-kolom kartu (pecah monotoni 3 section identik).
- Nav: `#categories` → `#gallery` (site.ts navItems + Footer navLinks). NavLink dapat prop `scrolled` (putih di hero, navy setelah scroll).
- Dihapus: `CatalogSection`, `CategoryCard`, `DummyImage`, `ProductItemRow`, dan duplikat `components/FloatingWhatsApp.tsx` (orphan).
- Security script: `security:fs` → `trivy fs --skip-dirs .next .` (hindari FATAL file-lock pada `.next/dev/lock`).
- Validasi: `npm run predeploy` → lint ✅ · typecheck ✅ · build ✅ (static) · gitleaks ✅ · semgrep 0 findings ✅.
- Docs: `docs/superpowers/specs/2026-06-13-craftoria-gallery-refine-design.md` + `plans/2026-06-13-craftoria-gallery-refine.md`.

### 2026-06-12 — Antigravity (Gemini)

**Full Design Polish & Structural Fix** `pending` — refactor(ui): comprehensive design polish across all sections
- `HeroSection.tsx`: Rebuilt with proper ref separation (sectionRef for pin, contentRef for animations), `h-screen max-h-[900px]`, tighter typography, capped image size (`max-w-sm`), ScrollTrigger cleanup on unmount.
- `AboutSection.tsx`: All 3 sub-sections now have `relative z-20` to properly overlay pinned hero. Reduced excessive padding (py-32→py-24). Tightened text sizing and spacing.
- `CatalogSection.tsx`: Added `relative z-20`. Restored sensible bottom padding (pb-16/pb-24). Tightened card grid gap.
- `CategoryCard.tsx`: Added `rounded-xl bg-white shadow-card hover:shadow-card-hover` for polished card appearance.
- `Footer.tsx`: Added `relative z-20`. Made logo font-sans font-black to match Navbar. Fixed SVG wave `-mb-px` gap.
- `Navbar.tsx`: Bumped z-index to `z-50`. Smoother transition `duration-500`.
- All validations pass: typecheck ✅, lint ✅, build ✅.


**Atomic Redesign** `HEAD` — design(atomic): implement full global atomic design system and elevate visual to premium company profile standard
- Buat arsitektur: `atoms/`, `molecules/`, `organisms/`, `sections/`
- **Atoms**: `Button` (polymorphic + variants), `Heading` (Playfair Display serif & Open Sans sans), `DummyImage` (unsplash curated, zoom hover)
- **Molecules**: `NavLink`, `ProductItemRow`
- **Organisms**: `CategoryCard`, `Navbar`, `Footer`
- **Sections**: Rombak `AboutSection` ke asimetris layout, editorial text stagger, whitespace lebar (`py-36`). Implementasi `<Heading>` dan `<Button>` ke seluruh `HeroSection` dan `CatalogSection`.
- Font Playfair Display (serif) ditambahkan ke layout untuk nuansa editorial premium.
- Typecheck status: ✅ Exit 0

**UI Redesign** `c3036c4` — style(ui): major redesign - Open Sans, dark hero, two-zone cards, modern footer
- Font: Geist → **Open Sans** (300–800), token updated di `globals.css`
- `globals.css`: tambah `--color-navy-mid`, `--color-navy-soft`, custom `::selection`
- `HeroSection`: dark navy bg, dot-grid overlay, glassmorphism CTA, stats strip
- `AboutSection`: pill `SectionLabel`, feature strip 3-col, dark visi card full-width, watermark number on why-us
- `CategoryCard`: two-zone layout (colored header band + white body), accent cycling, `Check` item markers, product count badge, `index` prop baru
- `CatalogSection`: pass `index` ke CategoryCard, grid `items-stretch`
- `Footer`: full redesign — CTA band (dark card + WA button) + 4-col dark footer (`navy-mid`)

**Batch 3** `a3f317c` — style(frontend): elevate UI with framer-motion animations and lucide-react icons
- Install: `framer-motion`, `lucide-react`, `clsx`, `tailwind-merge`
- Buat `src/lib/utils.ts` — `cn()` utility
- Upgrade semua komponen dengan Framer Motion + lucide icons

**Batch 2** `5de08cf` — feat(ui): assemble complete landing page layout sections and client components
- Buat `FloatingWhatsApp.tsx`, `Navbar.tsx`, `Footer.tsx`
- Buat `sections/HeroSection.tsx`, `AboutSection.tsx`, `CatalogSection.tsx`

**Batch 1** `335905e` — feat(ui): add WhatsApp util, icon/button primitives, and CategoryCard
- Buat `src/utils/whatsapp.ts` — `buildWhatsAppLink()`
- Buat `src/components/ui/Icons.tsx` — `WhatsAppIcon`, `ArrowRightIcon`

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
- `lucide-react` tidak mengekspor `Instagram` — sudah diperbaiki ke `AtSign`. Cek icon lain jika ingin menambah.
- `src/components/ui/` yang sebelumnya berisi Icons & Button lama sudah ditimpa/dipindahkan konsepnya sepenuhnya ke `atoms/`, `molecules/`, dan `organisms/`.
- **trivy** akan FATAL bila men-scan `.next/dev/lock` saat dev server jalan (Windows file-lock). Sudah dimitigasi via `--skip-dirs .next` di `security:fs`. Jika masih kena, stop dev server dulu sebelum `npm run security:all`.
- `data/categories.ts` kini **legacy** (tak dirender setelah katalog → gallery). Bisa dihapus bila tak ada rencana pakai ulang.
- Foto gallery campuran: ada poster promo ber-teks (mis. "TOTEBAG CANVAS CUSTOM") & foto produk bersih. Kategori di `gallery.ts` hasil kurasi — verifikasi ulang bila menambah/mengganti foto.
- **Utang teknis animasi (UI Polish v2):** 3 sistem animasi co-exist (GSAP ScrollTrigger + Framer Motion + CSS transition) untuk landing statis → bundle berlebih. Konsolidasi ke satu sistem belum dikerjakan (di luar scope v2). Anti-FOUC sudah dimitigasi via `.reveal-fade` + media query, tapi reveal masih bergantung GSAP untuk path normal.
- **UI Polish v2 belum tervalidasi:** perubahan 2026-06-15 ditulis tanpa menjalankan `typecheck`/`lint`/`build` (sandbox down). Jalankan `npm run predeploy` + QA visual (terutama transisi navbar Hero→About) sebelum commit/deploy.

---

## Dev Commands

```bash
npm run dev          # http://localhost:3000 (Turbopack)
npm run typecheck    # tsc --noEmit — wajib sebelum commit
npm run lint         # ESLint
npm run build        # Production build (Next.js 16, Turbopack) — ✅ sukses
npm run predeploy    # lint + typecheck + build + security:all (gate sebelum deploy)
```
