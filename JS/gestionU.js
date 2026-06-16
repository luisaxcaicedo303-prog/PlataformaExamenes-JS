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
        bancoDePreguntas.forEach(pregunta => {
            const opcion = document.createElement('option');
            opcion.value = pregunta.id; 
            opcion.textContent = pregunta.texto;
            selectPregunta.appendChild(opcion);
        });
    }

    const form = document.getElementById('registro-form');
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault(); 

            const nuevoUsuario = {
                identificacion: document.getElementById('identificacion').value,
                username: document.getElementById('username').value,
                email: document.getElementById('email').value,
                telefono: document.getElementById('telefono').value,
                seguridad: {
                    idPregunta: document.getElementById('pregunta-seguridad').value,
                    respuesta: document.getElementById('respuesta-seguridad').value.toLowerCase().trim()
                }
            };

            localStorage.setItem(nuevoUsuario.identificacion, JSON.stringify(nuevoUsuario));
            
            alert("Usuario registrado con éxito!!");
            form.reset(); 
        });
    }
});