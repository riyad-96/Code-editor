const htmlInput = document.getElementById("html");
const cssInput = document.getElementById("css");
const jsInput = document.getElementById("js");
const runBtn = document.querySelector(".run-btn");

//! Run codes on clicking run button
function runCode() {
  const html = htmlInput.value;
  const css = `<style>${cssInput.value}</style>`;
  const js = `<script>${jsInput.value}</script>`;
  const preview = document.getElementById("preview-screen");

  preview.srcdoc = html + css + js;
}
runBtn.addEventListener("click", runCode);

//! auto run the runCode function
let timeout;

function autoRunCode() {
  clearTimeout(timeout);

  timeout = setTimeout(() => {
    runCode();
  }, 1400);
}

//! Save code to local storage
function saveToLocalStorage() {
  localStorage.setItem("htmlCode", htmlInput.value);
  localStorage.setItem("cssCode", cssInput.value);
  localStorage.setItem("jsCode", jsInput.value);

  autoRunCode();
}

function loadAllCode() {
  const savedHTML = localStorage.getItem("htmlCode");
  const savedCSS = localStorage.getItem("cssCode");
  const savedJS = localStorage.getItem("jsCode");

  if (savedHTML) htmlInput.value = savedHTML;
  if (savedCSS) cssInput.value = savedCSS;
  if (savedJS) jsInput.value = savedJS;
}

[htmlInput, cssInput, jsInput].forEach((input) =>
  input.addEventListener("input", saveToLocalStorage),
);

//! Add project title
const h1 = document.querySelector("h1");
const titleInput = document.querySelector(".title input");
const editPen = document.querySelector(".project-title img");

function editTitle() {
  editPen.style.display = "none";
  h1.style.display = "none";
  titleInput.style.display = "unset";
  titleInput.focus();
}

function saveOnBlur() {
  const value = titleInput.value.trim();
  h1.textContent = value ? value : "Untitled";
  h1.style.display = "block";
  titleInput.style.display = "none";
  editPen.style.display = "unset";

  localStorage.setItem("project-title", value);
  addToTabTitle();
}

function loadTitle() {
  const projectTitle = localStorage.getItem("project-title");
  if (projectTitle) h1.textContent = projectTitle;
  if (projectTitle) titleInput.value = projectTitle;
}

function addToTabTitle() {
  const title = localStorage.getItem("project-title");
  const headTitle = document.querySelector("head title");
  if (title) {
    headTitle.textContent = title + "- Code editor";
  } else {
    headTitle.textContent = "Code editor";
  }
}

editPen.addEventListener("click", editTitle);
titleInput.addEventListener("blur", saveOnBlur);
titleInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    titleInput.blur();
  }
});

//! username and profile link
const showUserName = document.querySelector(".username a");
const usernameEditBtn = document.querySelector(".username img");
const formModal = document.querySelector(".username-modal");
const overlay = document.querySelector(".overlay");
const form = document.querySelector("form");
const profileNameInput = document.getElementById("profile-name");
const profileLinkInput = document.getElementById("profile-link");
const saveBtn = form.querySelector(".save-btn");
const closeBtn = form.querySelector(".close-btn");

form.addEventListener("submit", (e) => {
  e.preventDefault();
});

function toggleFormModal() {
  formModal.classList.toggle("toggle-display");
}

function saveProfileInfo() {
  // const name = profileNameInput.value
  const name = profileNameInput.value
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
  const link = profileLinkInput.value.trim();

  if (name) {
    showUserName.textContent = name;
    localStorage.setItem("profileName", name);
  } else {
    showUserName.textContent = "@username";
    localStorage.removeItem("profileName");
  }
  if (link) {
    showUserName.href = `https://github.com/${link}/`;
    showUserName.setAttribute("target", "_blank");
    localStorage.setItem("profileLink", link);
  } else {
    showUserName.href = "#";
    showUserName.removeAttribute("target");
    localStorage.removeItem("profileLink");
  }

  setTimeout(toggleFormModal, 50);
}

function loadProfileInfo() {
  const profileName = localStorage.getItem("profileName");
  const profileLink = localStorage.getItem("profileLink");
  if (profileName) {
    showUserName.textContent = profileName;
    profileNameInput.value = profileName;
  }
  if (profileLink) {
    showUserName.href = `https://github.com/${profileLink}/`;
    showUserName.setAttribute("target", "_blank");
    profileLinkInput.value = profileLink;
  }
}

saveBtn.addEventListener("click", saveProfileInfo);

const allToggleElement = [usernameEditBtn, overlay, closeBtn];
allToggleElement.forEach((element) =>
  element.addEventListener("click", toggleFormModal),
);

//! Load everything on screen load
window.addEventListener("DOMContentLoaded", () => {
  addToTabTitle();
  loadTitle();
  loadProfileInfo();
  loadAllCode();
  runCode();
});

//! Resize functionalities
const resizer = document.querySelector(".resizer");
const previewArea = document.querySelector(".preview-area");
const iframe = previewArea.querySelector(".preview-area iframe");

let isResizing = false;

resizer.addEventListener("mousedown", () => {
  isResizing = true;
  iframe.style.pointerEvents = "none";
});

window.addEventListener("mousemove", (e) => {
  if (!isResizing) return;
  const newWidth = window.innerWidth - e.clientX - 12;
  previewArea.style.width = `${newWidth}px`;
});

window.addEventListener("mouseup", () => {
  isResizing = false;
  iframe.style.pointerEvents = "auto";
});

//! double space on TAB keypress
const allLangInput = [htmlInput, cssInput, jsInput];
allLangInput.forEach((input) => {
  input.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
      e.preventDefault();

      const start = input.selectionStart;
      const end = input.selectionEnd;

      const spaces = "  ";
      const before = input.value.substring(0, start);
      const after = input.value.substring(end);

      input.value = before + spaces + after;
      input.selectionStart = input.selectionEnd = start + spaces.length;
    }
  });
});
