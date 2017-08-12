app.service("bandService", function($cookies, soloService) {
	
	var svc = this;
	var soloSvc = soloService;

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

	function _init() {
		if($cookies.get("band")){
			var cookieBand = JSON.parse($cookies.get("band"));

			cookieBand.forEach(function(track) {
				trackIdArray.push(track.id);

				soloSvc.getTrackById(track.id)
					.then(function(data)
					{
						trackArray.push(data.data);
					}, function(error)
					{
						console.log(error);
					});
			});

			trackArrayCount = cookieBand.length;
		}
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

		/**
		 * Remove from cookie
		 */
		var expirationTime = new Date();
		expirationTime.setHours(expirationTime.getHours() + 2);

		var cookieBand = [];
		if($cookies.get("band")){
			cookieBand = JSON.parse($cookies.get("band"));
		}
		var index = cookieBand.indexOf({id: track.id});
		cookieBand.splice(index, 1);

		$cookies.putObject("band", cookieBand, {expires: expirationTime});

		return trackArray;
	}

	svc.getTrackArray = function() {
		return trackArray;
	}

	_init();
})