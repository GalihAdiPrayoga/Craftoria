# Craftoria UI Polish v2 — Design Spec

**Tanggal:** 2026-06-15
**Status:** Approved (2026-06-15 — user setuju semua rekomendasi: G3 diagonal clip-path · G2 Playfair existing · G4 Vision band navy · CTA pakai buildWhatsAppLink)
**Author:** Claude Code + User

---

## 1. Overview

Penajaman visual landing page Craftoria.co tanpa mengubah arsitektur, urutan section, atau konten. Tujuan: menaikkan kesan "studio kreatif yang berkarakter & premium" — saat ini eksekusi rapi tapi terasa *corporate-safe* dan generik, bertentangan dengan value proposition brand (kreativitas & estetika).

**Constraint mutlak (dari user):** Palet warna **TIDAK BOLEH bertambah**. Hanya token yang sudah ada di [globals.css](../../../src/app/globals.css):

| Token | Hex |
|---|---|
| `--color-white` | `#ffffff` |
| `--color-cream` | `#f4edd9` |
| `--color-cream-light` | `#faf7f2` |
| `--color-navy` | `#0f172a` |
| `--color-navy-mid` | `#1e293b` |
| `--color-navy-soft` | `#334155` |
| `--color-whatsapp` | `#25d366` (fungsional WA saja) |

Konsekuensi: seluruh diferensiasi datang dari **tipografi, layout, motion, tekstur, dan spacing** — bukan warna. Kedalaman dibuat lewat *value/opacity* navy & cream, bukan hue baru.

---

## 2. Goals & Non-Goals

### Goals
- **G1 — Fix bug navbar kontras** (kritis): navbar bisa tetap transparan + teks putih di atas background cream terang → nav nyaris tak terbaca.
- **G2 — Satukan identitas tipografi**: judul Hero (momen terbesar brand) saat ini `font-sans`, sedangkan semua heading section pakai serif Playfair. Selaraskan.
- **G3 — Ganti wave SVG divider** (Hero→bawah & atas Footer) yang terbaca dated/AI-template, dengan transisi lebih tegas & premium dalam palet terkunci.
- **G4 — Pecah ritme section** yang monoton (4 section beruntun pola "label + heading serif + grid kartu").
- **G5 — Beri Hero "napas"** (tinggi) sekaligus menyelaraskan asumsi threshold navbar.

### Non-Goals
- **Tambah/ubah warna** — dilarang keras oleh user.
- **Ubah konten** (copywriting, foto, data kategori, nomor WA).
- **Ubah urutan/jumlah section** atau anchor ID map.
- **Refactor data layer / arsitektur atomic** — struktur folder tetap.
- **Tambah dependency baru** (lihat §9).
- **Deployment, SEO JSON-LD, OG image** — di luar scope, tetap di backlog MEMORY_BANK.

---

## 3. Use Cases

- Sebagai **calon klien**, saat membuka situs di desktop & scroll, saya selalu bisa membaca menu navigasi dengan jelas, agar tidak tersesat.
- Sebagai **pengunjung pertama kali**, saya langsung menangkap kesan "studio yang berselera tinggi" dari Hero, agar percaya pada klaim "desain estetik".
- Sebagai **pengguna mobile / aksesibilitas**, konten tetap terlihat walau JS animasi gagal/lambat, dan animasi menghormati `prefers-reduced-motion`.

---

## 4. Technical Design

### 4.1 Data Model
**Tidak ada perubahan schema/data.** Tidak ada DB. `data/*.ts` tidak disentuh.

### 4.2 API / Route Contract
**Tidak ada.** Situs 100% statik, tanpa server action/route handler.

### 4.3 Perubahan per-area

#### G1 — Navbar kontras (`organisms/Navbar.tsx`)
**Masalah:** [Navbar.tsx:21](../../../src/components/organisms/Navbar.tsx#L21) memakai threshold `window.innerHeight - 80`. Karena Hero **bukan `min-h-screen`** ([HeroSection.tsx:47](../../../src/components/sections/HeroSection.tsx#L47) → `pt-24 pb-16`), tinggi hero kemungkinan < 100vh. Saat user sudah masuk section About (cream terang), `scrollY` masih < threshold → navbar tetap transparan + teks putih → tak terbaca.

**Keputusan:** Ganti deteksi ke **`IntersectionObserver` pada section Hero** (sumber kebenaran sebenarnya: "apakah hero masih terlihat di belakang navbar"). Fallback bila tak didukung: threshold tetap `scrollY > 24`.
- State `scrolled = true` ⟺ hero **tidak lagi** menyentuh area di balik navbar (rootMargin top ≈ tinggi navbar `-72px`).
- Logika warna teks Navbar/NavLink tetap (`scrolled || open` → navy; else putih).
- Hapus ketergantungan pada `window.innerHeight`.

> **Catatan:** Ini memperbaiki bug independen dari G5. Bahkan jika Hero dibuat tinggi, IntersectionObserver lebih robust daripada angka magic.

#### G2 — Tipografi Hero (`sections/HeroSection.tsx`)
- Judul Hero [HeroSection.tsx:60](../../../src/components/sections/HeroSection.tsx#L60): `font-sans` → **`font-serif`** (Playfair Display) agar konsisten dengan seluruh heading section → satu "jiwa" editorial.
- Sesuaikan `tracking`/`leading` agar Playfair terbaca enak di ukuran besar putih-di-navy (Playfair butuh `leading` sedikit lebih longgar + weight 500–700, bukan 800).
- Eyebrow ("Studio Kreatif…") & body tetap `font-sans` (kontras serif-display vs sans-body adalah pola editorial yang disengaja).
- **Tidak ganti font family** di `layout.tsx` — tetap Open Sans + Playfair. (Ganti family = perubahan lebih besar; ditahan untuk iterasi terpisah bila user mau — lihat §8 Open Questions.)

#### G3 — Ganti wave divider
Dua wave SVG: bawah Hero [HeroSection.tsx:129-133](../../../src/components/sections/HeroSection.tsx#L129-L133) dan atas Footer [Footer.tsx:29-40](../../../src/components/organisms/Footer.tsx#L29-L40).

**Keputusan:** Hapus wave, ganti dengan **transisi geometris tegas** dalam palet terkunci. Opsi yang dipilih untuk masing-masing:
- **Hero → About:** transisi diagonal/clip-path tepi navy ke cream, atau blok navy ber-offset (mis. `clip-path: polygon(...)`) — clean, modern, tanpa lekukan organik. CSS murni, tanpa SVG dekoratif.
- **White section → Footer (navy):** potongan diagonal serupa atau garis tegas + spacing, konsisten dengan transisi Hero agar berirama.
- Semua memakai warna token (`navy`/`navy-mid`/`cream-light`) — tidak ada warna baru.

#### G4 — Ritme section (`sections/AboutSection.tsx`)
4 blok beruntun (About cream → Vision white → WhyUs cream → Gallery white) memakai pola mirip. Pecah **minimal & berisiko rendah**:
- **Vision & Mission** dibuat menonjol: jadikan **band navy gelap full-width** (memakai `--color-navy`/`navy-mid` yang sudah ada) sebagai jeda visual di tengah halaman cream/white → menciptakan kontras dramatis tanpa warna baru. Teks putih/cream di atas navy.
  - Ini membalik pola "semua section terang" dan memberi titik fokus.
- About & Why-Us: pertahankan, tapi variasikan komposisi (mis. Why-Us grid sudah ada; About bisa asimetris/overlap ringan) — perubahan kecil agar tak identik dengan Vision.
- Tidak menambah/menghapus sub-section; anchor ID (`#about`, `#vision-mission`, `#why-us`) tetap.

#### G5 — Tinggi Hero (`sections/HeroSection.tsx`)
- Hero `pt-24 pb-16` → **`min-h-[88vh]`** (atau setara) dengan konten ter-center vertikal, agar punya napas & tidak langsung "ketemu" divider.
- Pastikan tidak menimbulkan overflow/scroll jank pada mobile (cek `min-h` + `py` aman di viewport pendek).

### 4.4 Motion & Aksesibilitas (lintas-area)
- **Anti-FOUC / SEO:** elemen ber-`opacity-0` default ([AboutSection.tsx:41](../../../src/components/sections/AboutSection.tsx#L41), [GallerySection.tsx:51](../../../src/components/sections/GallerySection.tsx#L51)) berisiko konten tak tampil bila JS gagal. **Mitigasi:** tambah dukungan `prefers-reduced-motion` (skip animasi → render visible) dan/atau pastikan ada jalur reveal yang aman. (Konsolidasi 3 sistem animasi GSAP+Framer+CSS **bukan** scope v2 — dicatat sebagai utang teknis.)
- Semua animasi baru pakai `ease` halus + `ctx.revert()` cleanup (pola existing GSAP dipertahankan).

---

## 5. Security Considerations

- **Permukaan: minimal.** Murni perubahan presentasi statik. Tidak ada input user, auth, secret, DB, upload, atau `dangerouslySetInnerHTML`.
- CTA Hero saat ini hardcode `wa.me` ([HeroSection.tsx:72](../../../src/components/sections/HeroSection.tsx#L72)); **opsional** dialihkan ke util `buildWhatsAppLink()` (DRY, bukan isu security). Nomor WA publik — aman.
- `gitleaks protect --staged` tetap dijalankan sebelum commit sesuai disiplin projek (tidak ada secret diharapkan).

---

## 6. Testing Strategy

- **Build gate:** `npm run typecheck` + `npm run lint` + `npm run build` harus exit 0 / sukses.
- **Manual QA (Playwright/browser):**
  1. **Navbar (G1):** scroll perlahan dari Hero ke About — verifikasi teks navbar berubah navy tepat saat hero lewat, **terbaca di semua posisi scroll** (desktop & viewport pendek). Ini bug utama — wajib dikonfirmasi visual.
  2. **Tipografi (G2):** judul Hero render Playfair, tidak ada FOUT parah.
  3. **Divider (G3):** transisi Hero→About & section→Footer mulus, tanpa garis/gap 1px.
  4. **Ritme (G4):** band Vision navy tampil kontras; anchor `#vision-mission` scroll tepat.
  5. **Hero (G5):** tinggi terasa lapang, tak ada overflow horizontal/jank mobile.
  6. **Reduced motion:** dengan `prefers-reduced-motion: reduce`, semua konten tetap terlihat.
- **A11y dasar:** kontras teks navbar di kedua state ≥ WCAG AA; fokus keyboard masih jelas.
- **Bukti sebelum klaim** (disiplin CLAUDE.md §4): tempelkan output command, pisahkan terkonfirmasi vs asumsi.

---

## 7. Migration & Rollback

- **Tidak ada DB migration.** Murni perubahan file komponen/CSS.
- **Rollback:** `git revert` commit terkait — tidak ada efek samping data.
- **Backward compat:** anchor ID, nama komponen, props publik dipertahankan → tidak ada breaking change untuk bagian lain.

---

## 8. Open Questions

1. **G3 transisi:** pilih **diagonal/clip-path** (rekomendasi: tegas & modern) atau **blok solid ber-offset**? (asumsi default: diagonal clip-path halus, satu sudut)
2. **G2 font family:** cukup pindahkan Hero ke Playfair yang sudah ada (rekomendasi, risiko rendah), **atau** user ingin eksplor ganti pasangan font yang lebih berkarakter di iterasi terpisah? (default: pakai Playfair existing)
3. **G4 Vision band navy:** setuju Vision jadi band gelap sebagai titik fokus? Bila user lebih suka tetap terang, alternatifnya layout asimetris/overlap tanpa ubah background.
4. **CTA util WA:** sekalian rapikan ke `buildWhatsAppLink()` atau biarkan? (default: rapikan, low-risk)

---

## 9. Dependencies

- **Tidak ada package baru.** Semua dengan Tailwind v4 + GSAP/Framer existing + CSS (`clip-path`, custom props).
- **File terdampak (rencana):**
  - `src/components/organisms/Navbar.tsx` (G1)
  - `src/components/molecules/NavLink.tsx` (mengikuti, bila perlu)
  - `src/components/sections/HeroSection.tsx` (G2, G3-bawah, G5, opsional CTA)
  - `src/components/organisms/Footer.tsx` (G3-atas)
  - `src/components/sections/AboutSection.tsx` (G4)
  - `src/app/globals.css` (helper util/clip-path/`prefers-reduced-motion` bila perlu — **tanpa token warna baru**)
- **Docs-as-Code (Definition of Done):** dalam commit yang sama — update `MEMORY_BANK.md` (§ Recent Changes + tanggal/hash, § Current Status) & `CLAUDE.md` (§ Status Sprint / Fitur bila relevan).

---

## Referensi
- Spec sebelumnya: `docs/superpowers/specs/2026-06-13-craftoria-gallery-refine-design.md`
- Token & aturan: `MEMORY_BANK.md` § Design Tokens, `CLAUDE.md` § Keputusan Arsitektur

## Next Step
Spec tersimpan di `docs/superpowers/specs/2026-06-15-craftoria-ui-polish-v2-design.md`.
Setelah user menjawab Open Questions & approve, lanjut `/plan-writer` mereferensikan spec ini, lalu implementasi.
