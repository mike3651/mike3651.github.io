/* This is my javascript file
 * 
 * This is part of an hour of code challenge 
 *
 * ©Michael Wilson, 2017 */

(function() {
	// The currency that we have in the game
	var coins = [1, 5, 10, 25];	

	// keeps track of the list of current coins
	var current_coins = [];

	// The current items that the player has
	var bag = [];
	var snake_size = [];

	// keeps reference to the size of the player & coins 
	var SIZE = TOLERANCE = 10;

	// The current score of the user & the id of the block
	var current_score; 
	var id = 1;

	// keeps track of the users direction & speed
	var direction = "up"; 
	var player_speed = 100; 
	var spawn_speed = 3000;		

	var start = {x: 200, y:200};	

	// keeps track of the size of the board
	var board_size = {width: 400, height: 400};

	// timer to keep track of how long the game has been going on for
	var timer = null; var time = 0; var player_timer = null;

	window.onload = function() {
		setStates();
		$("#toggle-debug").on('change', function() {
			if(this.checked) {
				$("#debug").css("display", "inline");
			} else {
				$("#debug").css("display", "none");
			}
		})
	}

	// sets up the states of the game
	function setStates() {		
		document.addEventListener("keydown", move);

		current_score = 0;
		// creates a player
		makeElement(start.x, start.y, "player", "blue", SIZE);
		snake_size.push({
			myX: start.x,
			myY: start.y
		})
		startTime();
	}

	// creates an element in the game
	// param x -> starting x position
	// param y -> starting y position
	// param className -> the class
	// param color -> the color of this element
	// param size -> the size of this element
	// param id -> unique identificaiton for this object
	function makeElement(x, y, class_name, color, size, id) {
		var e = document.createElement("div");
		e.id = id;
		e.className = class_name;
		e.style.backgroundColor = color;
		e.style.height = size + "px";
		e.style.width = size + "px";		
		e.style.top = y + "px";
		e.style.left = x + "px";
		document.getElementById("game-board").appendChild(e);
	}

	// function that makes a coin
	function startTime() {
		if(timer == null) timer = setInterval(makeCoin, spawn_speed);
		else {
			clearInterval(timer);
			timer = null;
		}
		if(player_timer == null) player_timer = setInterval(moveInDirection, player_speed);
		else {
			clearInterval(player_timer);
			player_timer = null;
		}
	}

	// function that makes a coin
	function makeCoin() {
		// choose random locations to spawn the coins
		var x = Math.round(Math.random() * board_size.width);
		var y = Math.round(Math.random() * board_size.height);

		// choose a random coin value 
		var value = coins[Math.round(Math.random() * coins.length)];


		// add the coin object to current coins
		current_coins.push({
			myX: x,
			myY: y,
			myValue: value,
			myId: "" + id
		});

		makeElement(x, y, "coin", "yellow", SIZE, id);
		id+=1;		
	}

	// movement functionality
	// param e -> The event that happened
	function move(e) {
		// grab the right player
		var myPlayer = document.getElementsByClassName("player")[0];
		var x = parseInt(myPlayer.style.left);
		var y = parseInt(myPlayer.style.top);		

		// move up
		if(e.keyCode == 38) {
			direction = "up";
		}
		
		// move down
		else if(e.keyCode == 40) {			
			direction = "down";
		}

		// move left 
		else if(e.keyCode == 37) {
			direction = "left";
		}

		// move right
		else if (e.keyCode == 39) {
			direction = "right";
		}
	}

	// moves the player in a certain direction	
	function moveInDirection() {		
		document.getElementById("direction").innerHTML = "Direction: " + direction;
		var player_block = document.getElementsByClassName("player")[0];
		var x = parseInt(player_block.style.left);
		var y = parseInt(player_block.style.top);	
		switch(direction) {			
			case "left":				
				player_block.style.left = x - SIZE + "px";
				break;
			case "right":				
				player_block.style.left = x + SIZE + "px";
				break;
			case "up":				
				player_block.style.top = y - SIZE + "px";
				break;
			case "down":				
				player_block.style.top = y + SIZE + "px";
				break;
			default:
		}
				

		// update the positions of the rest of the blocks
		var player_blocks = document.getElementsByClassName("player");	
		// console.log("snakcount: " + player_blocks.length);	
		for(var i = player_blocks.length - 1; i >= 1; i--) {
			// update all of the current positions to previous ones
			snake_size[i].myX = snake_size[i - 1].myX;
			snake_size[i].myY = snake_size[i - 1].myY;
			player_blocks[i].style.left = snake_size[i].myX + "px";
			player_blocks[i].style.top = snake_size[i].myY + "px";		
			//console.log("x: " + snake_size[i].myX + "y: " + snake_size[i].myY);	
		}
		snake_size[0].myX = parseInt(player_block.style.left);
		snake_size[0].myY = parseInt(player_block.style.top);

		// check for collision with a coin
		checkCollision(x, y);

		var the_string = "";
		for(var i = 0; i < snake_size.length; i++) {
			the_string += "{";
			the_string += snake_size[i].myX;
			the_string += ", ";
			the_string += snake_size[i].myY; 	
			the_string += "}"
		}

		// update the list of coordinates
		$("#snake-list").html("List of coordinates: " + the_string);
	}

	// function that checks for collision
	// param x -> The x position to check
	// param y -> The y position to check
	function checkCollision(x, y) {
		// look at the positions of each coin		
		for(var i = 0; i < current_coins.length; i++) {
			var e = current_coins[i];
			var testX = e.myX;
			var testY = e.myY;
			if(x >= testX 
				&& x <= testX + TOLERANCE 
				&& y >= testY 
				&& y <= testY + TOLERANCE) {
				console.log(current_score);
				current_score += e.myValue;		
				//alert(e.myId);					
				document.getElementById("my-score").innerHTML = "Current score: " + current_score;
				$("#" + e.myId).remove();
				// want to create a new player object
				// grab the contents of the last element
				var end = snake_size[snake_size.length - 1];	
							
				var x = parseInt(end.myX) - SIZE;
				var y = parseInt(end.myY) - SIZE;
				snake_size.push({
					myX: x,
					myY: y
				});				
				//alert("x: "+ x + "\ny: " + y);
				makeElement(x, y, "player", "blue", SIZE);
			}
		}

		// check to see the boundaries of the wall 
		if(x < 0
			|| x > board_size.width
			|| y > board_size.height
			|| y < 0){
			reset();
		}
		
		// check to see if the sanke ever overlaps itself
		// var compare_location = snake_size[0];
		// for(var i = 1; i < snake_size.length; i++) {
		// 	if(compare_location.myX == snake_size[i].myX
		// 		|| compare_location.myY == snake_size[i].myY)
		// 	{				
		// 		reset();
		// 		break;
		// 	}
		// }

	}

	// function that resets all states of the game
	function reset() {
		current_score = 0;
		current_coins = [];
		snake_size = [];
		$("#game-board").html("");
		$("#my-score").html("Current score: " + current_score);
		// creates a player
		makeElement(start.x, start.y, "player", "blue", SIZE);
		snake_size.push({
			myX: start.x,
			myY: start.y
		})
	}

})();