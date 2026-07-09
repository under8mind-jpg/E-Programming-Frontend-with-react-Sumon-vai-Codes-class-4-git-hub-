/**
 * Hotel Matir Bashon - Complete App
 * Features: Order Management, Analytics, History, Color Customization, 24h Countdown
 */

// ============ APP STATE ============
const AppState = {
    products: [],
    orderHistory: [],
    charts: {}
};

const CONFIG = {
    STORAGE_PRODUCTS: 'hmb_products',
    STORAGE_HISTORY: 'hmb_history',
    STORAGE_LAST_RESET: 'hmb_last_reset'
};

// ============ INITIALIZATION ============
function initializeApp() {
    // Load data
    loadData();
    
    // Initialize default products if empty
    if(AppState.products.length === 0) {
        AppState.products = [
            {id: 1, name: 'Rice', price: 50, qty: 0, active: true, color: '#FF6B6B'},
            {id: 2, name: 'Chicken', price: 120, qty: 0, active: true, color: '#4ECDC4'},
            {id: 3, name: 'Beef', price: 180, qty: 0, active: true, color: '#45B7D1'},
            {id: 4, name: 'Fish Curry', price: 200, qty: 0, active: false, color: '#FFA07A'}
        ];
        saveData();
    }
    
    // Check if 24h passed (reset chart data)
    checkDailyReset();
    
    // Render UI
    renderOrderTab();
    
    // Start timer
    startCountdownTimer();
    
    console.log('✅ App initialized');
}

// ============ DATA MANAGEMENT ============
function loadData() {
    const savedProducts = localStorage.getItem(CONFIG.STORAGE_PRODUCTS);
    const savedHistory = localStorage.getItem(CONFIG.STORAGE_HISTORY);
    
    if(savedProducts) AppState.products = JSON.parse(savedProducts);
    if(savedHistory) AppState.orderHistory = JSON.parse(savedHistory);
}

function saveData() {
    localStorage.setItem(CONFIG.STORAGE_PRODUCTS, JSON.stringify(AppState.products));
    localStorage.setItem(CONFIG.STORAGE_HISTORY, JSON.stringify(AppState.orderHistory));
}

function checkDailyReset() {
    const lastReset = localStorage.getItem(CONFIG.STORAGE_LAST_RESET);
    const now = new Date();
    const today = now.toDateString();
    
    if(lastReset !== today) {
        // New day - save current stats and reset quantities
        localStorage.setItem(CONFIG.STORAGE_LAST_RESET, today);
        console.log('📊 Daily reset performed - starting new aggregation');
    }
}

// ============ COUNTDOWN TIMER ============
function startCountdownTimer() {
    function updateTimer() {
        const now = new Date();
        const tomorrow = new Date(now);
        tomorrow.setHours(24, 0, 0, 0);
        
        const diff = tomorrow - now;
        const hours = Math.floor(diff / 3600000);
        const minutes = Math.floor((diff % 3600000) / 60000);
        const seconds = Math.floor((diff % 60000) / 1000);
        
        const formattedTime = `${String(hours).padStart(2, '0')}h ${String(minutes).padStart(2, '0')}m ${String(seconds).padStart(2, '0')}s`;
        const resetTime = tomorrow.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'});
        
        const timeElement = document.getElementById('countdownTime');
        const resetElement = document.getElementById('nextReset');
        const fillElement = document.getElementById('countdownFill');
        
        if(timeElement) timeElement.innerText = formattedTime;
        if(resetElement) resetElement.innerText = `Next reset: ${resetTime}`;
        if(fillElement) {
            const totalSeconds = 24 * 3600;
            const remainingSeconds = hours * 3600 + minutes * 60 + seconds;
            const percentage = (remainingSeconds / totalSeconds) * 100;
            fillElement.style.width = percentage + '%';
        }
    }
    
    updateTimer();
    setInterval(updateTimer, 1000);
}

// ============ TAB NAVIGATION ============
function switchTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));
    
    // Show selected tab
    const tabElement = document.getElementById(tabName + 'Tab');
    if(tabElement) tabElement.classList.add('active');
    
    event.target.classList.add('active');
    
    // Load specific content
    if(tabName === 'orders') {
        renderOrderTab();
    } else if(tabName === 'analytics') {
        setTimeout(() => renderAnalyticsTab('daily'), 100);
    } else if(tabName === 'history') {
        renderHistoryTab();
    }
}

// ============ ORDER TAB ============
function renderOrderTab() {
    renderItemsList();
    renderProductsList();
    updateTotal();
}

function renderItemsList() {
    const container = document.getElementById('orderItems');
    if(!container) return;
    
    container.innerHTML = '';
    
    AppState.products.filter(p => p.active).forEach((item, idx) => {
        const itemTotal = item.qty * item.price;
        const html = `
            <div class="item">
                <div style="border-left: 4px solid ${item.color}; padding-left: 12px; flex: 1;">
                    <div class="item-name">${item.name}</div>
                    <div class="item-price">₹${item.price}</div>
                </div>
                <div class="item-qty-controls">
                    <button class="qty-btn" onclick="handleQtyChange(${idx}, -1)">-</button>
                    <span class="qty-display">${item.qty}</span>
                    <button class="qty-btn" onclick="handleQtyChange(${idx}, 1)">+</button>
                </div>
                <div class="item-total">₹${itemTotal}</div>
            </div>
        `;
        container.innerHTML += html;
    });
}

function renderProductsList() {
    const container = document.getElementById('productsList');
    if(!container) return;
    
    container.innerHTML = '';
    
    AppState.products.forEach((product, idx) => {
        const statusClass = product.active ? 'active' : '';
        const html = `
            <div class="product-row">
                <div class="product-color" style="background: ${product.color}"></div>
                <div class="product-info">
                    <div class="product-name">${product.name}</div>
                    <div class="product-price">₹${product.price}</div>
                </div>
                <div class="product-status ${statusClass}" onclick="handleToggleProduct(${idx})">
                    <div></div>
                </div>
                <div class="product-actions">
                    <button class="edit-btn" onclick="handleEditProduct(${idx})">Edit</button>
                    <button class="color-btn" onclick="handleChangeColor(${idx})">Color</button>
                    <button class="delete-btn" onclick="handleDeleteProduct(${idx})">Delete</button>
                </div>
            </div>
        `;
        container.innerHTML += html;
    });
}

function updateTotal() {
    const total = AppState.products
        .filter(p => p.active)
        .reduce((sum, p) => sum + (p.qty * p.price), 0);
    const el = document.getElementById('totalDisplay');
    if(el) el.innerText = '₹' + total;
}

// ============ ORDER HANDLERS ============
function handleQtyChange(idx, amount) {
    AppState.products[idx].qty += amount;
    if(AppState.products[idx].qty < 0) AppState.products[idx].qty = 0;
    saveData();
    renderOrderTab();
}

function handleAddProduct() {
    const name = document.getElementById('productName').value;
    const price = document.getElementById('productPrice').value;
    const color = document.getElementById('productColor').value;
    
    if(!name || !price) {
        alert('Please fill all fields');
        return;
    }
    
    AppState.products.push({
        id: Date.now(),
        name,
        price: parseInt(price),
        qty: 0,
        active: true,
        color
    });
    
    document.getElementById('productName').value = '';
    document.getElementById('productPrice').value = '';
    document.getElementById('productColor').value = '#FF6B6B';
    
    saveData();
    renderOrderTab();
}

function handleToggleProduct(idx) {
    AppState.products[idx].active = !AppState.products[idx].active;
    saveData();
    renderOrderTab();
}

function handleEditProduct(idx) {
    const newName = prompt('Edit product name:', AppState.products[idx].name);
    if(newName) {
        AppState.products[idx].name = newName;
        saveData();
        renderOrderTab();
    }
}

function handleChangeColor(idx) {
    const newColor = prompt('Enter color (hex):', AppState.products[idx].color);
    if(newColor && /^#[0-9A-F]{6}$/i.test(newColor)) {
        AppState.products[idx].color = newColor;
        saveData();
        renderOrderTab();
    } else if(newColor) {
        alert('Invalid color format. Use hex (e.g., #FF6B6B)');
    }
}

function handleDeleteProduct(idx) {
    if(confirm('Delete this product?')) {
        AppState.products.splice(idx, 1);
        saveData();
        renderOrderTab();
    }
}

function handleSaveOrder() {
    const activeItems = AppState.products.filter(p => p.active && p.qty > 0);
    
    if(activeItems.length === 0) {
        alert('No items to save!');
        return;
    }
    
    const total = activeItems.reduce((sum, p) => sum + (p.qty * p.price), 0);
    
    const order = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        items: activeItems.map(p => ({
            name: p.name,
            price: p.price,
            qty: p.qty,
            color: p.color,
            amount: p.qty * p.price
        })),
        total
    };
    
    AppState.orderHistory.push(order);
    saveData();
    alert('✅ Order saved!');
    handleResetQty();
}

function handleResetQty() {
    AppState.products.forEach(p => p.qty = 0);
    saveData();
    renderOrderTab();
}

// ============ ANALYTICS TAB ============
function switchTimeframe(timeframe) {
    renderAnalyticsTab(timeframe);
}

function renderAnalyticsTab(timeframe) {
    const analyticsData = getAnalyticsData(timeframe);
    
    // Render stats
    renderStats(analyticsData);
    
    // Render charts
    renderCharts(analyticsData, timeframe);
    
    // Render lists
    renderTopAndLowProducts(analyticsData);
}

function getAnalyticsData(timeframe) {
    const now = new Date();
    let filtered = AppState.orderHistory;
    
    if(timeframe === 'daily') {
        filtered = AppState.orderHistory.filter(o => {
            const oDate = new Date(o.timestamp);
            return oDate.toDateString() === now.toDateString();
        });
    } else if(timeframe === 'weekly') {
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        filtered = AppState.orderHistory.filter(o => new Date(o.timestamp) >= weekAgo);
    } else if(timeframe === 'monthly') {
        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        filtered = AppState.orderHistory.filter(o => new Date(o.timestamp) >= monthAgo);
    }
    
    // Calculate stats
    let productStats = {};
    let dailyTotals = {};
    
    filtered.forEach(order => {
        const dateStr = new Date(order.timestamp).toLocaleDateString('en-US', {month: 'short', day: 'numeric'});
        dailyTotals[dateStr] = (dailyTotals[dateStr] || 0) + order.total;
        
        order.items.forEach(item => {
            if(!productStats[item.name]) {
                productStats[item.name] = {name: item.name, qty: 0, color: item.color};
            }
            productStats[item.name].qty += item.qty;
        });
    });
    
    const productArray = Object.values(productStats).sort((a, b) => b.qty - a.qty);
    
    return {
        totalRevenue: filtered.reduce((s, o) => s + o.total, 0),
        totalOrders: filtered.length,
        totalItems: filtered.reduce((s, o) => s + o.items.reduce((ss, i) => ss + i.qty, 0), 0),
        avgOrder: filtered.length > 0 ? Math.round(filtered.reduce((s, o) => s + o.total, 0) / filtered.length) : 0,
        topProducts: productArray.slice(0, 5),
        lowProducts: productArray.slice(-5).reverse(),
        dailyTotals,
        allProducts: productArray
    };
}

function renderStats(data) {
    const grid = document.getElementById('statsGrid');
    if(!grid) return;
    
    grid.innerHTML = `
        <div class="stat-card">
            <div class="stat-label">Revenue</div>
            <div class="stat-value">₹${data.totalRevenue}</div>
        </div>
        <div class="stat-card">
            <div class="stat-label">Orders</div>
            <div class="stat-value">${data.totalOrders}</div>
        </div>
        <div class="stat-card">
            <div class="stat-label">Items Sold</div>
            <div class="stat-value">${data.totalItems}</div>
        </div>
        <div class="stat-card">
            <div class="stat-label">Avg Order</div>
            <div class="stat-value">₹${data.avgOrder}</div>
        </div>
    `;
    
    // Update timeframe buttons
    document.querySelectorAll('.tf-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
}

function renderCharts(data) {
    // Total Sales Chart
    if(Object.keys(data.dailyTotals).length > 0) {
        renderChart('totalSalesChart', 'line', {
            labels: Object.keys(data.dailyTotals),
            datasets: [{
                label: 'Daily Sales',
                data: Object.values(data.dailyTotals),
                borderColor: '#667eea',
                backgroundColor: 'rgba(102, 126, 234, 0.1)',
                tension: 0.4,
                fill: true
            }]
        });
    }
    
    // Top Products Chart
    if(data.topProducts.length > 0) {
        renderChart('topProductsChart', 'bar', {
            labels: data.topProducts.map(p => p.name),
            datasets: [{
                label: 'Qty Sold',
                data: data.topProducts.map(p => p.qty),
                backgroundColor: data.topProducts.map(p => p.color)
            }]
        });
    }
    
    // Product Distribution Chart
    if(data.allProducts.length > 0) {
        renderChart('productDistChart', 'doughnut', {
            labels: data.allProducts.map(p => p.name),
            datasets: [{
                data: data.allProducts.map(p => p.qty),
                backgroundColor: data.allProducts.map(p => p.color)
            }]
        });
    }
}

function renderChart(canvasId, type, config) {
    const ctx = document.getElementById(canvasId);
    if(!ctx) return;
    
    if(AppState.charts[canvasId]) {
        AppState.charts[canvasId].destroy();
    }
    
    AppState.charts[canvasId] = new Chart(ctx, {
        type,
        data: config,
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {position: 'top'}
            },
            scales: type === 'line' || type === 'bar' ? {
                y: {beginAtZero: true}
            } : undefined
        }
    });
}

function renderTopAndLowProducts(data) {
    const topList = document.getElementById('topProductsList');
    const lowList = document.getElementById('lowProductsList');
    
    if(topList) {
        topList.innerHTML = data.topProducts.length > 0 
            ? data.topProducts.map(p => `
                <div class="list-item">
                    <div style="display: flex; align-items: center; gap: 10px; flex: 1;">
                        <div style="width: 12px; height: 12px; background: ${p.color}; border-radius: 3px;"></div>
                        <span class="list-item-name">${p.name}</span>
                    </div>
                    <span class="list-item-value">${p.qty}</span>
                </div>
            `).join('')
            : '<div class="empty-message">No data</div>';
    }
    
    if(lowList) {
        lowList.innerHTML = data.lowProducts.length > 0 
            ? data.lowProducts.map(p => `
                <div class="list-item">
                    <div style="display: flex; align-items: center; gap: 10px; flex: 1;">
                        <div style="width: 12px; height: 12px; background: ${p.color}; border-radius: 3px;"></div>
                        <span class="list-item-name">${p.name}</span>
                    </div>
                    <span class="list-item-value">${p.qty}</span>
                </div>
            `).join('')
            : '<div class="empty-message">No data</div>';
    }
}

// ============ HISTORY TAB ============
function renderHistoryTab() {
    const container = document.getElementById('historyList');
    if(!container) return;
    
    if(AppState.orderHistory.length === 0) {
        container.innerHTML = '<div class="empty-message">No orders saved yet</div>';
        return;
    }
    
    container.innerHTML = [...AppState.orderHistory].reverse().map((order, idx) => {
        const date = new Date(order.timestamp);
        const dateStr = date.toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric'});
        const timeStr = date.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'});
        
        const itemsHtml = order.items.map(item => `
            <div class="history-product">
                <div style="display: flex; align-items: center; gap: 8px;">
                    <div style="width: 10px; height: 10px; background: ${item.color}; border-radius: 2px;"></div>
                    <div>
                        <div class="history-product-name">${item.name}</div>
                        <div class="history-product-qty">Qty: ${item.qty}</div>
                    </div>
                </div>
                <div class="history-product-amount">₹${item.amount}</div>
            </div>
        `).join('');
        
        return `
            <div class="history-item">
                <div class="history-header">
                    <div class="history-timestamp">${dateStr} at ${timeStr}</div>
                    <div class="history-total">₹${order.total}</div>
                </div>
                <div class="history-products">
                    ${itemsHtml}
                </div>
            </div>
        `;
    }).join('');
}

function handleClearHistory() {
    if(confirm('Clear all history? This cannot be undone!')) {
        AppState.orderHistory = [];
        saveData();
        renderHistoryTab();
        alert('History cleared!');
    }
}

// ============ PAGE LOAD ============
document.addEventListener('DOMContentLoaded', initializeApp);
