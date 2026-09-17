const loginForm = document.getElementById("login-form");

/* If the user already signed in, open the dashboard directly */
if (localStorage.getItem("isLoggedIn") === "true") {
  window.location.href = "tracker.html";
}

loginForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  const account = JSON.parse(localStorage.getItem("jobTrackerAccount"));

  if (!account) {
    alert("No account found. Please create an account first.");
    window.location.href = "signup.html";
    return;
  }

  if (email !== account.email || password !== account.password) {
    alert("Incorrect email or password. Please try again.");
    return;
  }

  localStorage.setItem("userName", account.name);
  localStorage.setItem("isLoggedIn", "true");

  window.location.href = "tracker.html";
});