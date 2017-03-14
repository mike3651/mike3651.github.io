(function() {
	'use strict';	
	
	// keeps track of the current position in the algorithm
	var current_index = 0;

	// the original array
	var original_array = [];

	// current kadane step through array
	var step_through_kadane = [];

	// keeps track of the maximum thus far
	var max_so_far, step_back, prev_max;
	var max_array = [];

	window.onload = function() {
		$("#kadane-button").click(kadaneAlgorithm);
		$("#step-through-algorithm").change(checkState);	
		$("#visual").hide();	
		$("#backward").click(function() {step_back = true; step(-1)});
		$("#forward").click(function() {step_back = false; step(1)});
	}

	// function that checks the state of the run through
	function checkState(){		
		if($(this).is(":checked")) {
			toggleButtons(false);
			$("#visual").show();
		} else {
			toggleButtons(true);
			$("#visual").hide();
		}
	}

	// either enables or disables all buttons
	function toggleButtons(value) {
		var toggle_buttons = $(".step-through");
		for(var i = 0; i < toggle_buttons.length; i++) {
			$(toggle_buttons[i]).prop("disabled", value)
		}
	}

	// method that runs kadane's algorithm
	// return -> array storing information on the maximum values
	function kadaneAlgorithm() {	
		setUpBeforeArray();		
		step_through_kadane = [];	
		var kadane_array = [];
		kadane_array[0] = original_array[0];
		max_so_far = original_array[0];
		max_array[0] = original_array[0];

		// the actual algorithm
		for(var i = 1; i < original_array.length; i++) {
			kadane_array[i] = Math.max(original_array[i], original_array[i] + kadane_array[i - 1]);			
			max_so_far = Math.max(max_so_far, kadane_array[i]);
			max_array[i] = max_so_far;
		}

		// add the following 
		$("#before").html("Before:\n" + makeString(original_array));
		$("#after").html("After:\n" + makeString(kadane_array));
		$("#max-array").html("Max array:\n " + makeString(max_array));
		$("#max").html("Max: " + max_so_far);
		return kadane_array;
	}

	// function that deals with stepping forward in kadane's algorithm
	function step(value) {
		kadaneStepThrough(current_index);		
		updateGUI();		
		current_index += value;		
		if(current_index == original_array.length) {
			current_index = original_array.length - 1;
		}
		if(current_index < 0) {
			current_index = 0;
		}
	}	

	function kadaneStepThrough(current_index) {
		if(current_index == 0) {
			step_through_kadane[0] = original_array[0];
			max_so_far = original_array[0];
		} else {			
			step_through_kadane[current_index] = Math.max(step_through_kadane[current_index - 1] 
				+ original_array[current_index], original_array[current_index]);			

			max_so_far = step_back ? max_array[current_index] : Math.max(max_so_far, step_through_kadane[current_index]);
		}		
	}

	// updates the visual field 
	function updateGUI() {
		$("#index").html("Index: " + current_index);	
		$("#current-value").html("Current maximum: " + step_through_kadane[current_index]);
		$("#current-max").html("Overall maximum: " + max_so_far);		
	}

	function setUpBeforeArray() {
		var before = $("#kadane-input").val();			

		// parse through the input data
		original_array = before.split(",");

		// convert the values to doubles
		for(var i = 0; i < original_array.length; i++) {
			original_array[i] = parseInt(original_array[i]);			
		}
	}

	// generates a string and returns it
	// return -> string format of the array
	function makeString(my_array) {
		var str = "[" + my_array[0];
		for(var i = 1; i < my_array.length; i++) {
			str += ", " + my_array[i];
		}
		str += "]";
		return str;
	}

})();