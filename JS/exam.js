const examenSeleccionado = JSON.parse(localStorage.getItem("EXAMS_KEY"))

const detallesExamen =document.querySelector(".detalles-examen");
const titleExamen=document.querySelector(".title-examen");
const numeroPreguntas =document.querySelector(".numeroPreguntas");
const porcentaje =document.querySelector(".porcentaje");
const cronometro =document.querySelector(".cronometro");

titleExamen.textContent=examenSeleccionado.title
numeroPreguntas.textContent=`📝Numero de preguntas:${examenSeleccionado.num_questions}`
porcentaje.textContent=`📊Porcentaje de aprobación:${examenSeleccionado.approval_percent}`

let contador= examenSeleccionado.time*60

const intervalo = setInterval(() => {
    contador--;

    const minutos = Math.floor(contador / 60)
    const segundos = contador % 60
    cronometro.textContent = `${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`
    if (contador <= 0) {
        clearInterval(intervalo);
        cronometro.textContent = '¡Tiempo cumplido!';
    }
},1000)

// Array que va guardando las respuestas del usuario
const respuestasUsuario = examenSeleccionado.questions.map((_, index) => ({
    questionIndex: index,
    selected_answer: null  // null = sin responder
}));

examenSeleccionado.questions.forEach((questions, index) => {
    const nuevaPregunta = document.createElement('div');
    nuevaPregunta.classList.add('pregunta');
    
    // Primero crea la estructura sin las opciones
    nuevaPregunta.innerHTML = `
        <p class="pregunta_texto">${index + 1}. ${questions.question}</p>
        <div class="respuestas"></div>
    `;

    // Luego agrega cada opción con textContent para evitar que interprete el HTML
    const contenedorRespuestas = nuevaPregunta.querySelector('.respuestas');
    
    questions.options.forEach((opcion, i) => {
        const label = document.createElement('label');
        const input = document.createElement('input');
        
        input.type = 'radio';
        input.name = `pregunta_${index}`;
        input.value = i;
        
        label.appendChild(input);
        label.appendChild(document.createTextNode(opcion)); // textContent seguro
        contenedorRespuestas.appendChild(label);
    });

    // Escucha cuando el usuario selecciona una opción
    nuevaPregunta.querySelectorAll('input[type="radio"]').forEach(input => {
        input.addEventListener('change', (e) => {
            respuestasUsuario[index].selected_answer = parseInt(e.target.value);
            console.log("Respuestas actuales:", respuestasUsuario);
        });
    });
    
    document.querySelector('.pregunta-contenedor').appendChild(nuevaPregunta);
});

function calcularResultado() {
    let correctas = 0;

    examenSeleccionado.questions.forEach((pregunta, index) => {
        const respuestaCorrecta = pregunta.correct_answer; // ajusta el nombre según estructura de datos
        if (respuestasUsuario[index].selected_answer === respuestaCorrecta) {
            correctas++;
        }
    });

    const total = examenSeleccionado.questions.length;
    const porcentajeObtenido = Math.round((correctas / total) * 100);
    const aprobo = porcentajeObtenido >= examenSeleccionado.approval_percent;

    return { correctas, total, porcentajeObtenido, aprobo };
}

function mostrarModalResultado({ correctas, total, porcentajeObtenido, aprobo }) {
    const overlay = document.getElementById('modalOverlay');
    const modal = document.getElementById('modalResultado');
    const icono = document.getElementById('modalIcono');
    const titulo = document.getElementById('modalTitulo');
    const texto = document.getElementById('modalTexto');
    const puntaje = document.getElementById('modalPuntaje');

    modal.classList.remove('aprobado', 'reprobado');

    if (aprobo) {
        modal.classList.add('aprobado');
        icono.textContent = '✅';
        titulo.textContent = '¡Felicidades, aprobaste!';
        texto.textContent = 'Has alcanzado el porcentaje mínimo requerido.';
    } else {
        modal.classList.add('reprobado');
        icono.textContent = '❌';
        titulo.textContent = 'No aprobaste';
        texto.textContent = 'No alcanzaste el porcentaje mínimo requerido.';
    }

    puntaje.textContent = `${correctas}/${total} correctas — ${porcentajeObtenido}%`;

    overlay.classList.add('activo');
}

function enviarExamen() {
    const { correctas, total, porcentajeObtenido, aprobo } = calcularResultado();

    const resultado = {
        id: `result-${Date.now()}`,
        examId: examenSeleccionado.id,
        studentName: "Carlos Pérez",
        studentIdentification: "1098765432",
        timeUsed: "32 min",
        submittedAt: new Date().toISOString(),
        answers: respuestasUsuario,
        score: porcentajeObtenido,
        approved: aprobo
    };

    const resultados = JSON.parse(localStorage.getItem('resultados')) || [];
    resultados.push(resultado);
    localStorage.setItem('resultados', JSON.stringify(resultados));

    console.log("Resultado guardado:", resultado);

    mostrarModalResultado({ correctas, total, porcentajeObtenido, aprobo });
}

const botonEnviar = document.getElementById("boton");
const modalCerrar = document.getElementById("modalCerrar");
const modalOverlay = document.getElementById("modalOverlay");

botonEnviar.addEventListener("click", () => {
    enviarExamen();
});

modalCerrar.addEventListener("click", () => {
    modalOverlay.classList.remove('activo');
    window.location.href = "/HTML/exam_selection.html";
});