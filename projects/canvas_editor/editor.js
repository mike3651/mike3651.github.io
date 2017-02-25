/* This is part of a two hour challenge
 * 
 * ©Michael Wilson */

(function() {
	// defualt settings for the paint brush
	var colors = ["black", "blue", "red", "green", "orange", "pink"];
	var sizes = [5, 10, 15, 20, 25];
	var curr_color = colors[0]
	var curr_size = sizes[0];
	var border_radius = false;

	// various lists to keep track of 
	var size_list;
	var color_list;

	// size of a non brush div
	var div_size = 50;

	// checks to see if we are in a draggable mode
	var draggable = false;

	// keeps reference to the dimensionality of the canvas
	var canvas_dimensions = {x: 400, y:400}

	// keeps track of debug mode
	var debug = false;

	window.onload = function() {
		setUp();
		document.addEventListener("keydown", checkKey);
		$("#canvas").on("mousedown", function(e) {	
			// alert("here");		
			draggable = true;		
			makeElement(e.clientX, e.clientY, curr_color, curr_size);
		});
		
		$("#canvas").on("mouseup", function(e) {
			draggable = false;
		});
		
		$("#canvas").on("mousemove", function(e) {
			// alert("here");
			if(draggable){
				makeElement(e.clientX, e.clientY, curr_color, curr_size);
			}
			$("#location").html("x: " + e.clientX + "\ny: " + e.clientY);
		});		

		$("#canvas").on("mouseleave", function(e) {
			$("#location").html("x: N/A y:N/A");
		})

		color_list = $(".colors");
		for(var i = 0; i < color_list.length; i++) {
			color_list[i].onclick = selectColor;
		}

		size_list = $(".size");	
		for(var i = 0; i < size_list.length; i++) {
			size_list[i].onclick = selectSize;
		}

	}

	// Sets up the basic parts of the program
	function setUp() {		
		makeColorArray();
		makeSizeButtons();
		$("#size").html("Current size: " + curr_size);
		$("#color").html("Current color: " + curr_color);
		$("#location").html("x: N/A y:N/A");
		updateBrushState();
	}

	// Makes the array of colors
	function makeColorArray() {			
		for(var i = 0; i < colors.length/3; i++) {
			for(var j = 0; j < colors.length/2; j++) {
				// create div
				var color = document.createElement("div");
				color.className = "colors";				
				color.style.backgroundColor = colors[i * 3 + j];
				color.style.height = div_size + "px";
				color.style.width = div_size + "px";
				color.style.top = div_size * i + "px"
				color.style.left = div_size * j  + "px";		
				$("#color-chooser").append(color);
			}
		}
	}

	// function that makes the size options
	function makeSizeButtons() {
		for(var i = 0; i < sizes.length; i++) {
			var size = document.createElement("div");
			size.style.height = div_size + "px";
			size.style.width = div_size + "px";
			size.style.left = div_size * i + "px";
			size.className = "size";			
			size.innerHTML = sizes[i];
			size.style.fontSize = div_size/2 + "px";
			$("#size-chooser").append(size);
		}
	}

	// function that creates an element
	// param x -> the x position
	// param y -> the y position
	// param color -> the color of the brush
	// param size -> the size of the brush
	function makeElement(x, y, color, size) {		
		
		var dot = document.createElement("div");
		dot.className = "brush";
		dot.style.left = x - parseInt($("#canvas").position().left) 
						 + "px";
		dot.style.top = y - parseInt($("#canvas").position().top) + "px";
		dot.style.backgroundColor = color;		
		dot.style.height = size + "px";
		dot.style.width = size + "px";
		if(!border_radius) {
			dot.style.borderRadius = 0 + "%";
		} else {
			dot.style.borderRadius = 50 + "%";
		}

		$("#canvas").append(dot);
	}

	// function that selects a color
	function selectColor() {		
		curr_color = this.style.backgroundColor;
		this.className += " highlighted";

		// deselects other colors
		for(var i = 0; i < color_list.length; i++) {
			if(color_list[i] != this && $(color_list[i]).hasClass("highlighted")) {
				$(color_list[i]).removeClass("highlighted");
			}
		}

		$("#color").html("Current color: " + curr_color);
	}

	// function that selects a size
	function selectSize() {		
		var size = parseInt(this.innerHTML);		
		curr_size = size;
		this.className += " highlighted";

		// deselects other sizes
		for(var i = 0; i < size_list.length; i++) {
			if(size_list[i] != this && $(size_list[i]).hasClass("highlighted")) {
				$(size_list[i]).removeClass("highlighted");
			}
		}

		$("#size").html("Current size: " + curr_size);
	}

	// function that allows for hot-keys
	function checkKey(e) {
		// want to clear canvas if space is pressed
		if(e.keyCode == 32) {			
			$("#canvas").html("");
		}

		// change to circle
		if(e.keyCode == 67) {
			border_radius = true;
		}

		// change to square
		if(e.keyCode == 83) {
			border_radius = false;
		}

		if(e.keyCode == 67 || e.keyCode == 83) {
			updateBrushState();
		}

		// change the color to another color
		if(e.keyCode == 68) {			
			var currIndex = colors.indexOf(curr_color);
			if(currIndex == colors.length - 1) {
				currIndex = 0;
			} else {
				currIndex++;
			}			
			curr_color = colors[currIndex];	
			$("#color").html("Current color: " + curr_color);	
		}

		var curr_size_index = sizes.indexOf(curr_size);
		// change left
		if(e.keyCode == 65) {
			if(curr_size_index > 0) {
				curr_size_index--;
				curr_size = sizes[curr_size_index];
			} 			
		}

		// change right
		if(e.keyCode == 70) {
			if(curr_size_index < sizes.length - 1) {
				curr_size_index++;				
				curr_size = sizes[curr_size_index];
			} 
		}

		if(e.keyCode == 65 || e.keyCode == 70) {
			$("#size").html("Current size: " + curr_size);
		}

		// toggle debug
		if(e.keyCode == 87) {
			debug = !debug;
			if(debug) {
				$("#debug").css("visibility", "visible");
			} else {
				$("#debug").css("visibility", "hidden");
			}
		}
	}

	// checks the paint brush state and toggles accordingly
	function updateBrushState() {
		var str = border_radius ? "square" : "circle"
		$("#brush").html("Current brush shape: " + str);
	}

})();