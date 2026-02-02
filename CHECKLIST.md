# ✅ Checklist Setup & Deployment

Gunakan checklist ini untuk memastikan semua langkah sudah dilakukan dengan benar.

---

## 📋 Fase 1: Persiapan Awal

- [ ] **Download/Clone Project**
  - Semua file sudah ada di folder `Catatan Keuangan`
  - File yang harus ada:
    - [ ] `index.html`
    - [ ] `styles.css`
    - [ ] `app.js`
    - [ ] `config.js`
    - [ ] `README.md`
    - [ ] `SETUP_SUPABASE.md`
    - [ ] `DEPLOY.md`
    - [ ] `PANDUAN_PENGGUNA.md`

---

## 🗄️ Fase 2: Setup Supabase

### 2.1 Buat Akun & Project
- [ ] Buat akun di https://supabase.com
- [ ] Verifikasi email
- [ ] Buat project baru dengan nama "Buku Kas Harian"
- [ ] Pilih region: Southeast Asia (Singapore)
- [ ] Pilih plan: Free
- [ ] Tunggu project selesai dibuat (1-2 menit)

### 2.2 Buat Tabel Database
- [ ] Buka SQL Editor
- [ ] Jalankan SQL untuk create table:
  ```sql
  CREATE TABLE pengeluaran (
    id BIGSERIAL PRIMARY KEY,
    tanggal DATE NOT NULL DEFAULT CURRENT_DATE,
    nama_item TEXT NOT NULL,
    harga NUMERIC NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
  );
  ```
- [ ] Verifikasi tabel sudah dibuat di Table Editor

### 2.3 Setup Row Level Security (RLS)
- [ ] Enable RLS pada tabel `pengeluaran`
- [ ] Buat policy untuk SELECT (read)
- [ ] Buat policy untuk INSERT (create)
- [ ] Buat policy untuk DELETE (delete)
- [ ] Verifikasi 3 policies sudah aktif

### 2.4 Ambil API Credentials
- [ ] Buka Settings > API
- [ ] Copy **Project URL**
- [ ] Copy **anon public key**

---

## ⚙️ Fase 3: Konfigurasi Website

- [ ] Buka file `config.js`
- [ ] Paste **SUPABASE_URL** (ganti `YOUR_SUPABASE_URL_HERE`)
- [ ] Paste **SUPABASE_ANON_KEY** (ganti `YOUR_SUPABASE_ANON_KEY_HERE`)
- [ ] (Opsional) Ubah PIN default dari `1234` ke PIN pilihan Anda
- [ ] Save file `config.js`

---

## 🧪 Fase 4: Testing Lokal

### 4.1 Buka Website
- [ ] Double-click `index.html` ATAU
- [ ] Gunakan Live Server (VS Code) ATAU
- [ ] Gunakan Python HTTP Server: `python -m http.server 8000`

### 4.2 Test Login
- [ ] Halaman login muncul dengan baik
- [ ] Input PIN: `1234` (atau PIN yang Anda set)
- [ ] Klik tombol "Masuk"
- [ ] Berhasil masuk ke dashboard

### 4.3 Test Input Data
- [ ] Tab "➕ Input Baru" aktif
- [ ] Tanggal otomatis hari ini
- [ ] Isi keterangan: "Test Beli Beras"
- [ ] Isi jumlah: `50000` (otomatis jadi `50.000`)
- [ ] Klik "💾 Simpan"
- [ ] Muncul pesan "✅ Data berhasil disimpan!"

### 4.4 Test Rekap
- [ ] Klik tab "📋 Rekap"
- [ ] Data yang baru diinput muncul
- [ ] Total pengeluaran di header bertambah
- [ ] Format tanggal benar (hari, tanggal bulan tahun)
- [ ] Format rupiah benar (Rp 50.000)

### 4.5 Test Delete
- [ ] Klik tombol "🗑️ Hapus" pada data test
- [ ] Muncul konfirmasi
- [ ] Klik "OK"
- [ ] Data terhapus
- [ ] Total pengeluaran berkurang

### 4.6 Test Logout
- [ ] Klik tombol "Keluar"
- [ ] Muncul konfirmasi
- [ ] Klik "OK"
- [ ] Kembali ke halaman login

### 4.7 Verifikasi di Supabase
- [ ] Buka Supabase > Table Editor > pengeluaran
- [ ] Data yang diinput muncul di tabel
- [ ] Data yang dihapus tidak ada di tabel

---

## 🚀 Fase 5: Deployment

### Pilih salah satu platform:

#### Opsi A: Netlify (Recommended)
- [ ] Buat akun di https://netlify.com
- [ ] Klik "Add new site" > "Deploy manually"
- [ ] Drag & drop folder project
- [ ] Tunggu deployment selesai
- [ ] Copy URL: `https://xxxxx.netlify.app`
- [ ] (Opsional) Ubah site name di settings

#### Opsi B: Vercel
- [ ] Buat akun di https://vercel.com
- [ ] Klik "Add New" > "Project"
- [ ] Upload project atau connect GitHub
- [ ] Deploy
- [ ] Copy URL: `https://xxxxx.vercel.app`

#### Opsi C: GitHub Pages
- [ ] Upload project ke GitHub repository
- [ ] Enable GitHub Pages di Settings
- [ ] Copy URL: `https://username.github.io/repo-name`

---

## 📱 Fase 6: Testing di Production

### 6.1 Test di Desktop
- [ ] Buka URL production di browser desktop
- [ ] Test login
- [ ] Test input data
- [ ] Test rekap
- [ ] Test delete
- [ ] Test logout

### 6.2 Test di Mobile
- [ ] Buka URL di HP (Chrome/Safari)
- [ ] Tampilan responsive (tidak ada scroll horizontal)
- [ ] Tombol mudah ditekan dengan jempol
- [ ] Font cukup besar untuk dibaca
- [ ] Test semua fitur (login, input, rekap, delete, logout)

### 6.3 Test Koneksi
- [ ] Test dengan WiFi
- [ ] Test dengan data seluler
- [ ] Pastikan data tersimpan dengan baik

---

## 📚 Fase 7: Dokumentasi & Handover

- [ ] Simpan kredensial Supabase di tempat aman
- [ ] Catat PIN yang digunakan
- [ ] Catat URL production
- [ ] Bookmark URL di browser HP orang tua
- [ ] Print atau kirim `PANDUAN_PENGGUNA.md` ke orang tua
- [ ] Ajari orang tua cara menggunakan (demo langsung)

---

## 🔒 Fase 8: Keamanan

- [ ] Pastikan `config.js` tidak di-commit ke Git (cek `.gitignore`)
- [ ] Ubah PIN default dari `1234`
- [ ] Jangan share kredensial Supabase ke publik
- [ ] Pastikan website menggunakan HTTPS (otomatis di Netlify/Vercel)
- [ ] Backup database secara berkala

---

## 🎯 Fase 9: Monitoring & Maintenance

### Minggu Pertama:
- [ ] Cek apakah orang tua bisa login
- [ ] Cek apakah data tersimpan dengan baik
- [ ] Tanya feedback tentang kemudahan penggunaan
- [ ] Fix bugs jika ada

### Bulanan:
- [ ] Cek Supabase dashboard untuk usage
- [ ] Pastikan tidak melebihi free tier limit
- [ ] Backup data dari Supabase
- [ ] Update dokumentasi jika ada perubahan

---

## ✅ Final Checklist

Sebelum diserahkan ke orang tua:

- [ ] ✅ Website bisa diakses dari URL production
- [ ] ✅ Login dengan PIN berfungsi
- [ ] ✅ Input data berfungsi dan tersimpan
- [ ] ✅ Rekap menampilkan data dengan benar
- [ ] ✅ Delete berfungsi
- [ ] ✅ Total pengeluaran dihitung dengan benar
- [ ] ✅ Format rupiah benar (dengan titik pemisah)
- [ ] ✅ Tampilan mobile-friendly
- [ ] ✅ Font cukup besar untuk dibaca
- [ ] ✅ Tombol mudah ditekan
- [ ] ✅ URL sudah di-bookmark di HP orang tua
- [ ] ✅ Panduan penggunaan sudah diberikan
- [ ] ✅ Sudah demo langsung ke orang tua

---

## 🐛 Troubleshooting Checklist

Jika ada masalah, cek:

- [ ] Koneksi internet aktif
- [ ] Kredensial Supabase benar
- [ ] RLS policies sudah dibuat
- [ ] Tabel `pengeluaran` sudah ada
- [ ] Browser sudah di-refresh (Ctrl+Shift+R)
- [ ] Console browser tidak ada error (F12)
- [ ] Supabase project masih aktif

---

## 📞 Support

Jika ada yang tidak beres:

1. [ ] Cek dokumentasi: `README.md`, `SETUP_SUPABASE.md`, `DEPLOY.md`
2. [ ] Cek Console browser (F12) untuk error messages
3. [ ] Cek Supabase dashboard untuk logs
4. [ ] Screenshot error dan cari solusi

---

**Selamat! Jika semua checklist sudah ✅, website siap digunakan! 🎉**
