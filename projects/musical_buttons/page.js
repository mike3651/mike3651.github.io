/* Javscript used to make the program 
 * 
 * ©Michael Wilson 2017 */
(function() {
	var timer = null;
	var speed = 35;
	var drop_time = 0;

	// keeps track of the scoring
	var notes_hit = 0;
	var total_notes = 0;

	// keeps track of the xpositions to drop the notes
	var x_positions = [];
	
	// keeps track of the notes that are falling
	var falling_notes;

	// id of the key_pressed
	var key_id;

	var audio;

	var state_changed = false;	
	var color;

	window.onload = function() {
		addNotes();
		document.addEventListener("keydown", playNote);
		startGame();
	}	

	// function that drops a note
	function startGame() {
		audio = $("audio");
		if(timer == null) {			
			setInterval(dropNote, speed);
		} else {
			clearInterval(timer);
			timer = null;
		}
	}

	// function that adds the notes to the screen
	function addNotes() {
		for(var i = 0; i < 5; i++) {
			var note = document.createElement("div");
			note.className = "note";
			note.id= "note" + (i + 1);
			note.style.left = i * 60 + "px";
			x_positions.push(i * 60);
			$("#keys").append(note);
		}
	}

	// function that plays a note
	// param -> e: The event that occurred
	function playNote(e) {		

		// a note
		if(e.keyCode == 65) {
			key_id = 1;
		}
		if(e.keyCode == 83) {
			key_id = 2;
		}
		if(e.keyCode == 68) {
			key_id = 3;
		}
		if(e.keyCode == 70) {
			key_id = 4;
		}
		if(e.keyCode == 32) {
			key_id = 5;
		}
		if(hitNote(parseInt($("#note" + key_id).css("top")), 
			parseInt($("#note" + key_id).css("left")))) {
				// play the sound
				setTimeout(function() {audio[key_id-1].play();}, speed);			
			}			
		$("#note" + key_id).css("background-color", "yellow");

		setTimeout(function() {
			for(var i = 1; i <= 5; i++) {
				$("#note" + i).css("background-color", "black");
			}
		}, 100);
	}

	// function that drops a note
	function dropNote() {
		var choice = Math.round(Math.random() * x_positions.length);
		drop_time++;		
		$("#note-score").html("Notes: " + notes_hit + "/" + total_notes);
		var percent = Math.round(notes_hit/total_notes * 100);
		$("#score-percentage").html("Success: " + percent + "%");		

		color = $("#success-bar").css("background-color");

		// deals with the color of the success bar
		if(percent < 33) {
			$("#success-bar").css("background-color", "red");
		} else if (percent < 66) {
			$("#success-bar").css("background-color", "yellow");
		} else {
			$("#success-bar").css("background-color", "green");			
		}
		if(drop_time % 6 == 0) {			
			makeNote(x_positions[choice]);
		}
		stateChange($("#success-bar").css("background-color"));

		falling_notes = $(".falling-note");
		// this method updates the positions of the notes
		for(var i = 0; i < falling_notes.length; i++) {
			falling_notes[i].style.top = parseInt(falling_notes[i].style.top) + 10 + "px";
			if(parseInt(falling_notes[i].style.top) > window.innerHeight - 50) {
				total_notes++;
				falling_notes[i].remove();				
			}
		}
	}

	// function that creates a note an appends it to the screen
	// param -> left: The position of the object to be made
	function makeNote(left) {
		var note = document.createElement("div");
		note.className = "falling-note";
		note.style.left = left + "px";
		var pseudotop = parseInt($("#note1").css("top"));
		note.style.top = pseudotop - 500 + "px";
		$('body').append(note);
	}

	// function that checks if a note was hit
	// param -> top: The top property of the note
	// param -> left: The left property of the note
	function hitNote(top, left) {		
		for(var i = 0; i < falling_notes.length; i++) {
			console.log("comparing " + top + " to " + parseInt(falling_notes[i].style.top));
			if(parseInt(falling_notes[i].style.top) <= top && parseInt(falling_notes[i].style.top) >= top - 50
				&& parseInt(falling_notes[i].style.left) == left) {
				notes_hit++;
				total_notes++;
				falling_notes[i].remove();
				return true;
			}
		}
	}

	// function that checks to see if the state of the bar changed
	// param -> current_color: State of the sucess bar
	function stateChange(current_color) {
		if(color != current_color) {
			// check the colors			
			// upgrade
			if(current_color == "rgb(0, 255, 0)" || 
				current_color == "rgb(255, 255, 0)" && color == "rgb(255, 0, 0)") {
				audio[5].play();

			// downgrade
			} else {
				audio[6].play();
			}
		}
	}
})();