# Website Portofolio Calon Kepala Desa

Website portofolio digital modern untuk calon kepala desa, dibangun dengan Next.js 15, Supabase, dan siap deploy ke Vercel.

---

## Fitur Utama

- **Landing page lengkap** — Hero, Profil, Timeline, Visi & Misi, 3 Pilar, Program Unggulan, APBDes, Galeri, Aspirasi, Kontak
- **Admin panel** — Kelola semua konten tanpa perlu coding
- **Form aspirasi** — Dengan validasi, rate limiting, dan moderasi
- **Dashboard APBDes** — Transparansi anggaran desa
- **Responsif** — Mobile-first, berjalan baik di semua perangkat
- **SEO ready** — Metadata, OpenGraph, sitemap, robots.txt
- **Smooth scroll** — Menggunakan Lenis
- **Auth** — Login admin via Supabase Auth

---

## Tech Stack

| Layer | Teknologi |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Styling | Tailwind CSS v4 |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth |
| Storage | Supabase Storage |
| Deploy | Vercel |
| Forms | React Hook Form + Zod |
| Icons | Lucide React |
| Scroll | Lenis |

---

## Panduan Setup Lengkap

### Langkah 1 — Install dependensi

```bash
cd kades-portfolio
npm install
```

---

### Langkah 2 — Setup Supabase

#### 2.1 Buat project Supabase

1. Buka [supabase.com](https://supabase.com) dan login atau daftar
2. Klik **"New project"**
3. Isi:
   - **Name**: `kades-portfolio` (bebas)
   - **Database Password**: buat password yang kuat dan **simpan baik-baik**
   - **Region**: pilih yang paling dekat (Singapore = `ap-southeast-1`)
4. Klik **"Create new project"** — tunggu sekitar 1–2 menit

#### 2.2 Jalankan SQL schema

1. Di dashboard Supabase, buka menu **SQL Editor** (ikon database di sidebar kiri)
2. Klik **"New query"**
3. Buka file `supabase/schema.sql` dari project ini
4. **Copy seluruh isinya** dan paste ke SQL Editor
5. Klik **"Run"** (atau tekan `Ctrl/Cmd + Enter`)
6. Tunggu hingga muncul pesan **"Success"**

> Schema akan membuat semua tabel, RLS policies, storage buckets, dan seed data awal secara otomatis.

#### 2.3 Buat akun admin

1. Di dashboard Supabase, buka **Authentication → Users**
2. Klik **"Add user" → "Create new user"**
3. Isi email dan password untuk admin website
4. Klik **"Create User"**

> Gunakan email dan password ini untuk login di `/admin/login`

#### 2.4 Ambil API keys

1. Di dashboard Supabase, buka **Settings → API**
2. Catat:
   - **Project URL** → untuk `NEXT_PUBLIC_SUPABASE_URL`
   - **anon / public key** → untuk `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role key** (rahasia!) → untuk `SUPABASE_SERVICE_ROLE_KEY`

---

### Langkah 3 — Konfigurasi environment variables

Buka file `.env.local` di root project, isi dengan data dari Supabase:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_CANDIDATE_NAME=Nama Calon
NEXT_PUBLIC_VILLAGE_NAME=Nama Desa
```

**Ganti juga:**
- `NEXT_PUBLIC_CANDIDATE_NAME` → nama lengkap calon kepala desa
- `NEXT_PUBLIC_VILLAGE_NAME` → nama desa

> ⚠️ **PENTING**: Jangan pernah commit file `.env.local` ke Git. File ini sudah ada di `.gitignore`.

---

### Langkah 4 — Jalankan development server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) untuk melihat website.

Buka [http://localhost:3000/admin/login](http://localhost:3000/admin/login) untuk masuk ke admin panel.

---

### Langkah 5 — Isi konten via Admin Panel

Setelah login ke admin panel, isi konten berikut secara berurutan:

1. **Profil** (`/admin/profil`) — Nama, foto, bio, kontak, dll
2. **Visi & Misi** (`/admin/visi-misi`) — Teks visi dan 3 misi
3. **Program** (`/admin/program`) — Edit 3 program unggulan
4. **Timeline** (`/admin/timeline`) — Perjalanan karir dan pengabdian
5. **Galeri** (`/admin/galeri`) — Upload foto kegiatan
6. **APBDes** (`/admin/apbdes`) — Data anggaran desa (gunakan data resmi)

---

## Deploy ke Vercel

### Langkah 1 — Push ke GitHub

```bash
# Dari folder kades-portfolio
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/username/kades-portfolio.git
git push -u origin main
```

### Langkah 2 — Import ke Vercel

1. Buka [vercel.com](https://vercel.com) dan login
2. Klik **"Add New Project"**
3. Pilih repository GitHub yang baru dibuat
4. Vercel akan mendeteksi Next.js secara otomatis
5. **SEBELUM deploy**, klik **"Environment Variables"**

### Langkah 3 — Set Environment Variables di Vercel

Di bagian Environment Variables, tambahkan semua variabel dari `.env.local`:

| Key | Value |
|-----|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | URL project Supabase Anda |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Anon key dari Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key (rahasia) |
| `NEXT_PUBLIC_SITE_URL` | URL website setelah deploy (contoh: `https://kades-namadesa.vercel.app`) |
| `NEXT_PUBLIC_CANDIDATE_NAME` | Nama calon |
| `NEXT_PUBLIC_VILLAGE_NAME` | Nama desa |

### Langkah 4 — Deploy

Klik **"Deploy"** dan tunggu proses selesai (biasanya 1–3 menit).

### Langkah 5 — Update SITE_URL

Setelah deploy berhasil, Vercel akan memberikan URL seperti `https://kades-xxx.vercel.app`.

1. Pergi ke **Settings → Environment Variables** di Vercel
2. Update `NEXT_PUBLIC_SITE_URL` dengan URL tersebut
3. Klik **"Redeploy"**

### Langkah 6 — Update Supabase Allowed URLs

1. Di dashboard Supabase, buka **Authentication → URL Configuration**
2. Tambahkan URL Vercel ke **"Redirect URLs"**:
   - `https://kades-xxx.vercel.app/**`
3. Update **"Site URL"** dengan URL Vercel

---

## Konfigurasi Domain Kustom (Opsional)

Jika ingin menggunakan domain sendiri (misal: `www.namacalon-namadesa.com`):

1. Di Vercel, buka **Settings → Domains**
2. Klik **"Add Domain"** dan masukkan domain Anda
3. Ikuti instruksi untuk update DNS di registrar domain Anda
4. Update `NEXT_PUBLIC_SITE_URL` dengan domain baru

---

## Struktur Project

```
kades-portfolio/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Homepage
│   │   ├── layout.tsx            # Root layout + metadata
│   │   ├── globals.css           # Global styles
│   │   ├── sitemap.ts            # SEO sitemap
│   │   ├── robots.ts             # SEO robots
│   │   ├── not-found.tsx         # 404 page
│   │   ├── error.tsx             # Error page
│   │   ├── loading.tsx           # Loading state
│   │   ├── api/
│   │   │   └── aspirasi/
│   │   │       └── route.ts      # API aspirasi + rate limiting
│   │   └── admin/
│   │       ├── page.tsx          # Dashboard admin
│   │       ├── login/            # Halaman login
│   │       ├── profil/           # Edit profil calon
│   │       ├── visi-misi/        # Edit visi & misi
│   │       ├── program/          # Kelola program
│   │       ├── timeline/         # Kelola timeline
│   │       ├── galeri/           # Upload/kelola galeri
│   │       ├── aspirasi/         # Moderasi aspirasi
│   │       └── apbdes/           # Input data APBDes
│   ├── components/
│   │   ├── layout/               # Navbar, Footer
│   │   ├── sections/             # Semua section homepage
│   │   ├── admin/                # Komponen admin panel
│   │   └── providers/            # Context providers
│   ├── lib/
│   │   ├── supabase/             # Client, server, middleware
│   │   └── utils.ts              # Utility functions
│   └── types/
│       └── database.ts           # TypeScript types
├── supabase/
│   └── schema.sql                # Database schema lengkap
├── .env.local                    # Environment variables (JANGAN di-commit)
├── .env.example                  # Template environment variables
├── vercel.json                   # Konfigurasi Vercel
└── tailwind.config.ts            # Konfigurasi Tailwind
```

---

## Cara Ganti Foto Calon

1. Login ke Admin Panel → **Profil**
2. Klik **"Upload Foto"**
3. Pilih foto resolusi tinggi (minimal 800x1000px)
4. Format: JPG, PNG, atau WebP
5. Klik **"Simpan"**

---

## Cara Update Data APBDes

> ⚠️ Gunakan hanya data dari dokumen APBDes resmi yang telah ditetapkan.

1. Login ke Admin Panel → **APBDes**
2. Isi tahun anggaran, total pendapatan, total belanja
3. Isi alokasi per kategori beserta persentasenya
4. Masukkan sumber data (contoh: "APBDes 2026, Desa X")
5. Klik **"Simpan"**

---

## Cara Moderasi Aspirasi

1. Login ke Admin Panel → **Aspirasi**
2. Filter berdasarkan status: **Pending**, **Ditinjau**, **Diarsipkan**
3. Baca isi aspirasi
4. Klik **"Tandai Ditinjau"** jika sudah dibaca
5. Toggle **"Publik/Privat"** untuk menampilkan aspirasi secara publik

> Aspirasi hanya ditampilkan di website jika status = "Ditinjau" DAN is_public = true.

---

## Catatan Penting

- Semua data yang ditampilkan harus berdasarkan fakta yang dapat diverifikasi
- Data APBDes wajib berasal dari dokumen resmi
- Jangan membuat testimoni, statistik, atau klaim fiktif
- Foto yang diupload harus dokumentasi asli

---

## Troubleshooting

**Build error: "NEXT_PUBLIC_SUPABASE_URL is not defined"**
→ Pastikan file `.env.local` sudah diisi dengan benar dan server di-restart.

**Login admin tidak bisa masuk**
→ Pastikan user sudah dibuat di Supabase Authentication → Users.

**Foto tidak tampil setelah upload**
→ Pastikan Storage bucket `photos` dan `gallery` sudah dibuat (otomatis via schema.sql). Cek juga di Supabase → Storage.

**Data tidak muncul di homepage**
→ Pastikan schema.sql sudah dijalankan dan seed data sudah masuk. Cek di Supabase → Table Editor.

---

## Lisensi

Project ini dibuat untuk keperluan kampanye kepala desa. Penggunaan, modifikasi, dan distribusi harus mematuhi ketentuan hukum dan aturan lokal yang berlaku terkait kampanye pemilihan kepala desa.
