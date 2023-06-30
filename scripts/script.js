const operationDisplay = document.getElementById("display-operations"); //value contains div, displaying operations
const resultDisplay = document.getElementById ("display-results")
const inputButtons = document.querySelectorAll(`.hover`);

let operations = []; // array containing operations to display
let result = []; // array containing result
let pendingOperations = [ 
    ['initial', '']
]; // array containing pending operations

let afterEqual = false; // variable to clear calc display after calculating

function pushBuffer() {
    let lastArray = pendingOperations[pendingOperations.length - 1];
    lastArray[1] = result.join('');
    console.log({pendingOperations});
}

function allClear() {
    operations = [];
    result = [];
    pendingOperations = pendingOperations = [ 
        ['initial', '']
    ];
    resultDisplay.textContent = 0;
    operationDisplay.textContent = '';
    afterEqual = false;
    console.log('All clear');
}

function deleteChar() {
    if (result.length !== 0) {
        result.pop();
    } else if (pendingOperations.length > 1) {
    operations.pop();
    pendingOperations.pop();
    let lastOperation = pendingOperations[pendingOperations.length -1];
    lastOperation.pop();
    console.log(pendingOperations);
    };
};

function signSwitch() {
    if (result.length === 0) {
      result.unshift('-');
    } else if (result[0] === '-') {
      result.shift();
    } else {
      result.unshift('-');
    }
  };

function divide() {
    if (result.length === 0) {
        return;
    }
    operations.push(`${result.join('')} ÷ `);
    pushBuffer();
    pendingOperations.push(['divide', '']);
    result = [];
};

function multiply() {
    if (result.length === 0) {
        return;
    }
    operations.push(`${result.join('')} * `);
    pushBuffer();
    pendingOperations.push(['multiply', '']);
    result = [];
};

function substract() {
    if (result.length === 0) {
        return;
    }
    operations.push(`${result.join('')} - `);
    pushBuffer();
    pendingOperations.push(['subtract', '']);
    result = [];
};

function add() {
    if (result.length === 0) {
        return;
    }
    operations.push(`${result.join('')} + `);
    pushBuffer();
    pendingOperations.push(['add', '']);
    result = [];
};

function floater(key) {
    if (result.includes('.')) {
        return;
    }
    result.push(key.textContent.trim());
};

function calculate() {
    pushBuffer();
    let calcResult = parseFloat(pendingOperations[0][1], 10); // Initialize the result with the initial value
  
    for (let i = 1; i < pendingOperations.length; i++) {
      const operation = pendingOperations[i][0];
      const operand = pendingOperations[i][1];
  
      if (operand === '') {
        continue; // Skip the operation if the operand is empty
      }
  
      switch (operation) {
        case 'add':
          calcResult += parseFloat(operand, 10);
          break;
        case 'subtract':
          calcResult -= parseFloat(operand, 10);
          break;
        case 'multiply':
          calcResult *= parseFloat(operand, 10);
          break;
        case 'divide':
          const divisor = parseFloat(operand, 10);
          if (divisor === 0) {
            calcResult = 'error'; // Handle division by zero
          } else {
            calcResult /= divisor;
          }
          break;
      }
    }
    
    if (!Number.isFinite(calcResult)) {
      calcResult = 'error'; // Handle other infinity cases
    }
  
    result = [];
    result.push(calcResult);
    operations = [];
    afterEqual = true;
  }
  

function handleInput(key) {
    console.log(key.id);
    if (afterEqual) {
        allClear();
    }
    switch(key.id) {
        case 'clear-button':
            allClear();
            break;
        case 'delete-button':
            deleteChar();
            break;
        case 'switch-button':
            signSwitch();
            break;
        case 'operation-divide':
            divide();
            break;
        case 'operation-multiply':
            multiply();
            break;
        case 'operation-substraction':
            substract();
            break;
        case 'digit-floater':
            floater(key);
            break;
        case 'operation-add':
            add();
            break;
        case 'operation-equal':
            calculate();
            break;
        default:
            result.push(key.textContent.trim());
            break;
    }
    operationDisplay.textContent = operations.join('');
    resultDisplay.textContent = result.join('');
};

function handleKeyboardInput(e) {
    let key = document.querySelector(`.button.hover[data-code="${e.code}"]`);
    handleInput(key);
};

function handleMouseInput(event) {
    let key = event.target;
    handleInput(key);
}

window.addEventListener('keydown', handleKeyboardInput);
inputButtons.forEach((button) => {
    button.addEventListener('click', handleMouseInput);
  });