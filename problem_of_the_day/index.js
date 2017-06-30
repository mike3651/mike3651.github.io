(function() {
	window.onload = function() {

	}

	/** 
	 * Finds the second most common occurring character in a string 
	 *
	 * @param str:
	 * @return: str !empty ? second most occurring character : null */
	function findSecond(str) {
		hm = [];
		for(var i = 0; i < str.length; i++) {
			var c = str.chatAt(i);
			if(findKey(c, hm)) {
				updateCollection(c, hm);
			} else {
				hm.append({"key":c, "val" : 1});
			}
		}

		var max = secondMax = 0, returnKey = maxKey = '', compare;
		for(var i = 0; i < hm.length; i++) {			
			compare = hm[i].val;
			comparison(i, maxKey, max, hm, compare);			
		}

		for(var i = 0; i < hm.length; i++) {
			if(hm[i].key != maxKey) {
				compare = hm[i].val;
				comparison(i, returnKey, secondMax, hm, compare);			
			}
		}
	}

	/**
	 * Private comparison helper method
	 * 
	 * @param i: The index
	 * @param char: The character to update
	 * @param max: The max to update
	 * @param collection: The collection to look through 
	 * @param compare: The value for compare to */
	function comparison(i, char, max, collection, compare) {
		if(compare > max) {
			max = compare;
			maxKey = hm[i].key;
		}
	}

	/**
	 * Private helper method to see if a key exits
	 * 
	 * @param key: The key to find
	 * @param collection: The collection to look through
	 * @return: true if key found, false otherwise */
	function findKey(key, collection) {
		for(var i = 0; i < collection.length; i++) {
			if(collection[i].key == key) {
				return true;
			}
		}
		return false;
	}	 

	/**
	 * Private helper method to update the values of a collection
	 * guarunteed that the key exists 
	 *
	 * @param key: The key to find
	 * @param collection: The collection to look through */
	function updateCollection(key, collection) {
		for(var i = 0; i < collection.length; i++) { 
			if(collection[i].key == key) {
				collection[i].val = collection[i].val + 1;
				return;
			}
		}
	}
})();