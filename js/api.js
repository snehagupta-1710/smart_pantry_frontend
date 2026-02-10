// frontend/js/api.js

const BASE_URL = "http://localhost:5000/api";

// get token from localStorage
function getToken() {
  return localStorage.getItem("token");
}

// POST request helper
async function post(url, data) {
  const res = await fetch(BASE_URL + url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify(data)
  });
  return res.json();
}

// GET request helper
async function get(url) {
  const res = await fetch(BASE_URL + url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
  return res.json();
}

// PUT request helper
async function put(url, data) {
  const res = await fetch(BASE_URL + url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify(data)
  });
  return res.json();
}
