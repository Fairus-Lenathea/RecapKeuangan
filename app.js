// Initialize Supabase Client
let supabaseClient;

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    // Check if config is set
    if (SUPABASE_URL === 'YOUR_SUPABASE_URL_HERE' || SUPABASE_ANON_KEY === 'YOUR_SUPABASE_ANON_KEY_HERE') {
        alert('⚠️ Harap setup Supabase terlebih dahulu!\n\nBuka file config.js dan ganti SUPABASE_URL dan SUPABASE_ANON_KEY dengan kredensial Anda.');
        return;
    }

    // Initialize Supabase
    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    // Set today's date as default
    const today = new Date().toISOString().split('T')[0];
    const tanggalInput = document.getElementById('tanggal');
    if (tanggalInput) {
        tanggalInput.value = today;
    }

    // Setup auto-format for price input
    const hargaInput = document.getElementById('harga');
    if (hargaInput) {
        hargaInput.addEventListener('input', formatRupiah);
    }

    // Setup form submit
    const form = document.getElementById('pengeluaranForm');
    if (form) {
        form.addEventListener('submit', handleSubmit);
    }

    // Setup PIN input - Allow Enter key
    const pinInput = document.getElementById('pinInput');
    if (pinInput) {
        pinInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                checkPin();
            }
        });
    }

    // Check if user is logged in
    checkLoginStatus();
});

// ========================================
// LOGIN & AUTHENTICATION
// ========================================

function checkLoginStatus() {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
        showApp();
    }
}

function checkPin() {
    const pinInput = document.getElementById('pinInput');
    const pin = pinInput.value;
    const pinError = document.getElementById('pinError');

    if (pin === CORRECT_PIN) {
        // Correct PIN
        sessionStorage.setItem('isLoggedIn', 'true');
        pinError.classList.add('hidden');
        showApp();
    } else {
        // Wrong PIN
        pinError.classList.remove('hidden');
        pinInput.value = '';
        pinInput.focus();

        // Shake animation
        pinInput.style.animation = 'shake 0.5s';
        setTimeout(() => {
            pinInput.style.animation = '';
        }, 500);
    }
}

// Add shake animation
const style = document.createElement('style');
style.textContent = `
@keyframes shake {
    0 %, 100 % { transform: translateX(0); }
    10 %, 30 %, 50 %, 70 %, 90 % { transform: translateX(-10px); }
    20 %, 40 %, 60 %, 80 % { transform: translateX(10px); }
}
`;
document.head.appendChild(style);

function showApp() {
    document.getElementById('loginScreen').classList.add('hidden');
    document.getElementById('appScreen').classList.remove('hidden');
    loadPengeluaran();
}

function logout() {
    if (confirm('Apakah Anda yakin ingin keluar?')) {
        sessionStorage.removeItem('isLoggedIn');
        document.getElementById('loginScreen').classList.remove('hidden');
        document.getElementById('appScreen').classList.add('hidden');
        document.getElementById('pinInput').value = '';
    }
}

// ========================================
// TAB NAVIGATION
// ========================================

function switchTab(tab) {
    const inputSection = document.getElementById('inputSection');
    const rekapSection = document.getElementById('rekapSection');
    const tabInput = document.getElementById('tabInput');
    const tabRekap = document.getElementById('tabRekap');

    if (tab === 'input') {
        inputSection.classList.remove('hidden');
        rekapSection.classList.add('hidden');
        tabInput.classList.add('active');
        tabRekap.classList.remove('active');
    } else {
        inputSection.classList.add('hidden');
        rekapSection.classList.remove('hidden');
        tabInput.classList.remove('active');
        tabRekap.classList.add('active');
        loadPengeluaran();
    }
}

// ========================================
// RUPIAH FORMATTING
// ========================================

function formatRupiah(e) {
    let value = e.target.value;

    // Remove all non-numeric characters
    value = value.replace(/\D/g, '');

    // Format with thousand separators
    if (value) {
        value = parseInt(value).toLocaleString('id-ID');
    }

    e.target.value = value;
}

function parseRupiah(value) {
    // Remove all non-numeric characters and convert to number
    return parseInt(value.replace(/\D/g, '')) || 0;
}

function displayRupiah(amount) {
    return 'Rp ' + parseInt(amount).toLocaleString('id-ID');
}

// ========================================
// FORM HANDLING
// ========================================

async function handleSubmit(e) {
    e.preventDefault();

    const tanggal = document.getElementById('tanggal').value;
    const namaItem = document.getElementById('namaItem').value;
    const hargaInput = document.getElementById('harga').value;
    const harga = parseRupiah(hargaInput);

    if (!tanggal || !namaItem || harga <= 0) {
        showMessage('Mohon isi semua field dengan benar!', 'error');
        return;
    }

    showLoading(true);

    try {
        const { data, error } = await supabaseClient
            .from(TABLE_NAME)
            .insert([
                {
                    tanggal: tanggal,
                    nama_item: namaItem,
                    harga: harga
                }
            ]);

        if (error) throw error;

        showMessage('✅ Data berhasil disimpan!', 'success');

        // Reset form
        document.getElementById('pengeluaranForm').reset();
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('tanggal').value = today;

        // Reload data
        loadPengeluaran();

    } catch (error) {
        console.error('Error:', error);
        showMessage('❌ Gagal menyimpan data: ' + error.message, 'error');
    } finally {
        showLoading(false);
    }
}

// ========================================
// LOAD DATA
// ========================================

async function loadPengeluaran() {
    showLoading(true);

    try {
        const { data, error } = await supabaseClient
            .from(TABLE_NAME)
            .select('*')
            .order('tanggal', { ascending: false })
            .order('created_at', { ascending: false });

        if (error) throw error;

        displayPengeluaran(data);
        calculateTotal(data);

    } catch (error) {
        console.error('Error:', error);
        showMessage('❌ Gagal memuat data: ' + error.message, 'error');
    } finally {
        showLoading(false);
    }
}

// Store all data globally for filtering
let allPengeluaranData = [];
let currentFilter = 'today';

function displayPengeluaran(data) {
    // Store data globally
    allPengeluaranData = data;

    const container = document.getElementById('pengeluaranList');
    const emptyState = document.getElementById('emptyState');

    if (!data || data.length === 0) {
        container.innerHTML = '';
        emptyState.classList.remove('hidden');
        updateFilteredSummary([], 'today');
        return;
    }

    emptyState.classList.add('hidden');

    // Apply current filter
    const filteredData = filterDataByPeriod(data, currentFilter);

    if (filteredData.length === 0) {
        container.innerHTML = '<div class="glass-card p-8 rounded-2xl text-center"><p class="text-gray-500">Tidak ada transaksi untuk periode ini</p></div>';
        updateFilteredSummary([], currentFilter);
        return;
    }

    // Group data by date
    const groupedData = {};
    filteredData.forEach(item => {
        const date = item.tanggal;
        if (!groupedData[date]) {
            groupedData[date] = [];
        }
        groupedData[date].push(item);
    });

    // Sort dates in descending order
    const sortedDates = Object.keys(groupedData).sort((a, b) => new Date(b) - new Date(a));

    let html = '';
    let animationIndex = 0;

    sortedDates.forEach(date => {
        const items = groupedData[date];
        const dailyTotal = items.reduce((sum, item) => sum + parseFloat(item.harga), 0);
        const dateFormatted = formatTanggal(date);

        // Date separator with daily total
        html += `
            <div class="date-separator">
                <div class="flex justify-between items-center">
                    <p class="font-bold text-gray-800">${dateFormatted}</p>
                    <p class="font-bold text-blue-600">${displayRupiah(dailyTotal)}</p>
                </div>
                <p class="text-xs text-gray-500 mt-1">${items.length} transaksi</p>
            </div>
        `;

        // Transaction items for this date
        items.forEach(item => {
            const hargaFormatted = displayRupiah(item.harga);

            html += `
                <div class="transaction-card p-5 rounded-xl shadow-md border border-gray-100 fade-in" style="animation-delay: ${animationIndex * 0.05}s">
                    <div class="flex justify-between items-start mb-3">
                        <div class="flex-1">
                            <p class="text-xl font-semibold text-gray-800">${item.nama_item}</p>
                        </div>
                        <button 
                            onclick="deletePengeluaran(${item.id})" 
                            class="btn-delete ml-3"
                            title="Hapus"
                        >
                            🗑️ Hapus
                        </button>
                    </div>
                    <p class="text-2xl font-bold text-blue-600">${hargaFormatted}</p>
                </div>
            `;
            animationIndex++;
        });
    });

    container.innerHTML = html;
    updateFilteredSummary(filteredData, currentFilter);
}

function filterDataByPeriod(data, period) {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    switch (period) {
        case 'today':
            const todayStr = now.toISOString().split('T')[0];
            return data.filter(item => item.tanggal === todayStr);

        case 'week':
            const weekAgo = new Date(today);
            weekAgo.setDate(weekAgo.getDate() - 7);
            return data.filter(item => {
                const itemDate = new Date(item.tanggal + 'T00:00:00');
                return itemDate >= weekAgo;
            });

        case 'month':
            const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
            return data.filter(item => {
                const itemDate = new Date(item.tanggal + 'T00:00:00');
                return itemDate >= monthStart;
            });

        case 'all':
        default:
            return data;
    }
}

function updateFilteredSummary(data, period) {
    const total = data.reduce((sum, item) => sum + parseFloat(item.harga), 0);
    const count = data.length;

    document.getElementById('filteredTotal').textContent = displayRupiah(total);
    document.getElementById('transactionCount').textContent = count;

    // Update period label
    const labels = {
        'today': 'Hari Ini',
        'week': 'Minggu Ini',
        'month': 'Bulan Ini',
        'all': 'Semua Waktu'
    };
    document.getElementById('periodLabel').textContent = labels[period] || 'Hari Ini';
}

function filterByPeriod(period) {
    currentFilter = period;

    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById('filter' + period.charAt(0).toUpperCase() + period.slice(1)).classList.add('active');

    // Re-display with new filter
    displayPengeluaran(allPengeluaranData);
}

function calculateTotal(data) {
    // Calculate today's total for header
    const today = new Date().toISOString().split('T')[0];
    const todayData = data.filter(item => item.tanggal === today);
    const todayTotal = todayData.reduce((sum, item) => sum + parseFloat(item.harga), 0);

    document.getElementById('totalPengeluaran').textContent = displayRupiah(todayTotal);

    // Display today's date
    const todayDateFormatted = formatTanggal(today);
    document.getElementById('todayDate').textContent = todayDateFormatted;
}

// ========================================
// DELETE DATA
// ========================================

async function deletePengeluaran(id) {
    if (!confirm('Apakah Anda yakin ingin menghapus data ini?')) {
        return;
    }

    showLoading(true);

    try {
        const { error } = await supabaseClient
            .from(TABLE_NAME)
            .delete()
            .eq('id', id);

        if (error) throw error;

        showMessage('✅ Data berhasil dihapus!', 'success');
        loadPengeluaran();

    } catch (error) {
        console.error('Error:', error);
        showMessage('❌ Gagal menghapus data: ' + error.message, 'error');
    } finally {
        showLoading(false);
    }
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

function formatTanggal(dateString) {
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('id-ID', options);
}

function showLoading(show) {
    const overlay = document.getElementById('loadingOverlay');
    if (show) {
        overlay.classList.remove('hidden');
    } else {
        overlay.classList.add('hidden');
    }
}

function showMessage(message, type) {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.success-message, .error-message');
    existingMessages.forEach(msg => msg.remove());

    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = type === 'success' ? 'success-message' : 'error-message';
    messageDiv.textContent = message;

    // Insert at the top of the active section
    const activeSection = document.getElementById('inputSection').classList.contains('hidden')
        ? document.getElementById('rekapSection')
        : document.getElementById('inputSection');

    activeSection.insertBefore(messageDiv, activeSection.firstChild);

    // Auto remove after 5 seconds
    setTimeout(() => {
        messageDiv.style.animation = 'fadeOut 0.4s ease';
        setTimeout(() => messageDiv.remove(), 400);
    }, 5000);
}

// Add fadeOut animation
const fadeOutStyle = document.createElement('style');
fadeOutStyle.textContent = `
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(-10px);
        }
    }
`;
document.head.appendChild(fadeOutStyle);
