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

function enviarExamen() {
    const resultado = {
        id: `result-${Date.now()}`,
        examId: examenSeleccionado.id,
        studentName: "Carlos Pérez",       // esto vendrá de tu login/localStorage
        studentIdentification: "1098765432", // igual
        timeUsed: "32 min",                 // vendrá del cronómetro
        submittedAt: new Date().toISOString(),
        answers: respuestasUsuario
    };

    // Guardar en localStorage
    const resultados = JSON.parse(localStorage.getItem('resultados')) || [];
    resultados.push(resultado);
    localStorage.setItem('resultados', JSON.stringify(resultados));
    
    console.log("Resultado guardado:", resultado);
}

const botonEnviar =document.getElementById("boton");

botonEnviar.addEventListener("click",()=>{
    
    enviarExamen();
})