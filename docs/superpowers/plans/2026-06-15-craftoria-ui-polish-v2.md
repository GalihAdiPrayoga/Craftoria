# Craftoria UI Polish v2 — Implementation Plan

**Tanggal:** 2026-06-15
**Spec:** `docs/superpowers/specs/2026-06-15-craftoria-ui-polish-v2-design.md`
**Status:** Draft (menunggu approval user)

---

## Scope Summary

1. **G1 — Fix bug navbar kontras:** ganti threshold `innerHeight-80` → `IntersectionObserver` pada Hero (fallback `scrollY > 24`).
2. **G2 — Tipografi Hero:** judul `font-sans` → `font-serif` (Playfair existing), tuning weight/leading.
3. **G3 — Divider:** hapus 2 wave SVG → transisi **diagonal clip-path** dalam palet terkunci.
4. **G4 — Ritme section:** Vision & Mission jadi **band navy gelap** sebagai focal point.
5. **G5 — Hero height:** `pt-24 pb-16` → `min-h-[88vh]` center.
6. **Cross-cutting:** anti-FOUC via `prefers-reduced-motion`; CTA Hero pakai `buildWhatsAppLink()`.

**Constraint mutlak:** TIDAK ada warna baru — hanya token navy/cream/white di `globals.css`. Tidak ada dependency baru. Tidak ubah konten/urutan section/anchor ID.

---

## Task Breakdown

> Urutan = dependency + minim-konflik. Tiap task = satu commit logis. Semua task menyentuh file presentasi yang sama-aman; tidak ada DB/migration.

### Task 1: Fix bug navbar kontras (G1)
**Files:**
- `[MODIFY] src/components/organisms/Navbar.tsx` — ganti scroll-threshold → IntersectionObserver pada `#hero`.

**Detail:**
- Hapus listener `scroll` berbasis `window.innerHeight - 80`.
- Tambah `IntersectionObserver` yang mengamati elemen `#hero`:
  - `rootMargin: "-72px 0px 0px 0px"` (≈ tinggi navbar), `threshold: 0`.
  - `scrolled = !entry.isIntersecting` (hero tak lagi di balik navbar → state solid).
- Fallback bila `IntersectionObserver` tak tersedia / `#hero` tak ditemukan: listener `scroll` sederhana `setScrolled(window.scrollY > 24)`.
- Cleanup observer/listener di `return` effect. Pertahankan logika warna `scrolled || open`.
- Tidak ubah `NavLink.tsx` (prop `scrolled` sudah benar).

**Validation:** `npm run typecheck` && `npm run lint`
**Depends on:** —

---

### Task 2: Tipografi Hero serif + height + CTA util (G2, G5, CTA)
**Files:**
- `[MODIFY] src/components/sections/HeroSection.tsx`

**Detail:**
- **G2:** `h1` ([:60](../../../src/components/sections/HeroSection.tsx#L60)) `font-bold font-sans` → `font-serif`, weight ≈ `font-semimedium` (gunakan `font-medium`/`font-semibold`, hindari 800 untuk Playfair), `leading-[1.1]`→`leading-tight` longgar. Ukuran `text-5xl md:text-6xl` dipertahankan / disesuaikan agar seimbang di navy.
- **G5:** section wrapper `pt-24 pb-16 lg:pt-28 lg:pb-20` → `min-h-[88vh] flex items-center pt-28 pb-16` (atau setara) agar konten center & lapang. Pastikan grid tetap di dalam container `max-w-7xl`.
- **CTA:** ganti hardcode `wa.me` link ([:71-79](../../../src/components/sections/HeroSection.tsx#L71-L79)) → `buildWhatsAppLink()` dari `@/utils/whatsapp`. Tombol "Lihat Galeri" tetap `#gallery`.
- Eyebrow & body tetap `font-sans`.
- Verifikasi mobile: `min-h-[88vh]` + konten tinggi tidak menimbulkan overflow horizontal.

**Validation:** `npm run typecheck` && `npm run lint`
**Depends on:** —  (independen dari Task 1; tapi commit setelahnya)

---

### Task 3: Ganti wave divider → diagonal clip-path (G3)
**Files:**
- `[MODIFY] src/components/sections/HeroSection.tsx` — hapus blok wave SVG ([:129-133](../../../src/components/sections/HeroSection.tsx#L129-L133)).
- `[MODIFY] src/components/organisms/Footer.tsx` — hapus wave SVG ([:29-40](../../../src/components/organisms/Footer.tsx#L29-L40)).
- `[MODIFY] src/app/globals.css` — (bila perlu) util class `.edge-diagonal` via `clip-path`; **tanpa token warna baru**.

**Detail:**
- **Hero→About:** transisi diagonal halus. Implementasi pilihan: beri Hero (navy) sudut bawah ter-clip ATAU elemen jembatan tipis navy ber-`clip-path: polygon(...)` di atas About (cream-light). Satu sudut, sudut landai (mis. ~3–5°) agar premium, bukan tajam berlebihan.
- **White section (Gallery) → Footer (navy):** transisi diagonal **konsisten arah** dengan Hero→About agar berirama. Footer navy diberi tepi atas diagonal (clip-path) menggantikan wave.
- Pastikan tak ada gap/garis 1px (gunakan overlap kecil `-mt-px` bila perlu).
- Hanya warna token (`navy`/`navy-mid`/`cream-light`).

**Validation:** `npm run typecheck` && `npm run lint`
**Depends on:** Task 2 (menyentuh HeroSection.tsx yang sama → hindari konflik; kerjakan setelah Task 2).

---

### Task 4: Vision & Mission band navy (G4)
**Files:**
- `[MODIFY] src/components/sections/AboutSection.tsx` — sub-section `#vision-mission` ([:157-205](../../../src/components/sections/AboutSection.tsx#L157-L205)).

**Detail:**
- Ubah `bg-white` section `#vision-mission` → **band navy** (`bg-navy` / `bg-navy-mid`), full-width.
- Invert warna teks: heading serif & body → putih/cream (`text-white`, `text-cream`, `text-white/70`), `SectionLabel` & border pakai `white/xx`.
- Pertahankan struktur grid `lg:col-span-5 / col-span-6`, sticky visi, daftar `missions`, ikon — hanya skema warna yang invert (semua dari token).
- Pastikan kontras AA (teks putih di navy aman).
- About (`#about`) & Why-Us (`#why-us`) tetap; band navy di tengah otomatis memecah ritme cream→white→cream→white.
- Anchor `#vision-mission` tidak berubah; `scroll-mt-20` dipertahankan.

**Validation:** `npm run typecheck` && `npm run lint`
**Depends on:** —  (file beda dari Task 1-3; bisa paralel, tapi commit terurut)

---

### Task 5: Anti-FOUC / reduced-motion (cross-cutting)
**Files:**
- `[MODIFY] src/app/globals.css` — `@media (prefers-reduced-motion: reduce)` → paksa `.animate-item`, `.opacity-0` (atau selector reveal) menjadi `opacity: 1 !important; transform: none !important`.
- `[MODIFY] src/components/sections/AboutSection.tsx` — `FadeUp`: hormati reduced-motion (skip GSAP → set visible) bila praktis.
- `[MODIFY] src/components/sections/GallerySection.tsx` — heading `opacity-0` reveal: pastikan ada jalur visible saat reduced-motion.
- `[MODIFY] src/components/sections/HeroSection.tsx` — `.animate-item` reveal aman saat reduced-motion.

**Detail:**
- Tujuan: konten tetap terlihat bila JS gagal/lambat ATAU user minta reduced-motion. Pendekatan CSS-first (paling robust): media query di `globals.css` yang menetralkan state `opacity-0` awal.
- **Tidak** mengkonsolidasi 3 sistem animasi (GSAP+Framer+CSS) — itu utang teknis di luar scope v2 (catat di MEMORY_BANK Known Issues).

**Validation:** `npm run typecheck` && `npm run lint`
**Depends on:** Task 2, 3 (menyentuh HeroSection.tsx & globals.css yang sama).

---

### Task 6: Build gate + QA + Docs-as-Code + commit final
**Files:**
- `[MODIFY] MEMORY_BANK.md` — § Recent Changes (entry 2026-06-15 + hash), § Current Status, § Known Issues (catat utang animasi).
- `[MODIFY] CLAUDE.md` — § Status Sprint (tambah baris "UI Polish v2") / § Fitur bila relevan.

**Detail:**
- Jalankan validasi lengkap (lihat Validation Plan).
- QA manual via Playwright/browser (lihat checklist) — **utamakan konfirmasi bug navbar G1**.
- Update docs dalam commit yang sama dengan perubahan terakhir (disiplin docs-as-code).

**Validation:** `npm run build` + QA manual.
**Depends on:** Task 1-5.

---

## File Manifest (Complete)

### Navbar (G1)
| Action | File | Description |
|---|---|---|
| MODIFY | `src/components/organisms/Navbar.tsx` | IntersectionObserver `#hero` + fallback `scrollY>24` |

### Hero (G2, G3, G5, CTA, FOUC)
| Action | File | Description |
|---|---|---|
| MODIFY | `src/components/sections/HeroSection.tsx` | h1 serif; `min-h-[88vh]` center; CTA `buildWhatsAppLink()`; hapus wave; reduced-motion |

### About (G4)
| Action | File | Description |
|---|---|---|
| MODIFY | `src/components/sections/AboutSection.tsx` | Vision band navy + invert teks; FadeUp reduced-motion |

### Footer (G3)
| Action | File | Description |
|---|---|---|
| MODIFY | `src/components/organisms/Footer.tsx` | hapus wave SVG → tepi atas diagonal clip-path |

### Gallery (FOUC)
| Action | File | Description |
|---|---|---|
| MODIFY | `src/components/sections/GallerySection.tsx` | heading reveal aman saat reduced-motion |

### Styles (G3, FOUC)
| Action | File | Description |
|---|---|---|
| MODIFY | `src/app/globals.css` | util clip-path diagonal + `prefers-reduced-motion` (TANPA token warna baru) |

### Docs
| Action | File | Description |
|---|---|---|
| MODIFY | `MEMORY_BANK.md` | Recent Changes, Current Status, Known Issues |
| MODIFY | `CLAUDE.md` | Status Sprint / Fitur |

---

## Shared-File Risks

- `src/components/sections/HeroSection.tsx` disentuh Task 2, 3, 5 → **kerjakan berurutan** (jangan paralel) untuk hindari konflik.
- `src/app/globals.css` disentuh Task 3 & 5 → gabungkan perubahan, satu kali edit per task aman.
- Tidak ada agent/pihak lain aktif di file ini (per Coordination Note AGENTS.md 2026-06-12). Tidak ada shared-file risk eksternal.

---

## Validation Plan

### Automated
```bash
npm run typecheck    # tsc --noEmit — tiap task
npm run lint         # ESLint — tiap task
npm run build        # production build — Task 6
# gitleaks protect --staged --no-banner  # sebelum commit (disiplin projek)
```

### Manual QA (browser/Playwright)
- [ ] **G1 navbar:** scroll Hero→About perlahan (desktop + viewport pendek) — teks navbar berubah navy tepat & **selalu terbaca**. (bug utama)
- [ ] **G2:** judul Hero render Playfair, tak ada FOUT parah.
- [ ] **G3:** transisi Hero→About & Gallery→Footer mulus, tanpa gap 1px, arah diagonal konsisten.
- [ ] **G4:** band Vision navy kontras; anchor `#vision-mission` scroll tepat; teks putih AA.
- [ ] **G5:** Hero lapang, tanpa overflow horizontal/jank mobile.
- [ ] **Reduced-motion:** `prefers-reduced-motion: reduce` → semua konten terlihat.
- [ ] CTA Hero → `wa.me` benar (nomor 6285113153923).

## Security Review Checklist
- Surface: **presentasi statik murni** — tidak ada auth/input/secret/DB/upload/`dangerouslySetInnerHTML`.
- [ ] `gitleaks protect --staged` sebelum commit (tak diharapkan ada secret).
- [ ] Tidak perlu `security-reviewer` agent (tidak ada surface sensitif). `typescript-reviewer` opsional setelah Task 5 bila diinginkan.

## Rollback Notes
- Tidak ada migration. Semua perubahan presentasi reversible via `git revert`.
- Tidak perlu feature flag. Rollback = revert commit terkait, tanpa efek samping data.

## Estimated Order of Execution
1. Task 1 → `fix(ui): navbar contrast via IntersectionObserver on hero`
2. Task 2 → `feat(ui): hero serif headline, min-height, WA util CTA`
3. Task 3 → `refactor(ui): replace wave dividers with diagonal clip-path`
4. Task 4 → `feat(ui): vision & mission as navy focal band`
5. Task 5 → `fix(ui): respect prefers-reduced-motion, anti-FOUC reveal`
6. Task 6 → `docs(memory): sync MEMORY_BANK + CLAUDE after ui-polish-v2`

> Task 1, 2, 4 secara teknis independen; Task 3 & 5 menumpang HeroSection.tsx/globals.css → tetap berurutan. Eksekusi sekuensial sesuai nomor untuk commit yang bersih.

## Next Step
Plan tersimpan di `docs/superpowers/plans/2026-06-15-craftoria-ui-polish-v2.md`.
Setelah kamu approve, saya mulai implementasi dari Task 1.
