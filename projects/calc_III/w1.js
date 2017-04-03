(function() {
	// basic table entry limit
	var entry_limit = 10;

	window.onload = function() {
		fillTables();
		$("#change-sequence-size").click(function() {
			entry_limit = parseInt($("#sequence-size").val());			
			clearTables();
			fillTables();
		});
	}

	// populates the tables
	function fillTables() {
		factorialTable();
		fibonacciTable();
	}

	// fills up the factorial table
	function factorialTable() {
		createHeader("factorial");
		var tbody = document.createElement("tbody");
		var tr = firstRow("tr", "td", "a<sub>n</sub>");
		var curr_value = 1;
		for(var i = 1; i <= entry_limit; i++) {
			var td = document.createElement("td");
			curr_value *= i;
			$(td).html(curr_value);
			$(tr).append(td);
		}
		appendEnd(tbody, "factorial", tr);
	}

	// fills up the fibonacci table
	function fibonacciTable() {
		var f = [];
		createHeader("fib");
		var tbody = document.createElement("tbody");
		var tr = firstRow("tr", "td", "a<sub>n</sub>");		
		var td1 = document.createElement("td");		
		f.push(0);		
		$(td1).html(f[0]);
		var td2 = document.createElement("td");
		f.push(1);
		$(td2).html(f[1]);
		$(tr).append(td1);
		$(tr).append(td2);
		for(var i = 2; i < entry_limit; i++) {
			var td = document.createElement("td");
			f[i] = f[i - 1] + f[i - 2];
			$(td).html(f[i]);
			$(tr).append(td);
		}		
		appendEnd(tbody, "fib", tr);
	}

	// creates and returns the first row of the table
	function firstRow(tr, td, str) {
		var tr = document.createElement(tr);
		var td_og = document.createElement(td);		
		$(td_og).html(str);
		$(tr).append(td_og);
		return tr;
	}

	// appends the end of the row to the given table
	function appendEnd(body, id, tr) {
		$(body).append(tr);
		$("#" + id).append(body);
	}

	// generates a header row for the given id
	function createHeader(id){
		var thead = document.createElement("thead");
		var tr = firstRow("tr", "th", "Index");	
		for(var i = 1; i <= entry_limit; i++) {
			var th = document.createElement("th");
			$(th).html(i);
			$(tr).append(th);
		}		
		appendEnd(thead, id, tr);
	}

	// clears the fibonacci & factorial tables
	function clearTables() {
		$("#fib").empty();
		$("#factorial").empty();
	}
})();