# AcmeExam

**AcmeExam** es una plataforma web de evaluación desarrollada con **HTML, CSS y JavaScript puro**, utilizando **LocalStorage** como sistema de almacenamiento. El proyecto permite gestionar usuarios, crear exámenes, resolver pruebas sin registro y revisar resultados desde un panel administrativo.

---

## Descripción general

AcmeExam está pensado como una plataforma de exámenes donde existen dos tipos principales de uso:

1. **Panel administrativo** para administradores y docentes.
2. **Vista pública** para usuarios que desean resolver exámenes sin registrarse.

El sistema no utiliza base de datos ni backend. Toda la información se almacena en el navegador mediante `localStorage`.

---

## Tecnologías utilizadas

* HTML5
* CSS3
* JavaScript
* LocalStorage
* Diseño responsive
* Google Fonts: Outfit

---

## Funcionalidades principales

### Inicio de sesión

La plataforma cuenta con una pantalla de login para usuarios autorizados.

Desde esta vista se puede:

* Iniciar sesión con correo y contraseña.
* Acceder a la recuperación de contraseña.
* Ir a la pantalla pública para resolver exámenes.
* Redirigir al panel administrativo según la sesión activa.

---

### Recuperación de contraseña

El sistema incluye una vista para recuperar la contraseña.

El usuario debe ingresar:

* Correo electrónico.
* Nueva contraseña.
* Confirmación de nueva contraseña.
* Pregunta de seguridad.
* Respuesta de seguridad.

Si la información es correcta, la contraseña se actualiza en `localStorage`.

---

### Gestión de exámenes

La vista de gestión de exámenes permite a docentes y administradores crear y administrar pruebas.

Cada examen puede contener:

* Título.
* Descripción.
* Tiempo límite.
* Dificultad.
* Porcentaje de aprobación.
* Número de preguntas.
* Preguntas dinámicas.
* Opciones de respuesta dinámicas.
* Respuesta correcta por pregunta.

Las preguntas permiten agregar o quitar opciones de respuesta. Cada pregunta debe tener mínimo dos opciones.

---

### Gestión de usuarios

La vista de gestión de usuarios está disponible únicamente para administradores.

Desde esta sección se puede:

* Crear usuarios.
* Editar usuarios.
* Eliminar usuarios.
* Cambiar roles.
* Buscar usuarios registrados.
* Validar acciones sensibles mediante contraseña.

Los roles disponibles son:

* Administrador.
* Docente.
* Estudiante.

Para editar o eliminar usuarios, el administrador debe confirmar la acción ingresando su contraseña.

---

### Resolver exámenes sin registro

La plataforma permite que cualquier usuario resuelva un examen sin necesidad de registrarse.

Antes de presentar el examen, el usuario debe ingresar datos básicos como:

* Nombre.
* Identificación.

Después de completar el examen, el sistema calcula automáticamente:

* Número de respuestas correctas.
* Total de preguntas.
* Porcentaje obtenido.
* Estado de aprobación.
* Tiempo usado.
* Respuestas seleccionadas.

El resultado se guarda en `localStorage`.

---

### Exámenes resueltos

La vista de exámenes resueltos permite consultar los resultados de los usuarios que presentaron pruebas.

En esta sección se muestra:

* Nombre del usuario.
* Identificación.
* Nombre del examen.
* Tiempo utilizado.
* Puntaje obtenido.
* Estado del examen.
* Detalle de respuestas.

En el detalle del resultado, las respuestas se muestran con colores:

* Verde para respuestas correctas.
* Rojo para respuestas incorrectas.
* También se resalta la respuesta correcta cuando el usuario responde mal.

---

## Modo oscuro

El proyecto está preparado para trabajar con modo oscuro mediante una clase en el `body`.

```html
<body class="dark_mode">
```

Los colores están centralizados mediante variables CSS en `:root`, lo que permite modificar fácilmente la apariencia general del sitio.

---

## Estructura del proyecto

```txt
AcmeExam/
│
├── HTML/
│   ├── login.html
│   ├── recover-password.html
│   ├── admin-exams.html
│   ├── admin-users.html
│   ├── admin-results.html
│   └── solve-exam.html
│
├── CSS/
│   ├── login.css
│   ├── recover-password.css
│   ├── admin-exams.css
│   ├── admin-users.css
│   ├── admin-results.css
│   └── solve-exam.css
│
├── JS/
│   ├── storage.js
│   ├── login.js
│   ├── recover-password.js
│   ├── admin-exams.js
│   ├── admin-users.js
│   ├── admin-results.js
│   └── solve-exam.js
│
├── Assets/
│   └── images/
│       ├── logo.png
│       └── estudiante.png
│
└── README.md
```

---

## Almacenamiento en LocalStorage

El proyecto utiliza las siguientes claves principales:

```txt
acme_users
acme_exams
acme_results
acme_session
```

---

## Estructura de usuarios

Los usuarios registrados se almacenan en `acme_users`.

Ejemplo:

```js
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
        respuesta: "natasha"
    },
    createdAt: "2026-06-15"
}
```

---

## Estructura de exámenes

Los exámenes se almacenan en `acme_exams`.

Ejemplo:

```js
{
    id: 1,
    title: "Fundamentos de JavaScript",
    description: "Evalúa conocimientos básicos sobre variables, tipos de datos, funciones, arreglos, objetos y estructuras de control en JavaScript.",
    time: 45,
    num_questions: "20",
    difficulty: "Básico",
    approval_percent: 70,
    questions: [
        {
            question: "¿Cuál de las siguientes palabras clave se utiliza para declarar una variable cuyo valor puede cambiar?",
            options: [
                "const",
                "let",
                "static",
                "define"
            ],
            correct_answer: 1
        }
    ]
}
```

---

## Estructura de resultados

Los resultados de exámenes se almacenan en `acme_results`.

Ejemplo:

```js
{
    id: "result-001",
    examId: 1,
    studentName: "Carlos Pérez",
    studentIdentification: "1098765432",
    timeUsed: "32 min",
    submittedAt: "2026-06-18T10:30:00",
    answers: [
        {
            questionIndex: 0,
            selected_answer: 1
        },
        {
            questionIndex: 1,
            selected_answer: 2
        }
    ],
    score: 70,
    approved: true
}
```

---

## Estructura de sesión

La sesión activa se almacena en `acme_session`.

Ejemplo:

```js
{
    id: "user-001",
    identificacion: "1001234567",
    username: "admin",
    email: "admin@acmeexam.com",
    role: "admin",
    loggedAt: "2026-06-18T10:30:00"
}
```

---

## Roles del sistema

### Administrador

Puede acceder a:

* Gestión de exámenes.
* Gestión de usuarios.
* Exámenes resueltos.

También puede crear, editar y eliminar usuarios.

### Docente

Puede acceder a:

* Gestión de exámenes.
* Exámenes resueltos.

No tiene acceso a la gestión de usuarios.

### Usuario externo

Puede resolver exámenes sin registrarse.

---

## Seguridad del sistema

Como el proyecto usa únicamente `localStorage`, no tiene seguridad real de servidor. Las validaciones se realizan desde JavaScript y están pensadas para fines académicos.

Validaciones implementadas:

* Control de sesión.
* Control de navegación según rol.
* Confirmación con contraseña para editar o eliminar usuarios.
* Pregunta de seguridad para recuperar contraseña.
* Validación de respuestas correctas e incorrectas.
* Cálculo automático del resultado del examen.

---

## Diseño responsive

El proyecto está diseñado con enfoque responsive.

### Móvil

* Header con logo.
* Menú hamburguesa.
* Navegación adaptada.
* Cards en una sola columna.

### Tablet

* Mejor distribución de formularios.
* Formularios con dos columnas en algunos campos.
* Navegación más cómoda.

### Escritorio

* Sidebar lateral.
* Topbar superior.
* Cards en dos columnas.
* Tablas con scroll horizontal cuando es necesario.

---

## Cómo ejecutar el proyecto

1. Clonar o descargar el repositorio.
2. Abrir el proyecto en Visual Studio Code.
3. Usar la extensión Live Server.
4. Abrir el archivo:

```txt
HTML/login.html
```

---

## Usuarios iniciales de prueba

### Administrador

```txt
Correo: admin@acmeexam.com
Contraseña: admin123
Rol: Administrador
```

### Docente

```txt
Correo: docente@acmeexam.com
Contraseña: docente123
Rol: Docente
```

---

## Estado del proyecto

El proyecto actualmente cuenta con:

* Login funcional.
* Recuperación de contraseña.
* Gestión de usuarios.
* Gestión de exámenes.
* Vista pública para resolver exámenes.
* Registro de resultados.
* Vista administrativa de exámenes resueltos.
* Control de sesión mediante LocalStorage.
* Diseño responsive.
* Preparación para modo oscuro.

---

## Autor

Proyecto desarrollado como práctica de HTML, CSS y JavaScript.

**AcmeExam** - Plataforma de evaluación académica.
