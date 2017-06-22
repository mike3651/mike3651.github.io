(function() {
	// opening and closing braces
	var opening = ["(", "{", "["], closing = [")", "}", "]"];

	var syntax_pairs = [], error_count;

	'use strict';

	window.onload = function() {
		initialize_pairs();
		$("#validate").click(function() {
			// creates an array of individual characters
			var original_text = $("#code-check").val();			
			var characters = original_text.trim().split("");
			validate(characters, original_text);
		});
	}

	/* Initialize the pairs of opening and closing 'braces' */
	function initialize_pairs() {
		for(var i = 0; i < opening.length; i++) {
			var syntax_pair = {
				open : opening[i],
				closing : closing[i]							
			};
			syntax_pairs.push(syntax_pair);
		}
	}


	/* Sets up defualt syntax pairs, RT: O(n)
   	 * 
   	 * @param -> The array of characters to analyze 
   	 * @return -> True if the syntax is valid, false otherwise */
	function validate(characters, original) {
		error_count = 0;
		// creates a 'stack', array contains pop and push
		var stack = new Array();
		var current_character, test_character, valid = true;
		for(var i = 0; i < characters.length; i++) {
			current_character = characters[i];
			if(opening.includes(current_character)) {
				stack.push(current_character);
			} else if(closing.includes(current_character)) {
				test_character = stack.pop();
				if(!found(test_character, current_character)) {
					// console.log("Comparing open character " + current_character 
					// 	+ " to closing character " + test_character);
					valid = false;
					error_count++;
				}
			}
		}

		if(stack.length != 0) {
			valid = false;
		}	
		var div = document.createElement("div");	
		var span = document.createElement("span");
		span.className = valid ? "valid" : "invalid";
		span.innerHTML = setHTML(original, original.split("\n").length);
		$(div).append(span);
		var p = document.createElement("p");
		p.innerHTML = error_count == 0 ? "No errors! :)" : 
		error_count + " Errors found! ):<";	
		$(div).append(p);
		$("#output").html(div);
		//console.log(valid);
	}	

	/* Checks to see as to whether or not the key and value are part of a true
	 * corrseponding syntax pair, RT: O(n)
	 *
	 * @param key -> The key 
	 * @param value -> The corresponding value to the key 
	 * @return True if the pair correspond, false otherwise */
	function found(key, value) {

		for(var i = 0; i < syntax_pairs.length; i++) {
			// console.log("Current open character: " + syntax_pairs[i].open
			// 	 + " Looking for open character: " + key);
			// console.log("Current closing character: " + syntax_pairs[i].closing
			// 	 + " Looking for closing character: " + value);
			if(syntax_pairs[i].open == key && syntax_pairs[i].closing == value) {
				return true;
			}
		}
		return false;
	}

	/* Sets the HTML of a certain element
	 * 
	 * @return The HTML string */
	function setHTML(obj, lines) {
		var str = "", arr = obj.split("\n");
		for(var i = 0; i < lines; i++) {
			str += arr[i] + "<br>";
		}
		return str;
	}

})();