# Craftoria.co Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a static single-page (SSG) profile landing page for Craftoria.co that presents the brand, 3 product categories, and drives consultation via WhatsApp.

**Architecture:** Single route `/` composed of isolated section components. Content lives in typed data files under `src/data/`; only `Navbar` and `FloatingWhatsApp` are client components. One pure util (`buildWhatsAppLink`) is unit-tested; UI is verified via typecheck/lint/build + `npm run dev`.

**Tech Stack:** Next.js 16 (App Router, RSC), React 19, TypeScript 5, Tailwind CSS v4 (`@theme` tokens), `tsx` + `node:test` for the one unit test.

**Reference spec:** `docs/superpowers/specs/2026-06-11-craftoria-landing-page-design.md`

**Color tokens:** Putih `#ffffff`, Cream `#f4edd9`, Cream-light `#faf7f2`, Navy `#0f172a`, WhatsApp green `#25d366`.

---

## File Manifest

| File | Responsibility | Task |
|---|---|---|
| `src/app/globals.css` | Tailwind import + design tokens (`@theme`), smooth scroll | 2 |
| `src/app/layout.tsx` | Root `lang="id"`, fonts, metadata; later wires Navbar/Footer/Floating | 2, 11 |
| `src/app/page.tsx` | Assembles the 6 sections | 2 (temp), 11 (final) |
| `src/data/site.ts` | Brand info, WA number, socials, location, nav items | 3 |
| `src/data/categories.ts` | 3 categories + product items (typed) | 3 |
| `src/lib/whatsapp.ts` | `buildWhatsAppLink(message)` | 4 |
| `src/lib/whatsapp.test.ts` | Unit tests for the link builder | 4 |
| `src/components/ui/WhatsAppIcon.tsx` | Reusable inline SVG glyph | 5 |
| `src/components/ui/SectionHeading.tsx` | Consistent section heading | 5 |
| `src/components/ui/WhatsAppButton.tsx` | `<a>` CTA to `wa.me` (primary/outline) | 5 |
| `src/components/ui/CategoryCard.tsx` | One category card + item list + CTA | 6 |
| `src/components/ui/FloatingWhatsApp.tsx` | Floating WA button (client) | 7 |
| `src/components/layout/Navbar.tsx` | Sticky nav, anchors, mobile hamburger (client) | 8 |
| `src/components/layout/Footer.tsx` | Footer with socials | 9 |
| `src/components/sections/Hero.tsx` | Hero + inline CTA | 10 |
| `src/components/sections/About.tsx` | Tentang Kami | 10 |
| `src/components/sections/VisionMission.tsx` | Visi & Misi | 10 |
| `src/components/sections/WhyUs.tsx` | Kenapa Memilih Kami | 10 |
| `src/components/sections/Categories.tsx` | 3 category cards | 10 |
| `src/components/sections/Contact.tsx` | Kontak + CTA | 10 |
| `CLAUDE.md` | Docs sync (Status Sprint, Fitur) | 12 |

**Build order is bottom-up** so every intermediate state typechecks (each file only imports modules created earlier). `page.tsx`/`layout.tsx` are finalized last.

---

## Task 1: Commit the baseline scaffold

The Next.js scaffold + agent protocol docs are still untracked. Commit them as the baseline before feature work.

**Files:** existing scaffold (config, `src/app/*`, `docs/*`, protocol md files). `node_modules/` and `.next/` are git-ignored.

- [ ] **Step 1: Confirm ignored dirs are excluded**

Run: `git status --short | grep -E "node_modules|\.next" || echo "OK: build dirs ignored"`
Expected: `OK: build dirs ignored`

- [ ] **Step 2: Stage everything**

```bash
git add -A
```

- [ ] **Step 3: Verify nothing sensitive is staged**

Run: `git diff --cached --name-only | grep -E "\.env|\.pem|\.key|id_rsa|id_ed25519" || echo "OK: no secrets staged"`
Expected: `OK: no secrets staged`

- [ ] **Step 4: Commit**

```bash
git commit -m "chore: scaffold Next.js 16 project and agent protocol"
```

---

## Task 2: Design tokens + base layout/page

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`
- Modify: `src/app/page.tsx` (temporary minimal content; finalized in Task 11)

- [ ] **Step 1: Replace `globals.css` with brand tokens**

```css
@import "tailwindcss";

@theme {
  --color-white: #ffffff;
  --color-cream: #f4edd9;
  --color-cream-light: #faf7f2;
  --color-navy: #0f172a;
  --color-whatsapp: #25d366;
  --font-sans: var(--font-geist-sans);
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: var(--color-white);
  color: var(--color-navy);
}
```

- [ ] **Step 2: Replace `layout.tsx`**

```tsx
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Craftoria.co — Studio kreatif Souvenir & Merchandise",
  description:
    "Craftoria.co adalah studio kreatif penyedia souvenir & merchandise estetik, fungsional, dan bisa dikustom untuk berbagai acara di Mojokerto, Jawa Timur.",
  openGraph: {
    title: "Craftoria.co — Studio kreatif Souvenir & Merchandise",
    description:
      "Souvenir & merchandise estetik, fungsional, dan personal untuk berbagai acara.",
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full bg-white font-sans text-navy">{children}</body>
    </html>
  );
}
```

- [ ] **Step 3: Replace `page.tsx` with a temporary minimal page**

```tsx
export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <h1 className="text-2xl font-bold text-navy">Craftoria.co</h1>
    </main>
  );
}
```

- [ ] **Step 4: Verify typecheck passes**

Run: `npm run typecheck`
Expected: no output, exit 0.

- [ ] **Step 5: Commit**

```bash
git add src/app/globals.css src/app/layout.tsx src/app/page.tsx
git commit -m "feat(layout): add brand design tokens and base layout"
```

---

## Task 3: Site & category data

**Files:**
- Create: `src/data/site.ts`
- Create: `src/data/categories.ts`

- [ ] **Step 1: Create `src/data/site.ts`**

```ts
export type NavItem = { label: string; href: string };

export const site = {
  name: "Craftoria.co",
  tagline: "Studio kreatif Souvenir & Merchandise",
  description:
    "Craftoria.co adalah studio kreatif yang membantu mewujudkan kebutuhan souvenir, hadiah, dan merchandise event yang fungsional, minimalis, dan bernilai estetika tinggi.",
  whatsappNumber: "6285113153923",
  phoneDisplay: "0851-1315-3923",
  instagram: "https://instagram.com/craftoria.co",
  tiktok: "https://www.tiktok.com/@craftoria.co",
  shopeeLabel: "Craftoria.co Official Shop",
  shopeeUrl: "https://shopee.co.id/search?keyword=craftoria.co",
  location: "Mojokerto, Jawa Timur, Indonesia",
} as const;

export const navItems: NavItem[] = [
  { label: "Tentang", href: "#about" },
  { label: "Visi & Misi", href: "#vision-mission" },
  { label: "Kenapa Kami", href: "#why-us" },
  { label: "Produk", href: "#categories" },
  { label: "Kontak", href: "#contact" },
];
```

- [ ] **Step 2: Create `src/data/categories.ts`**

```ts
export type ProductItem = { name: string; description: string };

export type Category = {
  id: string;
  title: string;
  description: string;
  items: ProductItem[];
};

export const categories: Category[] = [
  {
    id: "drinkware",
    title: "Dinings & Drinkware Premium",
    description:
      "Souvenir berbahan keramik, kaca, dan kebutuhan minum harian; populer untuk suvenir pernikahan eksklusif maupun hadiah korporat.",
    items: [
      {
        name: "Gelas & Mug Kustom",
        description: "Mug estetik dengan cetakan logo atau ilustrasi kustom.",
      },
      {
        name: "Mangkuk & Piring Keramik",
        description:
          "Set perangkat makan minimalis mewah untuk hampers hari raya.",
      },
      {
        name: "Tumbler Custom",
        description:
          "Botol minum fungsional untuk merchandise seminar atau kantoran.",
      },
    ],
  },
  {
    id: "home-decor",
    title: "Aesthetic Home Decor",
    description:
      "Pemanis sudut rumah berbahan kain premium (suede) dicetak motif penuh teknik sublimasi; memberi kesan hangat dan mewah.",
    items: [
      {
        name: "Table Runner",
        description:
          "Pemanis meja makan atau meja tamu yang bisa disesuaikan dengan tema interior.",
      },
      {
        name: "Tatakan Gelas (Coaster)",
        description:
          "Aksesoris meja berbahan lembut untuk pelengkap suvenir kafe atau ruang tamu.",
      },
      {
        name: "Sarung Bantal Sofa (Cushion Cover)",
        description: "Sarung bantal kustom estetik untuk mempercantik ruang keluarga.",
      },
      {
        name: "Sajadah Muka & Travel Slim",
        description:
          "Alas sujud praktis dan ringkas, favorit untuk suvenir tasyakuran atau umrah.",
      },
    ],
  },
  {
    id: "essentials",
    title: "Functional & Daily Essentials",
    description:
      "Produk kain pelengkap gaya hidup dan mobilitas harian; diminati komunitas, instansi, maupun anak muda karena kepraktisannya.",
    items: [
      {
        name: "Totebag & Pouch",
        description:
          "Tas jinjing dan dompet kecil serbaguna untuk kosmetik, mukena, atau seminar kit.",
      },
      {
        name: "Lanyard Kustom",
        description:
          "Tali id-card premium untuk merchandise kepanitiaan event atau seragam kantor.",
      },
      {
        name: "Lifestyle Essentials",
        description:
          "Aksesoris kain harian lain yang dirancang ringkas dan travel-friendly.",
      },
    ],
  },
];
```

- [ ] **Step 3: Verify typecheck passes**

Run: `npm run typecheck`
Expected: exit 0.

- [ ] **Step 4: Commit**

```bash
git add src/data/site.ts src/data/categories.ts
git commit -m "feat(data): add site config and product category data"
```

---

## Task 4: WhatsApp link builder (TDD)

**Files:**
- Create: `src/lib/whatsapp.ts`
- Test: `src/lib/whatsapp.test.ts`
- Modify: `package.json` (add `tsx` devDependency + `test` script)

> **Note:** `whatsapp.ts` imports `site` via a **relative** path (`../data/site`) so the `node:test` runner under `tsx` resolves it without TS path-alias config. App code elsewhere keeps the `@/` alias.

- [ ] **Step 1: Install the test runner**

Run: `npm install -D tsx`
Expected: `tsx` added to `devDependencies`.

- [ ] **Step 2: Add the `test` script to `package.json`**

In the `"scripts"` block, add:

```json
"test": "node --import tsx --test src/lib/whatsapp.test.ts"
```

- [ ] **Step 3: Write the failing test**

Create `src/lib/whatsapp.test.ts`:

```ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { buildWhatsAppLink } from "./whatsapp";

test("includes the business number", () => {
  assert.ok(buildWhatsAppLink("hi").startsWith("https://wa.me/6285113153923"));
});

test("encodes the message into the text query param", () => {
  assert.equal(
    buildWhatsAppLink("Halo Craftoria"),
    "https://wa.me/6285113153923?text=Halo%20Craftoria",
  );
});

test("returns base link without query when message is blank", () => {
  assert.equal(buildWhatsAppLink("   "), "https://wa.me/6285113153923");
});
```

- [ ] **Step 4: Run the test to verify it fails**

Run: `npm test`
Expected: FAIL — cannot find module `./whatsapp` (file not created yet).

- [ ] **Step 5: Write the implementation**

Create `src/lib/whatsapp.ts`:

```ts
import { site } from "../data/site";

export function buildWhatsAppLink(message: string): string {
  const base = `https://wa.me/${site.whatsappNumber}`;
  const trimmed = message.trim();
  if (!trimmed) return base;
  return `${base}?text=${encodeURIComponent(trimmed)}`;
}
```

- [ ] **Step 6: Run the test to verify it passes**

Run: `npm test`
Expected: PASS — 3 tests, 0 fail.

- [ ] **Step 7: Verify typecheck still passes**

Run: `npm run typecheck`
Expected: exit 0.

- [ ] **Step 8: Commit**

```bash
git add src/lib/whatsapp.ts src/lib/whatsapp.test.ts package.json package-lock.json
git commit -m "feat(lib): add tested buildWhatsAppLink helper"
```

---

## Task 5: UI primitives (icon, heading, button)

**Files:**
- Create: `src/components/ui/WhatsAppIcon.tsx`
- Create: `src/components/ui/SectionHeading.tsx`
- Create: `src/components/ui/WhatsAppButton.tsx`

- [ ] **Step 1: Create `WhatsAppIcon.tsx`**

```tsx
export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.004c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.02ZM12.04 20.15h-.004a8.23 8.23 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.18 8.18 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.17-.47-.29Z" />
    </svg>
  );
}
```

- [ ] **Step 2: Create `SectionHeading.tsx`**

```tsx
type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      {eyebrow ? (
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-navy/60">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-7 text-navy/70">{description}</p>
      ) : null}
    </div>
  );
}
```

- [ ] **Step 3: Create `WhatsAppButton.tsx`**

```tsx
import type { ReactNode } from "react";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

type WhatsAppButtonProps = {
  message: string;
  children: ReactNode;
  variant?: "primary" | "outline";
  className?: string;
};

export function WhatsAppButton({
  message,
  children,
  variant = "primary",
  className,
}: WhatsAppButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy";
  const styles =
    variant === "primary"
      ? "bg-whatsapp text-white hover:bg-whatsapp/90"
      : "border border-navy/20 text-navy hover:bg-navy/5";
  return (
    <a
      href={buildWhatsAppLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Konsultasi via WhatsApp: ${message}`}
      className={`${base} ${styles} ${className ?? ""}`}
    >
      <WhatsAppIcon className="h-5 w-5" />
      {children}
    </a>
  );
}
```

- [ ] **Step 4: Verify typecheck passes**

Run: `npm run typecheck`
Expected: exit 0.

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/WhatsAppIcon.tsx src/components/ui/SectionHeading.tsx src/components/ui/WhatsAppButton.tsx
git commit -m "feat(ui): add icon, section heading, and WhatsApp button"
```

---

## Task 6: CategoryCard

**Files:**
- Create: `src/components/ui/CategoryCard.tsx`

- [ ] **Step 1: Create `CategoryCard.tsx`**

```tsx
import type { Category } from "@/data/categories";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

export function CategoryCard({ category }: { category: Category }) {
  return (
    <article
      id={category.id}
      className="flex scroll-mt-24 flex-col rounded-2xl border border-navy/10 bg-white p-6 shadow-sm"
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
      <WhatsAppButton
        message={`Halo Craftoria, saya tertarik dengan kategori ${category.title}.`}
        variant="outline"
        className="mt-6 w-full"
      >
        Konsultasi Kategori Ini
      </WhatsAppButton>
    </article>
  );
}
```

- [ ] **Step 2: Verify typecheck passes**

Run: `npm run typecheck`
Expected: exit 0.

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/CategoryCard.tsx
git commit -m "feat(ui): add category card component"
```

---

## Task 7: FloatingWhatsApp (client)

**Files:**
- Create: `src/components/ui/FloatingWhatsApp.tsx`

- [ ] **Step 1: Create `FloatingWhatsApp.tsx`**

```tsx
"use client";

import { useEffect, useState } from "react";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

const GENERIC_MESSAGE =
  "Halo Craftoria, saya ingin berkonsultasi mengenai souvenir & merchandise.";

export function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={buildWhatsAppLink(GENERIC_MESSAGE)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Konsultasi via WhatsApp"
      className={`fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-lg transition-all duration-300 hover:scale-105 ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
```

- [ ] **Step 2: Verify typecheck passes**

Run: `npm run typecheck`
Expected: exit 0.

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/FloatingWhatsApp.tsx
git commit -m "feat(ui): add floating WhatsApp button"
```

---

## Task 8: Navbar (client)

**Files:**
- Create: `src/components/layout/Navbar.tsx`

- [ ] **Step 1: Create `Navbar.tsx`**

```tsx
"use client";

import { useState } from "react";
import { site, navItems } from "@/data/site";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-navy/10 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <a href="#hero" className="text-lg font-bold tracking-tight text-navy">
          {site.name}
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="text-sm font-medium text-navy/70 transition-colors hover:text-navy"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          aria-label={open ? "Tutup menu" : "Buka menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-navy md:hidden"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="h-6 w-6"
            aria-hidden="true"
          >
            {open ? (
              <path d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </nav>

      {open ? (
        <ul className="space-y-1 border-t border-navy/10 px-4 pb-4 md:hidden">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={() => setOpen(false)}
                className="block rounded px-2 py-2 text-sm font-medium text-navy/80 hover:bg-cream"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </header>
  );
}
```

- [ ] **Step 2: Verify typecheck passes**

Run: `npm run typecheck`
Expected: exit 0.

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/Navbar.tsx
git commit -m "feat(layout): add sticky navbar with mobile menu"
```

---

## Task 9: Footer

**Files:**
- Create: `src/components/layout/Footer.tsx`

- [ ] **Step 1: Create `Footer.tsx`**

```tsx
import { site } from "@/data/site";

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-lg font-bold">{site.name}</p>
            <p className="mt-1 text-sm text-white/70">{site.tagline}</p>
          </div>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/80">
            <li>
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href={site.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                TikTok
              </a>
            </li>
            <li>
              <a
                href={site.shopeeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                Shopee
              </a>
            </li>
          </ul>
        </div>
        <p className="mt-8 text-xs text-white/50">
          © 2026 {site.name}. {site.location}.
        </p>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Verify typecheck passes**

Run: `npm run typecheck`
Expected: exit 0.

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/Footer.tsx
git commit -m "feat(layout): add footer with social links"
```

---

## Task 10: Section components

**Files:**
- Create: `src/components/sections/Hero.tsx`
- Create: `src/components/sections/About.tsx`
- Create: `src/components/sections/VisionMission.tsx`
- Create: `src/components/sections/WhyUs.tsx`
- Create: `src/components/sections/Categories.tsx`
- Create: `src/components/sections/Contact.tsx`

- [ ] **Step 1: Create `Hero.tsx`**

```tsx
import { site } from "@/data/site";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

export function Hero() {
  return (
    <section id="hero" className="bg-cream-light">
      <div className="mx-auto max-w-6xl px-4 py-24 text-center sm:px-6 sm:py-32">
        <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-navy/60">
          {site.tagline}
        </p>
        <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight text-navy sm:text-5xl md:text-6xl">
          Souvenir &amp; merchandise yang estetik, fungsional, dan personal
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-navy/70 sm:text-lg">
          {site.description}
        </p>
        <div className="mt-10 flex justify-center">
          <WhatsAppButton message="Halo Craftoria, saya ingin berkonsultasi mengenai souvenir & merchandise.">
            Konsultasi Sekarang
          </WhatsAppButton>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create `About.tsx`**

```tsx
import { SectionHeading } from "@/components/ui/SectionHeading";

export function About() {
  return (
    <section id="about" className="scroll-mt-20 bg-white py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Tentang Kami"
          title="Studio kreatif souvenir & merchandise"
        />
        <div className="mx-auto mt-8 max-w-3xl space-y-5 text-center text-base leading-7 text-navy/70">
          <p>
            Craftoria.co adalah studio kreatif yang bergerak di bidang
            penyediaan Souvenir &amp; Merchandise. Kami hadir sebagai mitra untuk
            mewujudkan kebutuhan souvenir, hadiah, kado personal, hingga
            merchandise event yang fungsional, minimalis, dan bernilai estetika
            tinggi.
          </p>
          <p>
            Melalui pendekatan desain yang dikurasi secara khusus (personalized
            touch) dan pemanfaatan teknik cetak digital, kami fokus menciptakan
            serta menyediakan produk souvenir dan merchandise untuk berbagai
            acara.
          </p>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Create `VisionMission.tsx`**

```tsx
import { SectionHeading } from "@/components/ui/SectionHeading";

const missions = [
  {
    title: "Solusi Desain Kustom",
    description:
      "Membantu menerjemahkan ide, logo, atau tema acara klien ke dalam bentuk produk suvenir secara rapi.",
  },
  {
    title: "Kualitas yang Terjaga",
    description:
      "Memastikan setiap detail produk menggunakan bahan pilihan dan kualitas cetak yang bersih demi kepuasan penerima hadiah.",
  },
  {
    title: "Pelayanan yang Fleksibel",
    description:
      "Memberikan kemudahan konsultasi dan adaptasi produk sesuai anggaran serta kebutuhan unik di setiap acara.",
  },
];

export function VisionMission() {
  return (
    <section id="vision-mission" className="scroll-mt-20 bg-cream-light py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow="Visi & Misi" title="Arah dan komitmen kami" />
        <div className="mx-auto mt-10 max-w-3xl rounded-2xl bg-navy p-8 text-center text-white">
          <p className="text-sm font-semibold uppercase tracking-widest text-white/60">
            Visi
          </p>
          <p className="mt-3 text-lg leading-8">
            Menjadi studio kreatif andalan dalam penyediaan souvenir dan
            merchandise yang estetik, solutif, dan menyenangkan bagi setiap
            klien.
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {missions.map((m) => (
            <div
              key={m.title}
              className="rounded-2xl border border-navy/10 bg-white p-6"
            >
              <h3 className="text-base font-bold text-navy">{m.title}</h3>
              <p className="mt-2 text-sm leading-6 text-navy/70">
                {m.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Create `WhyUs.tsx`**

```tsx
import { SectionHeading } from "@/components/ui/SectionHeading";

const reasons = [
  {
    title: "Flexible Custom Design",
    description:
      "Desain motif, warna, hingga tulisan ucapan pada produk bisa didiskusikan bersama agar pas dengan konsep acara Anda.",
  },
  {
    title: "Modern Aesthetic",
    description:
      "Kami menyukai konsep desain yang simpel, bersih, dan kekinian yang cocok dengan selera pasar saat ini.",
  },
  {
    title: "Friendly Service",
    description:
      "Kami siap menemani Anda dari draf diskusi ide, pemilihan sampel produk, hingga produk siap dikemas dan dibagikan.",
  },
];

export function WhyUs() {
  return (
    <section id="why-us" className="scroll-mt-20 bg-white py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Kenapa Memilih Kami"
          title="Souvenir, cara terbaik menyampaikan apresiasi"
          description="Craftoria.co menawarkan pengalaman pembuatan souvenir yang personal dan menyenangkan."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {reasons.map((r, i) => (
            <div key={r.title} className="rounded-2xl bg-cream-light p-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-navy text-sm font-bold text-white">
                {i + 1}
              </span>
              <h3 className="mt-4 text-base font-bold text-navy">{r.title}</h3>
              <p className="mt-2 text-sm leading-6 text-navy/70">
                {r.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Create `Categories.tsx`**

```tsx
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CategoryCard } from "@/components/ui/CategoryCard";
import { categories } from "@/data/categories";

export function Categories() {
  return (
    <section id="categories" className="scroll-mt-20 bg-cream-light py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Layanan & Produk Unggulan"
          title="Tiga kategori utama"
          description="Pilihan produk kami dirancang agar fungsional, estetik, dan bisa disesuaikan penuh dengan tema momen berharga Anda."
        />
        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {categories.map((c) => (
            <CategoryCard key={c.id} category={c} />
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 6: Create `Contact.tsx`**

```tsx
import { site } from "@/data/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-20 bg-white py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Hubungi Kami"
          title="Mari wujudkan souvenir impian Anda"
          description="Diskusikan kebutuhan acara Anda bersama kami melalui WhatsApp atau kanal di bawah ini."
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl bg-cream-light p-6">
            <dl className="space-y-4 text-sm">
              <div>
                <dt className="font-semibold text-navy">WhatsApp / Telepon</dt>
                <dd className="text-navy/70">{site.phoneDisplay}</dd>
              </div>
              <div>
                <dt className="font-semibold text-navy">Instagram / TikTok</dt>
                <dd className="text-navy/70">@craftoria.co</dd>
              </div>
              <div>
                <dt className="font-semibold text-navy">E-commerce</dt>
                <dd className="text-navy/70">{site.shopeeLabel} (Shopee)</dd>
              </div>
              <div>
                <dt className="font-semibold text-navy">Lokasi</dt>
                <dd className="text-navy/70">{site.location}</dd>
              </div>
            </dl>
          </div>
          <div className="flex flex-col items-start justify-center gap-4 rounded-2xl bg-navy p-6 text-white">
            <p className="text-lg font-semibold">Siap berkonsultasi?</p>
            <p className="text-sm text-white/70">
              Kami menemani Anda dari ide hingga produk siap dibagikan.
            </p>
            <WhatsAppButton message="Halo Craftoria, saya ingin berkonsultasi mengenai souvenir & merchandise.">
              Chat via WhatsApp
            </WhatsAppButton>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 7: Verify typecheck passes**

Run: `npm run typecheck`
Expected: exit 0.

- [ ] **Step 8: Commit**

```bash
git add src/components/sections/
git commit -m "feat(sections): add hero, about, vision, why-us, categories, contact"
```

---

## Task 11: Wire everything into page & layout

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Replace `page.tsx` with the section assembly**

```tsx
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { VisionMission } from "@/components/sections/VisionMission";
import { WhyUs } from "@/components/sections/WhyUs";
import { Categories } from "@/components/sections/Categories";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <VisionMission />
      <WhyUs />
      <Categories />
      <Contact />
    </>
  );
}
```

- [ ] **Step 2: Update `layout.tsx` to render Navbar, Footer, and FloatingWhatsApp**

Replace the file body with:

```tsx
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Craftoria.co — Studio kreatif Souvenir & Merchandise",
  description:
    "Craftoria.co adalah studio kreatif penyedia souvenir & merchandise estetik, fungsional, dan bisa dikustom untuk berbagai acara di Mojokerto, Jawa Timur.",
  openGraph: {
    title: "Craftoria.co — Studio kreatif Souvenir & Merchandise",
    description:
      "Souvenir & merchandise estetik, fungsional, dan personal untuk berbagai acara.",
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full bg-white font-sans text-navy">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Run typecheck, lint, and build**

Run: `npm run typecheck && npm run lint && npm run build`
Expected: typecheck exit 0; lint no errors; build completes (`✓ Compiled successfully`, route `/` listed as static).

- [ ] **Step 4: Manual verification in dev server**

Run: `npm run dev` then open http://localhost:3000

Verify by eye:
- All 6 sections render top-to-bottom in order: Hero → About → Visi & Misi → Kenapa Kami → Produk (3 cards) → Kontak.
- Navbar sticky; clicking anchors smooth-scrolls to the right section; hamburger works at mobile width.
- Floating WhatsApp button appears after scrolling down ~300px.
- Click a WhatsApp button → opens `wa.me/6285113153923` with the correct pre-filled text (generic in Hero/Floating, category name in each card).
- Palette is white/cream/navy; layout is responsive at mobile and desktop widths.

Stop the dev server when done (Ctrl+C).

- [ ] **Step 5: Commit**

```bash
git add src/app/page.tsx src/app/layout.tsx
git commit -m "feat(page): assemble landing page sections and global chrome"
```

---

## Task 12: Docs sync (CLAUDE.md)

Per the docs-as-code rule, update `CLAUDE.md` in the same logical change set now that the feature is live.

**Files:**
- Modify: `CLAUDE.md`

- [ ] **Step 1: Update § Status Sprint**

Change the Sprint 00 row status to reflect the landing page completion, e.g.:

```
| Sprint 00 | Setup & Infrastructure | ✅ Done — landing page Craftoria.co live (2026-06-11) |
```

- [ ] **Step 2: Add an entry under § Fitur yang Sudah Dibangun**

```
- **Landing Page Profil ✅ (2026-06-11):** single-page statik (Hero, Tentang, Visi & Misi, Kenapa Kami, 3 kategori produk, Kontak) dengan CTA WhatsApp floating + kontekstual.
```

- [ ] **Step 3: Commit**

```bash
git add CLAUDE.md
git commit -m "docs: record landing page feature in CLAUDE.md"
```

---

## Optional: Security spot-check

The site has no auth/input/payment surface and the WhatsApp number is public, so a full scan is not required. If `gitleaks` is installed, a quick secrets check is cheap insurance:

Run: `npm run security:secrets`
Expected: `no leaks found`.

---

## Self-Review (completed during authoring)

- **Spec coverage:** §2 folder → File Manifest + all tasks; §3 components → Tasks 5–10; §4 sections+navbar → Tasks 8, 10, 11; §5 data model → Task 3; §6 category content → Task 3 data; §7 WhatsApp logic → Task 4 (tested); §8 styling/SEO/a11y → Task 2 tokens + Task 11 metadata/`lang="id"` + `aria-label`s in buttons; §9 YAGNI respected (no form/CMS/DB); §10 success criteria → Task 11 build/dev verification + Task 4 test.
- **Placeholders:** none — every code step is complete. `shopeeUrl` uses a concrete Shopee search URL (no dead placeholder).
- **Type consistency:** `Category`/`ProductItem` (Task 3) used unchanged in `CategoryCard` (Task 6) and `Categories` (Task 10); `buildWhatsAppLink(message: string)` signature consistent across Tasks 4–11; `WhatsAppButton` props (`message`, `children`, `variant`, `className`) consistent at all call sites.
- **Deviation from spec:** JSON-LD (listed "opsional" in §8) is omitted to avoid `dangerouslySetInnerHTML`, which CLAUDE.md prohibits; metadata + `lang="id"` satisfy the SEO success criterion.
