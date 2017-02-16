(function() {
	var timer = null;
	var time = 0; 			// does nothing more than keep track of time elapsed 

	window.onload = function() {
		startTime();		
	}

	/* Function that generates a bunch of objects to make a rain affect */
	function rainfall() {
		if(time % 3 == 0)
			makeDrop();
		time++;
		var rain = document.querySelectorAll(".rain-drop");

		/* Have to get the offset of the div */
		var bottomSpot = parseInt(document.getElementById("bottom").offsetTop);		
		for(var i = 0; i < rain.length; i++) {
			if(parseInt(rain[i].style.top) > bottomSpot - 20)
				rain[i].parentNode.removeChild(rain[i]);	// destroy the element after it hits the bottom
			else
				rain[i].style.top = parseInt(rain[i].style.top) + 10 + 'px';
		}		
	}

	/* Function that creates a rain drop */
	function makeDrop() {
		var drop = document.createElement("div");
		drop.className = "rain-drop";
		var w = window.innerWidth;
		drop.style.left = Math.random() * w + 'px';		// put the block at the top in a random spot
		drop.style.top = 0 + 'px';
		document.body.appendChild(drop);
	}

	/* Function that starts the timer */
	function startTime() {
		if(timer == null)
			timer = setInterval(rainfall, 50);
		else { clearInterval(timer); timer = null; }
	}
})();
