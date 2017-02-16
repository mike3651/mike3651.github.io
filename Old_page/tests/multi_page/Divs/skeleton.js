// Michael Wilson
// JS file

(function() {
	window.onload = function() {
		linkDivs();
	}

	/* This function links the divs to their corresponding html files */
	function linkDivs() {
		/* get all of the appropriate divs */
		var links = document.getElementsByClassName("block");
		for(var i = 0; i < links.length; i++)
			links[i].onclick = changeContent;
	}

	/* Function that loads and deletes the appropriate html content */
	function changeContent() {
		$("#view").empty();
		$("#view").load(this.id + ".html");		
	}
})();