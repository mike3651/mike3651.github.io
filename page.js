$(document).ready(function() {
	// smooth scrolling
	$(".navbar a").on('click', function(event) {
		// alert("button clicked\n\rHash value: " + this.hash);
		if(this.hash !== "") {
			// alert("made it here");
			event.preventDefault();
			var hash = this.hash;

			// do the actual smooth scrolling with jquery
			$('html, body').animate( {
				//alert("made it here");
				scrollTop: $(hash).offset().top
			}, 900, function() {
				//alert("Window hash: " + window.location.hash + "\nNew hash: " + hash);
				// reset the location of the window
				window.location.hash = hash;
			});
		}
	});
})

// keeps track of the home page 
var home;

window.onload = function() {
	var projects = $(".project");
	for(var i = 0; i < projects.length; i++) {
		projects[i].onclick = loadPage;
	}
	home = window.location.href;
}

// function that loads the contents of an html page
function loadPage() {
	window.loction = "thetatest.com/projects/" + this.value;
}