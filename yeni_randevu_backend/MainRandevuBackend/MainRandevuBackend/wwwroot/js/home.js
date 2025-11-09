const user = JSON.parse(localStorage.getItem("user"));
if (!user) window.location.href = "login.html";

document.getElementById("welcomeText").textContent = `Hoş geldin, ${user.name || "Kullanıcı"}!`;

const map = L.map('map').setView([41.0082, 28.9784], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '© OpenStreetMap' }).addTo(map);

L.marker([41.015, 28.98]).addTo(map).bindPopup("AutoWash Noktası - Beşiktaş").openPopup();

document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("user");
    window.location.href = "login.html";
});
