const API_URL = "https://localhost:7041/api/Randevu";

const form = document.getElementById("randevuForm");
const list = document.getElementById("randevuList");

// Sayfa açıldığında randevuları getir
document.addEventListener("DOMContentLoaded", loadAppointments);

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const plate = document.getElementById("carPlate").value;
    const type = document.getElementById("serviceType").value;
    const time = document.getElementById("appointmentTime").value;

    const newApp = {
        carPlate: plate,
        serviceType: type,
        appointmentTime: time,
        userId: 1 // Şimdilik test için sabit, login gelince değiştirilebilir
    };

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newApp)
        });

        if (response.ok) {
            alert("Randevu başarıyla oluşturuldu!");
            form.reset();
            loadAppointments(); // Listeyi yenile
        } else {
            const err = await response.text();
            alert("Bir hata oluştu: " + err);
        }
    } catch (error) {
        console.error("Hata:", error);
        alert("API'ye bağlanılamadı. Backend çalışıyor mu?");
    }
});

// 🧩 Randevuları backend'den çek
async function loadAppointments() {
    list.innerHTML = "<p>Yükleniyor...</p>";

    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Veriler alınamadı.");

        const appointments = await response.json();
        renderList(appointments);
    } catch (error) {
        list.innerHTML = "<p>Randevular yüklenemedi.</p>";
        console.error("Hata:", error);
    }
}

// 📋 Listeleme + Butonlar
function renderList(appointments) {
    list.innerHTML = "";
    if (appointments.length === 0) {
        list.innerHTML = "<p>Henüz randevu bulunmuyor.</p>";
        return;
    }

    appointments.forEach(app => {
        const div = document.createElement("div");
        div.className = "randevu-item";

        div.innerHTML = `
            <span><b>${app.carPlate}</b> - ${app.serviceType} (${app.appointmentTime})</span>
            <div class="randevu-buttons">
                <button class="edit-btn" onclick="editAppointment(${app.id})">Düzenle</button>
                <button class="delete-btn" onclick="deleteAppointment(${app.id})">Sil</button>
            </div>
        `;
        list.appendChild(div);
    });
}

// 🗑️ Randevu Silme
async function deleteAppointment(id) {
    if (!confirm("Bu randevuyu silmek istediğine emin misin?")) return;

    try {
        const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });

        if (res.ok) {
            alert("Randevu silindi!");
            loadAppointments();
        } else {
            alert("Silme başarısız!");
        }
    } catch (error) {
        console.error("Silme hatası:", error);
        alert("Sunucuya ulaşılamadı!");
    }
}

// ✏️ Randevu Güncelleme
async function editAppointment(id) {
    const newService = prompt("Yeni hizmet türünü gir:", "İç-Dış Yıkama");
    const newDate = prompt("Yeni tarih (YYYY-AA-GG HH:MM):", "2025-11-10 10:00");

    if (!newService || !newDate) return;

    const formattedDate = newDate.replace(" ", "T") + ":00";

    try {
        // 🧠 önce mevcut randevuyu backend'den çek
        const getRes = await fetch(`${API_URL}`);
        const all = await getRes.json();
        const app = all.find(a => a.id === id);

        if (!app) {
            alert("Randevu bulunamadı.");
            return;
        }

        const updated = {
            carPlate: app.carPlate, // mevcut plaka korunur
            serviceType: newService,
            appointmentTime: formattedDate,
            userId: app.userId || 1
        };

        const res = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updated)
        });

        if (res.ok) {
            alert("Randevu güncellendi!");
            loadAppointments();
        } else {
            const err = await res.text();
            alert("Güncelleme başarısız: " + err);
        }
    } catch (error) {
        console.error("Güncelleme hatası:", error);
        alert("Sunucuya ulaşılamadı!");
    }
}
