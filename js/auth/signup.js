function handleSignup() {

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!name || !email || !password) {
    alert("All fields are required");
    return;
  }

  // Basic email format check
  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (!email.match(emailPattern)) {
    alert("Please enter a valid email address");
    return;
  }

  // Get existing users
  let users = JSON.parse(localStorage.getItem("users")) || [];

  // Check if email already exists
  const userExists = users.find(user => user.email === email);

  if (userExists) {
    alert("Email already registered. Please login.");
    return;
  }

  // Create new user object
  const newUser = {
    name,
    email,
    password
  };

  users.push(newUser);

  // Save to localStorage
  localStorage.setItem("users", JSON.stringify(users));

  alert("Signup successful 🎉");

  // Smooth transition
  const card = document.querySelector(".container");
  card.classList.add("fade-out");

  setTimeout(() => {
    window.location.href = "../../pages/auth/login.html";
  }, 400);
}
