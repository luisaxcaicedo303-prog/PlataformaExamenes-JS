// ==========================
// LOCAL STORAGE KEYS
// ==========================

const USERS_KEY = "acme_users";
const EXAMS_KEY = "acme_exams";
const INIT_EXAM_RESULT = "initial_exam_result";
const RESULTS_KEY = "acme_results";
const SESSION_KEY = "acme_session";
const EXAM_SELECTION = "exam_selection";


// ==========================
// INITIAL USERS
// ==========================

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

// ==========================
// INITIAL EXAM SELECTION
// ==========================

const initialExamSelection = "";


// ==========================
// INITIAL EXAMS
// ==========================

const initialExams = [
    {
        "id": "exam-001",
        "code": "JS-101",
        "title": "Fundamentos de JavaScript",
        "description": "Evalúa conocimientos básicos sobre variables, tipos de datos, funciones, arreglos, objetos y estructuras de control en JavaScript.",
        "time": 10,
        "num_questions": "20",
        "difficulty": "Básico",
        "approval_percent": 70,
        "questions": [
            {
                "question": "¿Cuál de las siguientes palabras clave se utiliza para declarar una variable cuyo valor puede cambiar?",
                "options": [
                    "const",
                    "let",
                    "static",
                    "define"
                ],
                "correct_answer": 1
            },
            {
                "question": "¿Qué tipo de dato devuelve la expresión typeof 'Hola mundo'?",
                "options": [
                    "number",
                    "boolean",
                    "string",
                    "object"
                ],
                "correct_answer": 2
            },
            {
                "question": "¿Cuál es el resultado de la expresión 5 + '5'?",
                "options": [
                    "10",
                    "55",
                    "Error",
                    "undefined"
                ],
                "correct_answer": 1
            },
            {
                "question": "¿Qué estructura permite repetir un bloque de código un número determinado de veces?",
                "options": [
                    "if",
                    "switch",
                    "for",
                    "try"
                ],
                "correct_answer": 2
            },
            {
                "question": "¿Cuál es el método correcto para convertir un texto a mayúsculas?",
                "options": [
                    "uppercase()",
                    "toCaps()",
                    "upper()",
                    "toUpperCase()"
                ],
                "correct_answer": 3
            },
            {
                "question": "¿Qué valor booleano representa una condición verdadera?",
                "options": [
                    "0",
                    "true",
                    "null",
                    "false"
                ],
                "correct_answer": 1
            },
            {
                "question": "¿Qué operador se utiliza para comparar valor y tipo de dato al mismo tiempo?",
                "options": [
                    "==",
                    "=",
                    "===",
                    "!="
                ],
                "correct_answer": 2
            },
            {
                "question": "¿Qué método agrega un elemento al final de un arreglo?",
                "options": [
                    "push()",
                    "pop()",
                    "shift()",
                    "concat()"
                ],
                "correct_answer": 0
            },
            {
                "question": "¿Qué método elimina el último elemento de un arreglo?",
                "options": [
                    "push()",
                    "splice()",
                    "shift()",
                    "pop()"
                ],
                "correct_answer": 3
            },
            {
                "question": "¿Cómo se define una función tradicional en JavaScript?",
                "options": [
                    "func saludar()",
                    "function saludar()",
                    "create saludar()",
                    "def saludar()"
                ],
                "correct_answer": 1
            },
            {
                "question": "¿Qué palabra clave permite salir de un ciclo antes de que termine?",
                "options": [
                    "exit",
                    "continue",
                    "return",
                    "break"
                ],
                "correct_answer": 3
            },
            {
                "question": "¿Qué estructura se utiliza para tomar decisiones basadas en múltiples casos?",
                "options": [
                    "for",
                    "switch",
                    "while",
                    "try"
                ],
                "correct_answer": 1
            },
            {
                "question": "¿Cuál de las siguientes opciones representa correctamente un arreglo?",
                "options": [
                    "{1,2,3}",
                    "(1,2,3)",
                    "[1,2,3]",
                    "<1,2,3>"
                ],
                "correct_answer": 2
            },
            {
                "question": "¿Qué valor representa la ausencia intencional de un objeto?",
                "options": [
                    "null",
                    "undefined",
                    "false",
                    "0"
                ],
                "correct_answer": 0
            },
            {
                "question": "¿Qué método convierte una cadena numérica en un número entero?",
                "options": [
                    "parseInt()",
                    "toString()",
                    "NumberToInt()",
                    "integer()"
                ],
                "correct_answer": 0
            },
            {
                "question": "¿Cuál es el resultado de typeof 100?",
                "options": [
                    "integer",
                    "number",
                    "float",
                    "numeric"
                ],
                "correct_answer": 1
            },
            {
                "question": "¿Qué método permite recorrer cada elemento de un arreglo ejecutando una función?",
                "options": [
                    "forEach()",
                    "replace()",
                    "findIndex()",
                    "slice()"
                ],
                "correct_answer": 0
            },
            {
                "question": "¿Cómo se accede a la propiedad nombre de un objeto usuario?",
                "options": [
                    "usuario[nombre]",
                    "usuario->nombre",
                    "usuario.nombre",
                    "usuario::nombre"
                ],
                "correct_answer": 2
            },
            {
                "question": "¿Qué método muestra información en la consola del navegador?",
                "options": [
                    "print()",
                    "console.log()",
                    "show()",
                    "alert.log()"
                ],
                "correct_answer": 1
            },
            {
                "question": "¿Cuál de las siguientes opciones representa una función flecha válida?",
                "options": [
                    "=> () {}",
                    "function => {}",
                    "() => {}",
                    "arrow() => {}"
                ],
                "correct_answer": 2
            }
        ]
    },
    {
        "id": "exam-002",
        "code": "PY-102",
        "title": "Fundamentos de Python",
        "description": "Evalúa conocimientos básicos sobre sintaxis, variables, tipos de datos, estructuras de control, funciones y colecciones en Python.",
        "time": 10,
        "num_questions": "20",
        "difficulty": "Intermedio",
        "approval_percent": 70,
        "questions": [
            {
                "question": "¿Qué función se utiliza para mostrar información en la consola de Python?",
                "options": [
                    "echo()",
                    "print()",
                    "console.log()",
                    "show()"
                ],
                "correct_answer": 1
            },
            {
                "question": "¿Cuál es el tipo de dato de la variable creada con valor [1, 2, 3]?",
                "options": [
                    "tuple",
                    "dictionary",
                    "list",
                    "string"
                ],
                "correct_answer": 2
            },
            {
                "question": "¿Qué símbolo se utiliza para escribir comentarios de una sola línea en Python?",
                "options": [
                    "//",
                    "#",
                    "/*",
                    "<!--"
                ],
                "correct_answer": 1
            },
            {
                "question": "¿Qué estructura se utiliza para ejecutar código solo si una condición es verdadera?",
                "options": [
                    "for",
                    "while",
                    "if",
                    "import"
                ],
                "correct_answer": 2
            },
            {
                "question": "¿Qué palabra clave se utiliza para definir una función en Python?",
                "options": [
                    "function",
                    "func",
                    "method",
                    "def"
                ],
                "correct_answer": 3
            },
            {
                "question": "¿Cuál es el resultado de la expresión 5 + 5 en Python?",
                "options": [
                    "55",
                    "10",
                    "Error",
                    "undefined"
                ],
                "correct_answer": 1
            },
            {
                "question": "¿Qué tipo de dato representa valores Verdadero o Falso?",
                "options": [
                    "int",
                    "float",
                    "bool",
                    "string"
                ],
                "correct_answer": 2
            },
            {
                "question": "¿Cuál es la salida de print(type('Hola'))?",
                "options": [
                    "<class 'int'>",
                    "<class 'string'>",
                    "<class 'str'>",
                    "<class 'text'>"
                ],
                "correct_answer": 2
            },
            {
                "question": "¿Qué función se utiliza para obtener la longitud de una lista o cadena?",
                "options": [
                    "count()",
                    "size()",
                    "len()",
                    "length()"
                ],
                "correct_answer": 2
            },
            {
                "question": "¿Cuál de las siguientes opciones crea correctamente una lista vacía?",
                "options": [
                    "{}",
                    "()",
                    "[]",
                    "<>"
                ],
                "correct_answer": 2
            },
            {
                "question": "¿Qué método agrega un elemento al final de una lista?",
                "options": [
                    "insert()",
                    "append()",
                    "add()",
                    "push()"
                ],
                "correct_answer": 1
            },
            {
                "question": "¿Qué ciclo se utiliza para recorrer una secuencia de elementos?",
                "options": [
                    "loop",
                    "repeat",
                    "for",
                    "iterate"
                ],
                "correct_answer": 2
            },
            {
                "question": "¿Cuál de las siguientes opciones representa una tupla en Python?",
                "options": [
                    "[1, 2, 3]",
                    "{1, 2, 3}",
                    "(1, 2, 3)",
                    "<1, 2, 3>"
                ],
                "correct_answer": 2
            },
            {
                "question": "¿Qué operador se utiliza para comparar igualdad entre dos valores?",
                "options": [
                    "=",
                    "==",
                    "===",
                    "!="
                ],
                "correct_answer": 1
            },
            {
                "question": "¿Qué palabra clave se utiliza para importar un módulo?",
                "options": [
                    "include",
                    "require",
                    "import",
                    "using"
                ],
                "correct_answer": 2
            },
            {
                "question": "¿Qué función convierte una cadena de texto en un número entero?",
                "options": [
                    "str()",
                    "float()",
                    "number()",
                    "int()"
                ],
                "correct_answer": 3
            },
            {
                "question": "¿Qué valor especial representa la ausencia de un valor en Python?",
                "options": [
                    "null",
                    "undefined",
                    "None",
                    "empty"
                ],
                "correct_answer": 2
            },
            {
                "question": "¿Cuál es el resultado de la expresión 10 // 3?",
                "options": [
                    "3.33",
                    "3",
                    "4",
                    "1"
                ],
                "correct_answer": 1
            },
            {
                "question": "¿Qué método convierte todos los caracteres de una cadena a mayúsculas?",
                "options": [
                    "upper()",
                    "capitalize()",
                    "uppercase()",
                    "toUpper()"
                ],
                "correct_answer": 0
            },
            {
                "question": "¿Cuál de las siguientes opciones crea correctamente un diccionario en Python?",
                "options": [
                    "[\"nombre\": \"Juan\"]",
                    "(\"nombre\": \"Juan\")",
                    "{\"nombre\": \"Juan\"}",
                    "<\"nombre\": \"Juan\">"
                ],
                "correct_answer": 2
            }
        ]
    },
    {
        "id": "exam-003",
        "code": "HTML-103",
        "title": "Fundamentos de HTML",
        "description": "Evalúa conocimientos básicos sobre la estructura de documentos HTML, etiquetas semánticas, formularios, enlaces, imágenes y buenas prácticas de desarrollo web.",
        "time": 10,
        "num_questions": "20",
        "difficulty": "Avanzado",
        "approval_percent": 70,
        "questions": [
            {
                "question": "¿Qué significa HTML?",
                "options": [
                    "Hyper Text Markup Language",
                    "High Text Machine Language",
                    "Hyper Transfer Markup Language",
                    "Home Tool Markup Language"
                ],
                "correct_answer": 0
            },
            {
                "question": "¿Cuál es la etiqueta raíz de todo documento HTML?",
                "options": [
                    "<body>",
                    "<head>",
                    "<html>",
                    "<main>"
                ],
                "correct_answer": 2
            },
            {
                "question": "¿Qué etiqueta contiene información de configuración y metadatos del documento?",
                "options": [
                    "<footer>",
                    "<body>",
                    "<section>",
                    "<head>"
                ],
                "correct_answer": 3
            },
            {
                "question": "¿Qué etiqueta define el título que aparece en la pestaña del navegador?",
                "options": [
                    "<meta>",
                    "<title>",
                    "<header>",
                    "<caption>"
                ],
                "correct_answer": 1
            },
            {
                "question": "¿Cuál es la etiqueta correcta para crear un enlace?",
                "options": [
                    "<link>",
                    "<href>",
                    "<a>",
                    "<url>"
                ],
                "correct_answer": 2
            },
            {
                "question": "¿Qué atributo de la etiqueta <a> indica la dirección del enlace?",
                "options": [
                    "src",
                    "link",
                    "url",
                    "href"
                ],
                "correct_answer": 3
            },
            {
                "question": "¿Qué etiqueta se utiliza para insertar una imagen en una página web?",
                "options": [
                    "<picture>",
                    "<img>",
                    "<image>",
                    "<photo>"
                ],
                "correct_answer": 1
            },
            {
                "question": "¿Qué atributo de la etiqueta <img> especifica la ruta de la imagen?",
                "options": [
                    "alt",
                    "href",
                    "src",
                    "path"
                ],
                "correct_answer": 2
            },
            {
                "question": "¿Qué atributo proporciona un texto alternativo para una imagen?",
                "options": [
                    "title",
                    "alt",
                    "description",
                    "label"
                ],
                "correct_answer": 1
            },
            {
                "question": "¿Cuál es la etiqueta principal que contiene todo el contenido visible de una página web?",
                "options": [
                    "<body>",
                    "<head>",
                    "<html>",
                    "<meta>"
                ],
                "correct_answer": 0
            },
            {
                "question": "¿Qué etiqueta representa el encabezado de mayor importancia dentro del contenido?",
                "options": [
                    "<header>",
                    "<h6>",
                    "<strong>",
                    "<h1>"
                ],
                "correct_answer": 3
            },
            {
                "question": "¿Cuál es la etiqueta correcta para crear una lista no ordenada?",
                "options": [
                    "<ol>",
                    "<ul>",
                    "<li>",
                    "<list>"
                ],
                "correct_answer": 1
            },
            {
                "question": "¿Qué etiqueta se utiliza para cada elemento de una lista?",
                "options": [
                    "<item>",
                    "<ul>",
                    "<li>",
                    "<list-item>"
                ],
                "correct_answer": 2
            },
            {
                "question": "¿Cuál es la etiqueta correcta para crear una lista ordenada?",
                "options": [
                    "<ol>",
                    "<ul>",
                    "<li>",
                    "<order>"
                ],
                "correct_answer": 0
            },
            {
                "question": "¿Qué etiqueta se utiliza para crear un formulario?",
                "options": [
                    "<input>",
                    "<fieldset>",
                    "<form>",
                    "<submit>"
                ],
                "correct_answer": 2
            },
            {
                "question": "¿Qué etiqueta permite al usuario ingresar texto en un formulario?",
                "options": [
                    "<textarea>",
                    "<input>",
                    "<field>",
                    "<text>"
                ],
                "correct_answer": 1
            },
            {
                "question": "¿Qué atributo del elemento input define el tipo de dato esperado?",
                "options": [
                    "name",
                    "value",
                    "placeholder",
                    "type"
                ],
                "correct_answer": 3
            },
            {
                "question": "¿Cuál de las siguientes etiquetas es considerada una etiqueta semántica de HTML5?",
                "options": [
                    "<div>",
                    "<span>",
                    "<section>",
                    "<font>"
                ],
                "correct_answer": 2
            },
            {
                "question": "¿Qué etiqueta semántica representa el pie de página de una sección o documento?",
                "options": [
                    "<bottom>",
                    "<footer>",
                    "<end>",
                    "<aside>"
                ],
                "correct_answer": 1
            },
            {
                "question": "¿Qué etiqueta semántica se utiliza para representar el contenido principal de una página?",
                "options": [
                    "<article>",
                    "<content>",
                    "<main>",
                    "<section>"
                ],
                "correct_answer": 2
            }
        ]
    }
];

// ==========================
// INITIAL EXAM RESULT
// ==========================

const initialExamResult = {
        id: 0,
        examId: 0,
        studentName: "",
        studentIdentification: "",
        timeUsed: "",
        submittedAt: "",
        answers: [
        ],
        score: 0,
        approved: false
    };
// ==========================
// INITIAL RESULTS
// ==========================

const initialResults = [
    {
        id: "result-001",
        examId: 1,
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
        ],
        score: 70,
        approved: true
    }
];


// ==========================
// INIT LOCAL STORAGE
// ==========================

function initLocalStorage() {
    const users = localStorage.getItem(USERS_KEY);
    const exams = localStorage.getItem(EXAMS_KEY);
    const initExam = localStorage.getItem(INIT_EXAM_RESULT);
    const results = localStorage.getItem(RESULTS_KEY);
    const examSelection = localStorage.getItem(EXAM_SELECTION);

    if (!users) {
        localStorage.setItem(USERS_KEY, JSON.stringify(initialUsers));
    }

    if (!exams) {
        localStorage.setItem(EXAMS_KEY, JSON.stringify(initialExams));
    }

    if (!initExam) {
        localStorage.setItem(INIT_EXAM_RESULT, JSON.stringify(initialExamResult));
    }

    if (!results) {
        localStorage.setItem(RESULTS_KEY, JSON.stringify(initialResults));
    }

    if(!examSelection){
        localStorage.setItem(EXAM_SELECTION, JSON.stringify(initialExamSelection));
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
    console.log("entro");
    return getData(EXAMS_KEY);
}

function saveExams(exams) {
    saveData(EXAMS_KEY, exams);
}

function getExamSelection() {
    return getData(EXAM_SELECTION);
}

function saveExamSelection(exam) {
    saveData(EXAM_SELECTION, exam);
}

function getInitResult() {
    return getData(INIT_EXAM_RESULT);
}

function saveInitResult(result) {
    saveData(INIT_EXAM_RESULT, result);
}


function getResults() {
    return getData(RESULTS_KEY);
}

function saveResults(results) {
    saveData(RESULTS_KEY, results);
}

function saveSession(session) {
    saveData(SESSION_KEY,session);
}

function getSession() {
    return getData(SESSION_KEY);
}

function clearSession() {
    localStorage.removeItem(SESSION_KEY);
}


// ==========================
// RUN INIT
// ==========================

initLocalStorage();