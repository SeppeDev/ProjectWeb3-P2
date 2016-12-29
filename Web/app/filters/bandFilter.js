app.filter("band", function() {
	return function(trackId, list) {
		var returnValue = false;
		
		angular.forEach(list, function(id, index) {
			if(id == trackId) {
				returnValue = true;
			}
		});
		return returnValue;
	}
});