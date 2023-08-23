let displayValue = "";
let isResult = false;
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
    a = parseFloat(a);
    b = parseFloat(b);
    let result;
    if(operator == "+")
        result = add(a, b);
    else if(operator == "-")
        result = subtract(a, b);
    else if(operator == "*")
        result = multiply(a, b);
    else if(operator == "/"){
        if(b == 0){
            alert("can't divide by zero");
            result =  a;
        } else
            result = divide(a, b);
    }
    return Math.round(result * 100) / 100
}

function parseText(string){
    let a, b, operator;
    [a, operator, b] = string.split(/(?<=[0-9])([\/*\-+=])/g);
    return [a, operator, b];
}

function populateDisplay(){
    let a, b, operator;
    let buttonValue = this.textContent;
    [a, operator, b] = parseText(displayValue);
    console.log([a, operator, b])
    if(this.classList.contains('opBtn')){
        if(a && a != "-"){
            if(!b)
                operator = buttonValue;
            else{
                a = operate(a, b, operator)
                b = null; operator = buttonValue;
            } 
        } else if(this.classList.contains('minus')){
            a = "-";
        }
    } else if(this.classList.contains('eqlBtn') && operator && b){
        isResult = true;
        a = operate(a, b, operator)
        b = null; operator = null;
    } else if(this.classList.contains('numBtn')){
        if(!operator)
            if(isResult){
                a = buttonValue;
                isResult = false;
            } else
                a += buttonValue;
        else
            b += buttonValue;
    } else if(this.classList.contains('clrBtn')){
        a = null; b = null; operator = null;
    }
    displayValue = [a, operator, b].join("");
    display.textContent = displayValue;
}