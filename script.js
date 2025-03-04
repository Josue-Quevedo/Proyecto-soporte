document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", async function (event) {
            event.preventDefault(); // evita una recarga de pagina

            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            try {
                const response = await fetch("http://localhost:3000/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password })
                });

                const data = await response.json();

                if (response.ok) {
                    localStorage.setItem("user", JSON.stringify(data.user));
                    window.location.href = "menu2.html"; // de vuelta al menu principal principal
                } else {
                    alert(data.message);
                }
            } catch (error) {
                console.error("Error:", error);
                alert("Error al iniciar sesión.");
            }
        });
    }
});



//Funcionamiento local

// document.addEventListener("DOMContentLoaded", function () {
//     const loginForm = document.getElementById("loginForm");

//     if (loginForm) {
//         loginForm.addEventListener("submit", function (event) {
//             event.preventDefault(); // no hace reenvio de formulario

//             const name = document.getElementById("name").value;
//             const email = document.getElementById("email").value;
//             const password = document.getElementById("password").value;

//             // simulacion de autenticación basica
//             if (name && email && password) {
//                 // minisimulacion de un usuario
//                 localStorage.setItem("user", name);
//                 window.location.href = "menu2.html"; // regreso al menu principal
//             } else {
//                 alert("Por favor, complete todos los campos.");
//             }
//         });
//     }
// });

// //funcion para redirigir al menu si no hay login
// function checkLogin() {
//     const user = localStorage.getItem("user");
//     if (!user) {
//         window.location.href = "index.html"; // regreso al login
//     }
// }

// // cierre de sesion
// function logout() {
//     localStorage.removeItem("user"); // funcion para cerrar sesion
//     window.location.href = "index.html"; // redirige al login
// }
