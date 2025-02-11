function add(a, b) {
    return Number((a + b).toPrecision(12));
}

function subtract(a, b) {
    return Number((a - b).toPrecision(12));
}

function multiply(a, b) {
    return Number((a * b).toPrecision(12));
}

function divide(a, b) {
    return Number((a / b).toPrecision(12));

}

function operate(calculateObject) {
    // Convert input values to numbers
    let numA = Number(calculateObject.numberA);
    let numB = Number(calculateObject.numberB);

    switch (calculateObject.operation) {
        case "+":
            return add(numA, numB);
        case "-":
            return subtract(numA, numB);
        case "*":
            return multiply(numA, numB);
        case "/":
            return divide(numA, numB);
    }
}


let displayNumber = "";

const calculator = {
    numberA: null,
    numberB: null,
    operation: null,
};

// Create an object to store button elements
const buttons = {};

// Select all buttons with class "btn-number" and add them to the object
const buttonNumberElements = document.querySelectorAll(".btn-number");
buttonNumberElements.forEach(button => {
    buttons[button.id] = button;

    // Add event listener to each button
    button.addEventListener("click", () => {
        if (displayNumber.length < 12) {
            displayNumber += button.textContent;
            displayFrame.textContent = displayNumber;
        }
    });
});

buttons["btn-dot"] = document.querySelector("#btn-dot");

buttons["btn-dot"].addEventListener("click", () => {
    if (decimalPoint.isClickable === true) {
        displayNumber += ".";
        displayFrame.textContent = displayNumber;
        decimalPoint.isClickable = false;
    }
}
);

const buttonOperatorElements = document.querySelectorAll(".btn-operator");
buttonOperatorElements.forEach(button => {
    buttons[button.id] = button;

    button.addEventListener("click", () => {

        //Assign numbers to calculator.numberA and .numberB
        if (calculator.numberA === null) { //walang laman
            calculator.numberA = displayNumber;
        } else { //may laman
            calculator.numberB = displayNumber;
        }

        //calculate the value
        if (calculator.numberA !== null && calculator.numberB !== null) {
            displayNumber = operate(calculator).toString();
            calculator.numberA = displayNumber;
            calculator.numberB = null;
            displayFrame.textContent = displayNumber;
        }
        calculator.operation = button.textContent;



        decimalPoint.isClickable = true;
        console.log(calculator);
        displayNumber = "";

    });

});

buttons["btn-equals"] = document.querySelector("#btn-equals");
buttons["btn-equals"].addEventListener("click", () => {
    if (displayNumber === '' || calculator.operation == null) { return; };
    //Assign numbers to calculator.numberA and .numberB
    if (calculator.numberA === null) { //walang laman
        calculator.numberA = displayNumber;
    } else { //may laman
        calculator.numberB = displayNumber;
    }

    //calculate the value
    if (calculator.numberA !== null && calculator.numberB !== null && calculator.operation !== null) {
        displayNumber = operate(calculator).toString();
        calculator.numberA = null;
        calculator.numberB = null;
        calculator.operation = null;
        displayFrame.textContent = displayNumber;

    }
    console.log(calculator);
})

const displayFrame = document.querySelector(".display-frame")

const decimalPoint = {
    isClickable: true,
}


buttons["btn-ac"] = document.querySelector("#btn-ac");
buttons["btn-ac"].addEventListener("click", () => {
    displayFrame.textContent = "";
    calculator.numberA = null;
    calculator.numberB = null;
    calculator.operation = null;
    displayNumber = "";
});
