# Manga Sheva — Backend (NestJS + PostgreSQL + Prisma)

**Nama proyek:** Manga Sheva (`pw_projek_103022400103`)
**Deskripsi:** Aplikasi koleksi daftar manga. Frontend memakai React + Vite (repo `manga-frontend`), backend ini menyediakan REST API CRUD manga yang datanya tersimpan permanen di PostgreSQL melalui Prisma ORM.

## Teknologi
NestJS 11 · Prisma 6 · PostgreSQL · class-validator

## Struktur
```
prisma/
  schema.prisma        # model Manga
  seed.ts              # data awal (3 manga)
src/
  main.ts              # bootstrap, CORS, ValidationPipe
  app.module.ts        # root module
  prisma/              # PrismaModule + PrismaService
  manga/               # MangaModule, Controller, Service, DTO
docs/
  TUGAS-09-alur-komponen.md
  screenshots/         # taruh SS di sini
postman/manga-api.postman_collection.json
```

## Cara menjalankan
```bash
npm install

# 1. Siapkan PostgreSQL (pilih salah satu)
docker compose up -d                 # via Docker, ATAU pakai PostgreSQL lokal / pgAdmin

# 2. Konfigurasi koneksi
cp .env.example .env                 # sesuaikan DATABASE_URL

# 3. Migrasi awal (membuat tabel `manga`) + generate Prisma Client
npx prisma migrate dev --name init

# 4. (opsional) isi data awal
npx prisma db seed

# 5. Jalankan server
npm run start:dev                    # http://localhost:3000
```
Lihat isi tabel: `npx prisma studio`.

## Endpoint
| Method | URL | Keterangan |
|---|---|---|
| GET | `/manga` | Semua manga. Filter opsional: `?judul=one&genre=petualangan` (**where**) |
| GET | `/manga/stats` | Statistik: total + jumlah per genre (**count/groupBy**) |
| GET | `/manga/:id` | Detail satu manga |
| POST | `/manga` | Tambah manga (`judul` wajib) |
| PATCH | `/manga/:id` | Ubah manga |
| DELETE | `/manga/:id` | Hapus manga |

Contoh body POST:
```json
{ "judul": "Berserk", "genre": "Fantasi", "image": "", "description": "Perjalanan Guts." }
```

## Frontend
Frontend (React + Vite) ada di repo terpisah `manga-frontend` dan memanggil API ini di `http://localhost:3000` (CORS sudah mengizinkan `http://localhost:5173`).

## Screenshot (taruh di `docs/screenshots/`)
1. PostgreSQL berjalan + database `manga_db` terbuat (pgAdmin / psql / Docker)
2. `schema.prisma`
3. Hasil `npx prisma migrate dev` + tabel `manga` di database
4. `PrismaService` dan `MangaService` (kode)
5. Postman: POST, GET, GET by id, PATCH, DELETE
6. Restart server → GET `/manga` → data masih ada (bukti permanen)
7. Postman: `GET /manga?judul=...` dan `GET /manga/stats`
8. Tampilan frontend **desktop** dan **mobile** (lihat README `manga-frontend`)

Setelah selesai: buat repo GitHub, `git init`, `git add .`, `git commit`, `git push`, lalu kumpulkan link repo lewat LMS.
