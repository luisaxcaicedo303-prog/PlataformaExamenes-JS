
document.querySelector('form').addEventListener('submit', function(event) {
    const email = document.getElementById('username').value;
    const pass = document.getElementById('password').value;

    if (email === "" || pass === "") {
        event.preventDefault(); 
        alert("Por favor, completa todos los campos.");
    } else {
        console.log("Validación exitosa, enviando datos...");
    }
});