// button variables
const numZero = document.querySelector("#numZero");
const numOne = document.querySelector("#numOne");
const numTwo = document.querySelector("#numTwo");
const numThree = document.querySelector("#numThree");
const numFour = document.querySelector("#numFour");
const numFive = document.querySelector("#numFive");
const numSix = document.querySelector("#numSix");
const numSeven = document.querySelector("#numSeven");
const numEight = document.querySelector("#numEight");
const numNine = document.querySelector("#numNine");
const plus = document.querySelector("#plus");
const minus = document.querySelector("#minus");
const quotient = document.querySelector("#quotient");
const product = document.querySelector("#product");


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
            num1 += ".";
        } else {
            num2 += ".";
        }
    }
}

// const sum = function(arr) {return arr.reduce(((acc, obj) => acc + obj), 0)}

// const power = (a, b) => a ** b;

// function factorial(a) {
// // prevent negatives
//   if (a < 0) return "ERROR";
// // work with 0 and 1
//   if (a === 0 || a === 1) return 1;
// // work with numbers > 1
//   if (a > 1) {
//     let result = 1;
//     for (let i = a; i > 1; i--) {
//     result *= i
//     } 
//   return result
//   }
// }

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
    } 
    
}




// variables for num1, num2, and operator displayText; 
// when a button is selected, have a switch/if condition to determine if it's num1 or num2
// append the number to display as displayText


// function updateDisplay() {
//     displayText.textContent = 
// }

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

    if (target.id == "allClear") {
        functions["allClear"]();
    }


})






console.log(operate(10, "/", 2))
