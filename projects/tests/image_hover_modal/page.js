// Michael Wilson
// My Javascript page

(function() {
	"use strict";

	// keeps track of the image sources
	var image_sources = ["ps"];

	// keeps track of the list of images
	var images = [];
	var image_elements = [];
	var main_image_characteristics;
	var main_image;

	// keeps track of the time of the image
	var image_time;

	// keeps track of various canvas things
	var canvas, context;

	window.onload = function() {
		canvas = document.getElementById("canvas");
		context = canvas.getContext("2d");
		// console.log("canvas width: " + canvas.width);
		// console.log("canvas height: " + canvas.height);
		
		$("#change-image").click(function() {
			var src = $("#image-url").val();
			main_image.src = src;
			main_image_characteristics.src = src;
			// console.log("The new source is: " + src);
			image_time = convertTime($.now());
			updateTable(main_image.src, image_time);	
		});

		// set up the images
		setUpImages();

		// render everything to the screen
		setInterval(draw, 30);
		
	}

	// sets up the images to be used by the canvas
	function setUpImages() {				
		for(var i = 0; i < image_sources.length; i++) {
			var image = createGenericImage("img/" + image_sources[i] + ".png");
			var img = document.createElement("img");
			img.id = image_sources[i];
			img.src = image.src;
			image_elements.push(img);
			images.push(image);
			console.log(image);
		}
		main_image = image_elements[0];
		main_image_characteristics = createGenericImage(main_image.src);	
		image_time = convertTime($.now());
		updateTable(main_image.src, image_time);	

	}

	// function that converts the time that has currently elapsed since 
	function convertTime(time) {
		var seconds = Math.round(time/1000);


		var hours = Math.round((seconds/3600) % 24) + 15;				
		
		var seconds_left = Math.round(seconds%3600);
		var minutes = Math.round(seconds_left/60);
		seconds_left = Math.round(seconds_left%60);
		seconds = seconds_left;

		// current day		
		// console.log("current second: " + seconds);
		// console.log("current minute: " + minutes);
		// console.log("current hour: " + hours);
		if(hours >= 12) {
			return hours % 12 + ":" + minutes + ":" + seconds + "pm";
		} else {
			return hours + ":" + minutes + ":" + seconds + "am";
		}
	}	

	// adds information to the table
	function updateTable(source, date) {
		var row = document.createElement("tr");

		// deals with the image
		var firstH = document.createElement("th");
		var img = document.createElement("img");
		img.src = source;
		img.style.width = 50 + "px";
		img.style.height = 50 + "px";
		$(firstH).append(img);

		// deals with the source
		var secondH = document.createElement("th");
		$(secondH).html(source);
		
		var thirdH = document.createElement("th");
		$(thirdH).html(date);

		// add the appropriate headers
		$(row).append(firstH);
		$(row).append(secondH);
		$(row).append(thirdH);
		$("table").append(row);

	}	

	function createGenericImage(source) {
		var image = {
			width: 25,
			height: 25,
			x: Math.floor(Math.random() * (canvas.width - 25)),
			y: Math.floor(Math.random() * (canvas.height - 25)),
			xSpeed: Math.floor((Math.random() - 0.5) * 10),
			ySpeed: Math.floor((Math.random() - 0.5) * 10),
			name: source,
			src: source
		};
		// console.log(image);
		return image;
	}

	// function that deals with drawing to the canvas
	function draw() {
		// clear the canvas
		clearCanvas();
		for(var i = 0; i < images.length; i++) {
			updateImage(images[i]);
			drawImage(image_elements[i], images[i]);
		}
	}

	// method that clears the canvas
	function clearCanvas() {
		context.fillStyle = "black";
		context.fillRect(0, 0, canvas.width, canvas.height);
	}

	// updates the location of the image 
	function updateImage(img) {
		// check for the x bound
		if(img.x < 0 || img.x > canvas.width - img.width) {
			img.xSpeed *= -1;
		}

		// check for the y bound
		if(img.y < 0 || img.y > canvas.height - img.height) {
			img.ySpeed *= -1;
		}

		// update the x & y positions
		img.x += img.xSpeed;
		img.y += img.ySpeed;
	}

	// draws the image
	function drawImage(img, reference) {
		context.drawImage(img, reference.x, reference.y, reference.width, reference.height);
	}
})();