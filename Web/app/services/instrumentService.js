app.service("instrumentService", function($http) {
	
	//Globals
	var svc = this;

	//Private functions
	function getData (url, options) {

		!options ? options = {} : "";

		return $http.get(url, options)
	}

	//Svc functions
	svc.getInstruments = function () {

		var url = CONSTANTS.API_BASE_URL + "/instruments";
		
		return getData(url);
	}
})