document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault(); // no hace reenvio de formulario

            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            // simulacion de autenticación basica
            if (name && email && password) {
                // minisimulacion de un usuario
                localStorage.setItem("user", name);
                window.location.href = "menu2.html"; // regreso al menu principal
            } else {
                alert("Por favor, complete todos los campos.");
            }
        });
    }
});

//funcion para redirigir al menu si no hay login
function checkLogin() {
    const user = localStorage.getItem("user");
    if (!user) {
        window.location.href = "index.html"; // regreso al login
    }
}

// cierre de sesion
function logout() {
    localStorage.removeItem("user"); // funcion para cerrar sesion
    window.location.href = "index.html"; // redirige al login
}
