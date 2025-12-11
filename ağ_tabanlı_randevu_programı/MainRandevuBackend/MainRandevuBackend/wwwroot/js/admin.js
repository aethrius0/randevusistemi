const API_URL = "https://localhost:7041/api";

let currentAdmin = null;
let allAppointments = [];
let currentFilter = "all";

// Sayfa yüklendiğinde
document.addEventListener("DOMContentLoaded", function () {
    checkAdmin();
    setupNavigation();
    setupFilters();
});

// Admin kontrolü
function checkAdmin() {
    const adminJson = localStorage.getItem("admin");
    
    if (!adminJson) {
        window.location.href = "admin-login.html";
        return;
    }
    
    try {
        currentAdmin = JSON.parse(adminJson);
        updateAdminInfo();
        loadAppointments();
        loadCustomers();
    } catch (e) {
        console.error("Admin bilgisi okunamadı:", e);
        localStorage.removeItem("admin");
        window.location.href = "admin-login.html";
    }
}

// Admin bilgilerini güncelle
function updateAdminInfo() {
    document.getElementById("branchName").textContent = currentAdmin.branchName || "Şube";
    document.getElementById("adminName").textContent = currentAdmin.name || "Admin";
    document.getElementById("profileName").textContent = currentAdmin.name || "Admin";
    document.getElementById("profileEmail").textContent = currentAdmin.email || "";
    document.getElementById("profileBranch").textContent = currentAdmin.branchName || "-";
}

// Navigasyon
function setupNavigation() {
    const navItems = document.querySelectorAll(".nav-item");
    
    navItems.forEach(item => {
        item.addEventListener("click", function (e) {
            e.preventDefault();
            
            // Aktif nav item'ı değiştir
            navItems.forEach(nav => nav.classList.remove("active"));
            this.classList.add("active");
            
            // Tab'ı değiştir
            const tabName = this.dataset.tab;
            showTab(tabName);
        });
    });
}

// Tab göster
function showTab(tabName) {
    const tabs = document.querySelectorAll(".tab-content");
    tabs.forEach(tab => tab.classList.remove("active"));
    
    const targetTab = document.getElementById(tabName + "Tab");
    if (targetTab) {
        targetTab.classList.add("active");
    }
    
    // Başlığı güncelle
    const titles = {
        appointments: "Randevular",
        customers: "Müşteriler",
        profile: "Profil"
    };
    document.getElementById("pageTitle").textContent = titles[tabName] || tabName;
}

// Filtreler
function setupFilters() {
    const filterBtns = document.querySelectorAll(".filter-btn");
    
    filterBtns.forEach(btn => {
        btn.addEventListener("click", function () {
            filterBtns.forEach(b => b.classList.remove("active"));
            this.classList.add("active");
            
            currentFilter = this.dataset.filter;
            renderAppointments();
        });
    });
}

// Randevuları yükle
async function loadAppointments() {
    const listDiv = document.getElementById("appointmentsList");
    listDiv.innerHTML = '<p class="loading">Yükleniyor...</p>';
    
    try {
        const branchName = encodeURIComponent(currentAdmin.branchName);
        const res = await fetch(`${API_URL}/admin/appointments/${branchName}`);
        
        if (!res.ok) throw new Error("Randevular yüklenemedi");
        
        allAppointments = await res.json();
        updateStats();
        renderAppointments();
    } catch (err) {
        console.error("Hata:", err);
        listDiv.innerHTML = '<p class="empty-message">⚠️ Randevular yüklenemedi</p>';
    }
}

// İstatistikleri güncelle
function updateStats() {
    const total = allAppointments.length;
    const pending = allAppointments.filter(a => a.status === "Beklemede").length;
    const approved = allAppointments.filter(a => a.status === "Onaylandı").length;
    const rejected = allAppointments.filter(a => a.status === "Reddedildi").length;
    
    document.getElementById("totalAppointments").textContent = total;
    document.getElementById("pendingAppointments").textContent = pending;
    document.getElementById("approvedAppointments").textContent = approved;
    document.getElementById("rejectedAppointments").textContent = rejected;
}

// Randevuları render et
function renderAppointments() {
    const listDiv = document.getElementById("appointmentsList");
    
    let filtered = allAppointments;
    if (currentFilter !== "all") {
        filtered = allAppointments.filter(a => a.status === currentFilter);
    }
    
    if (filtered.length === 0) {
        listDiv.innerHTML = '<p class="empty-message">📭 Gösterilecek randevu yok</p>';
        return;
    }
    
    listDiv.innerHTML = filtered.map(app => `
        <div class="appointment-card">
            <div class="appointment-info">
                <div class="appointment-header">
                    <span class="appointment-plate">🚗 ${app.carPlate}</span>
                    <span class="appointment-status ${getStatusClass(app.status)}">${app.status}</span>
                </div>
                <div class="appointment-details">
                    <span class="appointment-detail">✨ ${app.serviceType}</span>
                    <span class="appointment-detail">📅 ${formatDate(app.appointmentTime)}</span>
                    <span class="appointment-detail appointment-price">💰 ₺${app.price || 0}</span>
                </div>
                <div class="customer-info">
                    👤 ${app.userName} | 📧 ${app.userEmail} | 📱 ${app.userPhone || '-'}
                </div>
            </div>
            <div class="appointment-actions">
                ${app.status === "Beklemede" ? `
                    <button class="action-btn approve" onclick="updateStatus(${app.id}, 'Onaylandı')">✅ Onayla</button>
                    <button class="action-btn reject" onclick="updateStatus(${app.id}, 'Reddedildi')">❌ Reddet</button>
                ` : ''}
            </div>
        </div>
    `).join("");
}

// Status class
function getStatusClass(status) {
    switch (status) {
        case "Beklemede": return "beklemede";
        case "Onaylandı": return "onaylandi";
        case "Reddedildi": return "reddedildi";
        default: return "";
    }
}

// Tarih formatla
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Randevu durumunu güncelle
async function updateStatus(id, status) {
    try {
        const res = await fetch(`${API_URL}/admin/appointments/${id}/status`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status })
        });
        
        if (!res.ok) throw new Error("Güncelleme başarısız");
        
        // Listeyi yenile
        loadAppointments();
        
        alert(`✅ Randevu ${status.toLowerCase()} olarak güncellendi!`);
    } catch (err) {
        console.error("Hata:", err);
        alert("❌ Güncelleme sırasında bir hata oluştu");
    }
}

// Müşterileri yükle
async function loadCustomers() {
    const listDiv = document.getElementById("customersList");
    listDiv.innerHTML = '<p class="loading">Yükleniyor...</p>';
    
    try {
        const branchName = encodeURIComponent(currentAdmin.branchName);
        const res = await fetch(`${API_URL}/admin/customers/${branchName}`);
        
        if (!res.ok) throw new Error("Müşteriler yüklenemedi");
        
        const customers = await res.json();
        renderCustomers(customers);
    } catch (err) {
        console.error("Hata:", err);
        listDiv.innerHTML = '<p class="empty-message">⚠️ Müşteriler yüklenemedi</p>';
    }
}

// Müşterileri render et
function renderCustomers(customers) {
    const listDiv = document.getElementById("customersList");
    
    if (customers.length === 0) {
        listDiv.innerHTML = '<p class="empty-message">👥 Henüz müşteri yok</p>';
        return;
    }
    
    listDiv.innerHTML = customers.map(c => `
        <div class="customer-card">
            <div class="customer-card-header">
                <div class="customer-avatar">👤</div>
                <div>
                    <div class="customer-name">${c.name}</div>
                    <div class="customer-email">${c.email}</div>
                </div>
            </div>
            <div class="customer-details">
                <div class="customer-detail">📱 ${c.phone || 'Belirtilmemiş'}</div>
                <div class="customer-detail">📋 ${c.appointmentCount} randevu</div>
            </div>
        </div>
    `).join("");
}

// Çıkış yap
function logout() {
    localStorage.removeItem("admin");
    window.location.href = "admin-login.html";
}
