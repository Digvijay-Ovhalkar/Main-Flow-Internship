const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

let currentInput = "";
let operator = null;
let firstOperand = null;
let secondOperand = null;

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.getAttribute("data-value");

    if (value === "C") {
      clearDisplay();
    } else if (value === "=") {
      calculateResult();
    } else if (["+", "-", "*", "/"].includes(value)) {
      handleOperator(value);
    } else {
      appendToDisplay(value);
    }
  });
});

function appendToDisplay(value) {
  if (value === "." && currentInput.includes(".")) return; // Prevent duplicate decimals
  currentInput += value;
  display.textContent = currentInput;
}

function clearDisplay() {
  currentInput = "";
  operator = null;
  firstOperand = null;
  secondOperand = null;
  display.textContent = "0";
}

function handleOperator(value) {
  if (operator !== null) calculateResult();
  operator = value;
  firstOperand = parseFloat(currentInput);
  currentInput = "";
}

function calculateResult() {
  if (operator === null || currentInput === "") return;
  secondOperand = parseFloat(currentInput);

  let result;
  switch (operator) {
    case "+":
      result = firstOperand + secondOperand;
      break;
    case "-":
      result = firstOperand - secondOperand;
      break;
    case "*":
      result = firstOperand * secondOperand;
      break;
    case "/":
      result = secondOperand === 0 ? "Infinity" : firstOperand / secondOperand;
      break;
    default:
      return;
  }

  display.textContent = result;
  currentInput = result.toString();
  operator = null;
  firstOperand = null;
  secondOperand = null;
}