const inputElem = document.querySelector('.calculation')



class Calculator {

    inputElem;
    currentInput;
    operations;
    inputs;
    constructor(input) {
        this.inputElem = input
        this.inputs = []
        this.operations = []
        this.currentInput = ""
    }

    renderPage() {
        inputElem.innerHTML = "";
        let index = 0;
        while (index < this.inputs.length) {
            this.inputElem.innerHTML += `${this.inputs[index]}`;
            if (index < this.operations.length) {
                this.inputElem.innerHTML += `${this.operations[index]}`;
            }
            index++;
        }
        inputElem.innerHTML += `${this.currentInput}`
    }

    formatNumber(num) {
        if (Number.isInteger(num)) {
            return num;
        }
        else {
            return num.toFixed(2)
        }
    }


    numberClick(number) {
        if (number !== "." || (this.currentInput[this.currentInput.length - 1] !== "." && Number.isInteger(Number(this.currentInput)))) {
            this.currentInput += `${number}`
        }
    }

    //store all input numbers(currentInput) in inputs arr, store all operations in operations arr
    //calculate all when clicked "="
    operationClick(operation) {
        if (!(this.currentInput === "")) {
            this.inputs.push(Number(this.currentInput));
            this.currentInput = "";
            this.operations.push(operation);
        }
    }

    calculate() {
        if (!(this.currentInput === "")) {
            this.inputs.push(Number(this.currentInput));
            let index = 0;
            while (index != this.operations.length) {
                let operation = this.operations[index];
                if (operation === "÷") {
                    this.inputs[index] = this.inputs[index] / this.inputs[index + 1];
                    this.operations.splice(index, 1);
                    this.inputs.splice(index + 1, 1);
                    index--;

                }
                else if (operation === "×") {
                    this.inputs[index] = this.inputs[index] * this.inputs[index + 1];
                    this.operations.splice(index, 1);
                    this.inputs.splice(index + 1, 1);
                    index--;

                }
                index++;
            }
            index = 0;
            while (index != this.operations.length) {
                let operation = this.operations[index];
                if (operation === "+") {
                    this.inputs[index] = this.inputs[index] + this.inputs[index + 1];
                    this.operations.splice(index, 1);
                    this.inputs.splice(index + 1, 1);
                    index--;
                }
                else if (operation === "-") {
                    this.inputs[index] = this.inputs[index] - this.inputs[index + 1];
                    this.operations.splice(index, 1);
                    this.inputs.splice(index + 1, 1);
                    index--;
                }
                index++;
            }
        }
        this.inputs[0] = this.formatNumber(this.inputs[0]);
        this.currentInput = this.inputs[0].toString();
        this.inputs = [];
    }

    clear() {
        this.inputs = []
        this.operations = []
        this.currentInput = ""
    }

    clearLast() {
        if (this.currentInput != "") {
            this.currentInput = this.currentInput.slice(0, -1);
        }
        else {
            this.operations.pop();
            this.currentInput = (this.inputs.pop()).toString()
        }
    }

}

const calculator = new Calculator(inputElem)

document.querySelectorAll('.js-number').forEach((button) => {
    button.addEventListener('click', () => {
        calculator.numberClick(button.innerHTML);
    })
})

document.querySelectorAll('.js-operation').forEach((button) => {
    button.addEventListener('click', () => {
        calculator.operationClick(button.innerHTML);
    })
})

document.querySelector('.js-calculate').addEventListener('click', () => {
    calculator.calculate();
})

document.querySelector('.js-clear-all').addEventListener('click', () => {
    calculator.clear()
})

document.addEventListener('click', () => {
    calculator.renderPage();
})

document.querySelector('.js-clear-last').addEventListener('click', () => {
    calculator.clearLast();
})

//integrate MVC yes
//add clear-all yes
//add clear-last yes


//stringfy -1 yes
// % operation
// sqrt
// . button functionality yes