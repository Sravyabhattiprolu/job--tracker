const loginForm = document.getElementById("login-form");
const jobForm = document.getElementById("job-form");
const logoutButton = document.getElementById("logout-button");

let applications = JSON.parse(localStorage.getItem("applications")) || [];

/* LOGIN */
if (loginForm) {
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("user-name").value.trim();

    localStorage.setItem("userName", name);
    window.location.href = "tracker.html";
  });
}

/* SHOW USER NAME */
const welcomeName = document.getElementById("welcome-name");
const userName = localStorage.getItem("userName");

if (welcomeName && userName) {
  welcomeName.textContent = userName;
}

/* LOGOUT */
if (logoutButton) {
  logoutButton.addEventListener("click", function () {
    localStorage.removeItem("userName");
    localStorage.removeItem("isLoggedIn");
    window.location.href = "index.html";
  });
}

/* ADD APPLICATION */
if (jobForm) {
  jobForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const company = document.getElementById("company").value.trim();
    const role = document.getElementById("role").value.trim();
    const status = document.getElementById("status").value;

    if (company === "" || role === "") {
      alert("Please enter both company name and role.");
      return;
    }

    const newApplication = {
      id: Date.now(),
      company: company,
      role: role,
      status: status,
      date: new Date().toLocaleDateString()
    };

    applications.push(newApplication);

    localStorage.setItem("applications", JSON.stringify(applications));

    jobForm.reset();
    showApplications();
  });
}

/* DISPLAY APPLICATIONS */
function showApplications() {
  const dashboardList = document.getElementById("application-list");
  const fullList = document.getElementById("applications-page-list");

  const listToShow = dashboardList || fullList;

  if (!listToShow) {
    return;
  }

  if (applications.length === 0) {
    listToShow.innerHTML =
      '<p class="empty-message">📄 No applications added yet.</p>';
    return;
  }

  listToShow.innerHTML = "";

  applications.forEach(function (application) {
    const card = document.createElement("div");
    card.className = "application-card";

    card.innerHTML = `
      <h3>${application.company}</h3>
      <p><strong>Role:</strong> ${application.role}</p>
      <p><strong>Applied on:</strong> ${application.date}</p>
      <span class="status ${application.status.toLowerCase().replace(" ", "-")}">
        ${application.status}
      </span>
    `;

    listToShow.appendChild(card);
  });
}

showApplications();

/* LIVE UPDATE BETWEEN OPEN BROWSER TABS */
window.addEventListener("storage", function (event) {
  if (event.key === "applications") {
    applications = JSON.parse(event.newValue) || [];
    showApplications();
  }
});