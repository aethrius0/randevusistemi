document.addEventListener("DOMContentLoaded", function () {
    const userJson = localStorage.getItem("user");
    if (!userJson) {
        // Login yoksa geri yolla
        window.location.href = "login.html";
        return;
    }

    try {
        const user = JSON.parse(userJson);
        const nameSpan = document.getElementById("welcomeUser");
        if (nameSpan && user && user.name) {
            nameSpan.textContent = user.name;
        }
    } catch (e) {
        console.error("Kullanıcı bilgisi okunamadı:", e);
        localStorage.removeItem("user");
        window.location.href = "login.html";
    }
    
    // Haritayı başlat
    initMap();
});

// Türkiye Haritası
function initMap() {
    // Harita container'ı var mı kontrol et
    const mapContainer = document.getElementById('turkeyMap');
    if (!mapContainer) return;
    
    // Türkiye merkezli harita oluştur
    const map = L.map('turkeyMap').setView([39.0, 35.0], 6);
    
    // OpenStreetMap tile layer ekle
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap'
    }).addTo(map);
    
    // Özel marker ikonu
    const carWashIcon = L.divIcon({
        className: 'custom-marker',
        html: '<div class="marker-pin">🚗</div>',
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40]
    });
    
    // Oto yıkama noktaları
    const carWashLocations = [
        {
            name: 'Self CarWash Şanlıurfa',
            lat: 37.1674,
            lng: 38.7955,
            rating: '5.0',
            price: '₺150'
        },
        {
            name: 'Self CarWash Tekirdağ',
            lat: 40.9833,
            lng: 27.5167,
            rating: '4.9',
            price: '₺180'
        },
        {
            name: 'Self CarWash İstanbul',
            lat: 41.0082,
            lng: 28.9784,
            rating: '4.5',
            price: '₺200'
        },
        {
            name: 'Self CarWash Ankara',
            lat: 39.9334,
            lng: 32.8597,
            rating: '4.7',
            price: '₺170'
        }
    ];
    
    // Her lokasyon için marker ekle
    carWashLocations.forEach(location => {
        const marker = L.marker([location.lat, location.lng], { icon: carWashIcon })
            .addTo(map);
        
        // Popup içeriği
        const popupContent = `
            <div class="map-popup">
                <h4>${location.name}</h4>
                <p>⭐ ${location.rating} | ${location.price}'den başlayan fiyatlarla..</p>
                <button onclick="goToAppointment('${location.name}')" class="popup-btn">
                    Randevu Al
                </button>
            </div>
        `;
        
        marker.bindPopup(popupContent);
    });
}

function logout() {
    localStorage.removeItem("user");
    window.location.href = "login.html";
}

function goToAppointment(carWashName) {
    // Seçilen oto yıkamacıyı localStorage'a kaydet
    localStorage.setItem("selectedCarWash", carWashName);
    window.location.href = "randevular.html";
}
