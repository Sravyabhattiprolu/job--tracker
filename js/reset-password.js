const resetForm = document.getElementById("reset-form");

resetForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const email = document.getElementById("reset-email").value.trim();
  const newPassword = document.getElementById("new-password").value;

  const account = JSON.parse(localStorage.getItem("jobTrackerAccount"));

  if (!account || email !== account.email) {
    alert("We could not find an account with this email.");
    return;
  }

  if (newPassword.length < 6) {
    alert("Your password must have at least 6 characters.");
    return;
  }

  account.password = newPassword;

  localStorage.setItem("jobTrackerAccount", JSON.stringify(account));

  alert("Password reset successfully. Please sign in.");
  window.location.href = "index.html";
});