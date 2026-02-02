# ⚡ Quick Start - Mulai Cepat

Panduan singkat untuk langsung memulai dalam 5 menit!

---

## 🎯 Langkah Cepat (5 Menit)

### 1️⃣ Setup Supabase (2 menit)

1. Buka https://supabase.com → Sign Up
2. Buat project baru → Pilih region Singapore → Free plan
3. Buka **SQL Editor** → Jalankan:
   ```sql
   CREATE TABLE pengeluaran (
     id BIGSERIAL PRIMARY KEY,
     tanggal DATE NOT NULL DEFAULT CURRENT_DATE,
     nama_item TEXT NOT NULL,
     harga NUMERIC NOT NULL,
     created_at TIMESTAMPTZ DEFAULT NOW()
   );
   
   ALTER TABLE pengeluaran ENABLE ROW LEVEL SECURITY;
   
   CREATE POLICY "Enable read access for all users" 
   ON pengeluaran FOR SELECT USING (true);
   
   CREATE POLICY "Enable insert for all users" 
   ON pengeluaran FOR INSERT WITH CHECK (true);
   
   CREATE POLICY "Enable delete for all users" 
   ON pengeluaran FOR DELETE USING (true);
   ```
4. Buka **Settings** > **API** → Copy **URL** dan **anon key**

### 2️⃣ Konfigurasi (1 menit)

1. Buka file `config.js`
2. Paste kredensial:
   ```javascript
   const SUPABASE_URL = 'paste-url-disini';
   const SUPABASE_ANON_KEY = 'paste-key-disini';
   ```
3. Save!

### 3️⃣ Test Lokal (1 menit)

1. Double-click `index.html`
2. Login dengan PIN: `1234`
3. Tambah data test
4. Cek di Supabase → Data muncul? ✅ Berhasil!

### 4️⃣ Deploy (1 menit)

1. Buka https://netlify.com → Sign Up
2. Drag & drop folder project
3. Copy URL → Share ke orang tua! 🎉

---

## 📁 Struktur File

```
Catatan Keuangan/
├── index.html          ← File utama (buka ini)
├── styles.css          ← Styling
├── app.js              ← Logic aplikasi
├── config.js           ← ⚠️ ISI INI DULU!
├── config.example.js   ← Template config
├── .gitignore          ← Git ignore
│
├── README.md           ← Dokumentasi lengkap
├── SETUP_SUPABASE.md   ← Panduan setup database
├── DEPLOY.md           ← Panduan deploy
├── PANDUAN_PENGGUNA.md ← Panduan untuk orang tua
├── CHECKLIST.md        ← Checklist lengkap
└── CUSTOMIZATION.md    ← Panduan kustomisasi
```

---

## 🔑 Default Credentials

- **PIN**: `1234`
- **Supabase**: Harus diisi di `config.js`

---

## ✨ Fitur Utama

✅ Login dengan PIN  
✅ Input pengeluaran cepat  
✅ Auto-format Rupiah (10000 → 10.000)  
✅ Rekap dengan total otomatis  
✅ Hapus data  
✅ Mobile-friendly  
✅ Real-time database  

---

## 🎨 Preview

### Login Screen
- PIN input besar
- Gradient background biru-hijau
- Glassmorphism effect

### Dashboard
- Header dengan total pengeluaran
- Tab: Input Baru & Rekap
- Form input sederhana
- List transaksi dengan tanggal

---

## 📱 Cara Pakai (Untuk Orang Tua)

1. **Buka website** → Masukkan PIN `1234`
2. **Tab Input Baru** → Isi tanggal, keterangan, jumlah → Simpan
3. **Tab Rekap** → Lihat semua pengeluaran & total
4. **Hapus** → Klik tombol 🗑️ Hapus

Detail lengkap: Baca `PANDUAN_PENGGUNA.md`

---

## 🚨 Troubleshooting Cepat

| Masalah | Solusi |
|---------|--------|
| Data tidak tersimpan | Cek `config.js` sudah diisi? |
| Error saat login | PIN salah? Default: `1234` |
| Website tidak bisa dibuka | Cek koneksi internet |
| Tampilan berantakan | Gunakan browser modern (Chrome/Safari) |

---

## 📚 Dokumentasi Lengkap

- **Setup Database**: Baca `SETUP_SUPABASE.md`
- **Deploy ke Internet**: Baca `DEPLOY.md`
- **Panduan Lengkap**: Baca `README.md`
- **Checklist**: Baca `CHECKLIST.md`
- **Kustomisasi**: Baca `CUSTOMIZATION.md`

---

## 🎯 Next Steps

Setelah setup selesai:

1. ✅ Ubah PIN default di `config.js`
2. ✅ Deploy ke Netlify/Vercel
3. ✅ Bookmark URL di HP orang tua
4. ✅ Ajari cara pakai
5. ✅ Monitor usage minggu pertama

---

## 💡 Tips

- 🔒 **Keamanan**: Jangan share kredensial Supabase
- 📱 **Mobile**: Test di HP sebelum diserahkan
- 📊 **Backup**: Export data dari Supabase secara berkala
- 🎨 **Kustomisasi**: Ubah warna/font sesuai selera

---

## 📞 Butuh Bantuan?

1. Cek dokumentasi di folder ini
2. Cek Console browser (F12) untuk error
3. Cek Supabase dashboard untuk logs

---

**Selamat mencoba! 🚀**

Jika sudah berhasil, jangan lupa ajari orang tua dengan sabar! ❤️
