
	'use strict';

	var details = [];

	var current_location = [];

	window.onload = function(){
		setUpLinks();
		$("#inject").load("home.html");
		$("#search").submit(function(e) {
			e.preventDefault();
		});
	}

	// initializes the contents of the map
	function initMap() {		
		var map = new google.maps.Map(document.getElementById("map"), {
			center: {lat: -35, lng : 150},
			zoom: 18
		})
		var infoWindow = new google.maps.InfoWindow({map: map});
		if(navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(position) {
				var pos = {
					lat: position.coords.latitude,
					lng: position.coords.longitude
				};
				infoWindow.setPosition(pos);
				infoWindow.setContent("found");
				map.setCenter(pos);
			});
		} else {
			alert("error");
		}

	}

	// sets up the respecitive links for the page 	
	function setUpLinks() {		
		var links = $(".category");
		for(var i = 0; i < links.length; i++) {
			// console.log($(links[i]).html());
			$(links[i]).click(categorySearch);
		}
	}

	// function that populates a page based off of the category that was selected
	function categorySearch() {
		// clear the html content
		$("#inject").html("");		

		// load html content
		$("#inject").load("search_results.html");
	}

	function generatePage() {
		var parsed = this.responseText();
	}
