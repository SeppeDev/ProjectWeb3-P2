app.service("loginService", function($http) {	
	var svc = this;

	svc.getUser = function()
	{
		$http.get(CONSTANTS.API_BASE_URL + "/user").success(function(user) {
            console.log(user);
        }).error(function(error) {
        	console.log(error);
        });
	}
})