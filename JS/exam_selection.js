function cargarExamenes() {
    const examenes = getExams();
    console.log(examenes);
    const contenedor = document.getElementById("cartas");

    examenes.forEach(examen => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.style.cursor="pointer"

          card.addEventListener("click", () => {
            saveExamSelection(examen);
            window.location.href = "/HTML/data.html"
        }) 

        const difficulty = document.createElement("span");
        difficulty.textContent = examen.difficulty;
        difficulty.classList.add("nivel");
        card.appendChild(difficulty);

        const title = document.createElement("h2");
        title.textContent = examen.title;
        card.appendChild(title);

        const description = document.createElement("p");
        description.textContent = examen.description;
        card.appendChild(description);

        const time = document.createElement("p");
        time.textContent = "⏳"+examen.time + " min";
        card.appendChild(time);

        const num_questions = document.createElement("p");
        num_questions.textContent = "📝Preguntas: " + examen.num_questions;
        card.appendChild(num_questions);

        const approval = document.createElement("p");
        approval.textContent = `📊Porcentaje de aprobación: ${examen.approval_percent}%`;
        card.appendChild(approval);

        contenedor.appendChild(card);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    cargarExamenes();
});