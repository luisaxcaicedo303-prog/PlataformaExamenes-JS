const resultDetail = document.getElementById("result-detail");
const resultsTableBody = document.getElementById("results-table-body");
const resultsCount = document.getElementById("results-count");
const searchResultInput = document.getElementById("search-result");

const logoutButtons = document.querySelectorAll(".logout_btn");
const adminLinks = document.querySelectorAll(".admin_navigation");


// SESSION

function renderResultsSession() {
    const session = getSession();

    if (!session) {
        window.location.href = "../index.html";
        return false;
    }

    adminLinks.forEach((link) => {
        if (session.role === "admin") {
            link.classList.remove("hidden");
        } else {
            link.classList.add("hidden");
        }
    });

    return true;
}


// HELPERS

function getExamById(examId) {
    const exams = getExams();

    return exams.find((exam) => {
        return String(exam.id) === String(examId);
    });
}

function getQuestionOptions(question) {
    if (question.options) {
        return question.options;
    }

    if (question.response_options) {
        return question.response_options;
    }

    return [];
}

function getFormattedDate(dateValue) {
    if (!dateValue) {
        return "Sin fecha";
    }

    const date = new Date(dateValue);

    return date.toLocaleDateString("es-CO", {
        year: "numeric",
        month: "short",
        day: "2-digit"
    });
}

function getStudentName(result) {
    return result.studentName || result.student_name || result.nombre || "Usuario sin nombre";
}

function getStudentIdentification(result) {
    return result.studentIdentification || result.student_identification || result.identificacion || result.cc || "Sin identificación";
}

function getTimeUsed(result) {
    return result.timeUsed || result.time_used || result.tiempo || "No registrado";
}

function getUserAnswer(result, questionIndex) {
    if (!result.answers || !Array.isArray(result.answers)) {
        return null;
    }

    const answer = result.answers.find((item) => {
        return Number(item.questionIndex) === Number(questionIndex);
    });

    if (!answer) {
        return null;
    }

    return Number(answer.selected_answer);
}

function calculateResultData(result, exam) {
    let correctAnswers = 0;
    const totalQuestions = exam.questions.length;

    exam.questions.forEach((question, index) => {
        const userAnswer = getUserAnswer(result, index);

        if (userAnswer === Number(question.correct_answer)) {
            correctAnswers++;
        }
    });

    const score = Math.round((correctAnswers / totalQuestions) * 100);
    const approved = score >= Number(exam.approval_percent);

    return {
        correctAnswers,
        totalQuestions,
        score,
        approved
    };
}


// RENDER TABLE

function renderResults(resultsToRender = getResults()) {
    resultsTableBody.innerHTML = "";
    resultsCount.textContent = resultsToRender.length;

    if (resultsToRender.length === 0) {
        resultsTableBody.innerHTML = `
            <tr>
                <td colspan="7">No hay resultados registrados.</td>
            </tr>
        `;
        return;
    }

    resultsToRender.forEach((result) => {
        const exam = getExamById(result.examId);
        
        const examTitle = exam ? exam.title : "Examen no encontrado";
        let score = result.score || 0;
        let approved = false;

        if (exam) {
            const calculatedData = calculateResultData(result, exam);
            score = result.score ?? calculatedData.score;
            approved = score >= Number(exam.approval_percent);
        }

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>
                <strong>${getStudentName(result)}</strong>
                <small>${getFormattedDate(result.submittedAt)}</small>
            </td>

            <td>
                ${getStudentIdentification(result)}
            </td>

            <td>
                <strong>${examTitle}</strong>
                <small>${exam ? exam.difficulty || "Sin dificultad" : ""}</small>
            </td>

            <td>
                ${getTimeUsed(result)}
            </td>

            <td>
                <span class="score_text">${score}%</span>
            </td>

            <td>
                <span class="status_badge ${approved ? "approved" : "failed"}">
                    ${approved ? "Aprobado" : "Reprobado"}
                </span>
            </td>

            <td>
                <button 
                    type="button" 
                    class="btn_table view_result_btn"
                    data-id="${result.id}"
                >
                    Ver detalle
                </button>
            </td>
        `;

        resultsTableBody.appendChild(row);
    });
}


// RENDER DETAIL

function renderResultDetail(resultId) {
    const results = getResults();

    const result = results.find((item) => {
        return String(item.id) === String(resultId);
    });

    if (!result) {
        alert("No se encontró el resultado.");
        return;
    }

    const exam = getExamById(result.examId);

    if (!exam) {
        alert("No se encontró el examen asociado al resultado.");
        return;
    }

    const resultData = calculateResultData(result, exam);

    let questionsHTML = "";

    exam.questions.forEach((question, questionIndex) => {
        const options = getQuestionOptions(question);
        const selectedAnswer = getUserAnswer(result, questionIndex);
        const correctAnswer = Number(question.correct_answer);

        let optionsHTML = "";

        options.forEach((option, optionIndex) => {
            let optionClass = "neutral";
            let label = "";

            if (optionIndex === correctAnswer) {
                optionClass = "correct";
                label = " ✓ Respuesta correcta";
            }

            if (optionIndex === selectedAnswer && selectedAnswer !== correctAnswer) {
                optionClass = "incorrect";
                label = " ✗ Respuesta del usuario";
            }

            if (optionIndex === selectedAnswer && selectedAnswer === correctAnswer) {
                optionClass = "correct";
                label = " ✓ Respondida correctamente";
            }

            optionsHTML += `
                <div class="review_option ${optionClass}">
                    ${option}${label}
                </div>
            `;
        });

        questionsHTML += `
            <article class="review_question">
                <h4>
                    ${questionIndex + 1}. ${question.question}
                </h4>

                <div class="review_options">
                    ${optionsHTML}
                </div>

                <p class="result_note">
                    Respuesta del usuario:
                    <strong>
                        ${selectedAnswer === null ? "Sin responder" : options[selectedAnswer]}
                    </strong>
                </p>
            </article>
        `;
    });

    resultDetail.innerHTML = `
        <div class="result_summary">

            <div class="summary_header">
                <h3>${exam.title}</h3>
                <p>${exam.description}</p>
            </div>

            <div class="summary_grid">
                <div class="summary_item">
                    <span>Usuario</span>
                    <strong>${getStudentName(result)}</strong>
                </div>

                <div class="summary_item">
                    <span>Identificación</span>
                    <strong>${getStudentIdentification(result)}</strong>
                </div>

                <div class="summary_item">
                    <span>Tiempo usado</span>
                    <strong>${getTimeUsed(result)}</strong>
                </div>

                <div class="summary_item">
                    <span>Puntuación</span>
                    <strong>${resultData.score}%</strong>
                </div>

                <div class="summary_item">
                    <span>Correctas</span>
                    <strong>${resultData.correctAnswers} / ${resultData.totalQuestions}</strong>
                </div>

                <div class="summary_item">
                    <span>Aprobación requerida</span>
                    <strong>${exam.approval_percent}%</strong>
                </div>

                <div class="summary_item">
                    <span>Dificultad</span>
                    <strong>${exam.difficulty || "Sin dificultad"}</strong>
                </div>

                <div class="summary_item">
                    <span>Estado</span>
                    <strong>
                        <span class="status_badge ${resultData.approved ? "approved" : "failed"}">
                            ${resultData.approved ? "Aprobado" : "Reprobado"}
                        </span>
                    </strong>
                </div>
            </div>

            <div class="questions_review">
                ${questionsHTML}
            </div>

        </div>
    `;
}


// TABLE ACTIONS

function handleTableActions(event) {
    const target = event.target;

    if (target.classList.contains("view_result_btn")) {
        const resultId = target.dataset.id;
        renderResultDetail(resultId);
    }
}


// SEARCH

function searchResults() {
    const searchText = searchResultInput.value.toLowerCase().trim();
    const results = getResults();

    const filteredResults = results.filter((result) => {
        const exam = getExamById(result.examId);

        const studentName = getStudentName(result).toLowerCase();
        const studentIdentification = getStudentIdentification(result).toLowerCase();
        const examTitle = exam ? String(exam.title).toLowerCase() : "";

        return (
            studentName.includes(searchText) ||
            studentIdentification.includes(searchText) ||
            examTitle.includes(searchText)
        );
    });

    renderResults(filteredResults);
}


// LOGOUT

function handleLogout() {
    const confirmLogout = confirm("¿Deseas cerrar sesión?");

    if (!confirmLogout) {
        return;
    }

    clearSession();
    window.location.href = "../index.html";
}


// INIT

function initAdminResultsPage() {
    const hasAccess = renderResultsSession();

    if (!hasAccess) {
        return;
    }

    renderResults();
}


// EVENTS

resultsTableBody.addEventListener("click", handleTableActions);

searchResultInput.addEventListener("input", searchResults);

logoutButtons.forEach((button) => {
    button.addEventListener("click", handleLogout);
});

initAdminResultsPage();