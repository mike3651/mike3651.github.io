(function() {
	"use strict";

	var ELEMENT_COUNT = 10;


	window.onload = function() {
		makeElements();
		addEvent();
	}

	// function that generates random divs across a certain region
	function makeElements() {
		for(var i = 0; i < ELEMENT_COUNT; i++) {
			var div = document.createElement("div");
			div.className = "moveable";
			div.style.top = Math.random() * (parseInt($("#container").css("height")) - 100) + "px";
			div.style.left = Math.random() * (parseInt($("#container").css("width")) - 100) + "px";
			div.style.backgroundColor = generateRGB();
			div.draggable = "true";			
			$("#container").append(div);
		}
	}

	// adds the draggable event to each moveable item
	function addEvent() {
		var list = document.getElementsByClass("moveable");
		for(var i =0; i < list.length; i++) {
			list[i].ondrag = move;
		}
	}

	function move(event) {
		
	}

	// function that generates a random RGB value
	// return -> the RBG value
	function generateRGB() {
		var r = Math.round(Math.random() * 255);
		var g = Math.round(Math.random() * 255);
		var b = Math.round(Math.random() * 255);
		var o = Math.random();
		return "rgba(" + r + ", " + g + ", " + b + ", " + o + ")";
	}
})();