# 📒 Buku Kontak

Aplikasi sederhana untuk menyimpan dan mengelola daftar kontak. Dibuat sebagai tugas kuliah mata kuliah Pemrograman Web.

## 🧩 Fitur

- Tambah kontak (nama, telepon, email)
- Lihat semua kontak
- Edit kontak
- Hapus kontak

## 🛠️ Teknologi

- Backend: Python Flask (REST API)
- Frontend: HTML, CSS (Tailwind), JavaScript

## 📡 API Endpoint

| Method | Endpoint              | Deskripsi                |
|--------|-----------------------|--------------------------|
| GET    | `/contacts`           | Menampilkan semua kontak |
| POST   | `/contacts`           | Menambahkan kontak baru  |
| PUT    | `/contacts/<id>`      | Mengedit kontak berdasarkan ID |
| DELETE | `/contacts/<id>`      | Menghapus kontak berdasarkan ID |

## 📌 Catatan

- Dibuat untuk tugas kuliah.
- Data disimpan sementara di memori (belum menggunakan database).
