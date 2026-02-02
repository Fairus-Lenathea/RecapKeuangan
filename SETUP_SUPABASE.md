# Panduan Setup Supabase untuk Buku Kas Harian

## Langkah 1: Buat Akun Supabase

1. Buka https://supabase.com
2. Klik **Start your project**
3. Sign up dengan GitHub atau email
4. Verifikasi email Anda

## Langkah 2: Buat Project Baru

1. Setelah login, klik **New Project**
2. Isi informasi project:
   - **Name**: Buku Kas Harian (atau nama lain)
   - **Database Password**: Buat password yang kuat (simpan baik-baik!)
   - **Region**: Pilih **Southeast Asia (Singapore)** untuk performa terbaik
   - **Pricing Plan**: Pilih **Free** (gratis selamanya)
3. Klik **Create new project**
4. Tunggu 1-2 menit sampai project selesai dibuat

## Langkah 3: Buat Tabel Database

1. Di dashboard Supabase, klik **SQL Editor** di sidebar kiri
2. Klik **New query**
3. Copy-paste SQL berikut:

```sql
-- Buat tabel pengeluaran
CREATE TABLE pengeluaran (
  id BIGSERIAL PRIMARY KEY,
  tanggal DATE NOT NULL DEFAULT CURRENT_DATE,
  nama_item TEXT NOT NULL,
  harga NUMERIC NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Buat index untuk performa lebih baik
CREATE INDEX idx_pengeluaran_tanggal ON pengeluaran(tanggal DESC);
CREATE INDEX idx_pengeluaran_created_at ON pengeluaran(created_at DESC);
```

4. Klik **Run** atau tekan **Ctrl+Enter**
5. Jika berhasil, akan muncul pesan "Success. No rows returned"

## Langkah 4: Setup Row Level Security (RLS)

### Cara 1: Menggunakan SQL (Lebih Cepat)

1. Di **SQL Editor**, buat query baru
2. Copy-paste SQL berikut:

```sql
-- Enable Row Level Security
ALTER TABLE pengeluaran ENABLE ROW LEVEL SECURITY;

-- Policy untuk SELECT (membaca data)
CREATE POLICY "Enable read access for all users" 
ON pengeluaran FOR SELECT 
USING (true);

-- Policy untuk INSERT (menambah data)
CREATE POLICY "Enable insert for all users" 
ON pengeluaran FOR INSERT 
WITH CHECK (true);

-- Policy untuk DELETE (menghapus data)
CREATE POLICY "Enable delete for all users" 
ON pengeluaran FOR DELETE 
USING (true);
```

3. Klik **Run**
4. Selesai! ✅

### Cara 2: Menggunakan UI (Lebih Visual)

1. Klik **Authentication** di sidebar
2. Klik **Policies**
3. Cari tabel **pengeluaran**
4. Klik **Enable RLS**
5. Klik **New Policy**

**Policy 1: Read Access**
- Template: **Enable read access for all users**
- Policy name: `public_read`
- Allowed operation: `SELECT`
- Target roles: `public`
- USING expression: `true`
- Klik **Review** lalu **Save policy**

**Policy 2: Insert Access**
- Klik **New Policy** lagi
- Template: **Enable insert for all users**
- Policy name: `public_insert`
- Allowed operation: `INSERT`
- Target roles: `public`
- WITH CHECK expression: `true`
- Klik **Review** lalu **Save policy**

**Policy 3: Delete Access**
- Klik **New Policy** lagi
- Template: **Enable delete for all users**
- Policy name: `public_delete`
- Allowed operation: `DELETE`
- Target roles: `public`
- USING expression: `true`
- Klik **Review** lalu **Save policy**

## Langkah 5: Ambil API Credentials

1. Klik **Settings** (ikon gear) di sidebar
2. Klik **API**
3. Di bagian **Project API keys**, Anda akan melihat:
   - **Project URL**: `https://xxxxxxxxxxxxx.supabase.co`
   - **anon public**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (panjang)

4. **COPY** kedua nilai tersebut

## Langkah 6: Masukkan ke Website

1. Buka file `config.js` di project Anda
2. Ganti nilai berikut:

```javascript
const SUPABASE_URL = 'https://xxxxxxxxxxxxx.supabase.co'; // Paste Project URL
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'; // Paste anon public key
```

3. Save file

## Langkah 7: Test Website

1. Buka `index.html` di browser
2. Login dengan PIN: **1234**
3. Coba tambah pengeluaran baru
4. Cek di Supabase **Table Editor** > **pengeluaran**
5. Data harus muncul di tabel! ✅

## Verifikasi Setup

### Cek Tabel
1. Buka **Table Editor** di Supabase
2. Klik tabel **pengeluaran**
3. Pastikan kolom-kolom berikut ada:
   - ✅ id (int8)
   - ✅ tanggal (date)
   - ✅ nama_item (text)
   - ✅ harga (numeric)
   - ✅ created_at (timestamptz)

### Cek RLS Policies
1. Buka **Authentication** > **Policies**
2. Pastikan ada 3 policies untuk tabel **pengeluaran**:
   - ✅ public_read (SELECT)
   - ✅ public_insert (INSERT)
   - ✅ public_delete (DELETE)

### Test Insert Manual
1. Di **Table Editor**, klik **Insert row**
2. Isi data:
   - tanggal: 2026-02-02
   - nama_item: Test
   - harga: 10000
3. Klik **Save**
4. Data harus muncul di tabel

## Troubleshooting

### Error: "Failed to fetch"
- ✅ Cek koneksi internet
- ✅ Pastikan SUPABASE_URL dan SUPABASE_ANON_KEY sudah benar
- ✅ Pastikan tidak ada spasi atau karakter tambahan

### Error: "new row violates row-level security policy"
- ✅ Pastikan RLS policies sudah dibuat dengan benar
- ✅ Pastikan policy menggunakan `true` bukan kondisi lain

### Data tidak muncul di website
- ✅ Buka Console browser (F12)
- ✅ Lihat tab **Console** untuk error messages
- ✅ Cek tab **Network** untuk melihat request ke Supabase

### Error: "relation 'pengeluaran' does not exist"
- ✅ Pastikan SQL untuk create table sudah dijalankan
- ✅ Cek di **Table Editor** apakah tabel sudah ada

## Tips Keamanan

1. **Jangan share SUPABASE_ANON_KEY** ke publik
2. **Backup database** secara berkala:
   - Buka **Database** > **Backups**
   - Supabase otomatis backup setiap hari (Free plan: 7 hari)
3. **Ubah PIN default** di `config.js`
4. **Gunakan HTTPS** saat deploy website

## Fitur Tambahan (Opsional)

### Menambah Kolom Kategori
Jika ingin menambah kategori pengeluaran:

```sql
ALTER TABLE pengeluaran 
ADD COLUMN kategori TEXT DEFAULT 'Lain-lain';
```

### Menambah Kolom Catatan
Jika ingin menambah catatan tambahan:

```sql
ALTER TABLE pengeluaran 
ADD COLUMN catatan TEXT;
```

### Melihat Total Pengeluaran per Bulan
```sql
SELECT 
  DATE_TRUNC('month', tanggal) as bulan,
  SUM(harga) as total
FROM pengeluaran
GROUP BY bulan
ORDER BY bulan DESC;
```

## Resource Tambahan

- 📚 Dokumentasi Supabase: https://supabase.com/docs
- 🎥 Video Tutorial: https://www.youtube.com/c/Supabase
- 💬 Community: https://github.com/supabase/supabase/discussions
- 🐛 Report Issues: https://github.com/supabase/supabase/issues

---

**Selamat! Setup Supabase Anda sudah selesai! 🎉**
