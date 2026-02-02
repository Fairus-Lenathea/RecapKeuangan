// ⚠️ PENTING: Ganti dengan kredensial Supabase Anda
// Cara mendapatkan:
// 1. Buat akun di https://supabase.com
// 2. Buat project baru
// 3. Buka Settings > API
// 4. Copy URL dan anon/public key

const SUPABASE_URL = 'https://irffvgiigpjdagmwamvy.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlyZmZ2Z2lpZ3BqZGFnbXdhbXZ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk5NzE2NDMsImV4cCI6MjA4NTU0NzY0M30.xdAsDG8U49_y-UH-OwhqIqL2Mx6dGu7ueJ2MLYycYOQ';

// PIN untuk login (default: 1234)
// Anda bisa mengubah PIN ini sesuai keinginan
const CORRECT_PIN = '0909';

// Nama tabel di Supabase
const TABLE_NAME = 'pengeluaran';

// ========================================
// PANDUAN SETUP SUPABASE
// ========================================
//
// 1. Buat tabel dengan SQL berikut di Supabase SQL Editor:
//
// CREATE TABLE pengeluaran (
//   id BIGSERIAL PRIMARY KEY,
//   tanggal DATE NOT NULL DEFAULT CURRENT_DATE,
//   nama_item TEXT NOT NULL,
//   harga NUMERIC NOT NULL,
//   created_at TIMESTAMPTZ DEFAULT NOW()
// );
//
// 2. Set Row Level Security (RLS) - Untuk keamanan:
//    - Buka Table Editor > pengeluaran
//    - Klik "Enable RLS"
//    - Tambahkan policy: "Enable read access for all users"
//      - Policy name: public_read
//      - Allowed operation: SELECT
//      - Policy definition: true
//    - Tambahkan policy: "Enable insert for all users"
//      - Policy name: public_insert
//      - Allowed operation: INSERT
//      - Policy definition: true
//    - Tambahkan policy: "Enable delete for all users"
//      - Policy name: public_delete
//      - Allowed operation: DELETE
//      - Policy definition: true
//
// 3. Ganti SUPABASE_URL dan SUPABASE_ANON_KEY di atas
//
// ========================================
