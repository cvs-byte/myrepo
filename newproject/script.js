const API_BASE = "https://rakishly-turdiform-suzy.ngrok-free.dev";

// Toggle UI
const loginTab = document.getElementById("loginTab");
const signupTab = document.getElementById("signupTab");

const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

loginTab.addEventListener("click", () => {
  loginTab.classList.add("active");
  signupTab.classList.remove("active");

  loginForm.classList.add("active");
  signupForm.classList.remove("active");
});

signupTab.addEventListener("click", () => {
  signupTab.classList.add("active");
  loginTab.classList.remove("active");

  signupForm.classList.add("active");
  loginForm.classList.remove("active");
});

// REGISTER
signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch(`${API_BASE}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password })
    });

    const data = await res.json();

    document.getElementById("signupMsg").textContent = data.message;

    if (data.success) {
      signupForm.reset();
    }

  } catch (err) {
    document.getElementById("signupMsg").textContent = "Server error";
  }
});

// LOGIN
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  try {
    const res = await fetch(`${API_BASE}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    const msg = document.getElementById("loginMsg");
    msg.textContent = data.message;

    if (data.success) {
      localStorage.setItem("user", JSON.stringify(data.user));
      loginForm.reset();

      setTimeout(() => {
        alert("Login successful!");
      }, 300);
    }

  } catch (err) {
    document.getElementById("loginMsg").textContent = "Server error";
  }
});