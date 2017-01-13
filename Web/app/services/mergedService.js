app.service("mergedService", function($http) {
	
	//Globals
	var svc = this;

	//Private functions
	function getData (url, options) {

		!options ? options = {} : "";

		return $http.get(url, options)
	}

	//Svc functions
	svc.getTracks = function () {

		var url = CONSTANTS.API_BASE_URL + "/mergedtracks";
		
		return getData(url);
	}

	svc.getTrackById = function (id) {

		var url = CONSTANTS.API_BASE_URL + "/mergedtracks/" + id;

		return getData(url);
	}

	svc.mergeTracks = function(data)
	{
		return $http.post(CONSTANTS.API_BASE_URL + "/mergedtracks/create", data);
	}
})