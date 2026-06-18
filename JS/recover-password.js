const recoverForm = document.getElementById("recover-form");
const recoverEmailInput = document.getElementById("recover-email");
const securityQuestionInput = document.getElementById("security-question");
const securityAnswerInput = document.getElementById("security-answer");
const newPasswordInput = document.getElementById("new-password");
const confirmPasswordInput = document.getElementById("confirm-password");


// HELPERS

function normalizeText(text) {
    return String(text || "").toLowerCase().trim();
}

function findUserByEmail(email) {
    const users = getUsers();

    return users.find((user) => {
        return normalizeText(user.email) === normalizeText(email);
    });
}

function validatePasswordFields(newPassword, confirmPassword) {
    if (newPassword.length < 4) {
        alert("La nueva contraseña debe tener mínimo 4 caracteres.");
        return false;
    }

    if (newPassword !== confirmPassword) {
        alert("Las contraseñas no coinciden.");
        return false;
    }

    return true;
}

function validateSecurityData(user, selectedQuestion, typedAnswer) {
    if (!user.seguridad) {
        alert("Este usuario no tiene datos de seguridad registrados.");
        return false;
    }

    const userQuestion = String(user.seguridad.idPregunta);
    const userAnswer = normalizeText(user.seguridad.respuesta);

    if (String(selectedQuestion) !== userQuestion) {
        alert("La pregunta de seguridad no coincide con la registrada.");
        return false;
    }

    if (normalizeText(typedAnswer) !== userAnswer) {
        alert("La respuesta de seguridad es incorrecta.");
        return false;
    }

    return true;
}

function updateUserPassword(userId, newPassword) {
    const users = getUsers();

    const updatedUsers = users.map((user) => {
        if (user.id === userId) {
            return {
                ...user,
                password: newPassword,
                updatedAt: new Date().toISOString().split("T")[0]
            };
        }

        return user;
    });

    saveUsers(updatedUsers);
}

function createRecoveredSession(user) {
    const session = {
        id: user.id,
        identificacion: user.identificacion,
        username: user.username,
        email: user.email,
        role: user.role,
        loggedAt: new Date().toISOString()
    };

    saveSession(session);
}


// MAIN ACTION

function handleRecoverPassword(event) {
    event.preventDefault();

    const email = recoverEmailInput.value.trim();
    const selectedQuestion = securityQuestionInput.value;
    const typedAnswer = securityAnswerInput.value.trim();
    const newPassword = newPasswordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();

    const user = findUserByEmail(email);

    if (!user) {
        alert("No existe un usuario registrado con ese correo.");
        return;
    }

    if (!validatePasswordFields(newPassword, confirmPassword)) {
        return;
    }

    if (!validateSecurityData(user, selectedQuestion, typedAnswer)) {
        return;
    }

    updateUserPassword(user.id, newPassword);

    const updatedUser = {
        ...user,
        password: newPassword
    };

    createRecoveredSession(updatedUser);

    alert("Contraseña actualizada correctamente.");

    if (updatedUser.role === "student") {
        window.location.href = "./login.html";
        return;
    }

    window.location.href = "./admin-exams.html";
}


// EVENTS

recoverForm.addEventListener("submit", handleRecoverPassword);