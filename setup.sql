-- ============================================
-- SUPABASE SETUP SQL
-- Buku Kas Harian - Financial Tracker App
-- ============================================
-- 
-- CARA PAKAI:
-- 1. Login ke Supabase Dashboard
-- 2. Buka SQL Editor
-- 3. Copy-paste semua SQL di bawah ini
-- 4. Klik "Run" atau tekan Ctrl+Enter
-- 5. Selesai! ✅
--
-- ============================================

-- 1. CREATE TABLE
-- Membuat tabel untuk menyimpan data pengeluaran
CREATE TABLE IF NOT EXISTS pengeluaran (
  id BIGSERIAL PRIMARY KEY,
  tanggal DATE NOT NULL DEFAULT CURRENT_DATE,
  nama_item TEXT NOT NULL,
  harga NUMERIC NOT NULL CHECK (harga >= 0),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. CREATE INDEXES
-- Membuat index untuk performa query lebih cepat
CREATE INDEX IF NOT EXISTS idx_pengeluaran_tanggal 
ON pengeluaran(tanggal DESC);

CREATE INDEX IF NOT EXISTS idx_pengeluaran_created_at 
ON pengeluaran(created_at DESC);

-- 3. ENABLE ROW LEVEL SECURITY (RLS)
-- Mengaktifkan keamanan tingkat baris
ALTER TABLE pengeluaran ENABLE ROW LEVEL SECURITY;

-- 4. CREATE RLS POLICIES
-- Policy untuk membaca data (SELECT)
CREATE POLICY IF NOT EXISTS "Enable read access for all users" 
ON pengeluaran 
FOR SELECT 
USING (true);

-- Policy untuk menambah data (INSERT)
CREATE POLICY IF NOT EXISTS "Enable insert for all users" 
ON pengeluaran 
FOR INSERT 
WITH CHECK (true);

-- Policy untuk menghapus data (DELETE)
CREATE POLICY IF NOT EXISTS "Enable delete for all users" 
ON pengeluaran 
FOR DELETE 
USING (true);

-- Policy untuk update data (UPDATE) - opsional
CREATE POLICY IF NOT EXISTS "Enable update for all users" 
ON pengeluaran 
FOR UPDATE 
USING (true)
WITH CHECK (true);

-- 5. CREATE FUNCTION FOR AUTO-UPDATE TIMESTAMP
-- Function untuk otomatis update kolom updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 6. CREATE TRIGGER
-- Trigger untuk memanggil function di atas saat data di-update
CREATE TRIGGER update_pengeluaran_updated_at 
BEFORE UPDATE ON pengeluaran 
FOR EACH ROW 
EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- VERIFICATION QUERIES
-- Jalankan query di bawah untuk verifikasi
-- ============================================

-- Cek struktur tabel
SELECT 
    column_name, 
    data_type, 
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_name = 'pengeluaran'
ORDER BY ordinal_position;

-- Cek RLS policies
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd
FROM pg_policies
WHERE tablename = 'pengeluaran';

-- ============================================
-- TEST DATA (OPSIONAL)
-- Uncomment untuk menambah data test
-- ============================================

/*
INSERT INTO pengeluaran (tanggal, nama_item, harga) VALUES
('2026-02-01', 'Beli Beras 5kg', 75000),
('2026-02-01', 'Bayar Listrik', 250000),
('2026-02-02', 'Beli Sayur', 35000),
('2026-02-02', 'Bensin Motor', 50000);

-- Lihat data test
SELECT * FROM pengeluaran ORDER BY tanggal DESC, created_at DESC;

-- Lihat total pengeluaran
SELECT SUM(harga) as total_pengeluaran FROM pengeluaran;
*/

-- ============================================
-- USEFUL QUERIES
-- Query berguna untuk maintenance
-- ============================================

-- Lihat total pengeluaran per hari
/*
SELECT 
    tanggal,
    COUNT(*) as jumlah_transaksi,
    SUM(harga) as total_pengeluaran
FROM pengeluaran
GROUP BY tanggal
ORDER BY tanggal DESC;
*/

-- Lihat total pengeluaran bulan ini
/*
SELECT 
    SUM(harga) as total_bulan_ini
FROM pengeluaran
WHERE tanggal >= DATE_TRUNC('month', CURRENT_DATE);
*/

-- Lihat item pengeluaran terbesar
/*
SELECT 
    tanggal,
    nama_item,
    harga
FROM pengeluaran
ORDER BY harga DESC
LIMIT 10;
*/

-- Hapus semua data (HATI-HATI!)
/*
TRUNCATE TABLE pengeluaran RESTART IDENTITY;
*/

-- ============================================
-- BACKUP & RESTORE
-- ============================================

-- Backup data (export ke CSV)
/*
COPY pengeluaran TO '/tmp/pengeluaran_backup.csv' 
WITH (FORMAT CSV, HEADER);
*/

-- Restore data (import dari CSV)
/*
COPY pengeluaran(tanggal, nama_item, harga)
FROM '/tmp/pengeluaran_backup.csv'
WITH (FORMAT CSV, HEADER);
*/

-- ============================================
-- SELESAI!
-- ============================================
-- 
-- Setup Supabase berhasil! ✅
-- 
-- NEXT STEPS:
-- 1. Buka Settings > API
-- 2. Copy Project URL dan anon/public key
-- 3. Paste ke file config.js
-- 4. Test website!
--
-- ============================================
