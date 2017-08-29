window.onload = function() {
	loadHomePage();

	// Using for dynamic web page
	$(document).on("click", ".myPage", function() {	
		uploadPage($(this).attr("title"));
	});
}

/** Loads the home page */
function loadHomePage() {	
	$("#navigation").empty();
	$("#view-port").empty();
	$("#view-port").load("home.html");
	$("title").html("Welcome aboard!");		
	$("#icon").attr("href", "../coder_of_the_week/doge.png");
	// $('link[title="myStyleSheet"]').remove();
	// $("head").prepend('<link title="myStyleSheet"rel="stylesheet" type="text/css" href="../CWK.css">');
}

/** Checks for the page injection */
function uploadPage(name) {
	// clear out previous html
	$("#view-port").empty();

	// inject the new html page
	$("#view-port").load(name + ".html");
	$("title").html(name);	
	if(name == "home") {
		$("#icon").attr("href", "../coder_of_the_week/doge.png");
	} else {
		$("#icon").attr("href", "icons/" + name + ".png");
		$("#navigation").empty();
		$("#navigation").prepend('<img class="linked-image nav-icon" src="icons/back.png"/>');
		$(".nav-icon").click(function() {
			loadHomePage();
		});
	}	
}