const examenSeleccionado = JSON.parse(localStorage.getItem("EXAMS_KEY"))

if (examenSeleccionado) {
    document.querySelector("#title").textContent = examenSeleccionado.title
} else {
    document.querySelector("#title").textContent = "No se seleccionó ningún examen"
}

const nombre=document.getElementById("nombre");
const identificacion=document.getElementById("identificacion");
const boton=document.getElementById("btn-iniciar");
const error=document.getElementById("error");

    
boton.addEventListener("click",()=>{
   const datosNombre=nombre.value.trim()
   const datosID=identificacion.value.trim()
   if(datosID === "" || datosNombre === ""){
    error.textContent="Llene todos los campos"
   }
   else{
        window.location.href = "/HTML/exam.html"
   }
})

nombre.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ ]/g, '');
});