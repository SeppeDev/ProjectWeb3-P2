app.service("bandService", function($cookies) {
	
	var svc = this;

	trackArray = [];
	trackIdArray = [];
	trackArrayCount = 0;

	//Private functions
	function arrayObjectIndexOf(myArray, searchTerm, property) {
    	
    	for(var i = 0, len = myArray.length; i < len; i++) {
        	if (myArray[i][property] === searchTerm) return i;
    	}

    	return -1;
	}
	//TrackArrayCount
	function incrementTrackArrayCount() {
		trackArrayCount ++;
		return trackArrayCount;
	}

	function decrementTrackArrayCount() {
		trackArrayCount --;
		return trackArrayCount;
	}

	//TrackIdArray
	function addToTrackIdArray(trackId) {
		trackIdArray.push(trackId);
		return trackIdArray;
	}

	function removeFromTrackIdArray(trackId) {
		index = trackIdArray.indexOf(trackId);
		if(index > -1) {
			trackIdArray.splice(index, 1);
		}

		return trackIdArray;
	}

	//Svc functions
	svc.getTrackArrayCount = function() {
		return trackArrayCount;
	}

	svc.getTrackIdArray = function() {
		return trackIdArray;
	}

	svc.addToTrackArray = function(track) {
		trackArray.push(track);
		incrementTrackArrayCount();
		addToTrackIdArray(track.id);

		/**
		 * Add track to cookie
		 */
		var expirationTime = new Date();
		expirationTime.setHours(expirationTime.getHours() + 2);
		
		var cookieBand = [];
		if($cookies.get("band")){
			cookieBand = JSON.parse($cookies.get("band"));
		}
		cookieBand.push({
			id:	track.id
		});

		$cookies.putObject("band", cookieBand, {expires: expirationTime});

		return trackArray;
	}

	svc.removeFromTrackArray = function(track) {
		index = arrayObjectIndexOf(trackArray, track.id, "id");
		if(index > -1) {
			trackArray.splice(index, 1);
		}
		
		decrementTrackArrayCount();
		removeFromTrackIdArray(track.id);
		return trackArray;
	}

	svc.getTrackArray = function() {
		return trackArray;
	}
})