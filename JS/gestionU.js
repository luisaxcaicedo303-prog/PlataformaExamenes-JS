document.addEventListener('DOMContentLoaded', () => {

    const bancoDePreguntas = [
        { id: 1, texto: "¿Cuál es el nombre de tu primera mascota?" },
        { id: 2, texto: "¿En qué ciudad nacieron tus padres?" },
        { id: 3, texto: "¿Cuál es el nombre de tus padres?" },
        { id: 4, texto: "¿Cuál es el nombre de tu comida favorita?" },
        { id: 5, texto: "¿Cuál es el nombre de tu colegio de primaria?" }
    ];

    const selectPregunta = document.getElementById('pregunta-seguridad');

    if (selectPregunta) {
        bancoDePreguntas.forEach((pregunta) => {
            const opcion = document.createElement('option');
            opcion.value = pregunta.id;
            opcion.textContent = pregunta.texto;
            selectPregunta.appendChild(opcion);
        });
    }

    const form = document.getElementById('registro-form');

    if (form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            let usuariosGuardados = getUsers();
            console.log(usuariosGuardados);
            const valorIdentificacion = document.getElementById('identificacion').value;
            const valorUsername = document.getElementById('username').value;
            const valorEmail = document.getElementById('email').value;
            const valorTelefono = document.getElementById('telefono').value;
            const valorPregunta = document.getElementById('pregunta-seguridad').value;
            const valorRespuesta = document.getElementById('respuesta-seguridad').value;
            const valorPassword = document.getElementById('password').value;

            const usuarioExistente = usuariosGuardados.find(user => 
                user.identificacion === valorIdentificacion || user.email === valorEmail
            );

            if (usuarioExistente) {
                alert("Error: Ya existe un usuario registrado con esa identificación o correo electrónico.");
                return;
            }

            const nuevoUsuario = {
                id: "user-" + Date.now(),
                identificacion: valorIdentificacion,
                username: valorUsername,
                email: valorEmail,
                telefono: valorTelefono,
                password: valorPassword,
                role: "student",
                seguridad: {
                    idPregunta: valorPregunta,
                    respuesta: valorRespuesta.toLowerCase().trim()
                }
            };

            usuariosGuardados.push(nuevoUsuario);
            saveUsers(usuariosGuardados);
            saveSession(nuevoUsuario);
            alert("Usuario registrado con éxito!!");
            form.reset();
            window.location.href = "admin-exams.html";
        });
    }
});