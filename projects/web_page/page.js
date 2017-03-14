(function() {
	// this keeps track of all the JSON objects that we currently have
	var JSON_OBJECTS_USERS = [];
	var JSON_OBJECTS_SHOPS = [];
	var JSON_OBJECTS_REVIEWS = [];

	// keeps track of the shop ids
	var shop_ids = [];

	// keeps track of the review ids
	var review_ids = [];

	var SHOP_TABLE_TITLES = ["id",
			"name",
			"city",
			"state",
			"zip",
			"number",
			"description",
			"open",
			"close"];

	// checks to see if we can generate a map
	var map_okay = true;
	var container_made = false;

	window.onload = function() {
		var list = document.getElementsByClassName("change-page");
		for(var i = 0; i < list.length; i++) {
			list[i].onclick = linkPage;		
		}
		$("#view-port").load("home.html");		
		$("#fade-in").hide().fadeIn(2500);		
		
		$("#get-user-message-data").click(function() {			
			getMessages();
		});	

		// shopInformation();
		// reviewInformation();
	}

	// function that toggles between pages
	function linkPage() {	
		// get the target div
		$("#view-port").load($(this).attr("title") + ".html");	
		//alert($("form"));
				
		// need this alert to allow for load pause
		alert($(this).attr("title") + " page loaded");

		// LOAD THE IDs
		// alert($(this).attr("title") == "review");
		// check for review
		if($(this).attr("title") == "review") {
			$("#review-id").val(createId($(this).attr("title")));
			//alert($("#review-id").val());
		}

		// check for shop
		if($(this).attr("title") == "shop") {
			var id = createId($(this).attr("title"));
			// console.log("actual id returned: " + id);
			// console.log("shop-id value before: " + $("#shop-id").val());
			// console.log("shop input object: " + $("#shop-id"));
			document.getElementById("shop-id").value = id;
			$("#get-shop-data").click(getShops);
			$("#delete-shop").click(deleteShop);
			//$("#shop-id").val(id);			
			//console.log("shop-id value after: " + $("#shop-id").val());
			//alert($("#shop-id").val());
		}

		$("form").submit(function(e) {
			e.preventDefault();
			if($("form").attr("id") == "shop"){
				//alert("shop submission");
				makeShopObject();
			}

			if($("form").attr("id") == "review") {
				//alert("review submitted");
			}

			if($("form").attr("id") == "user") {
				//alert("user registered");
			}

			//getInformation(this.id);
			//console.log("form submitted");	
		});
	}

	// function that generates an ID
	// param -> type : The type of object to link the id to
	// return -> id : The identification of this object
	function createId(type) {
		//console.log("creating an ID");
		// generaes a random ID from 100 - 999
		var id = Math.floor(Math.random() * 899) + 100;
		while(!verifyUniqueId(type, id)) {
			id = Math.floor(Math.random() * 899) + 100;
		}
		//console.log("value of id: " + id);
		return id;
	}

	// function that determines as to whether or not an id has been taken
	// return -> ID exists ? false : true
	function verifyUniqueId(type, id) {
		if(type == "shop") {
			for(var i = 0; i < shop_ids.length; i++) {
				if(id == shop_ids[i]) {
					return false;
				}
			}			
		} else {
			for(var i = 0; i < review_ids.length; i++) {
				if(id == review_ids[i]) {
					return false;
				}
			}
		}
		return true;
	}

	// function that creates a shop object and returns it
	function makeShopObject() {
		// STRINGS
		var name = document.getElementById("shop-title");
		var city = document.getElementById("shop-city");
		var state = document.getElementById("shop-state");
		var number = document.getElementById("shop-number");
		var description = document.getElementById("shop-description");
		var open = document.getElementById("shop-open");
		var close = document.getElementById("shop-close");

		// INTEGERS		
		var zip = document.getElementById("shop-zip");		
		var id = document.getElementById("shop-id");

		// create the object, JSON objects are nothing more than strings
		var shop = {
			"id" : id.value,
			"name" : name.value,
			"city" : city.value,
			"state" : state.value,
			"zip" : zip.value,
			"number" : number.value,
			"description" : description.value,
			"open" : open.value,
			"close" : close.value
		};
		JSON_OBJECTS_SHOPS.push(shop);
		return shop;
	}

	// function that makes a review object and returns it
	function makeReviewObject() {
		// STRING		
		var message = document.getElementById("review-message");

		// INTEGERS
		var id = document.getElementById("review-id");
		var shop_id = document.getElementById("review-shop-id");
		var rating = document.getElementById("review-rating");

		// generate the review object
		var review = {
			"id": id.value,
			"shopid": shop_id.value,
			"message": message.value,
			"rating": rating.value
		}
		JSON_OBJECTS_REVIEWS.push(review);
		return review;
	}

	// function that extracts information from the form field
	function getInformation(form_type) {	
		var object = {};
				
		
		$("form :input").each(function() {
			var title = $(this).attr("title");		
			var input = $(this).val();	
			if(typeof title !== "undefined") {
				object[title] = input;
			}
		});

		if(form_type == "shop") {
			JSON_OBJECTS_SHOPS.push(object);
		} else if (form_type == "user") {
			JSON_OBJECTS_USERS.push(object);
		}


		if(form_type == "user") {	
			// for the geo location using google's api
			
			if(!container_made) {
				// create the container object
				var container = document.createElement("div");
				container.innerHTML = object["Name"];
				container.className = "shop col-sm-4";
				container.id = "business" + JSON_OBJECTS_SHOPS.length;
			}

			// create the map object
			var map = document.createElement("div");			
			map.id = "mapid" + JSON_OBJECTS_SHOPS.length;		
	 
			$("#business" + JSON_OBJECTS_SHOPS.length).append(map);
			$("#test").append(container);	
			alert(JSON_OBJECTS_SHOPS.length);
			for(var i = 0; JSON_OBJECTS_SHOPS.length; i++) {
				// THIS IS THE SWEET STUFF
				var ajax = new XMLHttpRequest();
				ajax.onload = createMap;
				ajax.open("GET", "http://maps.googleapis.com/maps/api/geocode/json?address=" 
					+ JSON_OBJECTS_SHOPS[i]["ZIP code"]+ "&sensor=true", false);
				ajax.send();	
			}
		}
				
	}

	function getShops() {				
		for(var i = 0; i < JSON_OBJECTS_SHOPS.length; i++) {
			var tr = document.createElement("tr");
			for(var j = 0; j < SHOP_TABLE_TITLES.length; j++) {
				var th = document.createElement("th");
				th.innerHTML = JSON_OBJECTS_SHOPS[i][SHOP_TABLE_TITLES[j]];
				th.id = JSON_OBJECTS_SHOPS["id"];
				console.log(th.id);
				$(tr).append(th);				
			}
			$("table").append(tr);
			alert("here");
		}
	}

	function deleteShop() {
		alert("here");	
		alert($("#shop-id").val());	
		$($("#shop-id").val()).remove();
	}

	// validates information from the json object
	function createMap() {				
		var data = JSON.parse(this.responseText);
		// console.log(data);

		// get the locations		
		var lat = data["results"][0].geometry.bounds.northeast["lat"];
		var lng = data["results"][0].geometry.bounds.northeast["lng"];
		console.log($("#mapid" + JSON_OBJECTS_SHOPS.length));
		// stylistics of the map
		var myMap = L.map("mapid" + JSON_OBJECTS_SHOPS.length).setView([lat, lng], 13);
		L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
 	    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
		}).addTo(myMap);

		// adds a marker to the map
		var marker = L.marker([lat, lng]).addTo(myMap);		
		$("#mapid" + JSON_OBJECTS_SHOPS.length).append(myMap);	
		// map_okay = true;
		// console.log("map status: " + map_okay);	
	}

})();