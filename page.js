(function() {
	// keeps track of the size of the window
	var WINDOW_HEIGHT = window.innerHeight, WINDOW_WIDTH = window.innerWidth;

	// canvas elements
	var canvas, ctx, bubbles = [], BUBBLE_COUNT = 10;

	// parts that deal with the animation on the page
	var canvas_timer = null;


	window.onload = function() {				
		setUpCanvas();

		// deals with the case of the window resizing
		$(window).resize(function() {
			$("#canvas").css("height", window.innerHeight);
			$("#canvas").css("width", window.innerWidth);
			canvas = document.getElementById("canvas");
		});
	}

	// function that sets up the contents of the canvas
	function setUpCanvas() {
		canvas = document.getElementById("canvas");
		ctx = canvas.getContext("2d");
		$("#canvas").css("height", WINDOW_HEIGHT);
		$("#canvas").css("width", WINDOW_WIDTH);
		setUpBubbles();
		$("#animate").click(toggleAnimation);
	}

	// function that toggles the canvas animation
	function toggleAnimation() {
		if($(this).prop("checked")) {
			canvas_timer = setInterval(draw, 30);
		} else {
			clear();
			clearInterval(canvas_timer);
			canvas_timer = null;
		}
	}

	// function that sets up the bubble array 
	function setUpBubbles() {
		for(var i = 0; i < BUBBLE_COUNT; i++) {
			var bubble = {
				x: canvas.width / 2,
				y: canvas.height / 2,
				r: Math.round(Math.random() * 5) + 3,
				xSpeed: (Math.random()-0.5) * 7,
				ySpeed: (Math.random()-0.5) * 7,
				color: getColor()
			}	
			bubbles.push(bubble);
		}
	}

	function draw() {		
		clear();
		for(var i = 0; i < bubbles.length; i++) {	
			updateBubble(bubbles[i]);
			drawBubble(bubbles[i]);
		}
	}

	// function that clears the contents of the canvas
	function clear() {	
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	}

	// function that updates the canvas scene
	function updateBubble(bubble) {	
		// console.log("Height of the navbar: " + NAVBAR_HEIGHT);
		// check the bounds of the bubble
		if(bubble.x < 0 || bubble.x > canvas.width) {
			bubble.xSpeed = -bubble.xSpeed;
		}
		if(bubble.y < 0 || bubble.y > canvas.height) {
			bubble.ySpeed = -bubble.ySpeed;
		}
		bubble.x += bubble.xSpeed;
		bubble.y += bubble.ySpeed;
	}

	// function that updates the drawing
	function drawBubble(bubble) {
		ctx.fillStyle = bubble.color;
		ctx.beginPath();
		ctx.arc(bubble.x, bubble.y, bubble.r, 0, 2 * Math.PI);
		ctx.closePath();
		ctx.fill();
	}

	// function that gets a random RGB value and returns it
	function getColor() {
		var red = Math.round(Math.random() * 255);
		var green = Math.round(Math.random() * 255);
		var blue = Math.round(Math.random() * 255);
		return "rgba(" + red + ", " + green + ", " + blue + ", 0.6)";
	}

})();
