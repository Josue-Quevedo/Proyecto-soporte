document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault(); // Evita el envío del formulario

            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            // Simulación de autenticación básica
            if (name && email && password) {
                // Guardar usuario en localStorage (simulación de sesión)
                localStorage.setItem("user", name);
                window.location.href = "menu.html"; // Redirige al menú
            } else {
                alert("Por favor, complete todos los campos.");
            }
        });
    }
});

// Proteger el menú (redirigir al login si no hay sesión)
function checkLogin() {
    const user = localStorage.getItem("user");
    if (!user) {
        window.location.href = "index.html"; // Redirige al login
    }
}

// Cerrar sesión
function logout() {
    localStorage.removeItem("user"); // Elimina la sesión
    window.location.href = "index.html"; // Redirige al login
}
