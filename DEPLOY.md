# 🚀 Panduan Deploy Website ke Internet

Setelah website selesai dibuat, Anda bisa deploy (publish) ke internet agar bisa diakses dari mana saja. Berikut 3 cara termudah dan **GRATIS**:

## 📌 Persiapan Sebelum Deploy

1. ✅ Pastikan Supabase sudah di-setup dengan benar
2. ✅ Pastikan `config.js` sudah diisi dengan kredensial Supabase
3. ✅ Test website di local terlebih dahulu
4. ✅ Pastikan semua file ada: `index.html`, `styles.css`, `app.js`, `config.js`

---

## 🟢 Opsi 1: Netlify (Paling Mudah - Recommended)

### Kelebihan:
- ✅ Gratis selamanya
- ✅ Otomatis HTTPS
- ✅ Drag & drop, tidak perlu coding
- ✅ Custom domain gratis
- ✅ Deploy dalam 30 detik

### Langkah-langkah:

1. **Buat Akun**
   - Buka https://netlify.com
   - Klik **Sign Up**
   - Login dengan GitHub atau Email

2. **Deploy Website**
   - Setelah login, klik **Add new site** > **Deploy manually**
   - **Drag & drop** folder project Anda ke area yang disediakan
   - Tunggu 10-30 detik
   - Website langsung online! 🎉

3. **Dapatkan URL**
   - Netlify akan memberikan URL random: `https://random-name-123.netlify.app`
   - Klik **Site settings** > **Change site name** untuk ubah nama
   - Contoh: `https://buku-kas-mama.netlify.app`

4. **Update Website**
   - Jika ada perubahan, tinggal drag & drop folder lagi
   - Netlify otomatis update

### Custom Domain (Opsional):
- Klik **Domain settings** > **Add custom domain**
- Beli domain atau gunakan domain yang sudah ada
- Follow instruksi untuk setting DNS

---

## 🔵 Opsi 2: Vercel (Cepat & Modern)

### Kelebihan:
- ✅ Gratis selamanya
- ✅ Performa super cepat
- ✅ Otomatis HTTPS
- ✅ Analytics gratis

### Langkah-langkah:

1. **Buat Akun**
   - Buka https://vercel.com
   - Klik **Sign Up**
   - Login dengan GitHub (recommended)

2. **Deploy Website**
   - Klik **Add New** > **Project**
   - Pilih **Import Git Repository** atau **Deploy from CLI**
   - Jika pakai GitHub:
     - Upload folder ke GitHub repository
     - Import repository di Vercel
     - Klik **Deploy**
   - Jika manual:
     - Install Vercel CLI: `npm i -g vercel`
     - Di folder project, jalankan: `vercel`
     - Follow instruksi

3. **Dapatkan URL**
   - Vercel memberikan URL: `https://project-name.vercel.app`
   - Bisa custom di settings

---

## 🟣 Opsi 3: GitHub Pages (Untuk yang Sudah Pakai Git)

### Kelebihan:
- ✅ Gratis selamanya
- ✅ Terintegrasi dengan GitHub
- ✅ Otomatis HTTPS

### Langkah-langkah:

1. **Buat Repository GitHub**
   - Login ke https://github.com
   - Klik **New repository**
   - Nama: `buku-kas-harian`
   - Public
   - Klik **Create repository**

2. **Upload Files**
   - Di repository, klik **Add file** > **Upload files**
   - Drag semua file project
   - Klik **Commit changes**

3. **Aktifkan GitHub Pages**
   - Klik **Settings** (di repository)
   - Scroll ke **Pages**
   - Source: **Deploy from a branch**
   - Branch: **main** atau **master**
   - Folder: **/ (root)**
   - Klik **Save**

4. **Dapatkan URL**
   - Tunggu 1-2 menit
   - URL: `https://username.github.io/buku-kas-harian`

---

## 🔴 Opsi 4: Firebase Hosting (Advanced)

### Kelebihan:
- ✅ Gratis (10GB storage, 360MB/day transfer)
- ✅ CDN global
- ✅ Otomatis HTTPS

### Langkah-langkah:

1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login**
   ```bash
   firebase login
   ```

3. **Init Project**
   ```bash
   firebase init hosting
   ```
   - Pilih **Create new project** atau pilih existing
   - Public directory: `.` (current directory)
   - Single-page app: **No**
   - GitHub auto-deploy: **No**

4. **Deploy**
   ```bash
   firebase deploy
   ```

5. **URL**: `https://project-name.web.app`

---

## 📱 Test Setelah Deploy

1. **Buka URL di HP**
   - Pastikan tampilan responsive
   - Test login dengan PIN
   - Test tambah pengeluaran
   - Test lihat rekap

2. **Cek HTTPS**
   - Pastikan URL menggunakan `https://` (bukan `http://`)
   - Ini penting untuk keamanan

3. **Share ke Orang Tua**
   - Kirim URL via WhatsApp
   - Ajari cara login dan input data
   - Bookmark di browser HP mereka

---

## 🔒 Keamanan Setelah Deploy

### ⚠️ PENTING: Jangan Commit config.js ke Git!

Jika Anda menggunakan Git/GitHub:

1. **Pastikan `.gitignore` ada**
   - File `.gitignore` sudah dibuat di project
   - Pastikan `config.js` ada di dalamnya

2. **Gunakan Environment Variables** (Advanced)
   - Untuk Netlify/Vercel, bisa pakai Environment Variables
   - Buat file `config.js` yang membaca dari env:
   
   ```javascript
   const SUPABASE_URL = process.env.SUPABASE_URL || 'YOUR_URL';
   const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || 'YOUR_KEY';
   ```

3. **Set di Platform**
   - Netlify: Site settings > Environment variables
   - Vercel: Project settings > Environment Variables
   - Tambahkan:
     - `SUPABASE_URL` = your URL
     - `SUPABASE_ANON_KEY` = your key

---

## 🎯 Rekomendasi

| Platform | Kemudahan | Kecepatan | Fitur | Recommended |
|----------|-----------|-----------|-------|-------------|
| **Netlify** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ✅ **TERBAIK untuk pemula** |
| **Vercel** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ✅ Bagus untuk developer |
| **GitHub Pages** | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ | ✅ Jika sudah pakai Git |
| **Firebase** | ⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Advanced users |

### Pilihan Saya: **Netlify** 🏆

Paling mudah, cepat, dan tidak perlu setup ribet!

---

## 🐛 Troubleshooting

### Website tidak bisa dibuka
- ✅ Tunggu 1-5 menit setelah deploy
- ✅ Clear cache browser (Ctrl+Shift+R)
- ✅ Coba buka di incognito mode

### Data tidak tersimpan setelah deploy
- ✅ Cek Console browser (F12) untuk error
- ✅ Pastikan `config.js` sudah di-upload
- ✅ Pastikan kredensial Supabase benar

### Error "Failed to fetch"
- ✅ Pastikan Supabase project masih aktif
- ✅ Cek RLS policies di Supabase
- ✅ Cek koneksi internet

### Website lambat
- ✅ Gunakan CDN (Netlify/Vercel otomatis)
- ✅ Compress images jika ada
- ✅ Pilih region server terdekat

---

## 📞 Bantuan

- **Netlify Docs**: https://docs.netlify.com
- **Vercel Docs**: https://vercel.com/docs
- **GitHub Pages**: https://pages.github.com
- **Firebase Hosting**: https://firebase.google.com/docs/hosting

---

**Selamat! Website Anda sekarang bisa diakses dari mana saja! 🎉**

Share URL ke orang tua dan ajari mereka cara menggunakannya.
