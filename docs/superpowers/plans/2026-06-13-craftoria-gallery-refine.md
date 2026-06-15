# Craftoria Gallery Refine Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ubah section Katalog teksual menjadi Gallery image-forward (tab kategori + lightbox) menggunakan 30 foto produk asli, sekaligus polish Hero (value-props + fix CTA mati) dan pecah monotoni layout Why-Us.

**Architecture:** Landing single-page statik (Next.js 16 App Router). Gallery 100% statik dari `src/data/gallery.ts`; filter & lightbox murni state client (React `useState`). Tidak ada DB/CMS/API/auth. Pemesanan tetap via WhatsApp (`buildWhatsAppLink()` yang sudah ada).

**Tech Stack:** Next.js 16.2.9, React 19, TypeScript 5, Tailwind CSS v4, GSAP ScrollTrigger (animasi), lucide-react (ikon), `next/image` (foto lokal).

> **Catatan verifikasi:** Project ini **belum punya test runner** (script hanya `dev/typecheck/lint/build`). Gate verifikasi tiap task = `npm run typecheck` + `npm run lint`, lalu `npm run build` di akhir, plus QA perilaku manual/Playwright. Plan ini TIDAK memperkenalkan framework test baru (YAGNI; di luar scope spec).

> **Spec sumber:** `docs/superpowers/specs/2026-06-13-craftoria-gallery-refine-design.md`

---

## File Structure

**Dibuat:**
- `src/data/gallery.ts` — sumber data 30 foto + metadata kategori (`GalleryImage[]`).
- `src/components/molecules/GalleryTabs.tsx` — tombol filter kategori.
- `src/components/organisms/Lightbox.tsx` — overlay perbesar foto (keyboard + a11y).
- `src/components/sections/GallerySection.tsx` — section gallery (tabs + masonry grid + lightbox + CTA WA).

**Dimodifikasi:**
- `src/data/site.ts` — navItem `#categories` → `#gallery`, label "Produk" → "Galeri".
- `src/components/sections/HeroSection.tsx` — stats → value-props; fix CTA "Lihat Katalog" → anchor `#gallery`.
- `src/components/sections/AboutSection.tsx` — Why-Us list → grid 3 kolom kartu.
- `src/app/page.tsx` — `CatalogSection` → `GallerySection`.
- `MEMORY_BANK.md`, `CLAUDE.md` — docs-as-code.

**Dihapus (di akhir, setelah tak ada konsumen):**
- `src/components/sections/CatalogSection.tsx`
- `src/components/organisms/CategoryCard.tsx`
- `src/components/atoms/DummyImage.tsx`
- `src/components/molecules/ProductItemRow.tsx`

> `src/data/categories.ts` **dipertahankan** — dipakai sebagai sumber definisi kategori (id/title/urutan) oleh `gallery.ts` & `GalleryTabs`.

---

## Task 1: Buat data gallery (kurasi foto → kategori)

**Files:**
- Create: `src/data/gallery.ts`

- [ ] **Step 1: Lihat ke-30 foto untuk kurasi kategori**

Gunakan Read tool pada tiap file `public/image/catalog/souvenir-craftoria (N).jpeg` untuk N=1..30. Tentukan kategori tiap foto:
- `drinkware` — mug, gelas, tumbler, keramik, piring/mangkuk.
- `home-decor` — table runner, coaster, cushion cover, sajadah, dekor kain.
- `essentials` — totebag, pouch, lanyard, ransel/drawstring, aksesoris kain harian.

Catat hasil mapping N → kategori. (Contoh yang sudah terlihat: foto 1 = totebag → `essentials`; foto 10 = ransel serut → `essentials`; foto 20 = mug graduation → `drinkware`.)

- [ ] **Step 2: Tulis file data**

```ts
// src/data/gallery.ts
export type GalleryCategory = "drinkware" | "home-decor" | "essentials";

export type GalleryImage = {
  src: string;
  alt: string;
  category: GalleryCategory;
};

const dir = "/image/catalog";

/**
 * 30 foto produk asli Craftoria.
 * `category` hasil kurasi visual (lihat tiap foto). User me-review saat QA.
 * `alt` deskriptif singkat untuk a11y & SEO.
 */
export const galleryImages: GalleryImage[] = [
  { src: `${dir}/souvenir-craftoria (1).jpeg`, alt: "Totebag kanvas custom Craftoria", category: "essentials" },
  { src: `${dir}/souvenir-craftoria (2).jpeg`, alt: "Souvenir custom Craftoria", category: "essentials" },
  { src: `${dir}/souvenir-craftoria (3).jpeg`, alt: "Souvenir custom Craftoria", category: "essentials" },
  { src: `${dir}/souvenir-craftoria (4).jpeg`, alt: "Souvenir custom Craftoria", category: "essentials" },
  { src: `${dir}/souvenir-craftoria (5).jpeg`, alt: "Souvenir custom Craftoria", category: "home-decor" },
  { src: `${dir}/souvenir-craftoria (6).jpeg`, alt: "Souvenir custom Craftoria", category: "home-decor" },
  { src: `${dir}/souvenir-craftoria (7).jpeg`, alt: "Souvenir custom Craftoria", category: "home-decor" },
  { src: `${dir}/souvenir-craftoria (8).jpeg`, alt: "Souvenir custom Craftoria", category: "home-decor" },
  { src: `${dir}/souvenir-craftoria (9).jpeg`, alt: "Souvenir custom Craftoria", category: "essentials" },
  { src: `${dir}/souvenir-craftoria (10).jpeg`, alt: "Ransel serut kanvas custom Craftoria", category: "essentials" },
  { src: `${dir}/souvenir-craftoria (11).jpeg`, alt: "Souvenir custom Craftoria", category: "essentials" },
  { src: `${dir}/souvenir-craftoria (12).jpeg`, alt: "Souvenir custom Craftoria", category: "essentials" },
  { src: `${dir}/souvenir-craftoria (13).jpeg`, alt: "Souvenir custom Craftoria", category: "home-decor" },
  { src: `${dir}/souvenir-craftoria (14).jpeg`, alt: "Souvenir custom Craftoria", category: "home-decor" },
  { src: `${dir}/souvenir-craftoria (15).jpeg`, alt: "Souvenir custom Craftoria", category: "home-decor" },
  { src: `${dir}/souvenir-craftoria (16).jpeg`, alt: "Souvenir custom Craftoria", category: "drinkware" },
  { src: `${dir}/souvenir-craftoria (17).jpeg`, alt: "Souvenir custom Craftoria", category: "drinkware" },
  { src: `${dir}/souvenir-craftoria (18).jpeg`, alt: "Souvenir custom Craftoria", category: "drinkware" },
  { src: `${dir}/souvenir-craftoria (19).jpeg`, alt: "Souvenir custom Craftoria", category: "drinkware" },
  { src: `${dir}/souvenir-craftoria (20).jpeg`, alt: "Mug keramik custom graduation Craftoria", category: "drinkware" },
  { src: `${dir}/souvenir-craftoria (21).jpeg`, alt: "Souvenir custom Craftoria", category: "drinkware" },
  { src: `${dir}/souvenir-craftoria (22).jpeg`, alt: "Souvenir custom Craftoria", category: "drinkware" },
  { src: `${dir}/souvenir-craftoria (23).jpeg`, alt: "Souvenir custom Craftoria", category: "drinkware" },
  { src: `${dir}/souvenir-craftoria (24).jpeg`, alt: "Souvenir custom Craftoria", category: "home-decor" },
  { src: `${dir}/souvenir-craftoria (25).jpeg`, alt: "Souvenir custom Craftoria", category: "home-decor" },
  { src: `${dir}/souvenir-craftoria (26).jpeg`, alt: "Souvenir custom Craftoria", category: "essentials" },
  { src: `${dir}/souvenir-craftoria (27).jpeg`, alt: "Souvenir custom Craftoria", category: "essentials" },
  { src: `${dir}/souvenir-craftoria (28).jpeg`, alt: "Souvenir custom Craftoria", category: "essentials" },
  { src: `${dir}/souvenir-craftoria (29).jpeg`, alt: "Souvenir custom Craftoria", category: "drinkware" },
  { src: `${dir}/souvenir-craftoria (30).jpeg`, alt: "Souvenir custom Craftoria", category: "drinkware" },
];

export const galleryCategories: { id: GalleryCategory; label: string }[] = [
  { id: "drinkware", label: "Drinkware" },
  { id: "home-decor", label: "Decor" },
  { id: "essentials", label: "Daily" },
];
```

> **PENTING:** Ganti nilai `category` & `alt` tiap entri sesuai hasil kurasi Step 1. Nilai di atas adalah baseline tebakan — wajib diperbaiki berdasarkan isi foto sebenarnya.

- [ ] **Step 3: Verifikasi typecheck**

Run: `npm run typecheck`
Expected: exit 0, tidak ada error tipe.

- [ ] **Step 4: Commit**

```bash
git add src/data/gallery.ts
git commit -m "feat(data): add curated gallery image dataset (30 real photos)"
```

---

## Task 2: Komponen GalleryTabs (filter kategori)

**Files:**
- Create: `src/components/molecules/GalleryTabs.tsx`

- [ ] **Step 1: Tulis komponen**

```tsx
// src/components/molecules/GalleryTabs.tsx
"use client";

import { cn } from "@/lib/utils";
import { galleryCategories, type GalleryCategory } from "@/data/gallery";

export type GalleryFilter = "all" | GalleryCategory;

const tabs: { id: GalleryFilter; label: string }[] = [
  { id: "all", label: "Semua" },
  ...galleryCategories,
];

type GalleryTabsProps = {
  active: GalleryFilter;
  onChange: (next: GalleryFilter) => void;
};

/**
 * MOLECULE — GalleryTabs
 * Filter kategori untuk GallerySection. Horizontal-scroll di mobile.
 */
export function GalleryTabs({ active, onChange }: GalleryTabsProps) {
  return (
    <div className="flex flex-nowrap gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:justify-center">
      {tabs.map((t) => {
        const isActive = t.id === active;
        return (
          <button
            key={t.id}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(t.id)}
            className={cn(
              "whitespace-nowrap rounded-full px-5 py-2 text-sm font-semibold transition-colors duration-200",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy",
              isActive
                ? "bg-navy text-white"
                : "bg-navy/5 text-navy/60 hover:bg-navy/10 hover:text-navy"
            )}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}
```

- [ ] **Step 2: Verifikasi typecheck + lint**

Run: `npm run typecheck && npm run lint`
Expected: exit 0.

- [ ] **Step 3: Commit**

```bash
git add src/components/molecules/GalleryTabs.tsx
git commit -m "feat(ui): add GalleryTabs category filter"
```

---

## Task 3: Komponen Lightbox (overlay perbesar foto)

**Files:**
- Create: `src/components/organisms/Lightbox.tsx`

- [ ] **Step 1: Tulis komponen**

```tsx
// src/components/organisms/Lightbox.tsx
"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { GalleryImage } from "@/data/gallery";

type LightboxProps = {
  images: GalleryImage[];
  index: number;
  onClose: () => void;
  onNavigate: (nextIndex: number) => void;
};

/**
 * ORGANISM — Lightbox
 * Overlay fullscreen untuk memperbesar foto gallery.
 * Navigasi wrap (item terakhir -> pertama). Keyboard: Esc tutup, kiri/kanan navigasi.
 */
export function Lightbox({ images, index, onClose, onNavigate }: LightboxProps) {
  const total = images.length;
  const current = images[index];

  const goPrev = useCallback(
    () => onNavigate((index - 1 + total) % total),
    [index, total, onNavigate]
  );
  const goNext = useCallback(
    () => onNavigate((index + 1) % total),
    [index, total, onNavigate]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, goPrev, goNext]);

  if (!current) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Pratinjau foto produk"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-navy/90 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        type="button"
        aria-label="Tutup"
        onClick={onClose}
        className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
      >
        <X className="h-6 w-6" />
      </button>

      <button
        type="button"
        aria-label="Sebelumnya"
        onClick={(e) => { e.stopPropagation(); goPrev(); }}
        className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <div
        className="relative mx-12 max-h-[85vh] w-auto max-w-[90vw]"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={current.src}
          alt={current.alt}
          width={1200}
          height={1200}
          sizes="90vw"
          className="max-h-[85vh] w-auto rounded-lg object-contain"
        />
      </div>

      <button
        type="button"
        aria-label="Berikutnya"
        onClick={(e) => { e.stopPropagation(); goNext(); }}
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </div>
  );
}
```

- [ ] **Step 2: Verifikasi typecheck + lint**

Run: `npm run typecheck && npm run lint`
Expected: exit 0.

- [ ] **Step 3: Commit**

```bash
git add src/components/organisms/Lightbox.tsx
git commit -m "feat(ui): add custom Lightbox overlay (keyboard + a11y)"
```

---

## Task 4: GallerySection (tab + masonry + lightbox + CTA)

**Files:**
- Create: `src/components/sections/GallerySection.tsx`

- [ ] **Step 1: Tulis section**

```tsx
// src/components/sections/GallerySection.tsx
"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { MessageCircle } from "lucide-react";
import { galleryImages } from "@/data/gallery";
import { GalleryTabs, type GalleryFilter } from "@/components/molecules/GalleryTabs";
import { Lightbox } from "@/components/organisms/Lightbox";
import { Button } from "@/components/atoms/Button";
import { buildWhatsAppLink } from "@/utils/whatsapp";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function GallerySection() {
  const [filter, setFilter] = useState<GalleryFilter>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  const visible = useMemo(
    () =>
      filter === "all"
        ? galleryImages
        : galleryImages.filter((g) => g.category === filter),
    [filter]
  );

  useEffect(() => {
    let ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: { trigger: headingRef.current, start: "top 85%", once: true },
          }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="gallery" className="relative z-20 scroll-mt-20 bg-white pt-24 pb-16 lg:pt-32 lg:pb-24 border-t border-navy/5">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Heading */}
        <div ref={headingRef} className="mx-auto max-w-2xl text-center opacity-0">
          <div className="flex items-center justify-center gap-4 text-xs font-bold uppercase tracking-[0.25em] text-navy/40 mb-6">
            <span className="h-px w-8 bg-navy/20" />
            <span>04 / GALERI</span>
            <span className="h-px w-8 bg-navy/20" />
          </div>
          <p className="font-serif text-3xl md:text-4xl leading-snug text-navy">
            Koleksi Karya Kami
          </p>
          <p className="mt-5 text-base leading-relaxed text-navy/60 font-sans">
            Hasil nyata souvenir & merchandise custom Craftoria. Klik foto untuk memperbesar.
          </p>
        </div>

        {/* Tabs */}
        <div className="mt-10">
          <GalleryTabs active={filter} onChange={setFilter} />
        </div>

        {/* Masonry grid (CSS columns) */}
        {visible.length === 0 ? (
          <p className="mt-16 text-center text-navy/50">Belum ada foto untuk kategori ini.</p>
        ) : (
          <div className="mt-10 gap-4 [column-count:2] md:[column-count:3] lg:[column-count:4]">
            {visible.map((img, i) => (
              <button
                key={img.src}
                type="button"
                onClick={() => setLightboxIndex(i)}
                aria-label={`Perbesar: ${img.alt}`}
                className="group mb-4 block w-full overflow-hidden rounded-xl border border-navy/8 bg-cream-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={600}
                  height={800}
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </button>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="mt-14 flex justify-center">
          <Button
            variant="whatsapp"
            size="lg"
            icon={MessageCircle}
            href={buildWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
          >
            Pesan via WhatsApp
          </Button>
        </div>
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={visible}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </section>
  );
}
```

- [ ] **Step 2: Verifikasi typecheck + lint**

Run: `npm run typecheck && npm run lint`
Expected: exit 0.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/GallerySection.tsx
git commit -m "feat(ui): add GallerySection (tabs + masonry + lightbox + WA CTA)"
```

---

## Task 5: Pasang GallerySection di page & update nav

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/data/site.ts:17-22`

- [ ] **Step 1: Ganti CatalogSection → GallerySection di page.tsx**

```tsx
// src/app/page.tsx
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { GallerySection } from "@/components/sections/GallerySection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <GallerySection />
    </>
  );
}
```

- [ ] **Step 2: Update navItems di site.ts**

Ganti baris navItems (saat ini `{ label: "Produk", href: "#categories" }`) menjadi:

```ts
export const navItems: NavItem[] = [
  { label: "Tentang", href: "#about" },
  { label: "Visi & Misi", href: "#vision-mission" },
  { label: "Kenapa Kami", href: "#why-us" },
  { label: "Galeri", href: "#gallery" },
];
```

- [ ] **Step 3: Verifikasi typecheck + lint**

Run: `npm run typecheck && npm run lint`
Expected: exit 0. (Catatan: `CatalogSection` & `CategoryCard` masih ada di repo tapi tak lagi diimpor — dihapus di Task 8.)

- [ ] **Step 4: Commit**

```bash
git add src/app/page.tsx src/data/site.ts
git commit -m "feat(ui): wire GallerySection into page, rename nav #categories -> #gallery"
```

---

## Task 6: Polish Hero (value-props + fix CTA mati)

**Files:**
- Modify: `src/components/sections/HeroSection.tsx:83-102`

- [ ] **Step 1: Ganti tombol "Lihat Katalog" jadi anchor ke #gallery**

Ganti blok `<button>...Lihat Katalog...</button>` (HeroSection.tsx:83-85) menjadi:

```tsx
<a
  href="#gallery"
  className="inline-flex items-center justify-center border-2 border-white/30 text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 hover:border-white/60 transition-all duration-300 hover:shadow-lg"
>
  Lihat Galeri
</a>
```

- [ ] **Step 2: Ganti baris stats jadi value-props**

Ganti blok `{/* Stats */}` (HeroSection.tsx:88-102) menjadi:

```tsx
{/* Value props */}
<div className="animate-item grid grid-cols-3 gap-6 pt-8 border-t border-white/10">
  {[
    { label: "100% Custom", sub: "Desain milik Anda" },
    { label: "Cetak Premium", sub: "Hasil bersih & tajam" },
    { label: "Konsultasi Gratis", sub: "Dampingi dari ide" },
  ].map((v) => (
    <div key={v.label}>
      <p className="text-lg md:text-xl font-bold text-white leading-tight">{v.label}</p>
      <p className="text-sm text-white/50 mt-1">{v.sub}</p>
    </div>
  ))}
</div>
```

- [ ] **Step 3: Verifikasi typecheck + lint**

Run: `npm run typecheck && npm run lint`
Expected: exit 0.

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/HeroSection.tsx
git commit -m "fix(ui): hero CTA anchors to #gallery, replace unverified stats with value-props"
```

---

## Task 7: Pecah monotoni Why-Us (list → grid kartu)

**Files:**
- Modify: `src/components/sections/AboutSection.tsx:208-253`

- [ ] **Step 1: Ganti layout sub-section Why-Us**

Ganti seluruh blok `{/* ── Kenapa Kami ── */}` (section `id="why-us"`, AboutSection.tsx:208-253) menjadi layout heading-atas + grid 3 kolom:

```tsx
{/* ── Kenapa Kami ── */}
<section id="why-us" className="relative z-20 scroll-mt-20 bg-cream-light py-24 lg:py-32">
  <div className="mx-auto max-w-6xl px-4 sm:px-6">
    <FadeUp>
      <div className="max-w-2xl">
        <SectionLabel no="03" title="WHY US" />
        <p className="font-serif text-3xl md:text-4xl leading-snug text-navy">
          Souvenir terbaik dimulai dari sini
        </p>
        <p className="mt-5 text-base leading-relaxed text-navy/60 font-sans">
          Pengalaman pembuatan souvenir yang personal, dari konsultasi pertama
          hingga produk eksklusif siap melengkapi momen berharga Anda.
        </p>
      </div>
    </FadeUp>

    <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-navy/10 bg-navy/10 sm:grid-cols-3">
      {reasons.map((r, i) => {
        const Icon = r.icon;
        return (
          <FadeUp key={r.title} delay={0.1 * i} className="bg-cream-light">
            <div className="group h-full bg-white p-8">
              <div className="flex items-center justify-between">
                <Icon className="h-6 w-6 text-navy/40" strokeWidth={1.5} />
                <span className="font-mono text-sm font-bold text-navy/20">{r.no}</span>
              </div>
              <h4 className="mt-6 font-serif text-xl text-navy">{r.title}</h4>
              <p className="mt-2 text-[0.938rem] leading-relaxed text-navy/60 font-sans">
                {r.description}
              </p>
            </div>
          </FadeUp>
        );
      })}
    </div>
  </div>
</section>
```

> Data `reasons[]` (AboutSection.tsx:75-94) sudah punya `icon`, `no`, `title`, `description` — tidak berubah.

- [ ] **Step 2: Verifikasi typecheck + lint**

Run: `npm run typecheck && npm run lint`
Expected: exit 0.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/AboutSection.tsx
git commit -m "refactor(ui): rework Why-Us into 3-col card grid to break layout monotony"
```

---

## Task 8: Hapus komponen lama yang tak terpakai

**Files:**
- Delete: `src/components/sections/CatalogSection.tsx`
- Delete: `src/components/organisms/CategoryCard.tsx`
- Delete: `src/components/atoms/DummyImage.tsx`
- Delete: `src/components/molecules/ProductItemRow.tsx`

- [ ] **Step 1: Pastikan tak ada lagi yang mengimpor file-file tsb**

Run (Grep, bukan hapus dulu): cari referensi `CatalogSection`, `CategoryCard`, `DummyImage`, `categoryImages`, `ProductItemRow` di seluruh `src/`.
Expected: tidak ada hasil kecuali di dalam file yang akan dihapus itu sendiri. Jika ada konsumen lain, perbaiki dulu.

- [ ] **Step 2: Hapus file**

```bash
git rm src/components/sections/CatalogSection.tsx \
       src/components/organisms/CategoryCard.tsx \
       src/components/atoms/DummyImage.tsx \
       src/components/molecules/ProductItemRow.tsx
```

- [ ] **Step 3: Verifikasi typecheck + lint**

Run: `npm run typecheck && npm run lint`
Expected: exit 0, tidak ada import error.

- [ ] **Step 4: Commit**

```bash
git commit -m "chore(ui): remove unused catalog components (replaced by gallery)"
```

---

## Task 9: Build + QA perilaku

**Files:** (tidak ada perubahan kode; verifikasi)

- [ ] **Step 1: Production build**

Run: `npm run build`
Expected: build sukses, tidak ada error SSR/hydration. (Ini pertama kalinya `npm run build` dijalankan di project — perhatikan error `next/image` atau "use client".)

- [ ] **Step 2: QA manual (atau Playwright MCP)**

Jalankan `npm run dev`, lalu verifikasi di http://localhost:3000:
- [ ] Nav "Galeri" → scroll ke section gallery (anchor `#gallery`) tepat.
- [ ] Tab filter (`Semua/Drinkware/Decor/Daily`) menyaring foto dengan benar.
- [ ] Klik foto → lightbox terbuka; tombol next/prev + Esc + klik backdrop berfungsi; body scroll terkunci saat terbuka.
- [ ] CTA "Pesan via WhatsApp" & "Konsultasi Sekarang" membuka `wa.me/6285113153923`.
- [ ] Hero "Lihat Galeri" → scroll ke `#gallery`.
- [ ] Why-Us tampil sebagai grid 3 kolom (mobile: 1 kolom).
- [ ] Value-props Hero tampil (tanpa angka karangan).
- [ ] Responsif: cek mobile (375px), tablet (768px), desktop (1280px).
- [ ] Footer/Kontak: WA `0851-1315-3923`, IG/TikTok `@craftoria.co`, Shopee "Craftoria.co Official Shop", lokasi "Mojokerto, Jawa Timur" tampil benar. Jika ada yang belum sesuai `data/site.ts`, perbaiki Footer lalu commit `fix(ui): correct footer contact details`.

- [ ] **Step 3: Konfirmasi kurasi kategori ke user**

Tampilkan ringkasan mapping foto→kategori dari Task 1 ke user untuk dikoreksi. Perbaiki `gallery.ts` bila ada yang salah, lalu commit perbaikannya.

---

## Task 10: Docs-as-Code (Definition of Done)

**Files:**
- Modify: `MEMORY_BANK.md`
- Modify: `CLAUDE.md`

- [ ] **Step 1: Update MEMORY_BANK.md**

- § Recent Changes: tambah entri `### 2026-06-13 — Claude Code` dengan ringkasan task + commit hash.
- § Current Status: update "Next Sprint" / fitur gallery selesai.
- § Struktur File: ganti `CatalogSection`/`CategoryCard`/`DummyImage`/`ProductItemRow` → `GallerySection`/`GalleryTabs`/`Lightbox`/`gallery.ts`.
- § Anchor ID Map: `#categories` → `#gallery` (label "Galeri").
- § Known Issues: catat build pertama berhasil (hapus catatan "belum pernah dijalankan").

- [ ] **Step 2: Update CLAUDE.md**

- § Fitur yang Sudah Dibangun: tambah `- **Gallery Produk ✅ (2026-06-13):** section galeri image-forward (30 foto asli) dengan filter kategori + lightbox, gantikan katalog teksual.`
- § Status Sprint: tambah baris sprint refine bila relevan.

- [ ] **Step 3: Commit**

```bash
git add MEMORY_BANK.md CLAUDE.md
git commit -m "docs(memory): sync MEMORY_BANK & CLAUDE after gallery refine"
```

---

## Catatan Eksekusi

- **Working tree saat ini sudah ada perubahan uncommitted** (7 komponen + `public/`). Sebelum mulai Task 1, putuskan bersama user: commit dulu perubahan pending itu, atau lanjut di atasnya. Plan ini mengasumsikan foto di `public/image/catalog/` sudah ada (terkonfirmasi).
- Urutan task aman: Task 1-4 (buat aset baru) tidak merusak halaman lama; Task 5 baru menukar tampilan; Task 8 menghapus setelah tak terpakai.
- Setiap commit gunakan Conventional Commits + footer `Co-Authored-By` sesuai aturan repo.
- Sebelum commit yang menyentuh foto/aset, tidak perlu gitleaks (tak ada secret), tapi `npm run build` wajib hijau sebelum klaim selesai (aturan "bukti sebelum klaim").
