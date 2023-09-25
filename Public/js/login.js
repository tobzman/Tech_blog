// Using modern JavaScript with async/await
const loginForm = document.querySelector("#login");
const signUpForm = document.querySelector("#sign-up");
const loginWarning = document.querySelector("#login-warning");
const signupWarning = document.querySelector("#sign-up-warning");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formContainer = e.target.children[1];
  const username = formContainer.children[1].value.trim();
  const password = formContainer.children[3].value.trim();
  if (!(username || password)) return;
  try {
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    handleResponse(response, loginWarning);
  } catch (error) {
    displayWarning(loginWarning);
  }
});

signUpForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formContainer = e.target.children[1];
  const username = formContainer.children[1].value.trim();
  const email = formContainer.children[3].value.trim();
  const password = formContainer.children[5].value.trim();
  try {
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
      headers: { "Content-Type": "application/json" },
    });

    handleResponse(response, signupWarning);
  } catch (error) {
    displayWarning(signupWarning, error);
  }
});

function displayWarning(warning, message) {
  warning.textContent = message || "Error signing up. Please try again.";
  warning.style.display = "inline";
  setTimeout(() => {
    warning.style.display = "none";
  }, 1000);
}

function handleResponse(response, warning) {
  if (response.ok) {
    window.location.replace("/");
  } else {
    displayWarning(warning);
  }
}
