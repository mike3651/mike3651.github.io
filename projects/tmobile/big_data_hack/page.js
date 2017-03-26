
	'use strict';
	
	var service, map, infoWindow, pos, directionsService, directionsDisplay;
	var current_location = [], places = [];
	var loaded = false;

	window.onload = function(){
		setUpLinks();
		$("#inject").load("home.html");
		$("#search").submit(function(e) {
			e.preventDefault();
		});
		$("#map-container").hide();		
		var menu_items = document.getElementsByClassName("menu-item");
		for(var i = 0; i < menu_items.length; i++) {
			menu_items[i].onclick = loadContent;
		}
	}

	// initializes the contents of the map
	function initMap() {				
		infoWindow = new google.maps.InfoWindow();
	
		if(navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(position) {
				pos = {
					lat: position.coords.latitude,
					lng: position.coords.longitude
				};
				map = new google.maps.Map(document.getElementById("map"), {
					center: pos,
					zoom: 13
				});			
			});	

			directionsService = new google.maps.DirectionsService;
			directionsDisplay = new google.maps.DirectionsRenderer;
			directionsDisplay.setMap(map);
		} else {
			alert("error");
		}
	}

	function callback(results, status) {		
		for(var i = 0; i < results.length; i++) {
			createMarker(results[i]);
		}
	}

	function createMarker(place) {
		var placeLoc = place.geometry.location;
		var marker = new google.maps.Marker({
			map: map,
			position: place.geometry.location
		});

		google.maps.event.addListener(marker, "click", function() {		
			infoWindow.setContent("<p>Facility name: " + place.name + "</p>"							 	
							 	 + "<p>Overall rating: " + place.rating + "</p>");
			infoWindow.open(map, this);
		});
	}

	// function that formats the user reviews
	function getReviews(place) {
		var review_string = "";		
		for(var i = 0; i < place.reviews.length; i++) {
			review_string += "<p>Reviewer: " + places.reviews[i].author_name + "</p>";
			review_string += "<p>Rating: " + places.reviews[i].rating + "</p>";
			review_string += "<p>Review: " + places.reviews[i].text + "</p>";
		}
		return review_string;
	}

	// sets up the respecitive links for the page 	
	function setUpLinks() {		
		var links = $(".category");
		for(var i = 0; i < links.length; i++) {
			// console.log($(links[i]).html());
			$(links[i]).click(categorySearch);
		}
	}

	function loadContent() {
		$("#inject").html("");		
			
		// alert("now loading: " + $(this).attr("value"));
		$("#inject").load($(this).attr("value") + ".html");		
	}

	// function that populates a page based off of the category that was selected
	function categorySearch() {	
		$("#map-container").show();		
		service = new google.maps.places.PlacesService(map);				
		service.nearbySearch({ 
			location: pos,
			radius: 5000,			
			type: ['movie']
		}, callback);
	}

	// method that shows the path of a route
	function showPath() {
		alert("here");
		calculateAndDisplayRoute(directionsService, directionsDisplay);
	}

	function calculateAndDisplayRoute(service, display) {
		service.route({
			origin: $("#start").val(),
			destination: $("#end").val(),
			travelMode: "DRIVING"
		}, function(response, status) {
			if(status === "OK")
				display.setDirections(response);
			else
				console.log("there was an error");
		});
	}
