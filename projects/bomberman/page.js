/*
 This is the javascript needed in order to make the game work 

 Michael Wilson */

(function() {
	'use strict';
	
	var GAME_SPEED = 1000;

	var BOMB_SWITCH = 500;	

	var BOARD_WIDTH;
	var BOARD_HEIGHT;

	var player_size = 10;
	
	var canvas;
	var ctx;

	var BAR_DISABLE = false;

	// keeps track of lists of elements
	var explosion = [];
	var bomb_list = [];
	var enemy_list = [];

	// keeps track of how long the animation should be running
	var BOMB_ANIMATION_TIME = 50;

	// keeps track of all the timers
	var timer = null;
	var bomb_timer = null;
	var explosion_timer = null;

	// audio sources
	var audio;

	// ALL OF THE FOLLOWING IS FOR THE DEBUGGING
	
	

	window.onload = function() {
		BOARD_WIDTH = $("#game-board").width();
		BOARD_HEIGHT = $("#game-board").height();
		audio = $("audio");
		setGameState();
		document.addEventListener("keydown", movePlayer);
		startTimer();
		canvas = document.getElementById("canvas");

		ctx = canvas.getContext("2d");

		canvas.height = BOARD_HEIGHT;
		canvas.width = BOARD_WIDTH;
		
		startBombTimer();
	}

	function setGameState() {
		makePlayer();
	}

	// this function generates a player
	function makePlayer() {
		var player = document.createElement("div");
		player.id = "player";
		player.style.left = BOARD_WIDTH / 2 + "px";
		player.style.top = BOARD_HEIGHT / 2 + "px";
		$("#game-board").append(player);		
	}

	// function that starts generating the timer for generating enemy sprites
	function startTimer() {
		if(timer == null) {			
			timer = setInterval(generateEnemies, GAME_SPEED);
		} else {
			clearInterval(timer);
			timer = null;
		}
	}

	function startBombTimer() {
		if(bomb_timer == null) {						
			bomb_timer = setInterval(animateBomb, BOMB_SWITCH);
		} else {
			clearInterval(bomb_timer);
			bomb_timer = null;
		}
	}

	// function that animates the bomb
	function animateBomb() {
		bomb_list = $(".bomb");
		for(var i = 0; i < bomb_list.length; i++) {
			var myCount = 0;
			var currValue = bomb_list[i].value;
			var x = parseInt(bomb_list[i].style.left);
			var y = parseInt(bomb_list[i].style.top);
			if(currValue % 2 == 1) {
				bomb_list[i].style.backgroundColor = "yellow";				
			}
			if(currValue % 2 == 0) {
				bomb_list[i].style.backgroundColor = "brown";
			}
			if(currValue == 5) {
				if(explosion_timer == null){										
					explosion_timer = setInterval(function() {
						draw(x, y, myCount++);
					}, 
					30);
				}
				bomb_list[i].remove();	
			} else {
				bomb_list[i].value++;
			}
		}
	}

	function generateEnemies() {
		var className = "enemy";
		var color = "rgb(" + Math.floor(Math.random() * 256) + ", " + Math.floor(Math.random() * 256)+ ", " + Math.floor(Math.random() * 256) + ")";

		var x = Math.round(Math.random() * parseInt($("#game-board").css("width")) - player_size);
		var y = Math.round(Math.random() * parseInt($("#game-board").css("height")) - player_size);
		var enemy = {
			"className": className,
			"color": color,
			xPosition: x,
			yPosition: y			
		};
		enemy_list.push(enemy);
		makeFood(className, color, x, y);
	}

	// makes food
	function makeFood(className, color, x, y, value) {
		// alert("x: " + x + "\ny: " + y);
		var food = document.createElement("div");
		food.className = className;
		food.style.backgroundColor = color;
		food.style.top = y + "px";
		food.style.left = x + "px";
		food.value = value;
		$("#game-board").append(food);
	}

	// allows for control movement of the player
	function movePlayer(e) {
		var x = parseInt($("#player").css("left"));
		var y = parseInt($("#player").css("top"));

		var moveable;


		// MOVE DOWN
		if(e.keyCode == 40) {
			if(parseInt($("#player").css("top")) < BOARD_HEIGHT - player_size) 
				$("#player").css("top", player_size + parseInt($("#player").css("top")) + "px");
			else 
				audio[2].play();

			// set state of moveable object
			moveable = parseInt($("#player").css("top")) < BOARD_HEIGHT - player_size;
			document.getElementById("move-down").innerHTML = "Can move down: " + moveable;


		// MOVE UP
		} 
		if(e.keyCode == 38) {
			if(parseInt($("#player").css("top")) > 0)
				$("#player").css("top",parseInt($("#player").css("top")) - player_size + "px");
			else 
				audio[2].play();

			moveable = parseInt($("#player").css("top")) > 0;
			document.getElementById("move-up").innerHTML = "Can move up: " + moveable;


		// MOVE LEFT
		} 
		if(e.keyCode == 37) {
			if(parseInt($("#player").css("left")) > 0)
				$("#player").css("left",parseInt($("#player").css("left")) - player_size + "px");
			else
				audio[2].play();

			moveable = parseInt($("#player").css("left")) > 0;
			document.getElementById("move-left").innerHTML = "Can move left: " + moveable;


		// MOVE RIGHT
		} 
		if(e.keyCode == 39) {
			if(parseInt($("#player").css("left")) < BOARD_WIDTH + player_size)
				$("#player").css("left",parseInt($("#player").css("left")) + 10 + "px");
			else
				audio[2].play();

			moveable = parseInt($("#player").css("left")) < BOARD_WIDTH + player_size;
			document.getElementById("move-right").innerHTML = "Can move right: " + moveable;

		}
		if(e.keyCode == 32) {					
			if(!BAR_DISABLE) {
				audio[0].play();
				makeFood("bomb", "black", x, y, 1);
			} else {
				audio[1].play();
			}
			BAR_DISABLE = true;
			document.getElementById("drop-bomb").innerHTML = "Can drop bomb: " + !BAR_DISABLE;
		}
	}

	// draws the explosion
	function draw(xPosition, yPosition, time) {	
		if(time < BOMB_ANIMATION_TIME) {
			var bomb = {
				x: xPosition,
				y: yPosition,
				xSpeed: (Math.random() - 0.5) * 10,
				ySpeed: (Math.random() - 0.5) * 10,
				size: 10
			}
			explosion.push(bomb);
			clearCanvas();
			for(var i = 0; i < explosion.length; i++) {
				updateBomb(explosion[i]);
				drawExplosion(explosion[i]);
			}
		} else {			
			explosion = [];
			clearInterval(explosion_timer);
			explosion_timer = null;			
			clearCanvas();
			BAR_DISABLE = false;			
		}	
		document.getElementById("drop-bomb").innerHTML = "Can drop bomb: " + !BAR_DISABLE;
	}

	// function that clears the canvas
	function clearCanvas() {
		ctx.fillStyle = "black";
		ctx.fillRect(0, 0, BOARD_WIDTH, BOARD_HEIGHT);
	}

	// function that updates the explosion
	function drawExplosion(bomb) {
		ctx.fillStyle = "red";
		ctx.fillRect(bomb.x, bomb.y, bomb.size, bomb.size);
	}

	// updates the location of the bomb
	function updateBomb(bomb) {
		for(var i = 0; i < enemy_list.length; i++) {			
			if ((bomb.x >= enemy_list[i].xPosition && ((bomb.x + bomb.size) <= (enemy_list[i].xPosition + 10))) 
				&& (bomb.y >= enemy_list[i].yPosition && ((bomb.y + bomb.size) <= (enemy_list[i].yPosition + 10)))) {
				enemy_list["color"] = "blue";
				// get the enemy
				$(".enemy")[i].remove();
				// console.log("enemy hit");
			}			
		}

		bomb.x += bomb.xSpeed;
		bomb.y += bomb.ySpeed;		
		bomb.size *= 0.98;
	}
})();