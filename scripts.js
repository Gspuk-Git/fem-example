const display = document.querySelector('.display');
let runningTotal = 0;
let displayHolder = '0';
let lastOperator = null;


function buttonClick(clicked) {
    if (isNaN(parseInt(clicked))){
        symbolClicked(clicked);
    } else {
        numClicked(clicked);
    }
    renderScreen();
}

function operator(symbol){
    //no operator pressed before
    if (lastOperator === null){
        runningTotal = parseInt(displayHolder);
        lastOperator = symbol;
        displayHolder = '0';
        return;
    } else {
        switch (symbol){
            case '=':
                calculate();
                break;
            case '÷':
            case '-':
            case '+':
            case 'x':
                runningTotal = parseInt(displayHolder);
                lastOperator = symbol;
                displayHolder = '0';
                calculate();
                break;
        }
    }
}

//function that does the calculations
function calculate(){
    //if no number is ready for calculation do nothing
    if (runningTotal === 0){
        return;
    } else {
        switch (lastOperator) {
            case '+':
                runningTotal += parseInt(displayHolder);
                break;
            case '-':
                runningTotal -= parseInt(displayHolder);
                break;
            case '÷':
                runningTotal /= parseInt(displayHolder);
                break;
            case 'x':
                runningTotal *= parseInt(displayHolder);
                break;
        }

        displayHolder = runningTotal.toString();
        lastOperator = null;
    }
}

//function for symbol clicked
function symbolClicked(symbol){
    console.log(symbol);
    switch (symbol){
        //clear key
        case 'C':
            displayHolder = '0';
            runningTotal = 0;
            lastOperator = null;
            break;
        //backspace key
        case "←":
            if (displayHolder.length === 1){
                displayHolder = '0';
            } else {
                displayHolder = displayHolder.substring(0, displayHolder.length - 1);
            }
            break;
        case '+':
        case '-':
        case 'x':
        case '÷':
        case '=':
            operator(symbol);
            break;
    }
}

//function for number clicked
function numClicked(number){
    if (displayHolder === '0'){
        displayHolder = number;
    } else {
        displayHolder += number;
    }
}

//displays the current holder number on calc screen
function renderScreen(){
    display.innerText = displayHolder;
}

//init function for when button is clicked
function init() {
    //creates array with buttons clicked
    let clickedBox = document.querySelectorAll('.box');

    //loops through to add button click event to each item in array
    for (let i = 0; i < clickedBox.length; i++) {
        clickedBox[i].addEventListener('click', function(event){
            buttonClick(event.target.innerText);
        })
    }

}

init();