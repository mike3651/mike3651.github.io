(function(){
	window.onload = function() {
		$(document).ready(setUpLinks());
	}

	/* Function that sets up the page linkers */
	function setUpLinks() {				
		$(".link").live("click", updatePage);
	}

	function updatePage(e) {		
		$("#viewport").html('');
		$("#viewport").load($(this).attr("title") + ".html", function() {
			MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
		});				
	}

})();