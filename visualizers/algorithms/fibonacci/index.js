/* JS file for fibonacci visualizer
 * Michael Wilson */
(function() {	
	window.onload = function() {
		// keeps track of the fibonacci list of numbers 
		var f;

		// call for the immediate fibonacci number
		$("#immediate").click(function() {
			// get the value from the input box
			var n = $("#fibonacci-number").val();
			fibonacci(n, true);
		});

		// call for the step by step fibonacci number
		$("#step-by-step").click(function(){
			var n = $("#fibonacci-number").val();
			fibonacci(n, false);
			fibonacciEnhanced();
		});
	}

	// calculates the nth fibonacci number
	// return -> The nth fibonacci number
	function fibonacci(n, show) {
		if(n == 1 || n == 2) {
			return 1;
		}
		f = []
		f.push(1); f.push(1);
		for(var i = 2; i < n; i++) {
			f.push(f[i - 1] + f[i - 2]);
		}
		if(show) {
			$("#display-number").html(f[f.length - 1]);
		} else {
			$("#display-number").html("");
		}
	}

	// version of the fibonacci function that uses timers
	function fibonacciEnhanced() {
		var i = 0;
		var timer = setInterval(function (){
			if(i == f.length - 1) {
				clearInterval(timer);
				timer = null;
			}
			$("#display-number").html(suffix(i + 1) + "fibonacci number is := " + f[i]);
			$("#display-number").fadeIn(900);
			$("#display-number").fadeOut(900);
			i++;
		}, 2000);
	}	

	// problem that takes in a number and returns the correct suffix
	// return -> The proper suffix of the number
	function suffix(n) {
		var first_mod = n % 10;
		var second_mod = n % 100;
		if(second_mod >= 4 && second_mod <= 19 || first_mod == 0 
			|| first_mod >= 4 && first_mod <= 9) {
			return n + "<sup>th</sup> ";
		} else if (first_mod == 1) {
			return n + "<sup>st</sup> ";
		} else if (first_mod == 2) {
			return n + "<sup>nd</sup> ";
		} else {
			return n + "<sup>rd</sup> "
		}
	}
})();