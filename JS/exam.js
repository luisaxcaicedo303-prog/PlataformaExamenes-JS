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
    displayTimer.textContent = ${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}
    if (contador <= 0) {
        clearInterval(intervalo);
        cronometro.textContent = '¡Tiempo cumplido!';
    }

},1000)
