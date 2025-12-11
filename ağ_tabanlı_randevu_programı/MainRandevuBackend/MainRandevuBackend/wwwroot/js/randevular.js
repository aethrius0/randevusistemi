const API_URL = "https://localhost:7041/api";

const form = document.getElementById("randevuForm");
const list = document.getElementById("randevuList");

// Modal için global değişkenler
let currentEditId = null;
let currentAppointments = [];

// Sayfa açıldığında
document.addEventListener("DOMContentLoaded", function () {
    checkAndLoadUser();
    loadAppointments();
    
    // Anasayfadan seçilen oto yıkamacı varsa direkt formu aç
    const selectedCarWash = localStorage.getItem("selectedCarWash");
    if (selectedCarWash) {
        selectCarWash(selectedCarWash);
        localStorage.removeItem("selectedCarWash"); // Kullanıldıktan sonra sil
    }
    
    // Modal dışına tıklayınca kapat
    document.getElementById("createModal").addEventListener("click", function(e) {
        if (e.target === this) {
            closeCreateModal();
        }
    });
    
    // ESC tuşu ile modalı kapat
    document.addEventListener("keydown", function(e) {
        if (e.key === "Escape") {
            closeCreateModal();
            closeEditModal();
        }
    });
});

// Kullanıcı kontrolü ve navbar güncelleme
function checkAndLoadUser() {
    const userJson = localStorage.getItem("user");

    if (!userJson) {
        window.location.href = "login.html";
        return null;
    }

    try {
        const user = JSON.parse(userJson);

        // Navbar'daki kullanıcı adını güncelle
        const welcomeUserSpan = document.getElementById("welcomeUser");
        if (welcomeUserSpan && user.name) {
            welcomeUserSpan.textContent = user.name;
        }

        return user;
    } catch (error) {
        console.error("User parse hatası:", error);
        localStorage.removeItem("user");
        window.location.href = "login.html";
        return null;
    }
}

// Kullanıcı bilgisi getir
function getUser() {
    const userJson = localStorage.getItem("user");

    if (!userJson) {
        alert("Kullanıcı girişi yapılmamış! Login sayfasına yönlendiriliyorsunuz.");
        window.location.href = "login.html";
        return null;
    }

    try {
        const user = JSON.parse(userJson);

        if (!user.id) {
            alert("Kullanıcı ID bulunamadı! Lütfen tekrar giriş yapın.");
            window.location.href = "login.html";
            return null;
        }

        return user;
    } catch (error) {
        console.error("User parse hatası:", error);
        alert("Kullanıcı bilgisi hatalı! Lütfen tekrar giriş yapın.");
        window.location.href = "login.html";
        return null;
    }
}

// Navbar çıkış fonksiyonu
function logout() {
    localStorage.removeItem("user");
    window.location.href = "login.html";
}

// Oto yıkamacı bilgileri
const carWashData = {
    'Self CarWash Şanlıurfa': {
        image: 'images/carwash.jpg',
        location: 'Şanlıurfa',
        rating: '5.0',
        prices: {
            'Dış Yıkama-Köpük': 150,
            'Detaylı Temizlik': 350,
            'Seramik Kaplama': 1200,
            'Pasta Cila': 800,
            'Motor Temizliği': 250
        }
    },
    'Self CarWash Tekirdağ': {
        image: 'images/carwash2.jpg',
        location: 'Tekirdağ',
        rating: '4.9',
        prices: {
            'Dış Yıkama-Köpük': 180,
            'Detaylı Temizlik': 400,
            'Seramik Kaplama': 1400,
            'Pasta Cila': 900,
            'Motor Temizliği': 300
        }
    },
    'Self CarWash İstanbul': {
        image: 'images/carwash3.jpg',
        location: 'İstanbul',
        rating: '4.5',
        prices: {
            'Dış Yıkama-Köpük': 200,
            'Detaylı Temizlik': 450,
            'Seramik Kaplama': 1600,
            'Pasta Cila': 1000,
            'Motor Temizliği': 350
        }
    },
    'Self CarWash Ankara': {
        image: 'images/carwash4.jpg',
        location: 'Ankara',
        rating: '4.7',
        prices: {
            'Dış Yıkama-Köpük': 170,
            'Detaylı Temizlik': 380,
            'Seramik Kaplama': 1300,
            'Pasta Cila': 850,
            'Motor Temizliği': 280
        }
    }
};

// Seçili oto yıkamacı
let selectedCarWashName = '';

// Oto yıkamacı seçimi - Modal aç
function selectCarWash(name) {
    const data = carWashData[name];
    selectedCarWashName = name;
    
    // Modal bilgilerini güncelle
    document.getElementById("carWashName").value = name;
    document.getElementById("createModalImage").src = data.image;
    document.getElementById("createModalName").textContent = name;
    document.getElementById("createModalLocation").textContent = "📍 " + data.location;
    document.getElementById("createModalRating").textContent = "⭐ " + data.rating;
    
    // Hizmet seçeneklerini fiyatlarla güncelle
    updateServiceOptions(data.prices);
    
    // Fiyat göstergesini sıfırla
    document.getElementById("selectedPrice").textContent = "Hizmet seçin";
    document.getElementById("selectedPrice").classList.remove("has-price");
    
    // Modalı aç
    document.getElementById("createModal").classList.add("active");
    document.body.style.overflow = "hidden";
}

// Hizmet seçeneklerini fiyatlarla güncelle
function updateServiceOptions(prices) {
    const select = document.getElementById("serviceType");
    select.innerHTML = '<option value="">Hizmet Seçin</option>';
    
    for (const [service, price] of Object.entries(prices)) {
        const option = document.createElement("option");
        option.value = service;
        option.textContent = `${service} - ₺${price}`;
        option.setAttribute("data-price", price.toString());
        select.appendChild(option);
    }
    console.log("Hizmet seçenekleri güncellendi:", prices);
}

// Hizmet seçildiğinde fiyatı göster
function onServiceChange() {
    const select = document.getElementById("serviceType");
    const priceDisplay = document.getElementById("selectedPrice");
    const selectedOption = select.options[select.selectedIndex];
    
    if (selectedOption && selectedOption.dataset.price) {
        priceDisplay.textContent = `₺${selectedOption.dataset.price}`;
        priceDisplay.classList.add("has-price");
    } else {
        priceDisplay.textContent = "Hizmet seçin";
        priceDisplay.classList.remove("has-price");
    }
}

// DÜZENLEME: Oto yıkamacı değiştiğinde hizmet seçeneklerini güncelle
function onEditCarWashChange() {
    const carWashName = document.getElementById("editCarWashName").value;
    const serviceSelect = document.getElementById("editServiceType");
    const priceDisplay = document.getElementById("editSelectedPrice");
    
    if (!carWashName || !carWashData[carWashName]) {
        serviceSelect.innerHTML = '<option value="">Önce oto yıkamacı seçin</option>';
        priceDisplay.textContent = "Hizmet seçin";
        priceDisplay.classList.remove("has-price");
        return;
    }
    
    const prices = carWashData[carWashName].prices;
    serviceSelect.innerHTML = '<option value="">Hizmet Seçin</option>';
    
    for (const [service, price] of Object.entries(prices)) {
        const option = document.createElement("option");
        option.value = service;
        option.textContent = `${service} - ₺${price}`;
        option.dataset.price = price;
        serviceSelect.appendChild(option);
    }
    
    priceDisplay.textContent = "Hizmet seçin";
    priceDisplay.classList.remove("has-price");
}

// DÜZENLEME: Hizmet seçildiğinde fiyatı göster
function onEditServiceChange() {
    const select = document.getElementById("editServiceType");
    const priceDisplay = document.getElementById("editSelectedPrice");
    const selectedOption = select.options[select.selectedIndex];
    
    if (selectedOption && selectedOption.dataset.price) {
        priceDisplay.textContent = `₺${selectedOption.dataset.price}`;
        priceDisplay.classList.add("has-price");
    } else {
        priceDisplay.textContent = "Hizmet seçin";
        priceDisplay.classList.remove("has-price");
    }
}

// Seçili fiyatı al (edit modal için)
function getEditSelectedPrice() {
    const select = document.getElementById("editServiceType");
    const selectedOption = select.options[select.selectedIndex];
    return selectedOption && selectedOption.dataset.price ? parseFloat(selectedOption.dataset.price) : 0;
}

// Modal kapat
function closeCreateModal() {
    document.getElementById("createModal").classList.remove("active");
    document.body.style.overflow = "";
    
    // Formu temizle
    document.getElementById("randevuForm").reset();
    document.getElementById("carWashName").value = "";
}

// Geri dön (artık kullanılmıyor ama uyumluluk için)
function goBackToCarWash() {
    closeCreateModal();
}

// Yeni randevu ekleme
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const user = getUser();
    if (!user) return;

    const plate = document.getElementById("carPlate").value;
    const type = document.getElementById("serviceType").value;
    const date = document.getElementById("appointmentDate").value;
    const hour = document.getElementById("appointmentHour").value;
    const carWashName = document.getElementById("carWashName").value;
    
    // Fiyatı direkt carWashData'dan al
    const price = carWashData[carWashName]?.prices[type] || 0;
    
    // Tarih ve saati birleştir
    const time = `${date}T${hour}:00`;

    const newApp = {
        carPlate: plate,
        serviceType: type,
        appointmentTime: time,
        carWashName: carWashName,
        price: price,
        userId: user.id
    };

    console.log("Gönderilen randevu:", newApp);

    try {
        const response = await fetch(`${API_URL}/Randevu`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newApp)
        });

        if (response.ok) {
            alert("✅ Randevu başarıyla oluşturuldu!");
            form.reset();
            goBackToCarWash();
            loadAppointments();
        } else {
            const errorText = await response.text();
            console.error("API Hatası:", errorText);
            alert("❌ Hata oluştu: " + errorText);
        }
    } catch (error) {
        alert("⚠️ Backend çalışmıyor olabilir.");
        console.error(error);
    }
});

// Kullanıcıya özel randevu çekme
async function loadAppointments() {
    list.innerHTML = "<p style='text-align: center; padding: 20px; color: #6b7280;'>Yükleniyor...</p>";

    try {
        const user = JSON.parse(localStorage.getItem("user"));

        if (!user || !user.id) {
            window.location.href = "login.html";
            return;
        }

        const userId = user.id;
        console.log("User ID:", userId);

        const response = await fetch(`${API_URL}/Randevu/${userId}`);
        console.log("Response status:", response.status);

        if (!response.ok) throw new Error("Veriler alınamadı.");

        const appointments = await response.json();
        console.log("Randevular:", appointments);
        
        // Randevuları global değişkene kaydet (düzenleme için)
        currentAppointments = appointments;

        // Randevu sayısını güncelle
        updateAppointmentCount(appointments.length);

        renderList(appointments);
    } catch (error) {
        list.innerHTML = "<p style='text-align: center; padding: 20px; color: #ef4444;'>⚠️ Randevular yüklenemedi.</p>";
        console.error("Hata:", error);
    }
}

// Randevu sayısını güncelle
function updateAppointmentCount(count) {
    const badge = document.getElementById("randevuCount");
    if (badge) {
        badge.textContent = count === 0 ? "Randevu Yok" : `${count} Randevu`;
    }
}

// Tarihi formatla
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return date.toLocaleDateString('tr-TR', options);
}

// Listeleme
function renderList(appointments) {
    list.innerHTML = "";

    if (appointments.length === 0) {
        list.innerHTML = "";
        return;
    }

    appointments.forEach(app => {
        const div = document.createElement("div");
        div.className = "randevu-item";
        
        // Status badge class
        let statusClass = "status-beklemede";
        let statusText = app.status || "Beklemede";
        if (statusText === "Onaylandı") statusClass = "status-onaylandi";
        else if (statusText === "Reddedildi") statusClass = "status-reddedildi";

        div.innerHTML = `
            <div class="randevu-info">
                <div class="randevu-header-row">
                    <div class="randevu-carwash">${app.carWashName || 'Belirtilmemiş'}</div>
                    <span class="randevu-status ${statusClass}">${statusText}</span>
                </div>
                <div class="randevu-plaka">${app.carPlate}</div>
                <div class="randevu-detay">${app.serviceType}</div>
                <div class="randevu-zaman">${formatDate(app.appointmentTime)}</div>
                <div class="randevu-price">💰 ₺${app.price || 0}</div>
            </div>
            <div class="randevu-buttons">
                <button onclick="editAppointment(${app.id})">Düzenle</button>
                <button onclick="deleteAppointment(${app.id})">Sil</button>
            </div>
        `;

        list.appendChild(div);
    });
}

// Randevu silme
async function deleteAppointment(id) {
    if (!confirm("🗑️ Bu randevuyu silmek istediğinize emin misiniz?")) return;

    try {
        const res = await fetch(`${API_URL}/Randevu/${id}`, {
            method: "DELETE"
        });

        if (res.ok) {
            alert("✅ Randevu başarıyla silindi!");
            loadAppointments();
        } else {
            alert("❌ Randevu silinemedi!");
        }
    } catch (error) {
        alert("⚠️ Sunucuya bağlanılamadı.");
        console.error(error);
    }
}

// Modal aç/kapa fonksiyonları
function openEditModal(id) {
    const user = getUser();
    if (!user) return;
    
    // Randevuyu bul
    const appointment = currentAppointments.find(app => app.id === id);
    if (!appointment) {
        alert("❌ Randevu bulunamadı!");
        return;
    }
    
    currentEditId = id;
    
    // Formu doldur
    document.getElementById("editAppointmentId").value = id;
    document.getElementById("editCarWashName").value = appointment.carWashName || "";
    document.getElementById("editCarPlate").value = appointment.carPlate || "";
    
    // Önce oto yıkamacıya göre hizmet seçeneklerini yükle
    onEditCarWashChange();
    
    // Sonra mevcut hizmeti seç
    document.getElementById("editServiceType").value = appointment.serviceType || "";
    
    // Fiyatı göster
    onEditServiceChange();
    
    // Tarih ve saati ayır
    const dateTime = new Date(appointment.appointmentTime);
    const dateStr = dateTime.toISOString().split('T')[0];
    const hours = dateTime.getHours().toString().padStart(2, '0');
    const minutes = dateTime.getMinutes() >= 30 ? '30' : '00';
    const timeStr = `${hours}:${minutes}`;
    
    document.getElementById("editDate").value = dateStr;
    document.getElementById("editHour").value = timeStr;
    
    // Modalı göster
    document.getElementById("editModal").classList.add("active");
}

function closeEditModal() {
    document.getElementById("editModal").classList.remove("active");
    currentEditId = null;
}

// Modal dışına tıklayınca kapat
document.addEventListener("click", function(e) {
    const modal = document.getElementById("editModal");
    if (e.target === modal) {
        closeEditModal();
    }
});

// Edit form submit
document.getElementById("editForm").addEventListener("submit", async function(e) {
    e.preventDefault();
    
    const user = getUser();
    if (!user || !currentEditId) return;
    
    const carWashName = document.getElementById("editCarWashName").value;
    const carPlate = document.getElementById("editCarPlate").value;
    const serviceType = document.getElementById("editServiceType").value;
    const price = getEditSelectedPrice();
    const date = document.getElementById("editDate").value;
    const hour = document.getElementById("editHour").value;
    
    const appointmentTime = `${date}T${hour}:00`;
    
    try {
        const updated = {
            carPlate: carPlate,
            serviceType: serviceType,
            appointmentTime: appointmentTime,
            carWashName: carWashName,
            price: price,
            userId: user.id
        };

        const res = await fetch(`${API_URL}/Randevu/${currentEditId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updated)
        });

        if (res.ok) {
            alert("✅ Randevu başarıyla güncellendi!");
            closeEditModal();
            loadAppointments();
        } else {
            const errorText = await res.text();
            console.error("Güncelleme hatası:", errorText);
            alert("❌ Güncellenemedi: " + errorText);
        }
    } catch (error) {
        alert("⚠️ Sunucuya bağlanılamadı.");
        console.error(error);
    }
});

// Düzenleme (eski fonksiyon - artık modal açar)
function editAppointment(id) {
    openEditModal(id);
}