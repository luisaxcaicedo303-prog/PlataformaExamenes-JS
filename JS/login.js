document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('iniciar-Sesion');

    if (form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const emailIngresado = document.getElementById('username').value;
            const passwordIngresado = document.getElementById('password').value;

            const usuariosGuardados = getUsers();
            console.log(usuariosGuardados);

            // Validación de credenciales
            const usuarioEncontrado = usuariosGuardados.find(user => 
                user.email === emailIngresado && user.password === passwordIngresado
            );

            if (usuarioEncontrado) {
                alert("¡Bienvenido, " + usuarioEncontrado.username + "!");
                saveSession(usuarioEncontrado);
                window.location.href = "admin-exams.html";
            } else {
                alert("Correo o contraseña incorrectos.");
            }
        });
    }
});

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