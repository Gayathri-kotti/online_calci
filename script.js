// script.js

document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const buttons = Array.from(document.getElementsByClassName('btn'));
    let expression = '';
    let resultDisplayed = false;

    // Helper function to update the display
    function updateDisplay() {
        display.innerText = expression || '0';
    }

    // Function to handle number and decimal button clicks
    function handleNumberClick(value) {
        if (resultDisplayed) {
            expression = '';
            resultDisplayed = false;
        }
        expression += value;
        updateDisplay();
    }

    // Function to handle operator button clicks
    function handleOperatorClick(op) {
        if (resultDisplayed) {
            resultDisplayed = false;
        }
        // Prevent multiple operators in sequence
        if (/[+\-*/%]$/.test(expression)) return;
        expression += op;
        updateDisplay();
    }

    // Function to compute the result
    function computeResult() {
        try {
            const result = eval(expression);
            display.innerText = result.toString();
            expression = result.toString();
            resultDisplayed = true;
        } catch {
            display.innerText = 'Error';
            expression = '';
            resultDisplayed = true;
        }
    }

    // Function to handle square operation
    function handleSquare() {
        if (expression === '') return;
        try {
            const current = eval(expression);
            const result = current ** 2;
            display.innerText = result.toString();
            expression = result.toString();
            resultDisplayed = true;
        } catch {
            display.innerText = 'Error';
            expression = '';
            resultDisplayed = true;
        }
    }

    // Function to clear the display
    function clearDisplay() {
        expression = '';
        updateDisplay();
    }

    // Event listener for button clicks
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const { id, innerText } = button;

            if (button.classList.contains('number')) {
                handleNumberClick(innerText);
            } else if (id === 'clear') {
                clearDisplay();
            } else if (id === 'equals') {
                computeResult();
            } else if (id === 'decimal') {
                handleNumberClick('.');
            } else if (id === 'square') {
                handleSquare();
            } else {
                handleOperatorClick(innerText);
            }
        });
    });
});
