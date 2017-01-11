app.service("artistService", function($http) {
	
	//Globals
	var svc 			= this;

	//Private functions
	function getData (url, options) {

		!options ? options = {} : "";

		return $http.get(url, options)
	}

	//Svc functions
	svc.getArtists = function () {

		var url = CONSTANTS.API_BASE_URL + "/artists";
		
		return getData(url);
	}
})