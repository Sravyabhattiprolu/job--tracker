const signupForm = document.getElementById("signup-form");

signupForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("signup-name").value.trim();
  const email = document.getElementById("signup-email").value.trim();
  const password = document.getElementById("signup-password").value;

  if (password.length < 6) {
    alert("Your password must have at least 6 characters.");
    return;
  }

  const account = {
    name: name,
    email: email,
    password: password
  };

  localStorage.setItem("jobTrackerAccount", JSON.stringify(account));
  localStorage.setItem("userName", name);
  localStorage.setItem("isLoggedIn", "true");

  window.location.href = "tracker.html";
});