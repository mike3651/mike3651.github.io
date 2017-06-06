/* Short JS file for my personal page */

(function() {
	var learning = "Keyframes, Linear nonhomogenous systems!";
	var learning_message = "What am I learning today?";

	var fade_time = 3000;
	var original_message_fade_time = 1500;

	window.onload = function() {
		$("#learning").hover(function() {
			toggleMessage(learning, fade_time);
		});
		$("#learning").mouseleave(function() {
			toggleMessage(learning_message, original_message_fade_time);
		});
	}

	function toggleMessage(replacement, time) {
		$("#learning p").fadeOut(time);
		setTimeout(function() {
			$("#learning p").html(replacement);
		}, time);		
		$("#learning p").fadeIn(time);
	}
})();