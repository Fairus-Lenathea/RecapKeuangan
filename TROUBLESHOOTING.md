# 🐛 Troubleshooting - Solusi Masalah Umum

Panduan lengkap untuk mengatasi masalah yang mungkin terjadi.

---

## ❌ Masalah: PIN Tidak Bisa Diinput / Stuck

### Gejala:
- Input PIN tidak bisa diklik atau diketik
- Halaman stuck di login screen
- Console browser menunjukkan error JavaScript

### Penyebab:
- Duplikasi event listener di `app.js`
- File JavaScript corrupt atau ada syntax error
- Tailwind CSS CDN error

### Solusi:
✅ **Sudah diperbaiki!** File `app.js` sudah diupdate dengan:
1. Menghapus duplikasi `DOMContentLoaded` event listener
2. Menambahkan null checks untuk semua elemen DOM
3. Konsolidasi semua initialization code di satu tempat

### Cara Test:
1. Refresh browser (Ctrl + Shift + R)
2. Clear cache browser
3. Buka halaman lagi
4. Coba ketik di input PIN
5. Tekan Enter atau klik tombol Masuk

---

## ❌ Masalah: Alert "Harap setup Supabase terlebih dahulu"

### Gejala:
- Muncul alert saat membuka website
- Tidak bisa login meskipun PIN benar

### Penyebab:
- File `config.js` belum diisi dengan kredensial Supabase

### Solusi:
1. Buka file `config.js`
2. Ganti `YOUR_SUPABASE_URL_HERE` dengan URL Supabase Anda
3. Ganti `YOUR_SUPABASE_ANON_KEY_HERE` dengan anon key Supabase
4. Save file
5. Refresh browser

### Contoh:
```javascript
// SEBELUM (salah)
const SUPABASE_URL = 'YOUR_SUPABASE_URL_HERE';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY_HERE';

// SESUDAH (benar)
const SUPABASE_URL = 'https://abcdefgh.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
```

---

## ❌ Masalah: Data Tidak Tersimpan

### Gejala:
- Klik "Simpan" tapi data tidak muncul di rekap
- Error di Console: "Failed to fetch" atau "Network error"

### Penyebab & Solusi:

#### 1. Kredensial Supabase Salah
✅ Cek `config.js`:
- URL harus dimulai dengan `https://`
- Anon key harus lengkap (sangat panjang)
- Tidak ada spasi atau karakter tambahan

#### 2. Tabel Belum Dibuat
✅ Buka Supabase Dashboard:
- SQL Editor → Jalankan `setup.sql`
- Atau buat tabel manual sesuai `SETUP_SUPABASE.md`

#### 3. RLS Policies Belum Dibuat
✅ Buka Supabase Dashboard:
- Authentication → Policies
- Pastikan ada 3 policies: SELECT, INSERT, DELETE
- Semua policy harus `USING (true)` atau `WITH CHECK (true)`

#### 4. Koneksi Internet Mati
✅ Cek koneksi:
- Pastikan internet aktif
- Coba buka website lain
- Restart router jika perlu

---

## ❌ Masalah: PIN Salah Terus

### Gejala:
- Sudah masukkan PIN yang benar tapi tetap error
- Muncul pesan "PIN salah! Silakan coba lagi."

### Penyebab & Solusi:

#### 1. PIN Default Belum Diubah
✅ PIN default adalah `1234`
- Coba ketik: `1234`
- Jika masih salah, cek `config.js`

#### 2. PIN di Config Berbeda
✅ Buka `config.js`:
```javascript
const CORRECT_PIN = '1234'; // Cek PIN di sini
```

#### 3. Spasi atau Karakter Tersembunyi
✅ Pastikan tidak ada spasi:
- PIN harus 4 digit angka saja
- Tidak ada spasi sebelum/sesudah angka

---

## ❌ Masalah: Tampilan Berantakan / Tidak Muncul

### Gejala:
- Halaman putih polos
- CSS tidak load
- Tampilan tidak seperti yang diharapkan

### Penyebab & Solusi:

#### 1. File CSS Tidak Ditemukan
✅ Pastikan struktur folder benar:
```
Catatan Keuangan/
├── index.html
├── styles.css  ← Harus ada di folder yang sama
├── app.js
└── config.js
```

#### 2. Tailwind CDN Error
✅ Cek koneksi internet
✅ Coba ganti CDN di `index.html`:
```html
<!-- Dari -->
<script src="https://cdn.tailwindcss.com"></script>

<!-- Ke -->
<script src="https://unpkg.com/tailwindcss@3/dist/tailwind.min.js"></script>
```

#### 3. Browser Lama
✅ Gunakan browser modern:
- Chrome (recommended)
- Firefox
- Safari
- Edge

---

## ❌ Masalah: Error di Console Browser

### Cara Buka Console:
- **Windows**: Tekan `F12` atau `Ctrl + Shift + I`
- **Mac**: Tekan `Cmd + Option + I`

### Error Umum & Solusi:

#### 1. "checkIn is not defined"
✅ **Sudah diperbaiki!** Update file `app.js` ke versi terbaru

#### 2. "Cannot read property 'value' of null"
✅ **Sudah diperbaiki!** Sekarang ada null checks di semua elemen

#### 3. "Failed to create browser context"
✅ Ini error development environment, tidak mempengaruhi production

#### 4. "CORS error"
✅ Jika test lokal:
- Gunakan Live Server (VS Code extension)
- Atau Python HTTP Server: `python -m http.server 8000`
- Jangan double-click `index.html` langsung

---

## ❌ Masalah: Format Rupiah Tidak Muncul

### Gejala:
- Ketik angka tapi tidak ada titik pemisah ribuan
- Angka tetap polos: `10000` (bukan `10.000`)

### Penyebab & Solusi:

#### 1. JavaScript Belum Load
✅ Cek Console untuk error
✅ Pastikan `app.js` ada di folder yang sama

#### 2. Input Type Salah
✅ Pastikan di `index.html`:
```html
<input 
    type="text"  ← Harus "text" bukan "number"
    id="harga"
    inputmode="numeric"  ← Ini untuk keyboard HP
>
```

---

## ❌ Masalah: Total Pengeluaran Salah

### Gejala:
- Total tidak sesuai dengan jumlah data
- Total tetap Rp 0 meskipun ada data

### Penyebab & Solusi:

#### 1. Data Belum Di-load
✅ Klik tombol "🔄 Refresh" di tab Rekap

#### 2. Format Angka Salah di Database
✅ Cek di Supabase Table Editor:
- Kolom `harga` harus tipe `NUMERIC`
- Nilai harus angka, bukan text

---

## ❌ Masalah: Tidak Bisa Deploy

### Netlify:

#### Error: "Deploy failed"
✅ Pastikan semua file ada
✅ Jangan upload folder `.git` atau `node_modules`
✅ Upload hanya file HTML, CSS, JS

#### Error: "Page not found"
✅ Pastikan file utama bernama `index.html` (huruf kecil)

### Vercel:

#### Error: "Build failed"
✅ Vercel untuk static site tidak perlu build
✅ Pilih "Other" saat setup framework

---

## ❌ Masalah: Mobile - Tampilan Kecil

### Gejala:
- Font terlalu kecil di HP
- Tombol susah ditekan

### Solusi:

#### 1. Zoom Browser
✅ Pinch to zoom di HP
✅ Atau ubah zoom di browser settings

#### 2. Perbesar Font
✅ Edit `index.html`, cari class `text-lg` dan ubah ke `text-xl` atau `text-2xl`

#### 3. Perbesar Tombol
✅ Edit `index.html`, cari class `py-4` dan ubah ke `py-6`

---

## ❌ Masalah: Lupa PIN

### Solusi:

#### 1. Cek di Config
✅ Buka `config.js`:
```javascript
const CORRECT_PIN = '1234'; // PIN ada di sini
```

#### 2. Reset PIN
✅ Ubah PIN di `config.js`:
```javascript
const CORRECT_PIN = '5678'; // PIN baru
```
✅ Save dan refresh browser

---

## ❌ Masalah: Session Logout Sendiri

### Gejala:
- Sudah login tapi tiba-tiba kembali ke halaman PIN
- Harus login ulang terus

### Penyebab:
- Session storage dihapus saat browser ditutup (ini normal)
- Browser di-clear cache/data

### Solusi:
✅ Ini adalah fitur keamanan, bukan bug
✅ Jika ingin tetap login:
- Jangan tutup browser
- Atau ubah `sessionStorage` ke `localStorage` di `app.js` (kurang aman)

---

## 🔧 Debugging Tools

### 1. Console Browser
```
F12 → Console tab
```
Lihat error messages di sini

### 2. Network Tab
```
F12 → Network tab
```
Lihat request ke Supabase

### 3. Application Tab
```
F12 → Application → Session Storage
```
Lihat status login

### 4. Supabase Dashboard
```
Supabase → Table Editor → pengeluaran
```
Lihat data yang tersimpan

---

## 📞 Masih Bermasalah?

### Langkah Debugging:

1. **Clear Everything**
   - Clear browser cache (Ctrl + Shift + Delete)
   - Clear session storage (F12 → Application → Clear)
   - Restart browser

2. **Test di Browser Lain**
   - Coba buka di Chrome
   - Coba buka di Firefox
   - Coba buka di HP

3. **Cek File Integrity**
   - Pastikan semua 14 file ada
   - Cek ukuran file tidak 0 bytes
   - Cek tidak ada file corrupt

4. **Fresh Start**
   - Download ulang project
   - Setup Supabase dari awal
   - Isi `config.js` lagi

5. **Screenshot Error**
   - Screenshot halaman yang error
   - Screenshot Console browser (F12)
   - Screenshot Supabase dashboard

---

## ✅ Checklist Debugging

Sebelum minta bantuan, pastikan sudah:

- [ ] Clear browser cache
- [ ] Refresh halaman (Ctrl + Shift + R)
- [ ] Cek Console browser untuk error
- [ ] Cek `config.js` sudah diisi
- [ ] Cek koneksi internet
- [ ] Cek Supabase dashboard (tabel & policies)
- [ ] Test di browser lain
- [ ] Test di HP
- [ ] Baca dokumentasi (`README.md`, `SETUP_SUPABASE.md`)

---

**Semoga masalah Anda teratasi! 🎉**

Jika masih ada masalah, screenshot error dan cek dokumentasi lengkap di folder project.
