const buttons = document.querySelectorAll("button");
const display = document.getElementById("display");
const memory = document.getElementById("memory");

const showNumberOnDisplay = (number) => {
  if (number === "00" && display.textContent === "0") return;

  display.textContent === "0"
    ? (display.textContent = number)
    : (display.textContent += number);
};

const useOperator = (operator) => {
  if (display.textContent !== "0") {
    isNaN(+memory.textContent.slice(-1))
      ? (memory.textContent += display.textContent + operator)
      : (memory.textContent = display.textContent + operator);
    display.textContent = "0";
  }

  let result = isNaN(+memory.textContent.slice(-1))
    ? eval(memory.textContent.slice(0, -1))
    : memory.textContent;

  if (result && result !== undefined) {
    operator === "="
      ? (memory.textContent = result)
      : (memory.textContent = result + operator);
  }
};

const shortFunction = (event) => {
  console.log(event);
};

const handleClear = (value) => {
  if (value === "AC") {
    display.textContent = "0";
    memory.textContent = "";
  } else {
    display.textContent =
      display.textContent.length === 1 ||
      display.textContent.slice(0, -1) === "-"
        ? "0"
        : display.textContent.slice(0, -1);
  }
};

const handleAbsolute = () => {
  display.textContent =
    +display.textContent > 0
      ? `-${display.textContent}`
      : Math.abs(+display.textContent);
};

const addDecimal = () => {
  if (!display.textContent.includes(".")) {
    display.textContent += ".";
  }
};

buttons.forEach((btn) => {
  btn.onclick = () => {
    if (btn.classList.length === 0) {
      showNumberOnDisplay(btn.value);
    } else if (btn.classList.contains("operator")) {
      useOperator(btn.value);
    } else if (btn.classList.contains("short-function")) {
      shortFunction(btn.value);
    } else if (btn.classList.contains("clear")) {
      handleClear(btn.value);
    } else if (btn.classList.contains("absolute")) {
      handleAbsolute();
    } else if (btn.classList.contains("decimal")) {
      addDecimal();
    }
  };
});