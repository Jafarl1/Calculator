const buttons = document.querySelectorAll("button");
const display = document.getElementById("display");
const memory = document.getElementById("memory");

const checkDisplay = () => {
  display.style.fontSize =
    display.textContent.length > 20
      ? "20px"
      : display.textContent.length > 16
      ? "28px"
      : display.textContent.length > 12
      ? "36px"
      : "46px";
};

const showNumberOnDisplay = (number) => {
  if (number === "00" && display.textContent === "0") return;

  display.textContent === "0"
    ? (display.textContent = number)
    : (display.textContent += number);
};

const useOperator = (operator) => {
  if (display.textContent !== "0") {
    isNaN(+memory.textContent.slice(-1))
      ? (memory.textContent += `(${display.textContent})${operator}`)
      : (memory.textContent = `${display.textContent}${operator}`);
    display.textContent = "0";
  }

  let result = isNaN(+memory.textContent.slice(-1))
    ? eval(memory.textContent.slice(0, -1))
    : memory.textContent;
  result = Math.round(result * 100) / 100;

  if (result && result !== undefined) {
    operator === "="
      ? (memory.textContent = result)
      : (memory.textContent = result + operator);
  }
};

const getFactorial = (number) => {
  let result = number;
  if (number < 0) {
    return -1;
  } else if (number === 0 || number === 1) {
    return number;
  }
  while (number > 1) {
    number--;
    result *= number;
  }
  return result;
};

const shortFunction = (event) => {
  switch (event) {
    case "%":
      display.textContent /= 100;
      break;
    case "!":
      display.textContent = getFactorial(+display.textContent);
      break;
    case "sqrt":
      display.textContent = Math.sqrt(+display.textContent);
      break;
    case "pow":
      display.textContent = Math.pow(display.textContent, 2);
      break;
    default:
      break;
  }
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
    checkDisplay();
  };
});

window.addEventListener("keydown", function (event) {
  if (/^[0-9]$/.test(event.key)) {
    showNumberOnDisplay(event.key);
  } else if (event.key === "Backspace") {
    handleClear("C");
  } else if (event.key === "Delete") {
    handleClear("AC");
  } else if (event.key === "Enter") {
    useOperator("=");
  } else if (event.key === "." || event.key === ",") {
    addDecimal();
  } else if (event.key === "!" || event.key === "%") {
    shortFunction(event.key);
  } else if (
    event.key === "+" ||
    event.key === "-" ||
    event.key === "*" ||
    event.key === "/"
  ) {
    useOperator(event.key);
  }
  checkDisplay();
});

let lastTouch = 0;
window.addEventListener(
  "touchend",
  (event) => {
    let now = new Date().getTime();
    if (now - lastTouch <= 100) {
      event.preventDefault();
    }
    lastTouch = now;
  },
  false
);
