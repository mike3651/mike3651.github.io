(function() {
	// checks for the user to enter the specific fields
	var in_derivative = false;
	var timer = null;	
	var pipe = false;
	var waiting_timer = null;
	var expression = "";
	var result;

	// set of legal operands
	var legal_operands = ["+", "-"];
	
	window.onload = function() {
		waiting_timer = setInterval(animateWait, 500);
		$("#derivative").click(allowTyping);					
	}

	// allows the user to input information into the div
	function allowTyping() {
		clearInterval(waiting_timer);
		in_derivative = true;
		enableTyping();		
	}

	// function that enables typing
	function enableTyping() {
		$(window).keypress(function(e) {
			if(e.keyCode == 13|| e.which == 13) {
				interpret();
			} else {
				expression += String.fromCharCode(e.keyCode || e.which);
				$("#derivative").html(expression);
			}
		});
	}

	// function that evaluates a simple math function
	function interpret() {		
		var first_op = "", second_op = "", operand, curr_index = 0;

		// check to see the numbers until we reach the operand
		while(!isOperand(expression[curr_index])) {
			first_op += expression[curr_index];
			curr_index++;
		}	

		// set the operand and get the last numbers
		operand = expression[curr_index];	
		for(i = curr_index + 1; i < expression.length; i++) {
			second_op += expression[i];
		}

		evaluate(parseInt(first_op), parseInt(second_op), operand);
	}

	// checks to see if a value is an operand
	function isOperand(value) {
		for(var i = 0; i < legal_operands.length; i++) {
			if(value == legal_operands[i]) {
				return true;
			}
		}
		return false;
	}

	// evaluates the expression 
	function evaluate(x, y, op) {
		var result = "Result: ";
		switch(op) {
			case "+":
				result += x + y;
				break;
			case "-":
				result += x - y;
				break;
			default:
				result += "error";
		}
		$("#derivative").html(result);
	}
 
	// stops the timer
	function stopTimer() {
		clearInterval(waiting_timer);
		waiting_timer = null;
	}

	// animates the wait in the dreivative field
	function animateWait() {
		if(!pipe) {
			$("#derivative").html("|");
		} else {
			$("#derivative").html("");
		}
		pipe = !pipe;
	}
})();