// Michael Wilson
// Javascript file for the ball test

// wrap up the program
(function() {
	'use strict';

	var timer = null;
	var dx = 10;
	var dy = 10;
	var gameSpeed = 25;
	

	var height, width;

	/* Kicks off the whole program */
	window.onload = function() {
		// HEIGHT & WIDTH OF THE BALL AREA
		width = parseInt(window.getComputedStyle(document.getElementById("ball-area")).width);
		height = parseInt(window.getComputedStyle(document.getElementById("ball-area")).height);		
		setUp();
		document.getElementById("speed-query").onclick = setSpeed;
		document.getElementById("start").onclick = animate;
	}


	/* Method that sets the speed animation */
	function setSpeed() {
		var speed = parseInt(document.getElementById("speed-info").value);
		gameSpeed = speed;
		alert("speed: " + gameSpeed);
	}

	/* Function that generates a ball at a random position */
	function createBall(width, height) {
		var ball = document.createElement("div");
		ball.id = "ball";
		ball.style.top = Math.floor(Math.random() * height + 1) + 'px';
		ball.style.left = Math.floor(Math.random() * width + 1) + 'px';
		document.getElementById("ball-area").appendChild(ball);
	}

	/* My simple helper function */
	function animate() {
		if(timer == null)
			timer = setInterval(move, 1000/gameSpeed);
		else { clearInterval(timer); timer = null; }
	}

	/* This function just moves the ball */
	function move() {				
		// get the position of the ball
		var obj = document.getElementById("ball");
		var xPosition = parseInt(obj.style.left);
		var yPosition = parseInt(obj.style.top);

		// get the yPosition of the player
		var player = document.getElementById("player");
		var pyPosition = parseInt(player.style.top);		
		var pxPosition = parseInt(player.style.left);

		if(xPosition >= width - 20 || xPosition < 0 ) {
			dx = -dx
		} 
		if(yPosition >= height - 20 || yPosition < 0 || 
		  /* Check to see if the ball is within the bounds of the player */
		  (yPosition < pyPosition && yPosition > pyPosition - 20 
		   && xPosition < pxPosition + 100 && xPosition > pxPosition )) {
			// alert("Player Positon: " + pyPosition + 
			// 	  "\nBall Position: " + yPosition);
			dy = -dy;
		}

		obj.style.top = yPosition + dy + 'px';
		obj.style.left = xPosition + dx + 'px';

	}

	/* Helper function to set up the game */
	function setUp() {
		createBall(width, height);
		createPlayer();
	}

	/* Function that makes a player */
	function createPlayer() {
		var player = document.createElement("div");
		player.id = "player";
		player.style.top = height - 50 + 'px';
		player.style.left = width - width/2 - 50 + 'px';
		document.getElementById("ball-area").appendChild(player);
	}

	window.addEventListener('keydown', function(e) {
		var player = document.getElementById("player");
		var xPosition = parseInt(player.style.left);
		switch(e.keyCode) {

			// left arrow
			case 37: player.style.left = xPosition - gameSpeed + 'px'; break;
			// right arrow
			case 39: player.style.left = xPosition + gameSpeed + 'px'; break;

		};
	}, false);

})();