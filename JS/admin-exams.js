const examForm = document.getElementById("exam-form");

const examCodeInput = document.getElementById("exam-code");
const examTitleInput = document.getElementById("exam-title");

const examTimeInput = document.getElementById("exam-time");
const examPercentInput = document.getElementById("exam-percent");
const examDescriptionInput = document.getElementById("exam-description");

const addQuestionBtn = document.getElementById("add-question-btn");
const questionsContainer = document.getElementById("questions-container");

const examsTableBody = document.getElementById("exams-table-body");
const searchExamInput = document.getElementById("search-exam");
const examsCount = document.getElementById("exams-count");

const logoutButtons = document.querySelectorAll(".logout_btn");

const adminLinks = document.querySelectorAll(".admin_navigation");

let editingExamId = null;

function createId(prefix) {
    return `${prefix}-${Date.now()}`;
}

function getOptionLetter(index) {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    if (index < letters.length) {
        return letters[index];
    }

    return index + 1;
}

function createAnswerOptionHTML(questionNumber, optionIndex, optionValue = "", correctAnswer = null) {
    const optionLetter = getOptionLetter(optionIndex);

    return `
        <label class="answer_option">
            <input 
                type="radio" 
                name="correct-answer-${questionNumber}" 
                value="${optionIndex}"
                ${Number(correctAnswer) === optionIndex ? "checked" : ""}
            >

            <input 
                type="text" 
                class="answer_input"
                placeholder="Opción ${optionLetter}"
                value="${optionValue}"
                required
            >
        </label>
    `;
}

function createQuestionCard(questionNumber, questionData = null) {
    const questionCard = document.createElement("article");
    questionCard.classList.add("question_card");

    const questionText = questionData ? questionData.question : "";

    const options = questionData
        ? questionData.response_options || questionData.options || ["", ""]
        : ["", ""];

    const correctAnswer = questionData ? questionData.correct_answer : null;

    let optionsHTML = "";

    options.forEach((option, index) => {
        optionsHTML += createAnswerOptionHTML(questionNumber, index, option, correctAnswer);
    });

    questionCard.innerHTML = `
        <div class="question_card_top">
            <span>Pregunta ${questionNumber}</span>
            <button type="button" class="btn_icon delete_question_btn">×</button>
        </div>

        <div class="form_group">
            <label>Enunciado</label>
            <textarea 
                class="question_text"
                rows="3"
                placeholder="Escribe el enunciado de la pregunta..."
                required
            >${questionText}</textarea>
        </div>

        <div class="answer_list">
            ${optionsHTML}
        </div>

        <div class="answer_actions">
            <button type="button" class="btn btn_outline add_option_btn">
                + Agregar opción
            </button>

            <button type="button" class="btn btn_ghost remove_option_btn">
                - Quitar opción
            </button>
        </div>

        <small class="hint">
            Cada pregunta debe tener mínimo dos opciones. Selecciona el círculo de la respuesta correcta.
        </small>
    `;

    return questionCard;
}

function updateAnswerOptions(card, questionNumber) {
    const answerOptions = card.querySelectorAll(".answer_option");

    answerOptions.forEach((option, index) => {
        const radioInput = option.querySelector('input[type="radio"]');
        const textInput = option.querySelector(".answer_input");

        radioInput.name = `correct-answer-${questionNumber}`;
        radioInput.value = index;

        textInput.placeholder = `Opción ${getOptionLetter(index)}`;
    });
}

function addAnswerOption(card) {
    const questionCards = Array.from(questionsContainer.children);
    const questionNumber = questionCards.indexOf(card) + 1;

    const answerList = card.querySelector(".answer_list");
    const answerOptions = answerList.querySelectorAll(".answer_option");
    const newOptionIndex = answerOptions.length;

    answerList.insertAdjacentHTML(
        "beforeend",
        createAnswerOptionHTML(questionNumber, newOptionIndex)
    );

    updateAnswerOptions(card, questionNumber);
}

function removeAnswerOption(card) {
    const answerList = card.querySelector(".answer_list");
    const answerOptions = answerList.querySelectorAll(".answer_option");

    if (answerOptions.length <= 2) {
        alert("Cada pregunta debe tener mínimo dos opciones de respuesta.");
        return;
    }

    const lastOption = answerOptions[answerOptions.length - 1];
    lastOption.remove();

    const questionCards = Array.from(questionsContainer.children);
    const questionNumber = questionCards.indexOf(card) + 1;

    updateAnswerOptions(card, questionNumber);
}

function addQuestion(questionData = null) {
    const questionNumber = questionsContainer.children.length + 1;
    const questionCard = createQuestionCard(questionNumber, questionData);

    questionsContainer.appendChild(questionCard);
}

function updateQuestionNumbers() {
    const questionCards = document.querySelectorAll(".question_card");

    questionCards.forEach((card, index) => {
        const questionNumber = index + 1;
        const questionTitle = card.querySelector(".question_card_top span");

        questionTitle.textContent = `Pregunta ${questionNumber}`;

        updateAnswerOptions(card, questionNumber);
    });
}

function handleQuestionActions(event) {
    const target = event.target;
    const questionCard = target.closest(".question_card");

    if (!questionCard) {
        return;
    }

    if (target.classList.contains("delete_question_btn")) {
        questionCard.remove();
        updateQuestionNumbers();
    }

    if (target.classList.contains("add_option_btn")) {
        addAnswerOption(questionCard);
    }

    if (target.classList.contains("remove_option_btn")) {
        removeAnswerOption(questionCard);
    }
}

function collectQuestions() {
    const questionCards = document.querySelectorAll(".question_card");

    const questions = [];

    questionCards.forEach((card) => {
        const questionText = card.querySelector(".question_text").value.trim();
        const answerInputs = card.querySelectorAll(".answer_input");
        const correctAnswerInput = card.querySelector('input[type="radio"]:checked');

        const responseOptions = [];

        answerInputs.forEach((input) => {
            responseOptions.push(input.value.trim());
        });

        questions.push({
            question: questionText,
            response_options: responseOptions,
            options: responseOptions,
            correct_answer: Number(correctAnswerInput.value)
        });
    });

    return questions;
}

function validateQuestions() {
    const questionCards = document.querySelectorAll(".question_card");

    if (questionCards.length === 0) {
        alert("Debes agregar por lo menos una pregunta.");
        return false;
    }

    for (const card of questionCards) {
        const questionText = card.querySelector(".question_text").value.trim();
        const answerInputs = card.querySelectorAll(".answer_input");
        const correctAnswerInput = card.querySelector('input[type="radio"]:checked');

        if (!questionText) {
            alert("Todas las preguntas deben tener un enunciado.");
            return false;
        }

        if (answerInputs.length < 2) {
            alert("Cada pregunta debe tener mínimo dos opciones de respuesta.");
            return false;
        }

        for (const input of answerInputs) {
            if (!input.value.trim()) {
                alert("Todas las opciones de respuesta deben estar completas.");
                return false;
            }
        }

        if (!correctAnswerInput) {
            alert("Cada pregunta debe tener una respuesta correcta seleccionada.");
            return false;
        }
    }

    return true;
}

function resetExamForm() {
    examForm.reset();
    questionsContainer.innerHTML = "";
    editingExamId = null;

    addQuestion();
}

function renderExams() {
    console.log("entro 2");
    const examsToRender = getExams();
    examsTableBody.innerHTML = "";

    examsCount.textContent = examsToRender.length;

    if (examsToRender.length === 0) {
        examsTableBody.innerHTML = `
            <tr>
                <td colspan="6">
                    No hay exámenes registrados.
                </td>
            </tr>
        `;
        return;
    }

    examsToRender.forEach((exam) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>
                <span class="code">${exam.code}</span>
            </td>

            <td>
                <strong>${exam.title}</strong>
                <small>${exam.description}</small>
            </td>

            <td>
                ${exam.time} min
            </td>

            <td>
                <div class="progress">
                    <span style="width: ${exam.approval_percent}%;"></span>
                </div>
                <small>${exam.approval_percent}%</small>
            </td>

            <td>
                ${exam.questions.length}
            </td>

            <td>
                <div class="actions">
                    <button 
                        type="button" 
                        class="btn_table edit_exam_btn"
                        data-id="${exam.id}"
                    >
                        Editar
                    </button>

                    <button 
                        type="button" 
                        class="btn_table danger delete_exam_btn"
                        data-id="${exam.id}"
                    >
                        Eliminar
                    </button>
                </div>
            </td>
        `;

        examsTableBody.appendChild(row);
    });
}

function renderExamsSession(){
    const session = getSession();

    if (!session) {
        window.location.href = "../index.html";
        return;
    }

    adminLinks.forEach((link) => {
        if (session.role === "admin") {
            link.classList.remove("hidden");
        } else {
            link.classList.add("hidden");
        }
    });
}

function handleSaveExam(event) {
    event.preventDefault();

    if (!validateQuestions()) {
        return;
    }

    const exams = getExams();

    const code = examCodeInput.value.trim();
    const title = examTitleInput.value.trim();
    const description = examDescriptionInput.value.trim();
    const time = Number(examTimeInput.value);
    const approvalPercent = Number(examPercentInput.value);

    const codeExists = exams.some((exam) => {
        return exam.code.toLowerCase() === code.toLowerCase() && exam.id !== editingExamId;
    });

    if (codeExists) {
        alert("Ya existe un examen con ese código.");
        return;
    }

    const examData = {
        id: editingExamId || createId("exam"),
        code: code,
        title: title,
        description: description,
        time: time,
        approval_percent: approvalPercent,
        createdBy: "user-002",
        createdAt: new Date().toISOString().split("T")[0],
        questions: collectQuestions()
    };

    if (editingExamId) {
        const updatedExams = exams.map((exam) => {
            if (exam.id === editingExamId) {
                return examData;
            }

            return exam;
        });

        saveExams(updatedExams);
        alert("Examen actualizado correctamente.");
    } else {
        exams.push(examData);
        saveExams(exams);
        alert("Examen creado correctamente.");
    }

    resetExamForm();
    renderExams();
}

function deleteExam(examId) {
    const confirmDelete = confirm("¿Estás seguro de eliminar este examen?");

    if (!confirmDelete) {
        return;
    }

    const exams = getExams();

    const filteredExams = exams.filter((exam) => {
        return exam.id !== examId;
    });

    saveExams(filteredExams);

    if (editingExamId === examId) {
        resetExamForm();
    }

    renderExams();
}

function editExam(examId) {
    const exams = getExams();

    const examToEdit = exams.find((exam) => {
        return exam.id === examId;
    });

    if (!examToEdit) {
        alert("No se encontró el examen.");
        return;
    }

    editingExamId = examToEdit.id;

    examCodeInput.value = examToEdit.code;
    examTitleInput.value = examToEdit.title;
    examTimeInput.value = examToEdit.time;
    examPercentInput.value = examToEdit.approval_percent;
    examDescriptionInput.value = examToEdit.description;

    questionsContainer.innerHTML = "";

    examToEdit.questions.forEach((question) => {
        addQuestion(question);
    });

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function handleTableActions(event) {
    const target = event.target;

    if (target.classList.contains("delete_exam_btn")) {
        const examId = target.dataset.id;
        deleteExam(examId);
    }

    if (target.classList.contains("edit_exam_btn")) {
        const examId = target.dataset.id;
        editExam(examId);
    }
}

function searchExams() {
    const searchText = searchExamInput.value.toLowerCase().trim();
    const exams = getExams();

    const filteredExams = exams.filter((exam) => {
        const code = exam.code.toLowerCase();
        const title = exam.title.toLowerCase();
        const description = exam.description.toLowerCase();

        return (
            code.includes(searchText) ||
            title.includes(searchText) ||
            description.includes(searchText)
        );
    });

    renderExams(filteredExams);
}

function handleLogout() {
    const confirmLogout = confirm("¿Deseas cerrar sesión?");

    if (!confirmLogout) {
        return;
    }

    clearSession();
    window.location.href = "../index.html";
}

// INIT PAGE

function initAdminExamsPage() {
    renderExams();
    renderExamsSession();
    if (questionsContainer.children.length === 0) {
        addQuestion();
    }
}

// EVENTS

addQuestionBtn.addEventListener("click", () => {
    addQuestion();
});

questionsContainer.addEventListener("click", handleQuestionActions);

examForm.addEventListener("submit", handleSaveExam);

examsTableBody.addEventListener("click", handleTableActions);

searchExamInput.addEventListener("input", searchExams);

logoutButtons.forEach((button) => {
    button.addEventListener("click", handleLogout);
});


// RUN PAGE

initAdminExamsPage();