# Craftoria

> Ringkasan 1 kalimat tentang project ini. Stack: Next.js 16 (App Router) + TypeScript + Tailwind CSS v4. Status: Development.

**Spec lengkap:** `docs/superpowers/specs/`
**Sprint plans:** `docs/superpowers/plans/`

---

## ⚙️ Alur Kerja Wajib (Development Discipline)

Berlaku untuk SETIAP tugas — patuhi sebelum, selama, dan sesudah eksekusi.

### 1. Konteks dulu — baca dokumentasi sebelum eksekusi
- Baca `CLAUDE.md` + `AGENTS.md` + spec/plan yang relevan sebelum menyentuh kode.
- Verifikasi fakta repo: `git status --short --branch`, `git log --oneline -10`.
- Fitur baru / perubahan berisiko → ikuti `/brainstorm` → `/spec-writer` → `/plan-writer` → implementasi. Jangan langsung coding.

### 2. Dokumentasi selalu sinkron (docs-as-code) — WAJIB
Setiap perubahan kode/arsitektur/schema/env/deploy **harus disertai update dokumentasi dalam commit yang sama**. Tugas belum "selesai" sampai dokumen mencerminkan kondisi nyata. Singkat, **bertanggal**, operasional; ganti catatan usang.

| Trigger | File yang di-update |
|---|---|
| Sprint selesai | `CLAUDE.md` § Status Sprint |
| Env variable baru | `CLAUDE.md` § Environment Variables |
| Keputusan arsitektur | `CLAUDE.md` § Keputusan Arsitektur |
| Fitur baru deploy | `CLAUDE.md` § Fitur yang Sudah Dibangun |
| Migration schema | Kedua file + nama migration + tanggal |
| Rule baru dilarang | `CLAUDE.md` § Yang TIDAK Boleh Dilakukan |

### 3. Security-first — setiap perubahan berpotensi berisiko
Permukaan sensitif: **auth, input user, API routes, env/secret, file upload, payment/webhook (sesuaikan saat fitur dibangun)**.
- Spec dulu untuk permukaan sensitif — jangan hotfix buta.
- **Selalu** validasi & otorisasi **server-side** — jangan percaya nilai dari client (harga, role, stock, ID).
- Jalankan tooling sebelum commit relevan:
  ```bash
  semgrep --config auto <path>                 # auth/payment/webhook/upload/input
  gitleaks protect --staged --no-banner        # config/env/docs/credentials
  trivy fs --scanners vuln,secret,misconfig .  # Dockerfile/image/dependency
  ```
- **Jangan pernah** commit/hardcode secret, token, credentials — termasuk di docs & `.env.example`.

### 4. Bukti sebelum klaim
Jangan klaim build/lint/test/migration/QA/deploy berhasil tanpa menjalankan perintahnya dan membaca outputnya. Pisahkan `terkonfirmasi` vs `asumsi` vs `langkah berikutnya`.

### 5. Konvensi commit (Conventional Commits)
Format: `<tipe>(scope): ringkasan`. Tipe: `feat | fix | docs | chore | refactor | test | perf`.
Satu commit = satu perubahan logis, scope sempit.

> **Pembagian:** `CLAUDE.md` = aturan & referensi; `AGENTS.md` = checklist eksekusi.

### Catatan Agent (DevSecOps)
- Ikuti `AGENTS.md` + `SECURITY.md` + `docs/AI_AGENT_PROTOCOL.md`.
- **Jangan** baca/tampilkan/commit file secret (`.env*`, `*.pem`, `*.key`, `id_rsa`, `id_ed25519`).
- Gunakan MCP/tool bila tersedia: **Context7** (dok library terbaru), **Playwright** (QA UI), **GitHub** (PR/CI), **Semgrep/Gitleaks/Trivy** (security scan).
- Jalankan perintah validasi (lihat § Dev Commands) sebelum klaim selesai. Laporan akhir ringkas & jujur — jangan klaim 100% aman.

---

## Stack

| Area | Tech |
|---|---|
| Framework | Next.js 16.2.9 (App Router, Turbopack) + React 19.2.4 |
| Bahasa | TypeScript 5 |
| Styling | Tailwind CSS v4 (`@tailwindcss/postcss`) |
| Linting | ESLint 9 (`eslint-config-next`) |
| Package Manager | npm |
| Import alias | `@/*` → `src/*` |
| Database / ORM | > belum ditentukan |
| Auth | > belum ditentukan |
| Storage | > belum ditentukan |
| Deployment | > belum ditentukan |

---

## Struktur Folder — Aturan Wajib

> Contoh struktur (Next.js App Router). Sesuaikan dengan stack final; pertahankan prinsip **DB access terisolasi di satu layer**.

```
src/
├── app/           # Routes
├── components/    # UI only — TIDAK boleh query DB langsung
├── features/      # Domain logic per fitur
├── server/
│   ├── actions/       # Entry dari UI
│   ├── services/      # Business logic
│   └── repositories/  # SATU-SATUNYA tempat ORM/DB dipanggil
└── lib/
    ├── validators/    # Schema validasi (mis. Zod)
    └── utils/
```

> **Aturan wajib:** Jangan call DB/ORM dari luar `server/repositories/`. Selalu lewat `server/repositories/`.

---

## Route Groups

| Group | URL Pattern | Auth |
|---|---|---|
| > isi sesuai project | | |

---

## Status Sprint

| Sprint | Topik | Status |
|---|---|---|
| Sprint 00 | Setup & Infrastructure | ✅ Done — landing page Craftoria.co selesai 2026-06-12 |
| Gallery Refine | Katalog → Gallery + polish + deploy-ready | ✅ Done 2026-06-13 — build production hijau |
| UI Polish v2 | Hero serif, diagonal divider, navbar kontras, anti-FOUC | ✅ Done 2026-06-15 — validated & build success |

---

## Fitur yang Sudah Dibangun

> Daftar fitur yang sudah live, format: `- **Nama Fitur ✅ (YYYY-MM-DD):** ringkasan 1 kalimat.`

- **Landing Page Profil ✅ (2026-06-12):** single-page statik (Hero, Tentang, Visi & Misi, Kenapa Kami, 3 kategori produk, Kontak) dengan CTA WhatsApp floating + kontekstual, Navbar sticky blur, dan Footer.
- **Gallery Produk ✅ (2026-06-13):** section galeri image-forward (30 foto asli di `public/image/catalog/`) dengan filter kategori (Drinkware/Decor/Daily) + lightbox keyboard-accessible, menggantikan katalog teksual; Hero pakai value-props + CTA `#gallery`, Why-Us jadi grid kartu. Build production hijau via `npm run predeploy`.

---

## Dev Commands

```bash
npm run dev          # Dev server (Turbopack) — http://localhost:3000
npm run typecheck    # tsc --noEmit
npm run lint         # ESLint
npm run build        # Production build
npm start            # Jalankan hasil build

# Security (perlu CLI eksternal: gitleaks, semgrep, trivy)
npm run security:all # gitleaks + semgrep + trivy + npm audit
```

---

## Environment Variables

```
# Isi dengan semua env vars yang digunakan
# Format: VAR_NAME    Deskripsi singkat
```

> **Aturan:** Variabel dengan prefix publik (mis. `NEXT_PUBLIC_`) = aman untuk client. Tanpa prefix = server-only secret. Jangan salah assign.

---

## Keputusan Arsitektur Penting

### Harga & Kalkulasi
> Selalu hitung server-side — jangan percaya angka dari client.

### Data Flow
> Definisikan di sini: dari mana data mengalir, siapa yang boleh menulis ke mana.

---

## Yang TIDAK Boleh Dilakukan

### Arsitektur & Data Flow
- Jangan call DB/ORM dari luar `server/repositories/`
- Jangan hitung nilai penting (harga, diskon, stok, role) di client
- > tambah larangan spesifik project

### Security — DILARANG KERAS
- Jangan expose secret ke client (prefix publik hanya untuk data publik)
- Jangan commit `.env*` ke repository
- Jangan return error message internal ke client (stack trace, query detail)
- Jangan skip validasi input di server actions / route handlers — selalu validasi schema
- Jangan trust nilai dari client untuk kalkulasi sensitif
- Jangan gunakan `dangerouslySetInnerHTML` tanpa sanitasi
- Jangan lakukan DB mutation dari GET handler

### Workflow & Docs
- Jangan mulai coding tanpa membaca `CLAUDE.md` dan `AGENTS.md`
- Jangan anggap migration/deploy/QA "lulus" tanpa menjalankan command-nya

---

## Checklist Go-Live

- [ ] Semua env vars sudah di-set di production
- [ ] Webhook URLs sudah didaftarkan ke provider yang sesuai
- [ ] Full flow test: end-to-end dari UI sampai DB
- [ ] Security scan bersih (semgrep, gitleaks, trivy)
- [ ] Monitoring & alerting aktif
