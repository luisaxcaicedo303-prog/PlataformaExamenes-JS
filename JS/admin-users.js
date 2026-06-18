// DOM ELEMENTS

const userForm = document.getElementById("user-form");

const userIdentificacionInput = document.getElementById("user-identificacion");
const userUsernameInput = document.getElementById("user-username");
const userEmailInput = document.getElementById("user-email");
const userTelefonoInput = document.getElementById("user-telefono");
const userPasswordInput = document.getElementById("user-password");
const userRoleInput = document.getElementById("user-role");
const securityQuestionInput = document.getElementById("security-question");
const securityAnswerInput = document.getElementById("security-answer");

const clearUserFormBtn = document.getElementById("clear-user-form");
const saveUserBtn = document.getElementById("save-user-btn");

const usersTableBody = document.getElementById("users-table-body");
const usersCount = document.getElementById("users-count");
const searchUserInput = document.getElementById("search-user");

const confirmModal = document.getElementById("confirm-modal");
const modalTitle = document.getElementById("modal-title");
const modalMessage = document.getElementById("modal-message");
const confirmPasswordInput = document.getElementById("confirm-password");
const cancelModalBtn = document.getElementById("cancel-modal-btn");
const confirmModalBtn = document.getElementById("confirm-modal-btn");

const logoutButtons = document.querySelectorAll(".logout_btn");
const adminLinks = document.querySelectorAll(".admin_navigation");


let editingUserId = null;
let pendingAction = null;
let pendingUserId = null;


// HELPERS

function createId(prefix) {
    return `${prefix}-${Date.now()}`;
}

function getCurrentUser() {
    const session = getSession();
    console.log(session)

    if (!session) {
        return null;
    }

    const users = getUsers();

    return users.find((user) => user.id === session.id);
}

function getRoleText(role) {
    if (role === "admin") return "Administrador";
    if (role === "teacher") return "Docente";

    return "Sin rol";
}


// SESSION AND ROLE

function renderUsersSession() {
    const session = getSession();

    if (!session) {
        window.location.href = "login.html";
        return false;
    }

    if (session.role !== "admin") {
        alert("No tienes permisos para acceder a gestión de usuarios.");
        window.location.href = "./admin-exams.html";
        return false;
    }

    adminLinks.forEach((link) => {
        link.classList.remove("hidden");
    });

    return true;
}


// RENDER USERS

function renderUsers(usersToRender = getUsers()) {
    usersTableBody.innerHTML = "";
    usersCount.textContent = usersToRender.length;

    if (usersToRender.length === 0) {
        usersTableBody.innerHTML = `
            <tr>
                <td colspan="6">No hay usuarios registrados.</td>
            </tr>
        `;
        return;
    }

    usersToRender.forEach((user) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>
                <strong>${user.identificacion}</strong>
            </td>

            <td>
                <strong>${user.username}</strong>
                <small>${user.id}</small>
            </td>

            <td>
                ${user.email || "Sin correo"}
            </td>

            <td>
                ${user.telefono || "Sin teléfono"}
            </td>

            <td>
                <span class="role_badge">${getRoleText(user.role)}</span>
            </td>

            <td>
                <div class="actions">
                    <button 
                        type="button" 
                        class="btn_table edit_user_btn"
                        data-id="${user.id}"
                    >
                        Editar
                    </button>

                    <button 
                        type="button" 
                        class="btn_table danger delete_user_btn"
                        data-id="${user.id}"
                    >
                        Eliminar
                    </button>
                </div>
            </td>
        `;

        usersTableBody.appendChild(row);
    });
}


function resetUserForm() {
    userForm.reset();
    editingUserId = null;
    saveUserBtn.textContent = "Guardar usuario";
}

// VALIDATE DUPLICATES

function validateDuplicatedUser(users, userData) {
    const identificacionExists = users.some((user) => {
        return user.identificacion === userData.identificacion && user.id !== editingUserId;
    });

    if (identificacionExists) {
        alert("Ya existe un usuario con esa identificación.");
        return false;
    }

    const usernameExists = users.some((user) => {
        return user.username.toLowerCase() === userData.username.toLowerCase() && user.id !== editingUserId;
    });

    if (usernameExists) {
        alert("Ya existe un usuario con ese nombre de usuario.");
        return false;
    }

    const emailExists = users.some((user) => {
        return user.email && user.email.toLowerCase() === userData.email.toLowerCase() && user.id !== editingUserId;
    });

    if (emailExists) {
        alert("Ya existe un usuario con ese correo.");
        return false;
    }

    return true;
}

// COLLECT USER DATA

function collectUserData() {
    return {
        identificacion: userIdentificacionInput.value.trim(),
        username: userUsernameInput.value.trim(),
        email: userEmailInput.value.trim(),
        telefono: userTelefonoInput.value.trim(),
        password: userPasswordInput.value.trim(),
        role: userRoleInput.value,
        seguridad: {
            idPregunta: securityQuestionInput.value,
            respuesta: securityAnswerInput.value.toLowerCase().trim()
        }
    };
}

// SAVE USER

function handleSaveUser(event) {
    event.preventDefault();

    const users = getUsers();
    const userData = collectUserData();

    if (!validateDuplicatedUser(users, userData)) {
        return;
    }

    if (editingUserId) {
        openConfirmModal(
            "Editar usuario",
            "Seguro que deseas editar este usuario. Ingresa tu contraseña para continuar.",
            "edit",
            editingUserId
        );

        return;
    }

    const newUser = {
        id: createId("user"),
        ...userData,
        createdAt: new Date().toISOString().split("T")[0]
    };

    users.push(newUser);
    saveUsers(users);

    alert("Usuario creado correctamente.");
    resetUserForm();
    renderUsers();
}

// LOAD USER TO FORM

function loadUserToForm(userId) {
    const users = getUsers();

    const user = users.find((item) => item.id === userId);

    if (!user) {
        alert("No se encontró el usuario.");
        return;
    }

    editingUserId = user.id;

    userIdentificacionInput.value = user.identificacion || "";
    userUsernameInput.value = user.username || "";
    userEmailInput.value = user.email || "";
    userTelefonoInput.value = user.telefono || "";
    userPasswordInput.value = user.password || "";
    userRoleInput.value = user.role || "";
    securityQuestionInput.value =  Number(user.seguridad?.idPregunta) || "";
    securityAnswerInput.value = user.seguridad?.respuesta || "";

    saveUserBtn.textContent = "Actualizar usuario";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// MODAL

function openConfirmModal(title, message, action, userId) {
    modalTitle.textContent = title;
    modalMessage.textContent = message;
    confirmPasswordInput.value = "";

    pendingAction = action;
    pendingUserId = userId;

    confirmModal.classList.remove("hidden");
    confirmPasswordInput.focus();
}

function closeConfirmModal() {
    confirmModal.classList.add("hidden");
    confirmPasswordInput.value = "";
    pendingAction = null;
    pendingUserId = null;
}

function validateAdminPassword() {
    const currentUser = getCurrentUser();
    console.log("current user: "+currentUser);
    if (!currentUser) {
        alert("No se pudo validar la sesión.");
        return false;
    }

    const typedPassword = confirmPasswordInput.value.trim();

    if (typedPassword !== currentUser.password) {
        alert("Contraseña incorrecta.");
        return false;
    }

    return true;
}

// CONFIRMED ACTIONS

function confirmPendingAction() {
    if (!validateAdminPassword()) {
        return;
    }

    if (pendingAction === "edit") {
        updateUser(pendingUserId);
    }

    if (pendingAction === "delete") {
        deleteUser(pendingUserId);
    }

    closeConfirmModal();
}

function updateUser(userId) {
  const users = getUsers();
  const userData = collectUserData();
  const session = getSession();
  if (session && session.id === userId && userData.role !== "admin") {
    alert("No puedes quitarte a ti mismo el rol de administrador.");
    return;
  }
  const updatedUsers = users.map((user) => {
    if (user.id === userId) {
      return {
        ...user,
        ...userData,
        updatedAt: new Date().toISOString().split("T")[0],
      };
    }

    return user;
  });

  saveUsers(updatedUsers);

  alert("Usuario actualizado correctamente.");
  resetUserForm();
  renderUsers();
}

function deleteUser(userId) {
    const session = getSession();

    if (session && session.userId === userId) {
        alert("No puedes eliminar tu propio usuario mientras tienes la sesión activa.");
        return;
    }

    const users = getUsers();

    const filteredUsers = users.filter((user) => {
        return user.id !== userId;
    });

    saveUsers(filteredUsers);

    alert("Usuario eliminado correctamente.");
    renderUsers();
}

// TABLE ACTIONS

function handleTableActions(event) {
    const target = event.target;

    if (target.classList.contains("edit_user_btn")) {
        const userId = target.dataset.id;
        loadUserToForm(userId);
    }

    if (target.classList.contains("delete_user_btn")) {
        const userId = target.dataset.id;

        openConfirmModal(
            "Eliminar usuario",
            "Seguro que deseas eliminar este usuario. Ingresa tu contraseña para continuar.",
            "delete",
            userId
        );
    }
}


// SEARCH USERS

function searchUsers() {
    const searchText = searchUserInput.value.toLowerCase().trim();
    const users = getUsers();

    const filteredUsers = users.filter((user) => {
        const identificacion = String(user.identificacion || "").toLowerCase();
        const username = String(user.username || "").toLowerCase();
        const email = String(user.email || "").toLowerCase();
        const telefono = String(user.telefono || "").toLowerCase();
        const role = getRoleText(user.role).toLowerCase();

        return (
            identificacion.includes(searchText) ||
            username.includes(searchText) ||
            email.includes(searchText) ||
            telefono.includes(searchText) ||
            role.includes(searchText)
        );
    });

    renderUsers(filteredUsers);
}

// LOGOUT

function handleLogout() {
    const confirmLogout = confirm("¿Deseas cerrar sesión?");

    if (!confirmLogout) {
        return;
    }

    clearSession();
    window.location.href = "login.html";
}


// INIT PAGE

function initAdminUsersPage() {
    const hasAccess = renderUsersSession();

    if (!hasAccess) {
        return;
    }

    renderUsers();
}


// EVENTS

userForm.addEventListener("submit", handleSaveUser);

clearUserFormBtn.addEventListener("click", resetUserForm);

usersTableBody.addEventListener("click", handleTableActions);

searchUserInput.addEventListener("input", searchUsers);

cancelModalBtn.addEventListener("click", closeConfirmModal);

confirmModalBtn.addEventListener("click", confirmPendingAction);

logoutButtons.forEach((button) => {
    button.addEventListener("click", handleLogout);
});

initAdminUsersPage();