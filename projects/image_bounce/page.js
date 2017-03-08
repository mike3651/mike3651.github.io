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
				x: (Math.random() * (canvas.width - MAX_WIDTH)) + MAX_WIDTH,
				y: (Math.random() * (canvas.height - MAX_HEIGHT)) + MAX_HEIGHT,
				xSpeed: Math.random() * 10 + 1,
				ySpeed: Math.random() * 10 + 1,			
				src: "img/" + image_sources[i],
				id: image_sources[i]
			};
			var img = document.createElement("img");
			img.src = "img/" + image_sources[i];
			img.id = image_sources[i];
			img.className = "my-image"
			$("#images").append(img);
			images.push(my_image);
		}

		setInterval(draw, 30);
	}

	// function that draws all of the images 
	function draw() {
		// clear the canvas
		context.fillRect(0, 0, canvas.width, canvas.height);
		for(var i = 0; i < images.length; i++) {
			updatePosition(images[i]);
			renderImage(images[i]);
		}
	}

	// function that updates the position of the images
	function updatePosition(the_image) {
		if(the_image.x < 0 || the_image.x > canvas.width - MAX_WIDTH) {
			the_image.xSpeed *= -1;
		}
		if(the_image.y < 0 || the_image.y > canvas.height - MAX_HEIGHT) {
			the_image.ySpeed *= -1;
		}
		
		// move the image by the x & y
		the_image.x += the_image.xSpeed;
		the_image.y += the_image.ySpeed;
	}

	// function that draws the images to the canvas
	function renderImage(the_image) {
		var img = document.getElementById(the_image.id);
		context.drawImage(img, the_image.x, the_image.y, MAX_WIDTH, MAX_HEIGHT);
	}
})();