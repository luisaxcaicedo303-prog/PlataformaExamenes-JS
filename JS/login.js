document.addEventListener('DOMContentLoaded', () => {
    const USERS_KEY = "acme_users";
    const form = document.getElementById('iniciar-Sesion');

    if (form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const emailIngresado = document.getElementById('username').value;
            const passwordIngresado = document.getElementById('password').value;

            const usuariosGuardados = JSON.parse(localStorage.getItem(USERS_KEY)) || [];

            // Validación de credenciales
            const usuarioEncontrado = usuariosGuardados.find(user => 
                user.email === emailIngresado && user.password === passwordIngresado
            );

            if (usuarioEncontrado) {
                alert("¡Bienvenido, " + usuarioEncontrado.username + "!");
                localStorage.setItem("usuario_sesion", JSON.stringify(usuarioEncontrado));
                window.location.href = "dashboard.html"; 
            } else {
                alert("Correo o contraseña incorrectos.");
            }
        });
    }
});
const USERS_KEY = "acme_users";

// 1. Validar si el usuario existe y mostrar su pregunta de seguridad

function obtenerPregunta(email) {
    const usuarios = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
    return usuarios.find(u => u.email === email);
}

// 2. Validar respuesta y actualizar contraseña en el localStorage

function actualizarPassword(email, respuesta, nuevaPass) {
    let usuarios = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
    const index = usuarios.findIndex(u => 
        u.email === email && u.seguridad.respuesta === respuesta.toLowerCase().trim()
    );

    if (index !== -1) {
        usuarios[index].password = nuevaPass;
        localStorage.setItem(USERS_KEY, JSON.stringify(usuarios));
        return true;
    }
    return false;
}