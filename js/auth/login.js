function handleLogin() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!email || !password) {
    alert("Email and password are required");
    return;
  }

  // Optional: store dummy user data
  localStorage.setItem("user", JSON.stringify({ email: email }));

  alert("Login successful 🎉");

  const card = document.querySelector(".container");
  card.classList.add("fade-out");

  setTimeout(() => {
    window.location.href = "../../pages/home/home.html";
  }, 400);
}
