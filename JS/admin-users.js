const adminLinks = document.querySelectorAll(".admin_navigation");

function renderUsersSession(){
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

// INIT PAGE

function initAdminUsersPage() {
    renderUsersSession();
}

initAdminUsersPage();
