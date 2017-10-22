/* @author Michael Wilson
 * @version 1.0 */
(function() {

	/** IDEA OF THE USER INFORMATION 
	let information = (user)=> {
		"name":user.name,
		"email":user.email,
		"subject_matter":user.subject, 
		"message_content":, user.content
	}
	*/

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

	/* Function that posts information from the user and stores it into the database */
	function post(user_information) {

	}

	/* Function that retrieves information for the user */
	function get(query) {

	}

	
})();
