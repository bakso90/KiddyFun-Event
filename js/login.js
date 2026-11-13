
// Data login demo
const correctUsername = "kayla";
const correctPassword = "kayla123";

// Mengambil elemen HTML
const loginForm = document.getElementById("loginForm");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const errorMessage = document.getElementById("errorMessage");

// Tombol untuk melihat password
const togglePassword = document.getElementById("togglePassword");

togglePassword.addEventListener("click", function () {

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        togglePassword.textContent = "Hide";
    } else {
        passwordInput.type = "password";
        togglePassword.textContent = "Show";
    }

});

// Proses login
loginForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const username = usernameInput.value.trim();
    const password = passwordInput.value;

    // Memeriksa username dan password
    if (
        username === correctUsername &&
        password === correctPassword
    ) {

        // Menyimpan status login
        sessionStorage.setItem("kiddyfunLoggedIn", "true");

        // Masuk ke halaman utama
        window.location.href = "index.html";

    } else {

        errorMessage.textContent =
            "Username atau password salah. Silakan coba lagi!";

    }

});
