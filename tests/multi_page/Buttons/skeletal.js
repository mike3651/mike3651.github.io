// Michael Wilson
// JS file

(function() {
	window.onload = function() {
		pages();
	}

	/* 
	 * This function deals with setting up the button clicks
	 * and the appropriate html injections based off of the 
	 * corrseponding page value*/
	function pages() {
		/* returns an array of the objects with the class name */
		var extButtons = document.getElementsByClassName("external-page");

		/* link the buttons to the appropriate pages */
		for(var i = 0; i < extButtons.length; i++) {
			extButtons[i].onclick = inject;
		}
	}

	/* This function deals with html injection and deletion */
	function inject() {		
		/* remove all previous content from the div */
		$("#view").empty();

		/* add the appropriate content to the view */
		$("#view").load("page_" + this.value + ".html");
	}
})();