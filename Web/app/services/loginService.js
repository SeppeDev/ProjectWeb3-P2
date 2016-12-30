app.service("loginService", function($http) {	
	var svc = this;

	svc.getUser = function()
	{
		return $http.get(CONSTANTS.API_BASE_URL + "/user");
	}
})