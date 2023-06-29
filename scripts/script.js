const operationDisplay = document.getElementById("display-operations"); //value contains div, displaying operations
const resultDisplay = document.getElementById ("display-results")
const inputButtons = document.querySelectorAll(`.hover`);

let operations = []; // array containing operations to display
let pendingOperations = {}; // object containing pending operations

function allClear() {
    operations = [];
    pendingOperations = {};
    resultDisplay.textContent = 0;
    operationDisplay.textContent = '';
}

function deleteChar() {
    if (resultDisplay.textContent !== '') {
        resultDisplay.textContent = resultDisplay.textContent.slice(0, -1);
    } else {
    operations.pop();
    }
};

function switchNegative() {
    if (resultDisplay.textContent.startsWith('-')) {
        resultDisplay.textContent = resultDisplay.textContent.slice(1);
      } else {
        resultDisplay.textContent = `-${resultDisplay.textContent}`;
      }
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
            switchNegative();
            break
        default:
            resultDisplay.textContent = resultDisplay.textContent + key.textContent;
            break;
    }
    operationDisplay.textContent = operations.join('');
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