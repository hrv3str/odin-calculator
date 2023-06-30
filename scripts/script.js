const operationDisplay = document.getElementById("display-operations"); //value contains div, displaying operations
const resultDisplay = document.getElementById ("display-results")
const inputButtons = document.querySelectorAll(`.hover`);

let operations = []; // array containing operations to display
let result = []; // array containing result
let pendingOperations = {}; // object containing pending operations

function allClear() {
    operations = [];
    result = [];
    pendingOperations = {};
    resultDisplay.textContent = 0;
    operationDisplay.textContent = '';
}

function deleteChar() {
    if (result.length !== 0) {
        result.pop();
    } else {
    operations.pop();
    }
};

function signSwitch() {
    if (result[0] === '-') {
        result.shift();
      } else {
        result.unshift('-');

      }
};

function divide() {
    operations.push(`${result.toString()} ÷ `);
    pendingOperations.item = {
        divide: result.toString()
    };
    result = [];
};

function displayInput(key) {
    console.log(key.id);
    switch(key.id) {
        case 'clear-button':
            allClear();
            break;
        case 'delete-button':
            deleteChar();
            break;
        case 'switch-button':
            signSwitch();
            break
        default:
            result.push(key.textContent);
            break;
    }
    operationDisplay.textContent = operations.join('');
    resultDisplay.textContent = result.join('');
};

function handleKeyboardInput(e) {
    let key = document.querySelector(`.button.hover[data-code="${e.code}"]`);
    displayInput(key);
};

function handleMouseInput(event) {
    let key = event.target;
    displayInput(key);
}

window.addEventListener('keydown', handleKeyboardInput);
inputButtons.forEach((button) => {
    button.addEventListener('click', handleMouseInput);
  });