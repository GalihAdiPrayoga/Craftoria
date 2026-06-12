# MEMORY BANK — Craftoria.co

> **Tujuan file ini:** Sumber kebenaran tunggal bagi setiap AI agent atau developer yang mengambil alih project ini. Baca file ini PERTAMA sebelum menyentuh kode apapun.
> **Update terakhir:** 2026-06-12
> **Konvensi update:** Pindahkan task yang selesai ke 'Recent Changes', update 'Current Status', catat dependensi/isu baru. Commit bersama perubahan kode.

---

## 🟢 Current Status

**Fase:** Sprint 00 — SELESAI ✅
**Landing page profil Craftoria.co sudah live di dev server (http://localhost:3000).**

### Task Berikutnya yang Siap Dikerjakan (Sprint 01)
- [ ] Production build test — jalankan `npm run build` dan pastikan output statis bersih
- [ ] Deploy ke hosting (Vercel / Netlify) — belum ada konfigurasi deploy
- [ ] Tambah `sitemap.xml` dan `robots.txt` untuk SEO
- [ ] Tambah JSON-LD `LocalBusiness` schema (dihindari karena `dangerouslySetInnerHTML` — pakai metode string atau library aman)
- [ ] Evaluasi audit performa Lighthouse (mobile score target: ≥ 90)
- [ ] Isi URL Shopee asli di `src/data/site.ts` (saat ini placeholder search URL)
- [ ] Tambah OG image (`opengraph-image.tsx` atau static file)
- [ ] Setup `NEXT_PUBLIC_*` env vars jika ada kebutuhan konfigurasi runtime

---

## 📋 Recent Changes

### 2026-06-12 — Batch 2 + UI Refinement (Sprint 00 Final)
**Commit:** `a3f317c` — `style(frontend): elevate UI with framer-motion animations and lucide-react icons`

**Files yang dibuat/diubah:**
| File | Aksi | Keterangan |
|---|---|---|
| `src/components/FloatingWhatsApp.tsx` | Upgraded | Framer Motion `AnimatePresence` spring, lucide `MessageCircle` |
| `src/components/Navbar.tsx` | Upgraded | Animated hamburger (`Menu`↔`X`), accordion mobile menu, staggered items |
| `src/components/Footer.tsx` | Upgraded | Lucide `Phone`, `AtSign`, `MapPin` icons; grid 3-kolom |
| `src/components/sections/HeroSection.tsx` | Upgraded | Staggered entrance, blur blobs, bounce scroll indicator |
| `src/components/sections/AboutSection.tsx` | Upgraded | `useInView` fade-up, lucide icons per card, spring hover-lift |
| `src/components/sections/CatalogSection.tsx` | Upgraded | Staggered card entrance 100ms delay |
| `src/components/CategoryCard.tsx` | Upgraded | Spring hover lift/scale, lucide `ChevronRight` + `MessageCircle` |
| `src/lib/utils.ts` | Baru | `cn()` utility (clsx + tailwind-merge) |
| `package.json` | Modified | Tambah `framer-motion`, `lucide-react`, `clsx`, `tailwind-merge` |

### 2026-06-12 — Batch 1 (Task 4–6)
**Commit:** `335905e` — `feat(ui): add WhatsApp util, icon/button primitives, and CategoryCard`

| File | Aksi |
|---|---|
| `src/utils/whatsapp.ts` | Baru — `buildWhatsAppLink(categoryTitle?)` |
| `src/components/ui/Icons.tsx` | Baru — `WhatsAppIcon`, `ArrowRightIcon` (SVG murni) |
| `src/components/ui/Button.tsx` | Baru — 3 varian: `primary`, `outline`, `ghost` |
| `src/components/CategoryCard.tsx` | Baru |

### 2026-06-11 — Scaffold & Data (Claude Code, Task 1–3)
**Commits:** `8a43bdd`, `88cdde3`, `1998211`
- Next.js 16 scaffold + agent protocol
- Design tokens Tailwind v4 (`@theme`)
- Data files: `src/data/site.ts`, `src/data/categories.ts`

---

## 🏗️ Arsitektur Saat Ini

```
src/
├── app/
│   ├── globals.css          # @theme tokens: cream, cream-light, navy, whatsapp
│   ├── layout.tsx           # Root: Navbar + main + Footer + FloatingWhatsApp
│   └── page.tsx             # Assembly: HeroSection, AboutSection, CatalogSection
├── components/
│   ├── CategoryCard.tsx     # Client — hover animation, WA CTA kontekstual
│   ├── FloatingWhatsApp.tsx # Client — fixed bottom-right, AnimatePresence
│   ├── Footer.tsx           # Server — id="contact", grid 3-kolom
│   ├── Navbar.tsx           # Client — sticky blur, mobile accordion
│   ├── sections/
│   │   ├── HeroSection.tsx     # Client — staggered entrance
│   │   ├── AboutSection.tsx    # Client — useInView, 3 sub-sections
│   │   └── CatalogSection.tsx  # Client — staggered cards
│   └── ui/
│       ├── Button.tsx       # Server — 3 variant, renders <a> atau <button>
│       └── Icons.tsx        # Server — WhatsAppIcon, ArrowRightIcon SVG
├── data/
│   ├── site.ts              # brand, WA number, socials, navItems
│   └── categories.ts        # 3 kategori + item list (typed)
├── lib/
│   └── utils.ts             # cn() = clsx + tailwind-merge
└── utils/
    └── whatsapp.ts          # buildWhatsAppLink(categoryTitle?)
```

### Anchor ID Map (navItems ↔ section id) — JANGAN UBAH TANPA SINKRONISASI
| `href` di navItems | `id` di komponen |
|---|---|
| `#about` | `AboutSection` sub-section about |
| `#vision-mission` | `AboutSection` sub-section vision-mission |
| `#why-us` | `AboutSection` sub-section why-us |
| `#categories` | `CatalogSection` |
| `#contact` | `Footer` |

---

## 🛠️ Tech Stack

| Layer | Tech | Versi |
|---|---|---|
| Framework | Next.js (App Router, Turbopack) | 16.2.9 |
| UI Library | React | 19.2.4 |
| Bahasa | TypeScript | 5.x |
| Styling | Tailwind CSS v4 (`@tailwindcss/postcss`) | ^4 |
| Animasi | **framer-motion** | latest (installed 2026-06-12) |
| Icons | **lucide-react** | latest (installed 2026-06-12) |
| Class Utility | **clsx** + **tailwind-merge** | latest (installed 2026-06-12) |
| Linting | ESLint 9 (`eslint-config-next`) | 9.x |
| Package Manager | npm | — |
| Import alias | `@/*` → `src/*` | tsconfig |
| Database / Auth / Storage | **Belum ada** — fase ini static site | — |
| Deployment | **Belum dikonfigurasi** | — |

---

## ⚠️ Known Issues & Catatan Penting

### Aman / Tidak Berisiko
- Tidak ada auth, database, payment, atau input user — surface attack sangat kecil
- Nomor WhatsApp (`6285113153923`) adalah kontak bisnis publik — aman di-hardcode di `site.ts`
- Tidak ada env var sensitif saat ini

### Perlu Perhatian
1. **Shopee URL placeholder** — `site.shopeeUrl` saat ini berisi URL pencarian (`shopee.co.id/search?keyword=craftoria.co`), bukan URL toko asli. Update sebelum deploy.
2. **LF/CRLF warning** — git menampilkan warning konversi line ending (Windows). Pertimbangkan tambah `.gitattributes` jika jadi masalah.
3. **2 moderate npm vulnerabilities** — jalankan `npm audit` untuk detail. Tidak kritis untuk static site, tapi review sebelum deploy production.
4. **`lucide-react` tidak export `Instagram`** — sudah difix dengan `AtSign`. Jika butuh icon Instagram spesifik, cari alternatif di `lucide-react` atau embed SVG manual.
5. **`src/components/ui/Button.tsx`** — masih ada, tapi komponen yang diupgrade (HeroSection, CategoryCard) sudah tidak menggunakannya lagi (langsung pakai `<a>` + Framer Motion). Bisa di-refactor atau dihapus di sprint berikutnya.

### Aturan Wajib (dari CLAUDE.md)
- Jangan call DB/ORM dari luar `server/repositories/` (belum ada, tapi tetap pegang prinsip saat ada)
- Jangan expose secret ke client
- Tidak ada `dangerouslySetInnerHTML` tanpa sanitasi
- Semua env var sensitif tanpa prefix `NEXT_PUBLIC_`

---

## 🔒 Security Checklist (last run: belum dijalankan formal)
- [ ] `npm run security:secrets` (gitleaks) — jalankan sebelum deploy
- [ ] `npm run security:code` (semgrep) — jalankan sebelum deploy
- [ ] `npm audit` — 2 moderate vulns, review sebelum deploy
- [x] Tidak ada secret/token di codebase
- [x] Tidak ada DB writes / mutation dari GET
- [x] Semua WA links melalui `buildWhatsAppLink()` yang terpusat

---

## 📌 Git Log Ringkas

```
a3f317c style(frontend): elevate UI with framer-motion animations and lucide-react icons
5de08cf feat(ui): assemble complete landing page layout sections and client components
335905e feat(ui): add WhatsApp util, icon/button primitives, and CategoryCard
1998211 feat(data): add site config and product category data
88cdde3 feat(layout): add brand design tokens and base layout
8a43bdd chore: scaffold Next.js 16 project and agent protocol
```
