# AI Content Generator - Frontend

Antarmuka pengguna untuk aplikasi AI Content Generator, dibangun dengan Next.js 14 dan Tailwind CSS.

## Tech Stack

- **Next.js 14** - React framework dengan App Router
- **TypeScript** - type safety
- **Tailwind CSS** - styling
- **React Hook Form + Zod** - form handling & validasi
- **Axios** - HTTP client dengan interceptor auth

## Fitur

- Autentikasi (register & login) dengan token yang disimpan di cookie
- Generate konten AI: pilih tipe konten, topik, keywords, target audience, tone, dan bahasa
- Template bawaan untuk mempercepat proses generate
- Riwayat generasi dengan search, filter per tipe, dan pagination
- Halaman detail riwayat: preview konten, copy, download .txt, delete
- Responsif - mobile & desktop

## Cara Menjalankan Lokal

**Prasyarat:** Node.js 18+, backend API berjalan

```bash
# Install dependencies
npm install

# Copy env
cp .env.example .env.local

# Isi NEXT_PUBLIC_API_URL dengan URL backend
# Contoh: NEXT_PUBLIC_API_URL=http://localhost:8000/api

# Jalankan dev server
npm run dev
```

Buka `http://localhost:3000`

## Environment Variables

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

## Struktur Project

```
src/
├── app/
│   ├── (auth)/         # Login & register
│   └── (dashboard)/    # Dashboard, history, templates
├── components/
│   ├── layout/         # Sidebar
│   └── ui/             # Badge, spinner
├── hooks/              # useAuth
├── lib/                # Axios instance
├── types/              # TypeScript interfaces & constants
└── utils/              # Auth token, format helpers
```

## Deployment

Di-deploy ke Railway. Set environment variable `NEXT_PUBLIC_API_URL` ke URL backend production.
