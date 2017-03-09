/* This is my simple javascript file
 * 
 * ©Michael Wilson 2017 */

(function() {	
	'use strict';

	// information on the canvas
	var canvas, context;

	// sizes of the images to be drawn
	var MAX_HEIGHT = 100, MAX_WIDTH = 100;

	// keep track of all of the images 
	var image_sources = ["star_trek.png", "tyson.png", "willy_wonka.png", "cash_me_ousside.png",
						"savage_dr_phil.png"];
	var images = [];

	// factor of speed 
	var speed_factor = 1.1;

	// lists of hints 
	var hints = [
		"Press space to restart", "Press a to speed up the memes",
		"Press f to slow down the memes", "womp, womp"
		];

	var text_div;
	
	window.onload = function() {
		canvas = document.getElementById("canvas");
		context = canvas.getContext("2d");

		$("#text-screen").css("height", window.innerHeight);
		$("#text-screen").css("width", window.innerWidth);		

		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		

		$(window).resize(function() {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight
			$("#text-screen").css("height", canvas.height);
			$("#text-screen").css("width", canvas.width);
		});
		document.addEventListener("keydown", triggered);
		setUpImages();
		setInterval(changeText, 10000);
	}


	// function that sets up the list of images
	function setUpImages(){
		for(var i = 0; i < image_sources.length; i++) {
			// object that keeps track of the image object
			var my_image = {				
				x: Math.random() * canvas.width,
				y: Math.random() * canvas.height,
				xSpeed: (Math.random() -0.5) * 25 + 1,
				ySpeed: (Math.random() - 0.5) * 25 + 1,			
				width: MAX_WIDTH,
				height: MAX_HEIGHT,
				src: "img/" + image_sources[i],			
				id: image_sources[i]
			};			
			images.push(my_image);

			// add the image div
			var img = document.createElement("img");
			img.src = "img/" + image_sources[i];
			img.id = image_sources[i];
			img.className = "my-image"
			$("#images").append(img);
		}

		setSpeedValues();

		setInterval(draw, 30);
	}

	// function that draws all of the images 
	function draw() {
		// clear the canvas
		context.fillRect(0, 0, canvas.width, canvas.height);
		for(var i = 0; i < images.length; i++) {
			updatePosition(images[i]);
			detectCollision(images[i]);
			renderImage(images[i]);
		}
	}

	// function that updates the position of the images
	function updatePosition(the_image) {				
		// move the image by the x & y
		the_image.x += the_image.xSpeed;
		the_image.y += the_image.ySpeed;
	}

	// function that draws the images to the canvas
	function renderImage(the_image) {
		var img = document.getElementById(the_image.id);
		context.drawImage(img, the_image.x, the_image.y, MAX_WIDTH, MAX_HEIGHT);
	}

	// function that checks for meme collision
	function detectCollision(meme) {
		for(var i = 0; i < images.length; i++) {
			if(meme.id != images[i].id) {
				var box = images[i];
				if(meme.x < box.x + box.width
					&& meme.x + meme.width > box.x 
					&& meme.y < box.y + box.height
					&& meme.y + meme.height > box.y) {
					
					meme.xSpeed *= -1;
					meme.ySpeed *= -1;
				} 				
			}
			if(meme.x < 0 || meme.x > canvas.width - meme.xSpeed) {
				meme.xSpeed *= -1;
			}
			if(meme.y < 0 || meme.y > canvas.height - meme.ySpeed) {
				meme.ySpeed *= -1;
			}
		}
	}

	// function that checks for triggered events
	function triggered(e) {
		if(e.keyCode == 32){
			reset();
		}
		if(e.keyCode == 65) {
			changeSpeed(true);
		}
		if(e.keyCode == 70) {
			changeSpeed(false);
		}
	} 

	// resets the memes
	function reset() {
		for(var i = 0; i < images.length; i++) {
			images[i].x = Math.random() * canvas.width;
			images[i].y = Math.random() * canvas.height;
			images[i].xSpeed =  (Math.random() -0.5) * 25 + 1;
			images[i].ySpeed =  (Math.random() - 0.5) * 25 + 1;
		}
	}

	// function that continually changes the text
	function changeText() {		
		$("#text").fadeOut(5000);
		$("#text").html(hints[Math.floor(Math.random() * hints.length)]);
		$("#text").fadeIn(5000);
	}

	// speeds up the rate of change of each meme
	function changeSpeed(speedUp) {
		for(var i = 0; i < images.length; i++) {
			if(speedUp) {
				images[i].xSpeed *= speed_factor;
				images[i].ySpeed *= speed_factor;
			} else {
				images[i].xSpeed /= speed_factor;
				images[i].ySpeed /= speed_factor;
			}		
		}
		setSpeedValues();
	}

	// function that sets the speed values
	function setSpeedValues() {
		// clear the previous html if there is any
		$("#debug-stats").html("");

		for(var i = 0; i < images.length; i++) {
			var p = document.createElement("p");
			p.innerHTML = "xSpeed: " + images[i].xSpeed + " ySpeed: " 
					+ images[i].ySpeed;
			$("#debug-stats").append(p);
		}		
	}

})();