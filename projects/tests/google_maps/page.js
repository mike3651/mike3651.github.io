/* Michael Wilson
 * TMobile hackathon
 * 2017 */

var map, current_mode, infoWindow, current = [];
var directionsDisplay, directionsService, places, place_info_from_id;
var callback_type = "";
var test, services;
var start_place;

// THIS IS A METHOD THAT IS CALLED BY THE GOOGLE MAPS API
function initMap() {	

	// CHECK TO SEE IF WE CAN PICK UP THE LOCATION
	if(navigator.geolocation) {

		// GET THE CURRENT LOCATION OF THE USER
		navigator.geolocation.getCurrentPosition(function(position) {
			current = {
				lat: position.coords.latitude,
				lng: position.coords.longitude
			};		

			// GENERATE A MAP OF WHERE THE USER IS CURRENTLY AT
			map = new google.maps.Map(document.getElementById("map"), {
				center: {lat: -44, lng: 44},
				zoom: 13
			});			
			map.setCenter(current);				
			services = new google.maps.places.PlacesService(map);	

			// MAKES A REQUEST TO GOOGLE TO GET THE CURRENT CITY NAME
			var ajax = new XMLHttpRequest();
			ajax.onload = updateCity;
			ajax.open("GET", "https://maps.googleapis.com/maps/api/geocode/json?latlng=" 
				+ current.lat+ "," + current.lng + "&key=AIzaSyADcFwwr_9DWATUQ4DRm7TFhFN0EsLZ3zk", true);
			ajax.send();
			setUpDirections();
		});				
	}	
}

// DEALS WITH THE CALLBACK
function callback(results, status){
	if(callback_type == "ID") {
		// alert("here");
		place_info_from_id = results;
	} else {				
		places = results;		
	}	
}

// CLEARS UP UNWANTED CONTENT ON THE WEB PAGE
function clearPage() {
	$("#right-panel").html(" ");
}

// CLEARS UP THE BROWSING HISTORY
function clearHistory() {
	history = [];

	// LOOP THROUGH THE CHILD NODES OF THE TABLE AND DELETE 
	// TRs !THE FIRST
}

// UPDATES THE STARTING LOCATION OF THE USER
function updateCity() {
	// turn the response text into a JSON object
	var obj = JSON.parse(this.responseText);
	var city = obj.results[0].address_components[2].short_name.toLowerCase();
	var state = obj.results[0].address_components[5].short_name.toLowerCase();
	start_place = city;	
	$("#start").val(city + ", " + state);
}

// COMMON CODE FOR SETTING UP THE MAP
function setUpDirections() {	
	directionsService = new google.maps.DirectionsService;
	directionsDisplay = new google.maps.DirectionsRenderer;
	directionsDisplay.setMap(map);	
	directionsDisplay.setPanel(document.getElementById("right-panel"));
}


/******************************************
 * THIS IS VERY IMPORTANT!!!! ALLOWS FOR  *
 * THE USE OF THE GLOBAL ARRAY, WITHOUT   * 
 * THIS THE ARRAY IS TREATED AS AN OBJECT *
 * THAT LACKS THE PUSH PROPERTY!          * 
 ******************************************/
(function() {
	// keeps track of the users history 
	var history = [];		

	// keeps track of the markers that we have
	var markers = [];
	var distance;

	window.onload = function() {
		setUp();		
		$("#get-route").click(function() {			
			//clearPage();
			setUpDirections();
			current_mode = $("#mode").val();
			updateMap(directionsService, directionsDisplay, current_mode);
			populateVenues();
		});
		$("#category").change(function() {			
			current_mode = $("#category").val();
			populateVenues();
		});
		$("#category-search").click(function() {			
			current_mode = $("#category").val();
			populateVenues();
		});
		$("#clear-history").click(function() {
			history = [];

			// delete the data in the table after the first			
			$("#history-table").find("tr:gt(0)").remove();
		});
	}	

	// SETS UP THE WHOLE PROGRAM
	function setUp() {
		history = [];		
	}


	// DISPLAYS THE ROUTE FROM ONE LOCATION TO ANOTHER
	// PARAM SERVICE -> THE TYPE OF GOOGLE SERVICE IN USE
	// PARAM DISPLAY -> THE WAY TO DISPLAY 
	// PARAM MODE -> MEANS OF TRANSPORTATION
	function updateMap(service, display, mode) {
		//alert("here");
		var start = document.getElementById('start').value;
		var end = document.getElementById('end').value
		service.route({
			origin: start,
			destination: end,
			travelMode:mode
		}, function(response, status) {
			// gets the directions that were fed back
			if(status === "OK") {
				display.setDirections(response);
			}
		});
		var searched = {
			source: start,
			dest: end, 
			travel: mode
		};			
		history.push(searched);			
		updateHistory();
	}

	// POPULATES A TABLE WITH VENUES
	function populateVenues() {
		callback_type = "";	
		// alert("populating the venues, current mode: " + current_mode);
		services.nearbySearch({
			location: current,
			radius: 500,
			type: [current_mode]
		}, callback);	
		setTimeout(populate(), 2000);	
	}

	// HELPER METHOD FOR POPULATING TEH VENUE TABLE
	function populate() {
		clearMap();
		setMarkers();

		// clear the venues that have been searched
		$("#venues").html("");

		var first = document.createElement("tr");
		var second = document.createElement("td");
		second.innerHTML = "name";
		$(first).append(second);
		$("#venues").append(first);

		for(var i = 0; i < places.length; i++) {
			var tr = document.createElement("tr");
			var td = document.createElement("td");
			td.className = "data-on-store";
			td.innerHTML = places[i].name;

			// GET DATA ON PLACE THAT IS HOVERED OVER
			$(td).mouseover(function() {	
				callback_type = "ID";		
				var target = places[findVenue($(this).html())];				
				services.getDetails({placeId: target.place_id}, callback);	
				setTimeout(function() {
					$("#store-data").html(fillInformation(target));
				}, 1000);
			});
			$(tr).append(td);
			$("#venues").append(tr);
		}
	}

	// PUTS THE MARKERS ONTO THE MAP
	function setMarkers() {
		for(var i = 0; i < places.length; i++) {
			var location = places[i].geometry.location;
			var marker = new google.maps.Marker({
	          position: location,
	          map: map
	        });
	        markers.push(marker);
		}
	}

	// deals with clearing the map
	function clearMap() {
		for(var i = 0; i < markers.length; i++) {
			markers[i].setMap(null);
		}
		markers = [];
	}

	// SEARCHES FOR THE INDEX OF A PARTICULAR STORE
	function findVenue(target) {
		for(var i = 0; i < places.length; i++) {
			if(places[i].name == target) {
				return i;
			}
		}
		return -1;
	}

	// // UPDATES STORE INFORMATION
	// function fillInformation
	function fillInformation(target) {		
		var str = "<h3 style=\"text-align:center;\">Venue information</h3>";
		str += "<p>Name: " + target.name + "</p>";
		str += "<p>Overall rating: " + target.rating + "</p>";
		str += "<p>Web page: " + place_info_from_id.website + "</p>";
		// str += "<p>This venus is : " + calculateDistanceFrom(place_info_from_id.geometry.location) + "miles from you</p>";
		str += "<h4>Venue reviews</h4>";
		str += "<ul>";				
		for(var i = 0; i < place_info_from_id.reviews.length; i++) {
			str += "<li>Name: " + place_info_from_id.reviews[i].author_name + "</li>";			
			str += "<li>Rating: " + place_info_from_id.reviews[i].rating + "</li>";
			str += "<li>Review:	" + place_info_from_id.reviews[i].text + "</li><br/>";				
		}		
		str += "</ul>";		
		// str += "<img src=\"" + target.getUrl() + "\" />"; 
		return str;
	}

	// UPDATES THE CONTENTS OF THE HISTORY TABLE
	function updateHistory() {
		var last_added = history[history.length - 1];		
		var tr = document.createElement("tr");
		var td = document.createElement("td");
		td.innerHTML = last_added.source;
		$(tr).append(td);
		var td2 = document.createElement("td");
		td2.innerHTML = last_added.dest;
		$(tr).append(td2);
		var td3 = document.createElement("td");
		td3.innerHTML = last_added.travel.toLowerCase();
		$(tr).append(td3);
		$("#history-table").append(tr);
	}

	// // function that calucates distance 
	// function calculateDistanceFrom(location) {
	// 	var ajax = XMLHttpRequest();
	// 	ajax.onload = updateDistance();
	// 	ajax.open("GET", "http://maps.googleapis.com/maps/api/distancematrix/json?origins=" 
	// 		+ city + "&destinations=" , true);
	// }

	// // function that updates the distance
	// function updateDistance() {

	// }
})();