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
	
	window.onload = function() {
		canvas = document.getElementById("canvas");
		context = canvas.getContext("2d");
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		$(window).resize(function() {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight
		});

		setUpImages();
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
			if(meme.x < 0 || meme.x > canvas.width - MAX_WIDTH) {
				meme.xSpeed *= -1;
			}
			if(meme.y < 0 || meme.y > canvas.height - MAX_HEIGHT) {
				meme.ySpeed *= -1;
			}
		}
	}
})();