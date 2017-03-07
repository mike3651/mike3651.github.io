(function() {
	// keeps track of the size of the window
	var WINDOW_HEIGHT = window.innerHeight, WINDOW_WIDTH = window.innerWidth;

	// canvas elements
	var canvas, ctx, bubbles = [];

	// take into consideration the navbar size when generating the bubbles
	var NAVBAR_HEIGHT;

	// parts that deal with the animation on the page
	var canvas_timer = null;


	window.onload = function() {		
		canvas = document.getElementById("canvas");
		ctx = canvas.getContext("2d");
		$("#canvas").css("height", WINDOW_HEIGHT);
		$("#canvas").css("width", WINDOW_WIDTH);
		NAVBAR_HEIGHT = parseInt($("#navbar").css("height"));
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
		for(var i = 0; i < 6; i++) {
			var bubble = {
				x: canvas.width / 2,
				y: canvas.height / 2,
				r: 2,
				xSpeed: (Math.random()-0.5) * 7,
				ySpeed: (Math.random()-0.5) * 7
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
		ctx.fillStyle = "blue";
		ctx.beginPath();
		ctx.arc(bubble.x, bubble.y, bubble.r, 0, 2 * Math.PI);
		ctx.closePath();
		ctx.fill();
	}

})();
