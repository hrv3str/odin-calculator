const operationDisplay = document.getElementById("display-operations"); //value contains div, displaying operations
const resultDisplay = document.getElementById ("display-results")
const inputButtons = document.querySelectorAll(`.hover`);

let operations = []; // array containing operations to display

function displayInput(key) {
    console.log(key.id);
    switch(key.id) {
        case 'clear-button':
            operations = [];
            break;
        case 'delete-button':
            operations.pop();
            break;
        default:
            operations.push(key.textContent);
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