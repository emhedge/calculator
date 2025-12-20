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
flipTopButton.classList.toggle(".closed");

// update display function
const display = document.querySelector("div#display");
const displayText = document.createElement('p');
displayText.textContent = "";
display.appendChild(displayText);

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
            break;
        case '1':
            numOne.click();
            break;
        case '2':
            numTwo.click();
            break;
        case '3':
            numThree.click();
            break;
        case '4':
            numFour.click();
            break;
        case '5':
            numFive.click();
            break;
        case '6':
            numSix.click();
            break;
        case '7':
            numSeven.click();
            break;
        case '8':
            numEight.click();
            break;
        case '9':
            numNine.click();
            break;
        case '+':
            plus.click();
            break;
        case '-':
            minus.click();
            break;
        case '*':
            product.click();
            break;
        case '/':
            quotient.click();
            break;
        case '%':
            remainder.click();
            break;
        case '=':
            equals.click();
            break;
        case 'Enter':
            equals.click();
            break;
        case 'Backspace':
            backspace.click();
            break;
        case 'Delete':
            allClear.click();
            break;
        case '.':
            decimal.click();
            break;
        default:
            break;
    }
});
