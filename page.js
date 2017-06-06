(function() {
	window.onload = function() {				
		updateImages();
	}

	// function the updates images of my upcoming endeavors
	function updateImages() {		
		for(var i = 1; i < 5; i++) {			
			var img = document.createElement("img");
			img.src = "project_images/mathematics/derivative_" + i + ".png";
			img.className = "endeavor-image";			
			$("#endeavor-highlight").append(img);
		}		
	}
})();
