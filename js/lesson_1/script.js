const codeInput = document.getElementById("code-input");
const codeExample = document.getElementById("code-example");
const output = document.getElementById("output-container");
const outputText = document.getElementById("output-text");
const outputCode = document.getElementById("output-code");
const outputStart = document.getElementById("output-start");
const lessonContainer = document.getElementById("lesson-container");
const resultsContainer = document.getElementById("results-container");

const code = 'console.log("Hello World")'

resultsContainer.style.display = "none";

function exeCode() {
    if (codeInput.value === code) {
        output.style.color = "#f0f0f0";
        outputText.style.display = "none";
        outputCode.innerText = "Hello World";
        codeInput.value = "";
        setTimeout(function() {
            lessonContainer.style.display = "none";
            output.style.display = "none";
            resultsContainer.style.display = "";
        }, 3000);
    } else {
        output.style.color = "#8c0e0a";
        outputText.style.display = "none";
        outputCode.innerText = "Il codice presenta degli errori..."
        setTimeout(function() {
            output.style.color = "#757575";
            outputText.style.display = "";
            outputCode.innerText = "";
        }, 3000);
    }
}

function autoCloseCharacters(event) {
    const cursorPos = codeInput.selectionStart;
    const inputValue = codeInput.value;
    
    if (event.key === '"' || event.key === '(') {
        let charToInsert = '';
        let closingChar = '';

        if (event.key === '"') {
            charToInsert = '"';
            closingChar = '"';
        } else if (event.key === '(') {
            charToInsert = '(';
            closingChar = ')';
        }

        event.preventDefault();  

        codeInput.value = inputValue.slice(0, cursorPos) + charToInsert + closingChar + inputValue.slice(cursorPos);

        codeInput.selectionStart = codeInput.selectionEnd = cursorPos + 1;
    }
}

function handleBackspace(event) {
    const cursorPos = codeInput.selectionStart;
    const inputValue = codeInput.value;

    if (
        (inputValue[cursorPos - 1] === '"' && inputValue[cursorPos] === '"') || 
        (inputValue[cursorPos - 1] === '(' && inputValue[cursorPos] === ')')
    ) {
        codeInput.value = inputValue.slice(0, cursorPos - 1) + inputValue.slice(cursorPos + 1);
        codeInput.selectionStart = codeInput.selectionEnd = cursorPos - 1;
    } else if (
        (inputValue[cursorPos - 1] === '"' && inputValue[cursorPos] !== '"') || 
        (inputValue[cursorPos - 1] === '(' && inputValue[cursorPos] !== ')')
    ) {
        codeInput.value = inputValue.slice(0, cursorPos - 1) + inputValue.slice(cursorPos);
        codeInput.selectionStart = codeInput.selectionEnd = cursorPos - 1;
    }
}

codeInput.addEventListener("keydown", autoCloseCharacters);
codeInput.addEventListener("keydown", function(event) {
    if (event.key === "Backspace") {
        handleBackspace(event);
    }
});

let isPaused = false;
const containerAll = document.getElementById("container");
const menuContainer = document.getElementById("menu-container");
menuContainer.style.display = "none";

function openMenu() {
    isPaused = true;
    containerAll.style.display = "none";
    menuContainer.style.display = "";
}

function closeMenu() {
    isPaused = false;
    containerAll.style.display = "";
    menuContainer.style.display = "none";
}