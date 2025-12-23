// button variables
const numZero = document.querySelector("#num-zero");
const numOne = document.querySelector("#num-one");
const numTwo = document.querySelector("#num-two");
const numThree = document.querySelector("#num-three");
const numFour = document.querySelector("#num-four");
const numFive = document.querySelector("#num-five");
const numSix = document.querySelector("#num-six");
const numSeven = document.querySelector("#num-seven");
const numEight = document.querySelector("#num-eight");
const numNine = document.querySelector("#num-nine");
const plus = document.querySelector("#plus");
const minus = document.querySelector("#minus");
const quotient = document.querySelector("#quotient");
const product = document.querySelector("#product");
const remainder = document.querySelector("#remainder");
const equals = document.querySelector("#equals");
const backspace = document.querySelector("#backspace");
const allClear = document.querySelector("#all-clear");
const decimal = document.querySelector("#decimal");
const flipTopButton = document.querySelector("#flip-top-button");
const flipTopImg = document.querySelector("#flip-top-img");
const displayWrapper = document.querySelector("#display-wrapper");
const displayCover = document.querySelector("#display-cover")

// update display function
const display = document.querySelector("div#display");
const displayText = document.querySelector('div#display p');
displayText.textContent = "";

// operator functions
const operators = {
    "+": (a, b) => parseFloat((a + b).toFixed(8)),
    "-": (a, b) => parseFloat((a - b).toFixed(8)),
    "*": (a, b) => parseFloat((a * b).toFixed(8)),
    "/": (a, b) => parseFloat((a / b).toFixed(8)),
    "%": (a, b) => parseFloat((a % b).toFixed(8))
}

const functions = {
    "backspace": function() {
        if (operator == "") {
            num1 = num1.slice(0, num1.length - 1);
        } else if (!operator == "" && num2 == "") {
            operator = operator.slice(0, operator.length -1);
        } else {
            num2 = num2.slice(0, num2.length - 1);
        }
        displayText.textContent = num1 + operator + num2;
    },
    "allClear": function() {
        num1 = "";
        num2 = "";
        operator = "";
        displayText.textContent = "";
    },
    "decimal": function() {
        if (operator == "") {
            if (!num1.includes(".") && num1 == "") {
                num1 += "0.";
            } else if (!num1.includes(".")) {
                num1 += ".";
              }
        } else {
            if (!num2.includes(".") && num2 == "") {
                num2 += "0.";
            } else if (!num2.includes(".")) {
                num2 += ".";
              }
        }
    },
    "posOrNeg": function() {
        if (operator == "") {
            num1 *= -1;
        } else num2 *= -1
    },
}

// init declaration of numbers and operator
let num1 = "";
let num2 = "";
let operator = "";

// operate function
function operate(num1, operator, num2) {
    let num1Int = Number(num1);
    let num2Int = Number(num2);
    
    if (operator === "+") {
        return operators["+"](num1Int, num2Int)
    } else if (operator === "-") {
        return operators["-"](num1Int, num2Int)
    } else if (operator === "*") {
        return operators["*"](num1Int, num2Int)
    } else if (num2Int == 0 && operator == "/") {
        alert("Who do you think I am, God? That's not possible.");
        functions["allClear"]();
        return "";
    } else if (operator === "/") {
        return operators["/"](num1Int, num2Int)
    } else if (operator === "%") {
        return operators["%"](num1Int, num2Int)
    } 
    
}

// flip-top event handler
flipTopButton.addEventListener("click", () => {
    // add animate for first time
    if (!displayCover.classList.contains("animate")) {
        displayCover.classList.add("animate");
    }
    
    // true if the cover is currently closed
    const isClosed = flipTopImg.src.includes("closed");

    // toggle classes based on current state
    displayCover.classList.toggle("closed", !isClosed)
    displayCover.classList.toggle("opened", isClosed);

    flipTopImg.src = isClosed
        ? "./images/flip-top-open.png"
        : "./images/flip-top-closed.png";
})

// display font size adjustment based on text length
const MAX_LENGTH = 13;
const MIN_FONT_SIZE = 24;
const MAX_FONT_SIZE = 62;

function updateFontSize() {
    const text = num1 + operator + num2;
    displayText.textContent = text;

    if (text.length > MAX_LENGTH) {
        let newFontSize = MAX_FONT_SIZE - (text.length - MAX_LENGTH) * 6;
        if (newFontSize < MIN_FONT_SIZE) newFontSize = MIN_FONT_SIZE;
        displayText.style.fontSize = newFontSize + "pt";
    } else {
        displayText.style.fontSize = MAX_FONT_SIZE + "pt";
    }
}


// button event handlers for various numbers/operators
const buttons = document.querySelector("#buttons");
buttons.addEventListener("click", (event) => {
    let target = event.target;
    let digit = target.textContent;
    

    // number logic
    if (target.className == "number") {
        // find digit via target.textContent (the text on btn)
        // if operator is empty, append to num1; else to num2
        if (operator == "") {
            num1 += digit;
        } else {
            num2 += digit;
        }
    } 

    // decimal logic
    if (target.id == "decimal") {
        functions["decimal"]();
    }

    // posOrNeg logic
    if (target.id == "pos-or-neg") {
        functions["posOrNeg"]();
    }

    // operator
    if (target.className == "operator") {
        // if no operator, set operator to operator button pressed
        if (operator == "") operator = target.textContent;
        // if operator exists, solve num1 and num2, update display, update operator
        else {
            let solution = operate(num1, operator, num2);
            displayText.textContent = solution;
            num1 = solution;
            num2 = "";
            operator = target.textContent;
        }
    }
    
    displayText.textContent = num1 + operator + num2

    if (target.className == "solve") {
        if (operator == "" && num2 == "") {
            displayText.textContent = num1
        } else if (num2 == "") {
            displayText.textContent = num1 + operator
        } else {
            let solution = operate(num1, operator, num2);
            displayText.textContent = solution;
            num1 = solution;
            num2 = "";
        }
    }

    if (target.id == "backspace") {
        functions["backspace"]();
    }

    if (target.id == "all-clear") {
        functions["allClear"]();
    }
})

document.addEventListener('keydown', function(event) {
    if (event.repeat) {
        return
    }

    switch (event.key) {
        case '0':
            numZero.click();
            updateFontSize();
            break;
        case '1':
            numOne.click();
            updateFontSize();
            break;
        case '2':
            numTwo.click();
            updateFontSize();
            break;
        case '3':
            numThree.click();
            updateFontSize();
            break;
        case '4':
            numFour.click();
            updateFontSize();
            break;
        case '5':
            numFive.click();
            updateFontSize();
            break;
        case '6':
            numSix.click();
            updateFontSize();
            break;
        case '7':
            numSeven.click();
            updateFontSize();
            break;
        case '8':
            numEight.click();
            updateFontSize();
            break;
        case '9':
            numNine.click();
            updateFontSize();
            break;
        case '+':
            plus.click();
            updateFontSize();
            break;
        case '-':
            minus.click();
            updateFontSize();
            break;
        case '*':
            product.click();
            updateFontSize();
            break;
        case '/':
            quotient.click();
            updateFontSize();
            break;
        case '%':
            remainder.click();
            updateFontSize();
            break;
        case '=':
            equals.click();
            updateFontSize();
            break;
        case 'Enter':
            equals.click();
            updateFontSize();
            break;
        case 'Backspace':
            backspace.click();
            updateFontSize();
            break;
        case 'Delete':
            allClear.click();
            updateFontSize();
            break;
        case '.':
            decimal.click();
            updateFontSize();
            break;
        default:
            break;
    }
});
