function handleForgot() {
  const emailInput = document.querySelector('input[type="email"]');
  const email = emailInput.value.trim();

  if (!email) {
    alert("Please enter your email");
    return;
  }

  // Simple email format check
  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

  if (!email.match(emailPattern)) {
    alert("Please enter a valid email address");
    return;
  }

  // Simulate sending reset link
  const btn = document.querySelector(".btn");
  btn.innerText = "Sending...";
  btn.disabled = true;

  setTimeout(() => {
    alert("Reset link sent successfully (Demo Mode ✅)");
    btn.innerText = "Send Reset Link";
    btn.disabled = false;

    // Optional: Redirect to login
    window.location.href = "../../pages/auth/login.html";
  }, 1000);
}
