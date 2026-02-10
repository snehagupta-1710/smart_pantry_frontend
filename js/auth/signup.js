async function handleSignup() {
  const name = document.querySelector('input[type="text"]').value;
  const email = document.querySelector('input[type="email"]').value;
  const password = document.querySelector('input[type="password"]').value;

  if (!name || !email || !password) {
    alert("All fields are required");
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, password })
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Signup failed");
      return;
    }

    alert("Signup successful 🎉");

    // smooth transition
    const card = document.querySelector(".container");
    card.classList.add("fade-out");

    setTimeout(() => {
      window.location.href = "../../pages/auth/login.html";
    }, 400);

  } catch (err) {
    alert("Server error. Try again later.");
  }
}
