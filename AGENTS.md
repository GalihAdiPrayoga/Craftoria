# AGENTS.md — Craftoria

Execution checklist untuk AI agents. **`CLAUDE.md` = aturan & referensi; file ini = checklist eksekusi; `SECURITY.md` = kebijakan security.**

---

## 🚨 Mandatory Pre-Task Checklist — NO EXCEPTIONS

### Step 1: Load Project Context
```bash
git status --short --branch
git log --oneline -5
```
- [ ] Baca `CLAUDE.md` penuh — catat stack, arsitektur, aturan, dan forbidden actions
- [ ] Baca `AGENTS.md` ini — cek coordination note, who owns what, shared-file risk
- [ ] Jika task menyentuh schema/migration: baca migrasi terbaru
- [ ] Jika task menyentuh payment/checkout: baca spec di `docs/superpowers/specs/`
- [ ] Jika task menyentuh auth: review auth sections di `CLAUDE.md`
- [ ] Jika task menyentuh webhook: review idempotency rules

### Step 2: Declare Intent
Sebelum coding, nyatakan secara eksplisit:
1. **Files yang akan disentuh** — list lengkap
2. **Shared-file risk** — apakah ada file yang sedang dikerjakan agent lain?
3. **Constraints dari `CLAUDE.md`** — rule apa yang berlaku untuk task ini?
4. **Security concerns** — apakah task ini menyentuh auth, input, secrets, DB writes, upload?

### Step 3: Security Gate

Untuk setiap task yang menyentuh area di bawah, jawab SEMUA pertanyaan sebelum coding:

| Area | Mandatory Check |
|---|---|
| **Auth / RBAC** | Endpoint dilindungi? Role check server-side? Tidak percaya client? |
| **Input Validation** | Semua input divalidasi (schema) sebelum ke DB/service? |
| **Secret Handling** | Tidak ada env var bocor ke client via prefix publik? |
| **DB Access** | Semua ORM calls lewat `server/repositories/` saja? |
| **Webhook** | Handler idempoten? Token/signature diverifikasi sebelum proses? |
| **File Upload** | File type + size divalidasi server-side? Path traversal dicegah? |
| **Error Responses** | Tidak ada stack trace/internal path/PII di client-facing error? |
| **Mutation Safety** | Tidak ada DB mutation dari GET handlers? |
| **XSS Prevention** | Tidak ada `dangerouslySetInnerHTML` tanpa sanitasi? |
| **CSRF** | State-changing action dilindungi (bukan GET)? |
| **Rate Limiting** | Public/abuse-prone endpoints dibatasi? |
| **Data Ownership** | Caller diverifikasi MEMILIKI record (bukan sekadar authenticated)? |

> ⚠️ **HARD STOP**: Jika ada security check yang tidak yakin, selesaikan SEBELUM menulis kode. Jangan lanjut dengan asumsi "fix it later" untuk security.

### Step 4: Post-Implementation Validation
```bash
# Selalu jalankan sebelum klaim task complete (sesuaikan setelah stack dipilih):
# npm run lint && npm run typecheck && npm run build
```
Jika command tidak bisa dijalankan, sampaikan ke user apa yang perlu divalidasi.

### Step 5: Docs-as-Code — Definition of Done
Task belum "selesai" sampai docs mencerminkan realita. Update dalam **commit yang sama** dengan code change.

| Trigger | File yang di-update |
|---|---|
| Sprint selesai | `CLAUDE.md` § Status Sprint |
| Env variable baru | `CLAUDE.md` § Environment Variables |
| Keputusan arsitektur baru | `CLAUDE.md` § Keputusan Arsitektur |
| Fitur baru deploy | `CLAUDE.md` § Fitur yang Sudah Dibangun |
| Migration schema | Kedua file + nama migration + tanggal |
| Rule baru dilarang | `CLAUDE.md` § Yang TIDAK Boleh Dilakukan |

### Step 6: Commit (Conventional Commits)
Format: `<type>(scope): summary` — `feat | fix | docs | chore | refactor | test | perf`.
Satu commit = satu perubahan logis, scope sempit. Jangan pernah commit secrets/tokens/credentials.

### Security Tooling (jalankan sebelum commit/PR relevan)
```bash
semgrep --config auto <path>                 # auth/payment/webhook/upload/input/permission
gitleaks protect --staged --no-banner        # sebelum commit config/env/docs/credentials
trivy fs --scanners vuln,secret,misconfig .  # Dockerfile/image/dependencies
```

---

## Workflow Skills — Kapan Pakai Apa

Gunakan skills ini untuk memaksimalkan kualitas dan konsistensi kerja:

| Situasi | Skill yang dipakai |
|---|---|
| Ada ide fitur baru / masalah yang belum jelas | `/brainstorm` — ideation terstruktur |
| Butuh dokumen spec formal sebelum coding | `/spec-writer` — buat design doc |
| Butuh implementation plan yang executable | `/plan-writer` — buat task breakdown |
| Setup project baru / onboarding repo | `/init-project` — scaffold protokol |

> **Pipeline ideal untuk fitur signifikan:** `/brainstorm` → `/spec-writer` → `/plan-writer` → [user approve] → implementasi

---

## DevSecOps — Role & Reporting

**Role:** senior full-stack engineer + DevSecOps reviewer. Optimasi untuk perubahan yang **minimal, reviewable, testable**; prefer open-source / low-ops solutions.

**Dependency Policy:** Jangan tambah package kecuali perlu. Jika menambah, nyatakan: **kenapa perlu · alternatif yang dipertimbangkan · risiko security/maintenance · sinyal popularitas/maintenance** (downloads, last release, maintainers).

**Format Respons Akhir (setiap task):**
Akhiri dengan: **Summary · Files changed · Validation commands run · Security/scalability risks found · Risks not fully verified · Recommended next steps.** Jangan pernah klaim project 100% secure.

---

## Current Coordination Note

> Update bagian ini setiap ada perubahan signifikan: sprint owner baru, branch merge, env/tunnel/DB berubah, migration penting, aturan deploy baru, integrasi external service, atau boundary yang ditetapkan user.
>
> Format: singkat, bertanggal, operasional. Replace catatan lama yang sudah tidak relevan.

- **Updated:** 2026-06-11 — project initialized with agent protocol scaffold. Stack belum ditentukan.
