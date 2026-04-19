# SalesCraft AI - Frontend

Antarmuka pengguna untuk SalesCraft AI — generator sales page berbasis AI, dibangun dengan Next.js dan Tailwind CSS.

## Tech Stack

- **Next.js 16** - React framework dengan App Router
- **TypeScript** - type safety
- **Tailwind CSS** - styling
- **React Hook Form + Zod** - form handling & validasi
- **Axios** - HTTP client dengan interceptor auth

## Fitur

- Autentikasi (register & login) dengan token yang disimpan di cookie
- Generate sales page AI: isi nama produk, deskripsi, fitur, target audience, harga, USP, dan pilih style template
- 3 template tampilan: **Modern** (dark luxury), **Minimal** (clean Apple/Stripe style), **Bold** (direct response AppSumo style)
- Switch template tanpa re-generate — data JSON di-render ulang client-side
- Copy HTML, Full Preview, Download .html langsung dari hasil generate
- Riwayat generasi dengan search dan pagination
- Halaman detail riwayat: preview, switch template, copy/download/delete
- Custom delete modal (bukan browser confirm)
- Responsif — mobile & desktop

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
│   ├── (auth)/           # Login & register
│   └── (dashboard)/      # Dashboard, history, templates
├── components/
│   ├── layout/           # Sidebar
│   ├── templates/        # ModernTemplate, MinimalTemplate, BoldTemplate
│   └── ui/               # Badge, DeleteModal
├── hooks/                # useAuth
├── lib/                  # Axios instance
├── types/                # TypeScript interfaces & constants
└── utils/                # Auth token, format helpers
```

## Deployment

Di-deploy ke Railway. Set environment variable `NEXT_PUBLIC_API_URL` ke URL backend production.
