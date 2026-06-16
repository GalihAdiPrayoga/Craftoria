# About Redesign · Font Modern · Full Responsive — Implementation Plan

**Tanggal:** 2026-06-16
**Spec:** _Tidak ada spec formal — mini-spec inline di bawah (user minta langsung plan via `/plan-writer`)._
**Status:** Done — 2026-06-16

---

## Mini-Spec (inline)

**Tujuan:** 3 perubahan berhubungan pada landing page Craftoria.

1. **Ganti font global** Playfair Display → **Geist** (neo-grotesque modern, bersih). Body tetap sans bersih (Open Sans). Heading pindah dari serif editorial ke display sans modern. Token `--font-serif` diganti `--font-display`; utility `font-serif` → `font-display` di seluruh codebase.
2. **Redesign About section** ke arah **editorial bersih & tegas**: buang ciri "AI-generated" (watermark `STUDIO`, glassmorphism `backdrop-blur`, blob dekoratif, teks gradient-clip italic, hover-blob scale). Ganti dengan grid tegas, garis pemisah, tipografi besar, whitespace lega. Pertahankan 3 sub-section: Tentang (`#about`), Visi & Misi (`#vision-mission`), Kenapa Kami (`#why-us`).
3. **Responsif penuh** untuk semua ukuran layar (≥320px sampai ultrawide): audit & perbaiki tiap breakpoint di semua komponen.

**Keputusan desain (dari user, 2026-06-16):**
- Font heading: **Sans neo-grotesque bersih (Geist)**.
- About: **Editorial bersih & tegas** (bukan flat penuh, bukan poles minimal).

**Non-goal:** Tidak menambah halaman/route baru, tidak ubah konten data (`site.ts`), tidak ubah Gallery/Lightbox secara fungsional (hanya font + responsif).

---

## Scope Summary
1. Swap font keluarga di `layout.tsx` + `globals.css` + atom `Heading` (fondasi).
2. Migrasi semua pemakaian `font-serif` → `font-display` di Hero, Gallery, Footer, About; hapus `italic`/gradient-clip yang hanya relevan untuk serif.
3. Redesign penuh `AboutSection.tsx` (3 sub-section) ke gaya editorial bersih + responsif.
4. Audit & perbaikan responsif lintas komponen (Hero, Navbar, Gallery, Footer).
5. Validasi (typecheck/lint/build) + QA visual Playwright + update dokumentasi.

---

## Task Breakdown

### Task 1: Swap font keluarga (Playfair → Geist)
**Files:**
- `[MODIFY] src/app/layout.tsx` — ganti import `Playfair_Display` → `Geist`; variabel `--font-display`.
- `[MODIFY] src/app/globals.css` — token `--font-serif` → `--font-display`.

**Detail:**
- `layout.tsx`: ganti `import { Open_Sans, Playfair_Display } from "next/font/google"` → `import { Open_Sans, Geist } from "next/font/google"`.
- Definisikan `const geist = Geist({ variable: "--font-display", subsets: ["latin"], weight: ... })`. Geist mendukung weight `["300","400","500","600","700","800"]` — pilih `400–700` (display tak butuh 900). Gunakan `display: "swap"`.
  - _Catatan Context7:_ verifikasi nama export & opsi `weight` Geist di `next/font/google` lewat **Context7** sebelum tulis kode (API `next/font` bisa berubah antar versi Next 16).
- Update `className` di `<html>`: `${openSans.variable} ${geist.variable}`.
- `globals.css` `@theme`: ganti baris `--font-serif: var(--font-playfair);` → `--font-display: var(--font-geist);`. Tailwind v4 otomatis generate utility `font-display` dari token `--font-*`.
- `--font-sans: var(--font-open-sans)` tetap.

**Validation:**
```bash
npx tsc --noEmit
```
Visual: heading masih render (akan jadi serif→sans setelah Task 2 migrasi class). Tidak boleh ada error build font.

**Depends on:** —

---

### Task 2: Migrasi utility `font-serif` → `font-display` + bersihkan dekorasi serif
**Files:**
- `[MODIFY] src/components/atoms/Heading.tsx` — variant `serif` → `display` (atau map ke `font-display`).
- `[MODIFY] src/components/sections/HeroSection.tsx` — `font-serif` → `font-display` (1 lokasi, `h1`).
- `[MODIFY] src/components/sections/GallerySection.tsx` — `font-serif` → `font-display` (1 lokasi).
- `[MODIFY] src/components/organisms/Footer.tsx` — `font-serif italic` → `font-display` (hapus `italic`, line 117).

**Detail:**
- Cari semua `font-serif` di `src/` dan ganti ke `font-display`. Lokasi terkonfirmasi (di luar About, yang dibuang/ditulis ulang di Task 3): Hero `h1` (HeroSection.tsx:53), Gallery heading (GallerySection.tsx:67), Footer moto (Footer.tsx:117).
- Hapus `italic` pada teks yang sebelumnya mengandalkan serif untuk nuansa editorial (Footer moto) — Geist tidak punya true-italic yang elegan; pakai weight/letter-spacing untuk emphasis.
- `Heading.tsx`: ubah type `HeadingVariant = "serif" | "sans"` → `"display" | "sans"` dan map `variant === "display" ? "font-display" : "font-sans"`. Update JSDoc. (Atom ini belum dipakai section mana pun — tetap disinkronkan agar konsisten.)
- Tuning ukuran heading bila perlu: Geist (sans) tampak lebih besar/berat dari Playfair pada ukuran sama → boleh turunkan weight ke `font-medium`/`font-semibold` dan rapatkan `tracking-tight` agar tegas-modern. Hindari `font-extrabold` untuk display besar.

**Validation:**
```bash
npx tsc --noEmit
npm run lint
grep -rn "font-serif" src/   # harus 0 hasil
```
Visual: Hero & Gallery heading render Geist, tak ada FOUT parah.

**Depends on:** Task 1

---

### Task 3: Redesign `AboutSection` — editorial bersih & tegas + responsif
**Files:**
- `[MODIFY] src/components/sections/AboutSection.tsx` — tulis ulang ketiga sub-section (Tentang / Visi & Misi / Kenapa Kami).

**Detail (buang ciri "AI-generated"):**
- **Hapus:** watermark `STUDIO` (`text-[7rem]…text-navy/3`), blob dekoratif (`blur-[100px]`/`blur-[80px]`), glassmorphism (`bg-white/70 backdrop-blur-md`), teks gradient-clip italic (`bg-clip-text … italic`), hover-blob scale (`group-hover:scale-[3.5]`).
- **Pertahankan:** wave SVG transisi navy→putih di puncak `#about` (KUNCI transisi warna Hero↔About — jangan diutak-atik, lihat commit `abcbfd6`), id anchor (`#about`, `#vision-mission`, `#why-us`), data `missions`/`reasons`, animasi `FadeUp` (GSAP) + kelas `.reveal-fade` anti-FOUC.

**Detail (gaya editorial baru):**
- **Tentang (`#about`):** layout 2 kolom tegas dengan garis pemisah (`border-navy/10`). Kiri: eyebrow label kecil uppercase tracking-wide + headline `font-display` besar (tanpa gradient/italic). Kanan: paragraf body + 1 kalimat penegasan. Ganti kartu glass jadi blok solid/flat atau cukup teks dengan divider. Feature strip 3 kolom: kartu border tipis solid (tanpa `backdrop-blur`), ikon kotak solid, hover halus (shadow + translate kecil, tanpa blob).
- **Visi & Misi (`#vision-mission`):** ganti bento-grid jadi struktur editorial bersih — mis. 1 blok Visi besar (flat, border tegas) + daftar Misi bernomor/`grid` rapi. Hover navy-invert boleh dipertahankan tapi tanpa blob (`group-hover:scale-[3.5]` dibuang).
- **Kenapa Kami (`#why-us`):** grid 3 kartu sudah cukup "editorial" — rapikan: nomor besar `01/02/03` sebagai elemen tipografi, border/divider tegas, hover navy halus tanpa blob scale. Boleh ganti `font-mono` → `font-display tabular-nums` agar konsisten satu keluarga.
- **Responsif:** mobile-first. Pastikan headline tak overflow di 320px (pakai `text-3xl sm:text-4xl md:text-5xl`, bukan ukuran fixed besar). Grid: `grid-cols-1` → `sm:grid-cols-2`/`sm:grid-cols-3` → `lg:`. Padding seksi `py-20 sm:py-24 lg:py-32`. Hilangkan elemen absolut yang bisa bikin horizontal-scroll di layar kecil.

**Validation:**
```bash
npx tsc --noEmit
npm run lint
```
Visual (Playwright, lihat Task 5): tak ada watermark/blob/glass tersisa; tak ada horizontal scroll di 320/375px; anchor scroll (`#about` dst.) tetap jalan.

**Depends on:** Task 1, Task 2 (agar `font-display` sudah tersedia)

---

### Task 4: Audit & perbaikan responsif lintas komponen
**Files:**
- `[MODIFY] src/components/sections/HeroSection.tsx` — grid 2 kolom, value-props 3 kolom, ukuran gambar.
- `[MODIFY] src/components/organisms/Navbar.tsx` — padding/spacing di layar kecil.
- `[MODIFY] src/components/sections/GallerySection.tsx` — column-count & gap di breakpoint kecil.
- `[MODIFY] src/components/organisms/Footer.tsx` — grid kolom di mobile/tablet.

**Detail (target: 320px → ultrawide):**
- **Hero:** value-props `grid-cols-3` di mobile bisa sempit di 320px → pertimbangkan `grid-cols-3` tetap tapi kecilkan teks, atau `grid-cols-1 xs:grid-cols-3`. Gambar `rotate-6` jangan sampai overflow horizontal di mobile (cek `overflow-hidden` section sudah ada — verifikasi). Heading `text-5xl` di 320px bisa kebesaran → `text-4xl sm:text-5xl md:text-6xl`. CTA stack `flex-col sm:flex-row` sudah benar.
- **Navbar:** brand text `text-2xl` + logo — cek muat di 320px bersama hamburger. Max-width & padding konsisten (`max-w-6xl` vs Hero `max-w-7xl` — selaraskan kalau perlu).
- **Gallery:** `[column-count:2]` di mobile + gap-4 oke; verifikasi di 320px tidak terlalu sempit (boleh `[column-count:1] xs:[column-count:2]`). Tabs (`GalleryTabs`) cek wrap di layar kecil.
- **Footer:** verifikasi grid kolom collapse rapi di mobile (saat ini quote `hidden lg:block`). Pastikan kontak/links stack benar.
- **Global:** tambah breakpoint `xs` (mis. 400px) di `@theme` bila dibutuhkan untuk kontrol 320–400px (`--breakpoint-xs: 25rem;`). Pastikan tidak ada elemen yang menyebabkan `overflow-x` (audit `w-[...]`/absolute negatif).

**Validation:**
```bash
npx tsc --noEmit
npm run lint
```
Visual: lihat Task 5 (matriks viewport).

**Depends on:** Task 3 (About sudah final agar audit responsif menyeluruh sekali jalan). Task 4 area Navbar/Hero/Gallery/Footer bisa **paralel** dengan Task 3 bila dikerjakan hati-hati (file berbeda), tapi disarankan setelah Task 3 agar QA viewport sekali untuk semua.

---

### Task 5: Validasi penuh + QA visual + dokumentasi
**Files:**
- `[MODIFY] CLAUDE.md` — § Status Sprint, § Fitur yang Sudah Dibangun, § Stack (font), § Keputusan Arsitektur (font/desain).
- `[MODIFY] MEMORY_BANK.md` — baris Font (line ~30) & catatan HeroSection/About (line ~132) agar mencerminkan Geist + About editorial.

**Detail:**
- **Automated:** jalankan blok di Validation Plan di bawah, baca output sebelum klaim.
- **QA visual (Playwright MCP):** buka `npm run dev`, screenshot tiap section di viewport: **320, 375, 414, 768, 1024, 1440, 1920**. Cek: (a) tak ada horizontal scroll; (b) heading Geist render; (c) About bersih dari watermark/blob/glass; (d) anchor nav berfungsi; (e) hover state tidak rusak.
- **Docs:** tambah baris Sprint baru (tanggal 2026-06-16) + entri fitur. Update tabel Stack: `Font | Open Sans (body) + Geist (display)`.

**Validation:**
```bash
npx tsc --noEmit
npm run lint
npm run build
```

**Depends on:** Task 4

---

## File Manifest (Complete)

### Font & Theme
| Action | File | Description |
|---|---|---|
| MODIFY | `src/app/layout.tsx` | Import Geist ganti Playfair; variabel `--font-display` |
| MODIFY | `src/app/globals.css` | Token `--font-serif` → `--font-display`; (opsional `--breakpoint-xs`) |
| MODIFY | `src/components/atoms/Heading.tsx` | Variant `serif` → `display`, map ke `font-display` |

### Sections / Components
| Action | File | Description |
|---|---|---|
| MODIFY | `src/components/sections/AboutSection.tsx` | Tulis ulang 3 sub-section ke editorial bersih + responsif (perubahan terbesar) |
| MODIFY | `src/components/sections/HeroSection.tsx` | `font-serif`→`font-display`; ukuran heading & value-props responsif |
| MODIFY | `src/components/sections/GallerySection.tsx` | `font-serif`→`font-display`; column-count breakpoint kecil |
| MODIFY | `src/components/organisms/Navbar.tsx` | Spacing/brand responsif 320px |
| MODIFY | `src/components/organisms/Footer.tsx` | `font-serif italic`→`font-display`; grid kolom mobile |

### Docs
| Action | File | Description |
|---|---|---|
| MODIFY | `CLAUDE.md` | Status Sprint, Fitur, Stack (font), Keputusan |
| MODIFY | `MEMORY_BANK.md` | Sinkron font Geist + About editorial |

---

## Shared-File Risks
- `src/app/globals.css` & `src/app/layout.tsx` — dipakai seluruh app. Perubahan font menyentuh semua halaman; uji global setelah Task 1.
- `src/components/atoms/Heading.tsx` — atom dasar; meski belum dipakai section, perubahan API variant bisa berdampak bila ada konsumen baru. Aman saat ini (0 konsumen terverifikasi via grep).
- Wave SVG transisi di `AboutSection.tsx` — bagian sensitif (warna transisi Hero↔About, commit `abcbfd6`). Jangan ubah `viewBox`/`fill-navy`/posisi saat redesign.

---

## Validation Plan

### Automated
```bash
npx tsc --noEmit        # type safety
npm run lint            # ESLint
npm run build           # production build (Turbopack)
```

### Manual QA (Playwright MCP)
Matriks viewport — untuk tiap lebar cek tak ada horizontal scroll + layout benar:
- [ ] 320px (mobile kecil) — Hero, About, Gallery, Footer
- [ ] 375px / 414px (mobile umum)
- [ ] 768px (tablet)
- [ ] 1024px (laptop kecil)
- [ ] 1440px / 1920px (desktop / ultrawide)

Fungsional:
- [ ] Heading render **Geist** (bukan serif), tak ada FOUT parah
- [ ] About bersih: tak ada watermark `STUDIO`, blob, glass, gradient-italic
- [ ] Nav anchor (`#about`, `#vision-mission`, `#why-us`, `#gallery`) scroll benar
- [ ] `prefers-reduced-motion` → konten tetap tampil (anti-FOUC `.reveal-fade`)
- [ ] Hover state kartu/CTA tidak rusak di desktop

---

## Security Review Checklist
- [ ] Perubahan **murni presentational** (font + layout + responsif) — tak menyentuh auth/input/API/secret. Surface sensitif: **tidak ada**.
- [ ] Dispatch `typescript-reviewer` (atau review TS manual) setelah Task 2–4 untuk pastikan tak ada `any`/regресi tipe pada perubahan komponen.
- [ ] `gitleaks protect --staged --no-banner` sebelum commit (rutin) — tak ada secret di font/CSS.
- [ ] Tak perlu `semgrep`/`trivy` deep scan (tidak ada perubahan dependency runtime berisiko; Geist sudah bagian `next/font`).

---

## Rollback Notes
- **Reversible penuh** — semua perubahan presentational via git. Rollback = `git revert` commit terkait.
- **Tidak ada migration / feature flag** — perubahan langsung pada landing statis.
- Jika Geist bermasalah (FOUT/berat), fallback cepat: kembalikan import Playfair di `layout.tsx` + token `--font-display`→Playfair tanpa menyentuh class `font-display` (1 baris). Karena itu, lebih aman memakai token `--font-display` ketimbang hardcode nama font di banyak file.
- Jika build gagal: cek dulu nama export `Geist` di `next/font/google` (sumber error paling mungkin) via Context7.

---

## Estimated Order of Execution
1. **Task 1** → `feat(font): ganti Playfair Display ke Geist sebagai font display`
2. **Task 2** → `refactor(ui): migrasi font-serif ke font-display + bersihkan dekorasi italic`
3. **Task 3** → `feat(about): redesign About section ke gaya editorial bersih`
4. **Task 4** → `fix(ui): perbaikan responsif lintas komponen 320px–ultrawide`
5. **Task 5** → validasi penuh + QA Playwright → dispatch reviewer → `docs: update CLAUDE.md & MEMORY_BANK untuk font Geist + About editorial`

> Task 1→2→3 berurutan (dependency font). Task 4 boleh paralel sebagian (file Navbar/Footer/Gallery/Hero berbeda dari About), tapi disarankan setelah Task 3 agar QA viewport sekali jalan untuk seluruh halaman.

---

## Next Step
Plan tersimpan di: `docs/superpowers/plans/2026-06-16-about-redesign-font-responsive.md`

Setelah kamu approve plan ini, saya mulai implementasi dari **Task 1 (swap font Geist)**.
Atau: ada yang perlu diubah/dipecah lebih detail (mis. pisah Task 3 jadi per-sub-section, atau ganti pilihan font)?
