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

	// Initial values (will be overwritte by db values)
	svc.instruments = [{
 							"name":"Lead-guitar",
 							"id":1
 						},
 						{
 							"name":"Drum",
 							"id":2
 						},
 						{
 							"name":"Bass",
							"id":3
 						},
						{
							"name":"Keys",
 							"id":4
 						}];
})