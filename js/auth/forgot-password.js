async function handleForgot() {
  const email = document.querySelector('input[type="email"]').value;

  if (!email) {
    alert("Please enter your email");
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/api/auth/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email })
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Something went wrong");
      return;
    }

    alert("Reset link sent ✅ (demo)");

  } catch (err) {
    alert("Server error. Try again later.");
  }
}

function goToLogin() {
  const card = document.querySelector(".container");
  card.classList.add("fade-out");

  setTimeout(() => {
    window.location.href = "../../pages/auth/login.html";
  }, 400);
}
