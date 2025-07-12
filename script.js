const display = document.getElementById("display");
const historyList = document.getElementById("history-list");
let calculationHistory = [];

function appendValue(value) {
  if (display.value === "0" && value !== "." && !"+-*/".includes(value)) {
    display.value = value;
  } else {
    display.value += value;
  }
}

function clearDisplay() {
  display.value = "0";
}

function deleteLast() {
  display.value = display.value.slice(0, -1);
  if (display.value === "") {
    display.value = "0";
  }
}

function calculateResult() {
  try {
    const expression = display.value.replace(/×/g, '*').replace(/÷/g, '/');
    const result = eval(expression) || "0";
    
    // Add to history
    calculationHistory.push(`${display.value} = ${result}`);
    updateHistory();
    
    display.value = result;
  } catch {
    display.value = "Error";
  }
}

function updateHistory() {
  historyList.innerHTML = calculationHistory.map(item => 
    `<div>${item}</div>`
  ).join('');
  
  // Scroll to bottom
  historyList.scrollTop = historyList.scrollHeight;
}

function clearHistory() {
  calculationHistory = [];
  updateHistory();
}

// Enhanced Keyboard support
document.addEventListener("keydown", function (e) {
  const key = e.key;

  if (!isNaN(key)) {
    appendValue(key);
  } else if (key === ".") {
    appendValue(key);
  } else if (key === "+" || key === "-" || key === "*") {
    appendValue(key === "*" ? "×" : key);
  } else if (key === "/") {
    appendValue("÷");
  } else if (key === "Enter" || key === "=") {
    e.preventDefault();
    calculateResult();
  } else if (key === "Backspace") {
    deleteLast();
  } else if (key === "Escape") {
    clearDisplay();
  } else if (key === "(" || key === ")") {
    appendValue(key);
  }
});

// Initialize with empty history
updateHistory();
