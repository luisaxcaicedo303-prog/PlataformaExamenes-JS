// login.js
document.querySelector('form').addEventListener('submit', function(event) {
    const email = document.getElementById('username').value;
    const pass = document.getElementById('password').value;

    if (email === "" || pass === "") {
        event.preventDefault(); // Evita que se envíe el formulario
        alert("Por favor, completa todos los campos.");
    } else {
        console.log("Validación exitosa, enviando datos...");
    }
});