let displayValue = "";

let display = document.querySelector(".display")
let buttons = document.querySelector(".buttons").querySelectorAll("*")

buttons.forEach(element => {
    element.addEventListener("click", populateDisplay)
});

function add(a, b){
    return a + b;
}

function subtract(a, b){
    return a - b;
}

function multiply(a, b){
    return a * b;
}

function divide(a, b){
    return a / b;
}

function operate(a, b, operator){
    a = parseInt(a);
    b = parseInt(b);
    if(operator == "+")
        return add(a, b);
    else if(operator == "-")
        return subtract(a, b);
    else if(operator == "*")
        return multiply(a, b);
    else if(operator == "/")
        return divide(a, b);

    //MAYBE DO ERROR IF ELSE
}

function parseText(string){
    let a, b, operator;
    [a, operator, b] = string.split(/(?<=.)([\/*\-+=])/g);
    return [a, operator, b];
}

function populateDisplay(){
    let a, b, operator;
    let buttonValue = this.textContent;
    [a, operator, b] = parseText(displayValue);
    console.log([a, operator, b])
    if(this.classList.contains('opBtn')){
        if(a){
            if(!b)
                operator = buttonValue;
            else{
                a = operate(a, b, operator)
                b = null; operator = null;
            }
        }
    } else if(this.classList.contains('eqlBtn') && operator && b){
        a = operate(a, b, operator)
        b = null; operator = null;
    } else if(this.classList.contains('numBtn')){
        if(!operator)
            a += buttonValue;
        else
            b += buttonValue;
    } else if(this.classList.contains('clrBtn')){
        a = null; b = null; operator = null;
    }
    displayValue = [a, operator, b].join("");
    display.textContent = displayValue;
}