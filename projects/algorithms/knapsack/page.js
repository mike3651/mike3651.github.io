/* My JS file
 * 
 * Michael Wilson */
(function() {
	var CAPACITY;
	var weights = [], costs = [];	

	// 2d array to hold the knapsack values
	var sack;

	window.onload = function() {
		$("#play").click(runKnapsack);
	}

	// function that runs the knapsack algorithm
	function runKnapsack() {		
		setUpArray("#costs", costs);
		setUpArray("#weights", weights);
		CAPACITY = parseInt($("#capacity").val());
		knapsack();
	}

	// performs the knapsack algorithm
	function knapsack() {	
		sack = make2D(weights.length + 1, CAPACITY);		
		for(var i = 0; i <= CAPACITY; i++) {
			sack[0][i] = 0;
		}

		for(var i = 1; i <= weights.length; i++) {
			for(var j = 0; j <= CAPACITY; j++) {

				// case that the current weight is too large
				if(weights[i - 1] > j) {
					sack[i][j] = sack[i - 1][j];
				} else {
					sack[i][j] = Math.max(sack[i - 1][j], sack[i - 1][j - weights[i - 1]] + costs[i - 1]);
				}
			} 
		}


		$("#weights-array").html("Weights: [" + weights + "]");
		$("#costs-array").html("Values: [" + costs + "]");
		$("#result").html("Maximum value: " + sack[weights.length][CAPACITY]);
		$("#array").html(toString());
	}

	// helper function that sets up an array
	function setUpArray(id, the_array) {
		var temp = $(id).val().split(",");		
		for(var i = 0; i < temp.length; i++) {			
			the_array[i] = parseInt(temp[i]);
		}
	}

	// makes a 2D array, thanks to kyle from SO
	function make2D(m, n) {
		var arr = [];
		for(var i = 0; i < m; i++) {
			arr.push(new Array(n));
		}
		return arr;
	}

	// function that makes a nice visual of the 2d matrix
	function toString() {
		var str = "";
		for(var i = 0; i < sack.length; i++) {
			str += "[" + sack[i][0];
			for(var j = 1; j < sack[0].length; j++) {
				str += ", " + sack[i][j];
			}
			str += "]<br/>";
		}
		return str;
	}

})();