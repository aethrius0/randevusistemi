const API_URL = "https://localhost:7041/api";

const loginForm = document.getElementById("login");
const registerForm = document.getElementById("register");

const loginSection = document.getElementById("loginForm");
const registerSection = document.getElementById("registerForm");

const errorMessage = document.getElementById("errorMessage");
const registerError = document.getElementById("registerError");
const registerSuccess = document.getElementById("registerSuccess");

// Form geçişleri
document.getElementById("toRegister").addEventListener("click", showRegister);
document.getElementById("toLogin").addEventListener("click", showLogin);
document.getElementById("toLoginLink").addEventListener("click", showLogin);

function showRegister() {
    loginSection.classList.add("hidden");
    registerSection.classList.remove("hidden");
}

function showLogin() {
    registerSection.classList.add("hidden");
    loginSection.classList.remove("hidden");
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
                password: regPassword.value,
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