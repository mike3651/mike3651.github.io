/*
 * Michael Wilson
 */

(function() {
	// keeps track of how many seconds are to pass before clearing text that was typed
	var MAX_IDLE_TIME = 5;

	// toggles the pipe animation
	var pipe_is_active = false;
	// keeps track of the pipe timer and the clearing timer
	var clear_timer = null;
	var pipe_timer = null;

	// keeps track of the current expression
	var expression = [];

	var read_in_timer = null;
	var curr_index = 0;
	var file_string;

	window.onload = function() {
		initialize();
		$(window).keypress(function(e){
				appendToExpression(e);
			}
		); 
	}


	// appends the given character to the expression
	function appendToExpression(e) {		
		removeAll("|");
		if(e.which == 8) {
			expression.pop();
		} else {
			expression.push(String.fromCharCode(e.which));
		}		
		$("#type-area").html(expression);
		//reset();	
	}

	// sets up the whole program
	function initialize() {
		// if(pipe_timer == null) {
		// 	pipe_timer = setInterval(togglePipe, 500);
		// }
		var ajax = new XMLHttpRequest();
		ajax.onload = readFile;
		ajax.open("GET", "read.txt", false);
		ajax.send();
	}

	// function that reads in a file
	function readFile() {		
		file_string = this.responseText;
		read_in_timer = setInterval(function() {
			removeAll("|");
			readTheFile(file_string, curr_index);
			curr_index++;
		}, 50);			
	}

	function readTheFile(str, index) {
		if(index == str.length - 1) {
			clearInterval(read_in_timer);
			read_in_timer = null;
		} else {
			expression.push(str[index]);
			$("#type-area").html(expression);
		}
	}

	// resets all the timer states 
	function reset() {
		clearInterval(pipe_timer);
		pipe_timer = null;
		initialize();
	}

	// method that toggles the display of the pipe
	function togglePipe() {
		// if(expression[expression.length - 1] == " " 
		/* 	|| */if(expression[expression.length - 1] == "|") {
			expression.pop();
		}
		if(!pipe_is_active) {
			expression.push("|");		
		} else {
			expression.push("");	
		}		
		$("#type-area").html(expression);
		pipe_is_active = !pipe_is_active;
	}

	function removeAll(target) {
		for(var i = 0; i < expression.length; i++) {
			if(expression[i] == target) {
				expression.splice(i, 1);
				i--;
			}
		}
	}



})();