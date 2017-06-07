(function(){
	var scatter = false, timer = null, word_scatter_timer = null,
	 screen_height, screen_width, xPos, yPos, xVel = yVel = 1, TOLERANCE = 3,
	 random_locations,
	 click_count = 0;

	window.onload = function(){		
		setUp();	
		$("body").mousemove(function(e) {
			xPos = e.pageX;
			yPos = e.pageY;
		});
		
		$("body").click(function() {
			$("body").css("cursor", "grab");
			setTimeout(function(){
				$("body").css("cursor", "pointer");
			}, 100)
			if(++click_count == 1) {
				linkWords();
			}
			scatter = !scatter;
			if(!scatter && timer == null) {
				timer = setInterval(function() {
					wordsFollow();
				}, 10);
				clearInterval(word_scatter_timer);
				word_scatter_timer = null;
				console.log("fucked up");
			} else {
				clearInterval(timer);
				timer = null;
				shiftWords();
			}
		});		
	}

	// sets up the basic preliminaries of the program
	function setUp() {
		screen_height = window.innerHeight;
		screen_width = window.innerWidth;
		$("body").css("height", screen_height);
		$("body").css("width", screen_width);		
	}

	// function that creates a span for each word
	function linkWords() {		
		var my_words = $("#main-content p").text().split(" ");
		$("#main-content p").html("");
		for(var i = 0; i < my_words.length; i++) {
			var span = document.createElement("span");

			// yay ternary!
			span.innerHTML = my_words[i] + (i != my_words.length - 1 ? " " :"");

			span.className = "moveable";
			$("#main-content p").append(span);
		}
	}

	// makes the words follow the mouse
	function wordsFollow() {		
		var words = $("#main-content span");
		for(var i = 0; i < words.length; i++) {
			moveCloser(words[i], parseInt($(words[i]).css("left")), parseInt($(words[i]).css("top"))
				, xPos, yPos);
		}
	}

	// function that checks where to move the word with respect to the mouse
	function moveCloser(object_to_move, word_x, word_y, mouse_x, mouse_y) {
		if(!(word_x < mouse_x + TOLERANCE && word_x > mouse_x - TOLERANCE)) {
			if(mouse_x < word_x) {
				$(object_to_move).css("left", word_x - xVel);
			} else if(mouse_x> word_x) {
				$(object_to_move).css("left", word_x + xVel);
			}
		}		

		if(!(word_y < mouse_y + TOLERANCE && word_y > mouse_y - TOLERANCE)) {
			if(mouse_y < word_y) {
				$(object_to_move).css("top", word_y - yVel);
			} else if (mouse_y > word_y){
				$(object_to_move).css("top", word_y + yVel);
			}
		}		
	}

	// shifts the words to random locations
	function shiftWords() {
		var my_words = $("#main-content span");
		random_locations = [];
		for(var i = 0; i < my_words.length; i++) {
			random_locations.push({
				x:Math.random() * screen_width,
				y:Math.random() * screen_height
			});
		}
		word_scatter_timer = setInterval(function() {
			var my_words = $("#main-content span");
			for(var i = 0; i < my_words.length; i++) {				
				moveCloser(my_words[i], parseInt($(my_words[i]).css("left")), 
					parseInt($(my_words[i]).css("top"))
				, random_locations[i].x, random_locations[i].y);				
			}
		}, 10);
	}
})();