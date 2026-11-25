# Manga Sheva — Frontend (React + Vite)

**Nama proyek:** Manga Sheva (`pw_projek_103022400103`)
**Deskripsi:** Aplikasi web koleksi daftar manga: cari, tambah, ubah, dan hapus manga. Frontend ini memanggil REST API backend (repo `manga-backend`, NestJS + PostgreSQL + Prisma), sehingga data tersimpan permanen.

## Teknologi
React 19 · Vite · react-router-dom

## Menjalankan
```bash
npm install
cp .env.example .env      # isi VITE_API_URL sesuai alamat backend
npm run dev               # http://localhost:5173
```
**Backend harus sudah berjalan** (default `http://localhost:3000`), lihat README repo `manga-backend`.

## Struktur singkat
```
src/
  api/mangaApi.js     # fungsi fetch ke REST API
  App.jsx             # state daftar manga + load/tambah/ubah/hapus via API
  pages/              # Homepage, Tambahpage, UpdatePage
  components/         # Header, SearchBar, TabelManga, BarisManga, FormManga
```

## Screenshot
Simpan di `docs/screenshots/`: tampilan **desktop** dan **mobile** (DevTools → toggle device toolbar) untuk halaman daftar, tambah, dan update.
