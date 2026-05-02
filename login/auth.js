const API_BASE_URL = window.AUTH_API_BASE_URL || window.API || "https://api.cvscompanies.tech";

function getElement(id) {
  return document.getElementById(id);
}

const loginTab = getElement("loginTab");
const signupTab = getElement("signupTab");
const loginForm = getElement("loginForm");
const signupForm = getElement("signupForm");
const forgotPasswordForm = getElement("forgotPasswordForm");
const loginMessage = getElement("loginMessage");
const signupMessage = getElement("signupMessage");
const forgotMessage = getElement("forgotMessage");
const forgotPasswordButton = getElement("forgotPasswordButton");
const backToLoginButton = getElement("backToLoginButton");

function setMessage(element, text, color) {
  if (!element) {
    return;
  }

  element.innerText = text;
  if (color) {
    element.style.color = color;
  }
}

function clearMessages() {
  setMessage(loginMessage, "", "");
  setMessage(signupMessage, "", "");
  setMessage(forgotMessage, "", "");
}

function setActiveTab(mode) {
  const isLogin = mode === "login";
  const isSignup = mode === "signup";
  const isForgot = mode === "forgot";

  if (loginTab) {
    loginTab.classList.toggle("active", isLogin);
  }

  if (signupTab) {
    signupTab.classList.toggle("active", isSignup);
  }

  if (loginForm) {
    loginForm.classList.toggle("hidden", !isLogin);
  }

  if (signupForm) {
    signupForm.classList.toggle("hidden", !isSignup);
  }

  if (forgotPasswordForm) {
    forgotPasswordForm.classList.toggle("hidden", !isForgot);
  }

  clearMessages();
}

async function postJson(path, payload) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  let data = {};
  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    data = await response.json();
  } else {
    const text = await response.text();
    data = { message: text };
  }

  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
}

async function signup() {
  const nameInput = getElement("name") || getElement("signupName");
  const emailInput = getElement("email") || getElement("signupEmail");
  const passwordInput = getElement("password") || getElement("signupPassword");
  const msg = getElement("msg") || getElement("signupMessage");

  const name = nameInput ? nameInput.value.trim() : "";
  const email = emailInput ? emailInput.value.trim() : "";
  const password = passwordInput ? passwordInput.value : "";

  if (!name || !email || !password) {
    setMessage(msg, "All fields required", "red");
    return;
  }

  try {
    const data = await postJson("/signup", { name, email, password });

    if (data.token) {
      localStorage.setItem("token", data.token);
    }
    if (data.user) {
      localStorage.setItem("user", JSON.stringify(data.user));
    }

    setMessage(msg, data.message || "Signup successful! Redirecting...", "green");

    setTimeout(() => {
      window.location.href = "https://cvscompanies.tech";
    }, 1000);
  } catch (err) {
    setMessage(msg, err.message, "red");
  }
}

async function login() {
  const emailInput = getElement("email") || getElement("loginEmail");
  const passwordInput = getElement("password") || getElement("loginPassword");
  const msg = getElement("msg") || getElement("loginMessage");

  const email = emailInput ? emailInput.value.trim() : "";
  const password = passwordInput ? passwordInput.value : "";

  if (!email || !password) {
    setMessage(msg, "Email and password required", "red");
    return;
  }

  try {
    const data = await postJson("/login", { email, password });

    localStorage.setItem("token", data.token || "");
    if (data.user) {
      localStorage.setItem("user", JSON.stringify(data.user));
    }

    setMessage(msg, data.message || "Login successful!", "green");

    setTimeout(() => {
      window.location.href = "https://cvscompanies.tech";
    }, 800);
  } catch (err) {
    setMessage(msg, err.message, "red");
  }
}

async function forgotPassword() {
  const emailInput = getElement("forgotEmail") || getElement("email");
  const msg = getElement("forgotMessage") || getElement("msg");
  const email = emailInput ? emailInput.value.trim() : "";

  if (!email) {
    setMessage(msg, "Email is required", "red");
    return;
  }

  try {
    const data = await postJson("/forgotpass", { email });

    setMessage(
      msg,
      data.message || "Reset link sent to your email.",
      "green"
    );

    setTimeout(() => {
      setActiveTab("login");
    }, 1200);

  } catch (err) {
    setMessage(msg, err.message || "Something went wrong", "red");
  }
}
function wireFormListeners() {
  if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();
      login();
    });
  }

  if (signupForm) {
    signupForm.addEventListener("submit", (event) => {
      event.preventDefault();
      signup();
    });
  }

  if (forgotPasswordForm) {
    forgotPasswordForm.addEventListener("submit", (event) => {
      event.preventDefault();
      forgotPassword();
    });
    const sendResetBtn = forgotPasswordForm.querySelector('.action');
    if (sendResetBtn) {
      sendResetBtn.addEventListener('click', (event) => {
        event.preventDefault();
        forgotPassword();
      });
    }
  }

  if (loginTab) {
    loginTab.addEventListener("click", () => setActiveTab("login"));
  }

  if (signupTab) {
    signupTab.addEventListener("click", () => setActiveTab("signup"));
  }

  if (forgotPasswordButton) {
    forgotPasswordButton.addEventListener("click", () => setActiveTab("forgot"));
  }

  if (backToLoginButton) {
    backToLoginButton.addEventListener("click", () => setActiveTab("login"));
  }
}

wireFormListeners();
setActiveTab("login");

window.signup = signup;
window.login = login;
window.forgotPassword = forgotPassword;