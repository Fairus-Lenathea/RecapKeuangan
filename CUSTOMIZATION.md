# 🎨 Customization Guide - Panduan Kustomisasi

Panduan untuk mengubah tampilan dan fitur aplikasi sesuai kebutuhan Anda.

---

## 🎨 Mengubah Warna Tema

### 1. Ubah Warna Gradient Background

Buka `index.html`, cari baris:
```html
<body class="bg-gradient-to-br from-blue-50 via-white to-green-50 min-h-screen">
```

Ubah warna sesuai keinginan:
```html
<!-- Tema Ungu-Pink -->
<body class="bg-gradient-to-br from-purple-50 via-white to-pink-50 min-h-screen">

<!-- Tema Orange-Yellow -->
<body class="bg-gradient-to-br from-orange-50 via-white to-yellow-50 min-h-screen">

<!-- Tema Abu-abu -->
<body class="bg-gradient-to-br from-gray-50 via-white to-slate-50 min-h-screen">
```

### 2. Ubah Warna Header

Buka `index.html`, cari:
```html
<header class="bg-gradient-to-r from-blue-600 to-green-600 text-white p-6 shadow-lg sticky top-0 z-10">
```

Ubah menjadi:
```html
<!-- Tema Ungu -->
<header class="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 shadow-lg sticky top-0 z-10">

<!-- Tema Merah -->
<header class="bg-gradient-to-r from-red-600 to-orange-600 text-white p-6 shadow-lg sticky top-0 z-10">
```

### 3. Ubah Warna Tombol

Buka `styles.css`, cari:
```css
.btn-primary {
    background: linear-gradient(135deg, #3B82F6 0%, #10B981 100%);
    ...
}
```

Ubah menjadi:
```css
/* Tema Ungu */
.btn-primary {
    background: linear-gradient(135deg, #9333EA 0%, #EC4899 100%);
}

/* Tema Orange */
.btn-primary {
    background: linear-gradient(135deg, #F97316 0%, #EAB308 100%);
}
```

---

## 🔤 Mengubah Font

### 1. Ganti Font Family

Buka `index.html`, cari:
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

Ubah dengan font lain dari Google Fonts:
```html
<!-- Font Poppins -->
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">

<!-- Font Roboto -->
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">

<!-- Font Nunito -->
<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">
```

Lalu buka `styles.css`, ubah:
```css
body {
    font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
```

### 2. Ubah Ukuran Font

Untuk orang tua dengan penglihatan kurang baik, perbesar font:

Buka `index.html`, cari input fields dan ubah `text-lg` menjadi `text-xl` atau `text-2xl`:
```html
<!-- Dari -->
<input class="... text-lg ...">

<!-- Menjadi -->
<input class="... text-2xl ...">
```

---

## 🔢 Mengubah PIN Default

Buka `config.js`:
```javascript
// Ubah dari 1234 ke PIN pilihan Anda
const CORRECT_PIN = '5678';
```

---

## 📝 Menambah Fitur Kategori

### 1. Update Database

Di Supabase SQL Editor, jalankan:
```sql
ALTER TABLE pengeluaran 
ADD COLUMN kategori TEXT DEFAULT 'Lain-lain';
```

### 2. Update Form Input

Buka `index.html`, tambahkan setelah field "Keterangan":
```html
<div>
    <label class="block text-gray-700 font-semibold mb-2 text-lg">Kategori</label>
    <select 
        id="kategori" 
        required
        class="w-full px-4 py-4 text-lg border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
    >
        <option value="Makanan">🍚 Makanan</option>
        <option value="Transportasi">🚗 Transportasi</option>
        <option value="Kesehatan">💊 Kesehatan</option>
        <option value="Pendidikan">📚 Pendidikan</option>
        <option value="Hiburan">🎬 Hiburan</option>
        <option value="Lain-lain">📦 Lain-lain</option>
    </select>
</div>
```

### 3. Update JavaScript

Buka `app.js`, di function `handleSubmit`, tambahkan:
```javascript
const kategori = document.getElementById('kategori').value;

// Di bagian insert, tambahkan:
const { data, error } = await supabase
    .from(TABLE_NAME)
    .insert([
        { 
            tanggal: tanggal,
            nama_item: namaItem,
            harga: harga,
            kategori: kategori  // Tambahkan ini
        }
    ]);
```

### 4. Update Display

Di function `displayPengeluaran`, tambahkan kategori di card:
```javascript
html += `
    <div class="transaction-card p-5 rounded-xl shadow-md border border-gray-100 fade-in">
        <div class="flex justify-between items-start mb-3">
            <div class="flex-1">
                <p class="text-sm text-gray-500 mb-1">${tanggalFormatted}</p>
                <p class="text-xl font-semibold text-gray-800">${item.nama_item}</p>
                <span class="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
                    ${item.kategori || 'Lain-lain'}
                </span>
            </div>
            ...
        </div>
        ...
    </div>
`;
```

---

## 📊 Menambah Fitur Laporan Bulanan

### 1. Tambah Tab Baru

Di `index.html`, tambahkan tab "Laporan":
```html
<button 
    id="tabLaporan" 
    onclick="switchTab('laporan')" 
    class="tab-btn flex-1 py-3 px-4 rounded-xl font-semibold transition-all"
>
    📊 Laporan
</button>
```

### 2. Tambah Section Laporan

```html
<div id="laporanSection" class="hidden space-y-4">
    <h2 class="text-2xl font-bold text-gray-800">Laporan Bulanan</h2>
    <div id="laporanBulanan" class="glass-card p-6 rounded-2xl">
        <!-- Laporan akan dimuat di sini -->
    </div>
</div>
```

### 3. Tambah Function di JavaScript

Di `app.js`:
```javascript
async function loadLaporanBulanan() {
    const { data, error } = await supabase
        .from(TABLE_NAME)
        .select('*')
        .gte('tanggal', new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0]);
    
    if (error) {
        console.error(error);
        return;
    }
    
    const total = data.reduce((sum, item) => sum + parseFloat(item.harga), 0);
    const jumlahTransaksi = data.length;
    const rataRata = total / jumlahTransaksi || 0;
    
    document.getElementById('laporanBulanan').innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="bg-blue-50 p-4 rounded-xl">
                <p class="text-sm text-gray-600">Total Pengeluaran</p>
                <p class="text-2xl font-bold text-blue-600">${displayRupiah(total)}</p>
            </div>
            <div class="bg-green-50 p-4 rounded-xl">
                <p class="text-sm text-gray-600">Jumlah Transaksi</p>
                <p class="text-2xl font-bold text-green-600">${jumlahTransaksi}</p>
            </div>
            <div class="bg-purple-50 p-4 rounded-xl">
                <p class="text-sm text-gray-600">Rata-rata</p>
                <p class="text-2xl font-bold text-purple-600">${displayRupiah(rataRata)}</p>
            </div>
        </div>
    `;
}
```

---

## 🔔 Menambah Notifikasi

### 1. Tambah Service Worker (untuk PWA)

Buat file `sw.js`:
```javascript
self.addEventListener('install', (event) => {
    console.log('Service Worker installed');
});

self.addEventListener('activate', (event) => {
    console.log('Service Worker activated');
});
```

### 2. Register Service Worker

Di `app.js`, tambahkan:
```javascript
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then(reg => console.log('Service Worker registered'))
        .catch(err => console.log('Service Worker registration failed'));
}
```

---

## 📱 Membuat PWA (Install di HP)

### 1. Tambah Manifest

Buat file `manifest.json`:
```json
{
  "name": "Buku Kas Harian",
  "short_name": "Buku Kas",
  "description": "Aplikasi catatan keuangan sederhana",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#3B82F6",
  "icons": [
    {
      "src": "icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

### 2. Link Manifest di HTML

Di `index.html`, tambahkan di `<head>`:
```html
<link rel="manifest" href="manifest.json">
<meta name="theme-color" content="#3B82F6">
```

---

## 🖼️ Menambah Logo/Icon

### 1. Buat Icon

Gunakan tool online seperti:
- https://favicon.io
- https://realfavicongenerator.net

### 2. Tambahkan di HTML

```html
<link rel="icon" type="image/png" sizes="32x32" href="favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="apple-touch-icon.png">
```

---

## 🌐 Mengubah Bahasa

Untuk mengubah ke bahasa Inggris:

1. Ubah `lang="id"` menjadi `lang="en"` di `<html>`
2. Ganti semua teks Indonesia ke Inggris
3. Ubah format tanggal di `app.js`:
```javascript
return date.toLocaleDateString('en-US', options);
```

---

## 💾 Export Data ke Excel

Tambahkan tombol export di tab Rekap:

```html
<button onclick="exportToExcel()" class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl">
    📥 Export Excel
</button>
```

Di `app.js`:
```javascript
function exportToExcel() {
    // Implementasi export menggunakan library seperti SheetJS
    // https://github.com/SheetJS/sheetjs
}
```

---

## 📞 Support

Jika butuh bantuan kustomisasi lebih lanjut:
- Baca dokumentasi Tailwind CSS: https://tailwindcss.com/docs
- Baca dokumentasi Supabase: https://supabase.com/docs
- Cari tutorial di YouTube

---

**Selamat berkreasi! 🎨**
