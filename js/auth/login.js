async function handleLogin() {
  const email = document.querySelector('input[type="email"]').value;
  const password = document.querySelector('input[type="password"]').value;

  if (!email || !password) {
    alert("Email and password are required");
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Login failed");
      return;
    }

    // ✅ Save token for future protected routes
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    alert("Login successful 🎉");

    const card = document.querySelector(".container");
    card.classList.add("fade-out");

    setTimeout(() => {
      window.location.href = "../../pages/home/home.html";
    }, 400);

  } catch (err) {
    alert("Server error. Please try again later.");
  }
}
