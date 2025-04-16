const htmlInput = document.getElementById('html')
const cssInput = document.getElementById('css')
const jsInput = document.getElementById('js')

const runBtn = document.querySelector('.run-btn')

function runCode() {
  const html = htmlInput.value;
  const css = `<style>${cssInput.value}</style>`;
  const js = `<script>${jsInput.value}</script>`;
  const preview = document.getElementById('preview-screen')

  preview.srcdoc = html + css + js

}
runBtn.addEventListener('click', runCode)


//! auto run the runCode function 
let timeout

function autoRunCode() {
  clearTimeout(timeout)

  timeout = setTimeout(() => {
    runCode()
  }, 1600)
}

[htmlInput, cssInput, jsInput].forEach(input => input.addEventListener('input', autoRunCode))