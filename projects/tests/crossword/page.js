(function() {

	// keeps track of the board
	var board = [[],[]];

	// height & width of the board
	var height, width;

	// keeps track of the words in the board
	var words = [];

	// keeps track of the placement of the chracters already assigned
	var character_placement = [];

	// generates a word object 
	function word(string, direction) {
		this.word = string;		
		this.direction = direction;
		this.position = generateRandomLocation(string, direction);
	}

	window.onload = function() {
		$("#set-up").click(setUpBoard);
	}

	// function that sets up the board
	function setUpBoard() {

	}

	// function that generates a random location and returns it
	function generateRandomLocation(string, direction) {
		var x = Math.round(Math.random() * width);
		var y = Math.round(Math.random() * height);
		while(!isValid(string, x, y, direction)) {
			x = Math.round(Math.random() * width);
			y = Math.round(Math.random() * height);
		}
		var position = {
			my_x: x,
			my_y: y
		}
		return position;
	}

	// validates the location of a string
	// return -> isValid ? true : false;
	function isValid(string, x, y, direction) {
		// keep the direction of the string in mind
		// loop through each character of the string
			// if character can't be placed at board[a][b] : return false
		for(var i = 0; i < string.length; i++) {
			var the_character;
			if(direction == "horizontal") {
				board[x + i][y] = string[i];
				the_character.x = x + i;
				the_character.y = y;
			} else if (direction == "vertical") {
				board[x][y + i] = string[i];
				the_character.x = x ;
				the_character.y = y + i;
			} else {
				board[x + i][y + i] = string[i];
				the_character.x = x + i;
				the_character.y = y + i;
			}
			the_character.character = string[i];
			character_placement.push(the_character);
		}
		// if all characters can be placed return true and set the characters at their respective locations
	}

	// generates a random character and returns it
	function generateRandomCharacter() {
		return String.fromCharCode(Math.round(Math.random() * 26) + 65);
	}
})();