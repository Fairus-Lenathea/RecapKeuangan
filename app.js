// ============================================
// KAS — Buku Kas Harian
// app.js — Senior-Friendly Edition
// ============================================

let supabaseClient;
let allData = [];
let currentFilter = 'today';
let pinValue = '';

// ============================================
// INIT
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    if (SUPABASE_URL === 'YOUR_SUPABASE_URL_HERE' || SUPABASE_ANON_KEY === 'YOUR_SUPABASE_ANON_KEY_HERE') {
        alert('Setup dulu Supabase-nya ya!\n\nBuka config.js dan isi SUPABASE_URL & SUPABASE_ANON_KEY.');
        return;
    }

    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    // Set default date
    const todayStr = new Date().toISOString().split('T')[0];
    const tanggalEl = document.getElementById('tanggal');
    if (tanggalEl) tanggalEl.value = todayStr;

    // Rupiah auto-format
    document.getElementById('harga')?.addEventListener('input', formatRupiah);

    // Amount wrapper focus ring
    const hargaEl = document.getElementById('harga');
    const wrap = document.getElementById('amountWrap');
    if (hargaEl && wrap) {
        hargaEl.addEventListener('focus', () => {
            wrap.style.borderColor = '#d97706';
            wrap.style.boxShadow = '0 0 0 4px rgba(217,119,6,0.15)';
        });
        hargaEl.addEventListener('blur', () => {
            wrap.style.borderColor = '';
            wrap.style.boxShadow = '';
        });
    }

    setTabStyle('input');
    checkLoginStatus();
});

// ============================================
// PIN NUMPAD
// ============================================

function addDigit(d) {
    if (pinValue.length >= 4) return;
    pinValue += d;
    renderDots();
    if (pinValue.length === 4) setTimeout(verifyPin, 150);
}

function delDigit() {
    if (!pinValue.length) return;
    pinValue = pinValue.slice(0, -1);
    renderDots();
    document.getElementById('pinError').classList.add('hidden');
}

function renderDots(state) {
    document.querySelectorAll('.pin-dot').forEach((dot, i) => {
        // reset
        dot.classList.remove('filled', 'wrong');
        dot.style.cssText = '';
        dot.className = 'pin-dot w-5 h-5 rounded-full border-[3px] border-rim block';

        if (state === 'error') {
            dot.classList.add('wrong');
        } else if (i < pinValue.length) {
            dot.classList.add('filled');
        }
    });
}

// ============================================
// AUTH
// ============================================

function checkLoginStatus() {
    if (sessionStorage.getItem('isLoggedIn') === 'true') showApp();
}

function verifyPin() {
    if (pinValue === CORRECT_PIN) {
        sessionStorage.setItem('isLoggedIn', 'true');
        setTimeout(showApp, 200);
    } else {
        renderDots('error');
        document.getElementById('pinError').classList.remove('hidden');
        setTimeout(() => {
            pinValue = '';
            renderDots();
        }, 800);
    }
}

function showApp() {
    document.getElementById('loginScreen').classList.add('hidden');
    document.getElementById('appScreen').classList.remove('hidden');
    pinValue = '';
    renderDots();
    document.getElementById('pinError').classList.add('hidden');
    loadData();
}

function logout() {
    if (!confirm('Yakin ingin keluar?')) return;
    sessionStorage.removeItem('isLoggedIn');
    document.getElementById('loginScreen').classList.remove('hidden');
    document.getElementById('appScreen').classList.add('hidden');
    pinValue = '';
    renderDots();
    document.getElementById('pinError').classList.add('hidden');
}

// ============================================
// TABS
// ============================================

function switchTab(tab) {
    const isInput = tab === 'input';
    document.getElementById('inputSection').classList.toggle('hidden', !isInput);
    document.getElementById('rekapSection').classList.toggle('hidden', isInput);
    setTabStyle(tab);
    if (!isInput) loadData();
}

function setTabStyle(active) {
    ['input', 'rekap'].forEach(t => {
        const id = 'tab' + t.charAt(0).toUpperCase() + t.slice(1);
        const btn = document.getElementById(id);
        if (!btn) return;
        if (t === active) btn.classList.add('active');
        else btn.classList.remove('active');
    });
}

// ============================================
// CURRENCY
// ============================================

function formatRupiah(e) {
    const raw = e.target.value.replace(/\D/g, '');
    e.target.value = raw ? parseInt(raw).toLocaleString('id-ID') : '';
}

function parseRupiah(v) {
    return parseInt((v || '').replace(/\D/g, '')) || 0;
}

function displayRp(amount) {
    return 'Rp ' + parseInt(amount).toLocaleString('id-ID');
}

// ============================================
// FORM SUBMIT
// ============================================

async function handleSubmit(e) {
    e.preventDefault();
    const tanggal = document.getElementById('tanggal').value;
    const namaItem = document.getElementById('namaItem').value.trim();
    const harga = parseRupiah(document.getElementById('harga').value);

    if (!tanggal || !namaItem || harga <= 0) {
        showToast('Mohon isi semua kolom dengan benar.', 'error');
        return;
    }

    showLoading(true);
    try {
        const { error } = await supabaseClient
            .from(TABLE_NAME)
            .insert([{ tanggal, nama_item: namaItem, harga }]);
        if (error) throw error;

        showToast('Data berhasil disimpan!', 'ok');
        document.getElementById('pengeluaranForm').reset();
        document.getElementById('tanggal').value = new Date().toISOString().split('T')[0];
        loadData();
    } catch (err) {
        showToast('Gagal menyimpan: ' + err.message, 'error');
    } finally {
        showLoading(false);
    }
}

// ============================================
// LOAD DATA
// ============================================

async function loadData() {
    showLoading(true);
    try {
        const { data, error } = await supabaseClient
            .from(TABLE_NAME).select('*')
            .order('tanggal', { ascending: false })
            .order('created_at', { ascending: false });
        if (error) throw error;

        allData = data || [];
        renderList(allData);
        renderHeaderTotal(allData);
    } catch (err) {
        showToast('Gagal memuat data: ' + err.message, 'error');
    } finally {
        showLoading(false);
    }
}

// alias for refresh button
function loadPengeluaran() { loadData(); }

// ============================================
// RENDER LIST
// ============================================

function renderList(data) {
    const list = document.getElementById('pengeluaranList');
    const empty = document.getElementById('emptyState');
    const fil = filterData(data, currentFilter);

    updateSummary(fil);

    if (!fil.length) {
        list.innerHTML = '';
        empty.classList.remove('hidden');
        return;
    }
    empty.classList.add('hidden');

    // Group by date
    const grp = {};
    fil.forEach(item => (grp[item.tanggal] = grp[item.tanggal] || []).push(item));
    const dates = Object.keys(grp).sort((a, b) => new Date(b) - new Date(a));

    let delay = 0;
    let html = '';

    dates.forEach(date => {
        const items = grp[date];
        const dailyTotal = items.reduce((s, i) => s + parseFloat(i.harga), 0);

        // Date group header
        html += `
      <div class="mb-4">
        <div class="flex items-center justify-between px-1 mb-2">
          <span class="text-sm font-bold uppercase tracking-wide" style="color:#92400e">${shortDate(date)}</span>
          <span class="text-sm font-bold" style="color:#d97706">${displayRp(dailyTotal)}</span>
        </div>

        <div class="rounded-2xl overflow-hidden border-2 border-rim bg-card" style="box-shadow:0 2px 8px rgba(100,80,50,0.07)">
    `;

        items.forEach((item, idx) => {
            const isLast = idx === items.length - 1;
            html += `
        <div class="px-4 py-4 animate-slideup${isLast ? '' : ' border-b-2 border-rim'}"
          style="animation-delay:${delay * 0.05}s">

          <!-- Name row -->
          <div class="flex items-start justify-between gap-3 mb-2">
            <p class="text-lg font-bold text-ink leading-snug flex-1">${escHtml(item.nama_item)}</p>

            <!-- Delete button — large, clearly labelled -->
            <button onclick="deleteTxn(${item.id})"
              class="flex items-center gap-1.5 text-sm font-bold rounded-xl px-3 py-2 active:scale-95 no-sel shrink-0"
              style="min-height:40px; min-width:80px; color:#b91c1c; background:#fee2e2; border:2px solid #fca5a5; transition:all .15s">
              <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                <path d="M10 11v6M14 11v6"/>
              </svg>
              Hapus
            </button>
          </div>

          <!-- Amount — big and readable -->
          <p class="font-serif text-2xl font-bold" style="color:#d97706">${displayRp(item.harga)}</p>
        </div>
      `;
            delay++;
        });

        html += `</div></div>`;
    });

    list.innerHTML = html;
}

// ============================================
// FILTER
// ============================================

function filterData(data, period) {
    const todayStr = new Date().toISOString().split('T')[0];
    const now = new Date();
    switch (period) {
        case 'today':
            return data.filter(i => i.tanggal === todayStr);
        case 'week': {
            const ago = new Date(now); ago.setDate(ago.getDate() - 7);
            return data.filter(i => new Date(i.tanggal + 'T00:00:00') >= ago);
        }
        case 'month': {
            const start = new Date(now.getFullYear(), now.getMonth(), 1);
            return data.filter(i => new Date(i.tanggal + 'T00:00:00') >= start);
        }
        default:
            return data;
    }
}

function filterByPeriod(period) {
    currentFilter = period;

    const map = { today: 'filterToday', week: 'filterWeek', month: 'filterMonth', all: 'filterAll' };
    document.querySelectorAll('.chip').forEach(btn => {
        btn.classList.remove('active');
    });
    const active = document.getElementById(map[period]);
    if (active) active.classList.add('active');

    renderList(allData);
}

function updateSummary(data) {
    const total = data.reduce((s, i) => s + parseFloat(i.harga), 0);
    document.getElementById('filteredTotal').textContent = displayRp(total);
    document.getElementById('transactionCount').textContent = data.length;
    const lbl = { today: 'Hari Ini', week: 'Minggu Ini', month: 'Bulan Ini', all: 'Semua' };
    document.getElementById('periodLabel').textContent = lbl[currentFilter] || 'Hari Ini';
}

function renderHeaderTotal(data) {
    const todayStr = new Date().toISOString().split('T')[0];
    const total = data
        .filter(i => i.tanggal === todayStr)
        .reduce((s, i) => s + parseFloat(i.harga), 0);
    document.getElementById('totalPengeluaran').textContent = displayRp(total);
    document.getElementById('todayDate').textContent = longDate(todayStr);
}

// ============================================
// DELETE
// ============================================

async function deleteTxn(id) {
    if (!confirm('Yakin ingin menghapus catatan ini?')) return;
    showLoading(true);
    try {
        const { error } = await supabaseClient
            .from(TABLE_NAME).delete().eq('id', id);
        if (error) throw error;
        showToast('Catatan berhasil dihapus.', 'ok');
        loadData();
    } catch (err) {
        showToast('Gagal menghapus: ' + err.message, 'error');
    } finally {
        showLoading(false);
    }
}

// ============================================
// UTILITIES
// ============================================

function shortDate(str) {
    return new Date(str + 'T00:00:00').toLocaleDateString('id-ID', {
        weekday: 'long', day: 'numeric', month: 'long'
    });
}

function longDate(str) {
    return new Date(str + 'T00:00:00').toLocaleDateString('id-ID', {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
    });
}

function escHtml(s) {
    const d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
}

function showLoading(show) {
    document.getElementById('loadingOverlay').classList.toggle('hidden', !show);
}

function showToast(msg, type = 'ok') {
    const c = document.getElementById('toastContainer');
    const isOk = type === 'ok';
    const el = document.createElement('div');

    el.className = 'flex items-center gap-3 px-5 py-4 rounded-2xl border-2 text-base font-bold pointer-events-auto animate-toastin';
    el.style.cssText = `
    background: ${isOk ? '#dcfce7' : '#fee2e2'};
    border-color: ${isOk ? '#86efac' : '#fca5a5'};
    color: ${isOk ? '#15803d' : '#b91c1c'};
    box-shadow: 0 4px 20px rgba(100,80,50,0.15);
  `;

    const icon = isOk
        ? `<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>`
        : `<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`;

    el.innerHTML = icon + msg;
    c.appendChild(el);

    setTimeout(() => {
        el.classList.add('animate-toastout');
        setTimeout(() => el.remove(), 280);
    }, 3500);
}

// Init chips
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => filterByPeriod('today'), 80);
});