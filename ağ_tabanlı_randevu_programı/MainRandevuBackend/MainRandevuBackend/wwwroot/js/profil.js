// Kullanıcı kontrolü ve yönlendirme
function checkUser() {
    const userJson = localStorage.getItem("user");

    if (!userJson) {
        window.location.href = "login.html";
        return null;
    }

    try {
        const user = JSON.parse(userJson);
        return user;
    } catch (e) {
        console.error("Kullanıcı bilgisi okunamadı:", e);
        localStorage.removeItem("user");
        window.location.href = "login.html";
        return null;
    }
}

// Sayfa yüklendiğinde çalışacak
document.addEventListener("DOMContentLoaded", function () {
    const user = checkUser();
    if (!user) return;

    // Navbar'daki kullanıcı adını güncelle
    const welcomeUserSpan = document.getElementById("welcomeUser");
    if (welcomeUserSpan && user.name) {
        welcomeUserSpan.textContent = user.name;
    }

    // Profil bilgilerini doldur
    document.getElementById("userName").textContent = "Ad: " + (user.name || "Bilinmiyor");
    document.getElementById("userEmail").textContent = "E-posta: " + (user.email || "Yok");
    document.getElementById("userPhone").textContent = "Telefon: " + (user.phone || "-");
});

// Navbar'daki çıkış butonu
function logout() {
    localStorage.removeItem("user");
    window.location.href = "login.html";
}

// Profil kartındaki çıkış butonu
document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("user");
    window.location.href = "login.html";
});