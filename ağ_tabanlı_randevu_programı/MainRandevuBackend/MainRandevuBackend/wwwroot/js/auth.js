const API_URL = "https://localhost:7041/api";

const loginForm = document.getElementById("login");
const registerForm = document.getElementById("register");
const forgotPasswordForm = document.getElementById("forgotPassword");

const loginSection = document.getElementById("loginForm");
const registerSection = document.getElementById("registerForm");
const forgotSection = document.getElementById("forgotForm");

const errorMessage = document.getElementById("errorMessage");
const registerError = document.getElementById("registerError");
const registerSuccess = document.getElementById("registerSuccess");
const forgotError = document.getElementById("forgotError");
const forgotSuccess = document.getElementById("forgotSuccess");

// Form geçişleri
document.getElementById("toRegister").addEventListener("click", showRegister);
document.getElementById("toLogin").addEventListener("click", showLogin);
document.getElementById("toLoginLink").addEventListener("click", showLogin);

// Şifremi unuttum geçişleri
document.querySelector(".forgot").addEventListener("click", showForgot);
document.getElementById("forgotToLogin").addEventListener("click", showLogin);
document.getElementById("forgotToLoginLink").addEventListener("click", showLogin);

function showRegister() {
    loginSection.classList.add("hidden");
    registerSection.classList.remove("hidden");
    forgotSection.classList.add("hidden");
}

function showLogin() {
    registerSection.classList.add("hidden");
    loginSection.classList.remove("hidden");
    forgotSection.classList.add("hidden");
}

function showForgot() {
    loginSection.classList.add("hidden");
    registerSection.classList.add("hidden");
    forgotSection.classList.remove("hidden");
}

// Yardımcı: mesaj göster
function showMessage(element, text, type = "error") {
    element.textContent = text;
    element.classList.remove("hidden");
    element.className = `message ${type}`;
}

// Yardımcı: mesaj gizle
function hideMessage(...elements) {
    elements.forEach(el => el.classList.add("hidden"));
}

// Giriş işlemi
loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    hideMessage(errorMessage);

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
        const res = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Giriş başarısız");

        localStorage.setItem("user", JSON.stringify(data));
        window.location.href = "home.html";
    } catch (err) {
        showMessage(errorMessage, err.message);
    }
});

// Kayıt işlemi
registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    hideMessage(registerError, registerSuccess);

    const { regName, regEmail, regPhone, regPassword } = e.target;

    try {
        const res = await fetch(`${API_URL}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: regName.value,
                email: regEmail.value,
                phone: regPhone.value,
                passwordHash: regPassword.value,
            }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Kayıt başarısız");

        showMessage(registerSuccess, "Kayıt başarılı! Giriş yapabilirsiniz.", "success");
        setTimeout(() => showLogin(), 2000);
    } catch (err) {
        showMessage(registerError, err.message);
    }
});

// Şifre sıfırlama işlemi
forgotPasswordForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    hideMessage(forgotError, forgotSuccess);

    const email = document.getElementById("forgotEmail").value;
    const newPassword = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Şifre eşleşme kontrolü
    if (newPassword !== confirmPassword) {
        showMessage(forgotError, "Şifreler eşleşmiyor!");
        return;
    }

    try {
        const res = await fetch(`${API_URL}/auth/reset-password`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: email,
                newPassword: newPassword
            }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Şifre sıfırlama başarısız");

        showMessage(forgotSuccess, "Şifreniz başarıyla güncellendi! Giriş yapabilirsiniz.", "success");
        forgotPasswordForm.reset();
        setTimeout(() => showLogin(), 2000);
    } catch (err) {
        showMessage(forgotError, err.message);
    }
});