Calculator Design
------------------
Every single operator acts as an '=' button when there are enough operands to operate on.

When chaining calculations, you may change the operator at will - the saved operator will
update per the last hit operator button. 
	ie. The inputs: [2] -> [+/=] -> [*] -> [5] -> [+/=] -> 10 instead of 7
	-The '*' operator overwrote the '+' operator

Dividing by 0 will display 'Undefined' and 'dump' the previous saved number due to the
invalid operation. The user can hit any number button or 'C' to restart the calculation.
Operating with 'Undefined' will return 'NaN' since you can't use an undefined number as
an operand.

Everything else works as a 4 function calculator would be expected to work.
