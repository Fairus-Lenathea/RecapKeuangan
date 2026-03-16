# 💰 Buku Kas Harian - Aplikasi Catatan Keuangan Sederhana

Aplikasi web sederhana untuk mencatat pengeluaran harian, dirancang khusus untuk orang tua dengan antarmuka yang mudah digunakan.

---

## 🚀 Quick Start (5 Menit)

### 1. Setup Supabase

#### a. Buat Akun & Project
1. Buka https://supabase.com dan daftar (gratis)
2. Klik "New Project"
3. Isi nama project, database password, region
4. Tunggu project selesai dibuat (~2 menit)

#### b. Buat Tabel Database
1. Buka **SQL Editor** di sidebar
2. Copy-paste script dari file `setup.sql`
3. Klik "Run" atau tekan `Ctrl+Enter`
4. Tabel `pengeluaran` akan dibuat otomatis

#### c. Dapatkan Kredensial
1. Buka **Settings** → **API**
2. Copy **Project URL** (contoh: `https://xxx.supabase.co`)
3. Copy **anon/public key** (string panjang dimulai dengan `eyJ...`)

### 2. Konfigurasi Aplikasi

1. Buka file `config.js`
2. Ganti `SUPABASE_URL` dengan Project URL Anda
3. Ganti `SUPABASE_ANON_KEY` dengan anon key Anda
4. (Opsional) Ubah `CORRECT_PIN` sesuai keinginan (default: `0909`)

```javascript
const SUPABASE_URL = 'https://your-project.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
const CORRECT_PIN = '0909'; // Ubah sesuai keinginan
```

5. **Save** file `config.js`

### 3. Jalankan Aplikasi

#### **Opsi A: Buka Langsung (Untuk Test)**
- Double-click file `index.html`
- Login dengan PIN (default: `0909`)

#### **Opsi B: Deploy ke Internet (Recommended)**

**Netlify (Paling Mudah):**
1. Buka https://netlify.com
2. Drag & drop folder project ke Netlify
3. Selesai! Dapat URL seperti `https://your-app.netlify.app`

**Vercel:**
1. Buka https://vercel.com
2. Import project dari folder
3. Deploy
4. Selesai!

**GitHub Pages:**
1. Upload folder ke GitHub repository
2. Settings → Pages → Enable
3. Akses via `https://username.github.io/repo-name`

---

## 📁 Struktur File

```
Catatan Keuangan/
├── index.html              # Halaman utama (BUKA INI!)
├── app.js                  # Logic aplikasi
├── styles.css              # Custom styling
├── config.js               # Konfigurasi (ISI INI!)
├── config.example.js       # Template config
├── setup.sql               # SQL untuk buat tabel
├── start-server.ps1        # Script untuk testing lokal
├── .gitignore              # Git ignore
├── README.md               # Dokumentasi ini
├── QUICKSTART.md           # Panduan cepat
├── SETUP_SUPABASE.md       # Panduan detail Supabase
├── DEPLOY.md               # Panduan deploy
├── TESTING.md              # Panduan testing (BARU!)
├── TROUBLESHOOTING.md      # Solusi masalah
├── PANDUAN_PENGGUNA.md     # Panduan untuk orang tua
├── CUSTOMIZATION.md        # Cara kustomisasi
├── CHECKLIST.md            # Checklist setup
└── .agent/
    └── workflows/
        └── test-web.md     # Workflow testing (BARU!)
```

---

## ✨ Fitur

- ✅ **Login dengan PIN** - Keamanan sederhana dengan PIN 4 digit
- ✅ **Input Cepat** - Form sederhana: tanggal, keterangan, jumlah
- ✅ **Format Rupiah Otomatis** - Angka otomatis diformat (10000 → 10.000)
- ✅ **Riwayat Transaksi** - Lihat semua pengeluaran yang sudah dicatat
- ✅ **Total Otomatis** - Hitung total pengeluaran secara otomatis
- ✅ **Hapus Data** - Hapus transaksi yang salah input
- ✅ **Desain Mobile-First** - Optimal untuk HP
- ✅ **Font Besar** - Mudah dibaca untuk orang tua
- ✅ **Offline-Ready** - Data tersimpan di cloud Supabase

---

## 🎯 Cara Pakai

### Login
1. Buka aplikasi
2. Masukkan PIN (default: `0909`)
3. Klik "Masuk" atau tekan Enter

### Tambah Pengeluaran
1. Pilih tanggal (default: hari ini)
2. Isi keterangan (contoh: "Beli Beras")
3. Isi jumlah (contoh: 50000)
4. Klik "💾 Simpan"

### Lihat Riwayat
1. Klik tab "📋 Rekap"
2. Lihat semua transaksi
3. Total otomatis dihitung di atas

### Hapus Data
1. Di tab Rekap, klik tombol "🗑️ Hapus" pada transaksi
2. Konfirmasi hapus
3. Data terhapus

---

## 🧪 Testing Aplikasi

### Testing Lokal (Untuk Developer)

**Metode 1: Menggunakan Script (Tercepat)**
```powershell
.\start-server.ps1
```

**Metode 2: Menggunakan Antigravity**
```
/test-web
```

**Metode 3: Manual**
```powershell
# Install http-server (sekali saja)
npm install -g http-server

# Jalankan server
http-server -p 8080 -o
```

Aplikasi akan terbuka di **http://localhost:8080**

📖 **Panduan Testing Lengkap**: Baca `TESTING.md` untuk skenario testing detail

---

## ⚠️ Troubleshooting

### Masalah: "Harap setup Supabase terlebih dahulu"
**Solusi:** Buka `config.js` dan isi kredensial Supabase Anda

### Masalah: PIN salah terus
**Solusi:** Cek PIN di `config.js` baris 13

### Masalah: Data tidak tersimpan
**Solusi:** 
1. Cek koneksi internet
2. Pastikan tabel sudah dibuat di Supabase
3. Cek Console browser (F12) untuk error

### Masalah: Error di Console
**Solusi:** Baca file `TROUBLESHOOTING.md` untuk solusi lengkap

---

## 🔒 Keamanan

- **PIN Login**: Proteksi sederhana dengan PIN 4 digit
- **Session Storage**: PIN tersimpan selama browser terbuka
- **RLS (Row Level Security)**: Keamanan di level database
- **HTTPS**: Gunakan HTTPS saat deploy (otomatis di Netlify/Vercel)

**Catatan:** Aplikasi ini untuk penggunaan personal/keluarga. Untuk keamanan lebih tinggi, pertimbangkan menambahkan autentikasi email/password.

---

## 🎨 Kustomisasi

Baca file `CUSTOMIZATION.md` untuk panduan:
- Ubah warna
- Ubah font
- Tambah fitur
- Ubah tampilan

---

## 📞 Support

Jika ada masalah:
1. Baca `TROUBLESHOOTING.md`
2. Cek Console browser (F12)
3. Lihat dokumentasi Supabase: https://supabase.com/docs

---

## 📄 Lisensi

Free to use untuk personal/keluarga.

---

## 🙏 Credits

- **Supabase** - Database & Backend
- **Tailwind CSS** - Styling framework
- **Google Fonts (Inter)** - Typography

---

**Selamat menggunakan! 🎉**

Jika ada pertanyaan, baca dokumentasi di folder project.
