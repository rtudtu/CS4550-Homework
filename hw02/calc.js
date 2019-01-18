savedNum = "0";			// The first operand
displayedNum = "0";		// The displayed operand
savedOperation = "0";		// The operator to use
operation = "0";		// The next operator
calculationDone = false;	// Marks when operators trigger a calculation event and a new operand begins
overrideOp = false;		// When true, operator is subject to change. When false, previous operator is locked in

function init() {
	let numbers = document.getElementsByClassName("number");
	//console.log(numbers);
	for (let i = 0; i < numbers.length; i++) {
	//	console.log(numbers[i]);
		numbers[i].addEventListener('click', function(){ 
			ins(numbers[i].getAttribute("value")) 
		}, false);
	}

	let operators = document.getElementsByClassName("operator");
	for (let i = 0; i < operators.length; i++) {
		operators[i].addEventListener('click', function() {
			setOperation(operators[i].getAttribute("id"))
		}, false);
	}

	let clear = document.getElementsByClassName("clear");
	for (let i = 0; i < clear.length; i++) {
		clear[i].addEventListener('click', function() {
			clr(clear[i].getAttribute("id"))
		}, false);
	}
}

// Clears the data and sets the result element's value back to the default, 0
function clr(resultVal) {
	let result = document.getElementById("result");

	savedNum = "0";
	displayedNum = "0";
	savedOperation = "0";
	operation = "0";
	calculationDone = false;
	overrideOp = false;
	result.value = resultVal;
}

// Inserts the number or '.' into the operand
function ins(num) {
	console.log("Testing");
	let result = document.getElementById("result");
	
	if(displayedNum == "0" && num == "0") {
		return;
	}
	if(displayedNum.includes(".") && num == "." && !calculationDone) {
		return;
	}

	if(displayedNum == "0" && !calculationDone) {
		result.value = num;
	} else if (calculationDone) { // If starting a new calculation (start a new number)
		result.value = num;
		calculationDone = false;
	} else { // Otherwise add to current calculation operands (adds digit to the current number)
		result.value += num;
	}

	displayedNum = result.value;
	overrideOp = false; // If result.value is changed, the saved operation is locked in
}

// Runs the savedOperation on the savedNum and the displayedNum 
function calculate() {
	let result = document.getElementById("result");

	if(savedOperation == "1") {
		result.value = eval(savedNum) + eval(displayedNum);
	} else if(savedOperation == "2") {
		result.value = eval(savedNum) - eval(displayedNum);
	} else if(savedOperation == "3") {
		result.value = eval(savedNum) * eval(displayedNum);
	} else if(savedOperation == "4") {
		if(displayedNum == "0") {
			clr("undefined");
		} else {
			result.value = eval(savedNum) / eval(displayedNum);
		}
	} else {
		result.value = "Invalid Operation";
	}
	savedNum = result.value;
	displayedNum = "0";
	savedOperation = operation;
	operation = "0";
	calculationDone = true;
	overrideOp = true;
}

// Sets the operation of the calculator (+, -, *, or /) as the digits 1, 2, 3, and 4
function setOperation(op) {
	let result = document.getElementById("result");

	if(savedOperation == "0") {
		savedOperation = op;
		savedNum = result.value;
		calculationDone = true;
		overrideOp = true;
	} else if(overrideOp) {
		savedOperation = op;
	} else {
		operation = op;
		calculate();
	}
}

document.addEventListener("DOMContentLoaded", init);
