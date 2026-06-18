// LOCAL STORAGE KEYS

const USERS_KEY = "acme_users";
const EXAMS_KEY = "acme_exams";
const RESULTS_KEY = "acme_results";
const SESSION_KEY = "acme_session";


// INITIAL USERS

const initialUsers = [
    {
        id: "user-001",
        identificacion: "1001234567",
        username: "admin",
        email: "admin@acmeexam.com",
        telefono: "3001234567",
        password: "admin123",
        role: "admin",
        seguridad: {
            idPregunta: "1",
            respuesta: "firulais"
        },
    },
    {
        id: "user-002",
        identificacion: "1007654321",
        username: "docente",
        email: "docente@acmeexam.com",
        telefono: "3017654321",
        password: "docente123",
        role: "teacher",
        seguridad: {
            idPregunta: "4",
            respuesta: "pizza"
        },
    }
];


// INITIAL EXAMS

const initialExams = [
    {
        id: "exam-001",
        code: "JS-101",
        title: "Fundamentos de JavaScript",
        description: "Examen sobre variables, tipos de datos, funciones, condicionales y manejo básico del DOM.",
        time: 30,
        approval_percent: 70,
        createdBy: "user-002",
        createdAt: "2026-06-15",
        questions: [
            {
                question: "¿Cuál de las siguientes opciones permite declarar una variable que puede cambiar su valor en JavaScript?",
                response_options: [
                    "const",
                    "let",
                    "static",
                    "define"
                ],
                correct_answer: 1
            },
            {
                question: "¿Qué método se utiliza para seleccionar un elemento HTML por su id?",
                response_options: [
                    "document.querySelectorAll()",
                    "document.getElementById()",
                    "document.getElementsByClassName()",
                    "document.createElement()"
                ],
                correct_answer: 1
            },
            {
                question: "¿Qué estructura permite ejecutar código dependiendo de una condición?",
                response_options: [
                    "if",
                    "array",
                    "object",
                    "prompt"
                ],
                correct_answer: 0
            }
        ]
    },
    {
        id: "exam-002",
        code: "PY-102",
        title: "Fundamentos de Python",
        description: "Examen básico sobre sintaxis, variables, listas, condicionales y funciones en Python.",
        time: 35,
        approval_percent: 75,
        createdBy: "user-002",
        createdAt: "2026-06-15",
        questions: [
            {
                question: "¿Cuál de las siguientes opciones permite crear una lista en Python?",
                response_options: [
                    "{1, 2, 3}",
                    "(1, 2, 3)",
                    "[1, 2, 3]",
                    "<1, 2, 3>"
                ],
                correct_answer: 2
            },
            {
                question: "¿Qué palabra clave se utiliza para definir una función en Python?",
                response_options: [
                    "function",
                    "def",
                    "fun",
                    "method"
                ],
                correct_answer: 1
            },
            {
                question: "¿Cuál operador se usa para comparar igualdad en Python?",
                response_options: [
                    "=",
                    "==",
                    "===",
                    "!="
                ],
                correct_answer: 1
            }
        ]
    },
    {
        id: "exam-003",
        code: "HTML-103",
        title: "Fundamentos de HTML",
        description: "Examen sobre estructura básica de documentos HTML, etiquetas semánticas, formularios y enlaces.",
        time: 25,
        approval_percent: 80,
        createdBy: "user-002",
        createdAt: "2026-06-15",
        questions: [
            {
                question: "¿Cuál etiqueta representa correctamente el contenido principal de una página HTML?",
                response_options: [
                    "<main>",
                    "<body-main>",
                    "<content>",
                    "<principal>"
                ],
                correct_answer: 0
            },
            {
                question: "¿Qué atributo se utiliza en un input para indicar que el campo es obligatorio?",
                response_options: [
                    "checked",
                    "required",
                    "selected",
                    "disabled"
                ],
                correct_answer: 1
            },
            {
                question: "¿Cuál etiqueta se utiliza para crear un enlace?",
                response_options: [
                    "<link>",
                    "<href>",
                    "<a>",
                    "<url>"
                ],
                correct_answer: 2
            }
        ]
    }
];


// INITIAL RESULTS

const initialResults = [
    {
        id: "result-001",
        examId: "exam-001",
        studentName: "Carlos Pérez",
        studentIdentification: "1098765432",
        timeUsed: "32 min",
        submittedAt: "2026-06-18T10:30:00",
        answers: [
            { questionIndex: 0, selected_answer: 1 },
            { questionIndex: 1, selected_answer: 2 },
            { questionIndex: 2, selected_answer: 1 },
            { questionIndex: 3, selected_answer: 2 },
            { questionIndex: 4, selected_answer: 0 },
            { questionIndex: 5, selected_answer: 1 },
            { questionIndex: 6, selected_answer: 2 },
            { questionIndex: 7, selected_answer: 0 },
            { questionIndex: 8, selected_answer: 3 },
            { questionIndex: 9, selected_answer: 1 },
            { questionIndex: 10, selected_answer: 3 },
            { questionIndex: 11, selected_answer: 1 },
            { questionIndex: 12, selected_answer: 2 },
            { questionIndex: 13, selected_answer: 0 },
            { questionIndex: 14, selected_answer: 0 },
            { questionIndex: 15, selected_answer: 1 },
            { questionIndex: 16, selected_answer: 0 },
            { questionIndex: 17, selected_answer: 2 },
            { questionIndex: 18, selected_answer: 1 },
            { questionIndex: 19, selected_answer: 2 }
        ]
    }
];

// INNITIAL ACME SESSION

const initialSession = {
        id: "user-001",
        identificacion: "1001234567",
        username: "admin",
        email: "admin@acmeexam.com",
        telefono: "3001234567",
        password: "admin123",
        role: "admin",
        seguridad: {
            idPregunta: "1",
            respuesta: "firulais"
        },
};


// INIT LOCAL STORAGE

function initLocalStorage() {
    const users = localStorage.getItem(USERS_KEY);
    const exams = localStorage.getItem(EXAMS_KEY);
    const results = localStorage.getItem(RESULTS_KEY);
    const acme_session = localStorage.getItem(SESSION_KEY);

    if (!users) {
        localStorage.setItem(USERS_KEY, JSON.stringify(initialUsers));
    }

    if (!exams) {
        localStorage.setItem(EXAMS_KEY, JSON.stringify(initialExams));
    }

    if (!results) {
        localStorage.setItem(RESULTS_KEY, JSON.stringify(initialResults));
    }

    if (!acme_session) {
        localStorage.setItem(SESSION_KEY, JSON.stringify(initialSession));
    }
}


// ==========================
// GENERAL STORAGE FUNCTIONS
// ==========================

function getData(key) {
    const data = localStorage.getItem(key);

    if (!data) {
        return [];
    }

    return JSON.parse(data);
}

function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}


// ==========================
// SPECIFIC GETTERS
// ==========================

function getUsers() {
    return getData(USERS_KEY);
}

function saveUsers(users) {
    saveData(USERS_KEY, users);
}

function getExams() {
    return getData(EXAMS_KEY);
}

function saveExams(exams) {
    saveData(EXAMS_KEY, exams);
}

function getResults() {
    return getData(RESULTS_KEY);
}

function saveResults(results) {
    saveData(RESULTS_KEY, results);
}

function getSession() {
    return getData(SESSION_KEY);
}

function clearSession() {
    localStorage.removeItem(SESSION_KEY);
}


// RUN INIT

initLocalStorage();