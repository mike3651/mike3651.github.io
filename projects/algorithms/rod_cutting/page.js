(function() {

	// keeps tract of the dynamic array
	var dynamic_rod, lengths, values, length;
	var width, height;

	window.onload = function() {
		setUp();
		$("#submit").click(rodCutting);
	}

	// function that sets up the algorithm
	function setUp() {
		dynamic_rod = make2D();
		length = parseInt($("#length").val());
		lengths = parseInt($("#lengths").val());
		values = parseInt($("#valules").val());
	}

	// Example of the rodCutting

	// 		  	 1  2  3  4  5  6  7  ... N 
	// V(3) - 1  -  -  -  -  -  -  -      -
	// V(4) - 2  -  -  -  -  -  -  -      -
	// V(7) - 3  -  -  -  -  -  -  -      -
	// V(8) - 4  -  -  -  -  -  -  -      -
	// V(9) - 5  -  -  -  -  -  -  -      -

	// runs the rod cutting algorithm
	function rodCutting() {

		// set up the sides of the array 
		// 3 - 1
		// 4 - 2
		// 7 - 3
		// 8 - 4
		// 9 - 5
		for(var i = 0; i < arr.length; i++) {
			dynamic_rod[i][0] = lengths[0];
		}


		// set up the top part of the array
		// 1 2 3 4 5 6 7 ... N
		for(var j = 0; j < length; j++) {
			dynamic_rod[0][i] = (j + 1);
		}

		for(var i = 1; i < arr.length; i++) {
			for(var j = 1; j < arr[0].length; j++) {
				dynamic_rod[i][j] = j > weigths[i] ? dynamic_rod[i][j - 1] 
				: Math.max(v[i] + dynamic_rod[i][j - i], dynamic_rod[i][j - 1]); 
			}
		}
		return dynamic_rod[arr.length][arr[0].length]
	}

	// sets up the array	
	function make2D() {
		var arr = [];
		for(var i = 0; i < height; i++) {
			arr.push(new Array(width));
		}
		return arr;
	}
})();