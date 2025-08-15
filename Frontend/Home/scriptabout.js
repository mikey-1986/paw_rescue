function themeToggle() {
    const currentTheme = document.body.getAttribute("data-theme");
    if (currentTheme === "dark") {
        document.body.removeAttribute("data-theme");
    } else {
        document.body.setAttribute("data-theme", "dark");
    }
}

const popup = document.getElementById("login-popup");
const container = document.getElementById("container");
const registerBtn = document.getElementById("register");
const loginBtnPopup = document.getElementById("login"); // for form toggle
const openLoginBtn = document.getElementById("loginBtn"); // navbar login
const body = document.body;

// Show popup
openLoginBtn.addEventListener("click", () => {
  popup.classList.remove("hidden");
  body.classList.add("popup-active");
});

// Hide popup on ESC or outside click
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closePopup();
});
popup.addEventListener("click", (e) => {
  if (e.target === popup) closePopup();
});
function closePopup() {
  popup.classList.add("hidden");
  body.classList.remove("popup-active");
}

// Toggle between Sign In and Sign Up

const login_container = document.getElementById("container");
const register_Btn = document.getElementById("register");
const login_Btn = document.getElementById("login");

register_Btn.addEventListener("click", () => {
  login_container.classList.add("active");
});

login_Btn.addEventListener("click", () => {
  login_container.classList.remove("active");
});
