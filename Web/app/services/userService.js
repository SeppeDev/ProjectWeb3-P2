app.service("userService", function($http) {	
	
	var svc = this;

	svc.getUser = function()
	{
		return $http.get(CONSTANTS.API_BASE_URL + "/user");
	}

	svc.updateUser = function(data)
	{
		return $http.post(CONSTANTS.API_BASE_URL + "/user", data);
	}
})