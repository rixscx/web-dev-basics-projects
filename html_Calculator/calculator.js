let history = [];

// Append value to display
function appendToDisplay(value) {
  const display = document.getElementById("display");
  if (display.value === "Error") {
    display.value = ""; // Clear "Error" message
  }
  display.value += value;
}

// Clear the display
function clearDisplay() {
  document.getElementById("display").value = "";
}

// Delete the last character
function deleteLast() {
  const display = document.getElementById("display");
  display.value = display.value.slice(0, -1);
}

// Append trigonometric functions
function appendTrigFunction(func) {
  const display = document.getElementById("display");
  const input = parseFloat(display.value);

  if (isNaN(input)) {
    display.value = "Error";
    return;
  }

  let result;
  const radians = (Math.PI / 180) * input;

  switch (func) {
    case "sin":
      result = Math.sin(radians);
      break;
    case "cos":
      result = Math.cos(radians);
      break;
    case "tan":
      result = Math.tan(radians);
      break;
    default:
      result = "Error";
  }

  if (Number.isFinite(result)) {
    result = Math.round(result * 1e8) / 1e8;
  } else {
    result = "Error";
  }

  display.value = result;
}

// Evaluate the result
function calculateResult() {
  const display = document.getElementById("display");

  try {
    let openParens = (display.value.match(/\(/g) || []).length;
    let closeParens = (display.value.match(/\)/g) || []).length;

    while (openParens > closeParens) {
      display.value += ")";
      closeParens++;
    }

    const result = eval(display.value);
    history.unshift(`${display.value} = ${result}`);
    updateHistory();
    display.value = result;
  } catch {
    display.value = "Error";
  }
}

// Update calculation history
function updateHistory() {
  const historyDiv = document.getElementById("history");
  if (history.length === 0) {
    historyDiv.innerHTML = "<p>No history available</p>";
    return;
  }

  historyDiv.innerHTML = history
    .slice(0, 10)
    .map((entry, index) => `<div class="history-entry">${index + 1}. ${entry}</div>`)
    .join("");
}

// Clear history
function clearHistory() {
  history = [];
  updateHistory();
}

// Toggle between themes
function toggleTheme() {
  const theme = document.documentElement.dataset.theme;
  document.documentElement.dataset.theme = theme === "dark" ? "light" : "dark";
}
