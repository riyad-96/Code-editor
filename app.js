const htmlInput = document.getElementById('html')
const cssInput = document.getElementById('css')
const jsInput = document.getElementById('js')
const runBtn = document.querySelector('.run-btn')

//! Run codes on clicking run button
function runCode() {
  const html = htmlInput.value;
  const css = `<style>${cssInput.value}</style>`;
  const js = `<script>${jsInput.value}</script>`;
  const preview = document.getElementById('preview-screen')

  preview.srcdoc = html + css + js

}
runBtn.addEventListener('click', runCode)


//! auto run the runCode function 
let timeout;

function autoRunCode() {
  clearTimeout(timeout)

  timeout = setTimeout(() => {
    runCode()
  }, 1400)
}


//! Save code to local storage
function saveToLocalStorage() {
  localStorage.setItem('htmlCode', htmlInput.value)
  localStorage.setItem('cssCode', cssInput.value)
  localStorage.setItem('jsCode', jsInput.value)
  
  autoRunCode()
}


[htmlInput, cssInput, jsInput].forEach(input => input.addEventListener('input', saveToLocalStorage))

//! Load everything on screen refresh
window.addEventListener('DOMContentLoaded', () => {
  const savedHTML = localStorage.getItem('htmlCode')
  const savedCSS = localStorage.getItem('cssCode')
  const savedJS = localStorage.getItem('jsCode')

  if(savedHTML) htmlInput.value = savedHTML
  if(savedCSS) cssInput.value = savedCSS
  if(savedJS) jsInput.value = savedJS

  runCode()
})