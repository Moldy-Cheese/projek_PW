# Tugas 09 — Endpoint API, Keterhubungan Komponen, dan Uji Postman

## 1. Endpoint yang dibuat
**`GET /manga`** — menampilkan seluruh data manga dari database PostgreSQL
(juga mendukung filter `?judul=` dan `?genre=`). Endpoint CRUD lainnya (POST, PATCH, DELETE) ikut dibuat karena dipakai juga untuk Tugas 10.

## 2. Keterhubungan dan alur antar komponen

```
Client (Postman / React)
        │  HTTP GET /manga
        ▼
   main.ts  ── bootstrap aplikasi, aktifkan CORS & ValidationPipe
        ▼
  AppModule ── root module: mengimpor PrismaModule dan MangaModule
        ▼
MangaController ── menerima request, membaca @Query/@Param/@Body, memanggil service
        ▼
 MangaService ── logika bisnis (filter, cek data ada → 404, statistik)
        ▼
 PrismaService ── PrismaClient (provider yang di-inject), membuat query SQL
        ▼
PostgreSQL (tabel `manga`)
        ▲
        └── hasil dikembalikan berlapis ke atas sampai menjadi respons JSON
```

| Komponen | File | Peran |
|---|---|---|
| Module | `manga.module.ts` | Mengelompokkan controller + service fitur manga |
| Controller | `manga.controller.ts` | Mendefinisikan route (`GET /manga`, dst.) dan meneruskan ke service. Tidak berisi logika database |
| Service | `manga.service.ts` | Berisi logika bisnis dan memanggil `prisma.manga.findMany/create/update/delete/count` |
| DTO | `dto/create-manga.dto.ts` | Aturan validasi body request (`judul` wajib) |
| PrismaService | `prisma/prisma.service.ts` | Turunan `PrismaClient`; connect saat modul start, disconnect saat berhenti |
| PrismaModule | `prisma/prisma.module.ts` | Mengekspor `PrismaService` (global) agar bisa di-inject |
| Schema | `prisma/schema.prisma` | Definisi model `Manga` → dimigrasikan menjadi tabel `manga` |

**Dependency Injection:** `MangaController` meminta `MangaService` lewat constructor, dan `MangaService` meminta `PrismaService`. NestJS yang membuat dan menyambungkan semua objek itu sesuai daftar `providers` di tiap module, sehingga kita tidak memakai `new` sendiri.

**Mengapa controller tidak berubah saat pindah dari array ke Prisma?** Controller hanya memanggil `mangaService.findAll()`, `create()`, dst. Yang berubah hanya isi service (dari manipulasi array menjadi pemanggilan Prisma Client), jadi lapisan controller tetap sama.

## 3. Koneksi database
PostgreSQL lokal (Docker/instalasi sendiri). URL koneksi ada di `.env`:
```
DATABASE_URL="postgresql://postgres:password@localhost:5432/manga_db?schema=public"
```
Prisma membaca variabel ini di `datasource db` pada `schema.prisma`.

## 4. Uji lewat Postman (ambil SS tiap langkah)
Impor `postman/manga-api.postman_collection.json`, lalu jalankan:

1. **GET** `http://localhost:3000/manga` → status `200 OK`, array JSON manga
2. **POST** `http://localhost:3000/manga` (Body → raw → JSON) → status `201 Created`
3. **GET** `http://localhost:3000/manga/1` → `200 OK`
4. **PATCH** `http://localhost:3000/manga/1` → `200 OK`, data berubah
5. **DELETE** `http://localhost:3000/manga/1` → `200 OK`
6. **GET** `http://localhost:3000/manga/999` → `404 Not Found` (bukti penanganan error)
7. **POST** dengan `judul` kosong → `400 Bad Request` (bukti validasi DTO)

Jelaskan pada tiap SS: URL, method, body (bila ada), status code, dan isi respons.

## 5. Bukti terhubung ke database
Buka `npx prisma studio` atau pgAdmin, tampilkan tabel `manga` sebelum dan sesudah request POST/DELETE; datanya harus ikut berubah.
