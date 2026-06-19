const examenSeleccionado = getExamSelection()

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
   const initialResult = getInitResult();
   const datosNombre=nombre.value.trim()
   const datosID=identificacion.value.trim()

   if(datosID === "" || datosNombre === ""){
    error.textContent="Llene todos los campos"
   }
   else{
        
        initialResult.studentName = datosNombre;
        initialResult.studentIdentification = datosID;
        saveInitResult(initialResult);
        window.location.href = "/HTML/exam.html"
   }
})

nombre.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ ]/g, '');
});