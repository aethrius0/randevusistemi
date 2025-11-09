const user = JSON.parse(localStorage.getItem("user"));
if (!user) window.location.href = "login.html";

document.getElementById("userName").textContent = "Ad: " + (user.name || "Bilinmiyor");
document.getElementById("userEmail").textContent = "E-posta: " + (user.email || "Yok");
document.getElementById("userPhone").textContent = "Telefon: " + (user.phone || "-");

document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("user");
    window.location.href = "login.html";
});
