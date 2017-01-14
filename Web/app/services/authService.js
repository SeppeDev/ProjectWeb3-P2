app.service("authService", function ($auth, $rootScope, $cookies, $state, userService) {
	
	var svc 		= this;
	var userSvc 	= userService;

	svc.isLoggedIn 	= false;

	//Private functions
	function login (token, id, username, email) {

		var expirationTime = new Date();
		expirationTime = expirationTime.setTime(expirationTime.getTime() + (token["expires_in"] * 1000));
		expirationTime = new Date(expirationTime);

		var userData = {

			token: token,
			userId: id,
			username: username,
			email: email,
			//isAdmin: data.data.isAdmin
		}

		//console.log(userData.token);

		svc.user = userData;

		$cookies.putObject("user", userData, { expires: expirationTime });
		$rootScope.isLoggedIn = true;
		
		//Check if returned user is Admin
		userData.isAdmin == "1" ? $rootScope.isAdmin = true : $rootScope.isAdmin = false;
	}

	//Svc functions
	svc.login = function (credentials) {

		$auth.login(credentials).then(function(data) {
        	// Authentication success
        	token 		= data.data.token;
        	id 			= 0;
        	username 	= "";
        	email 		= "";

			userSvc.getUser().then(function (data) {
				id 			= data.data.id;
				username 	= data.data.username;
				email 		= data.data.email;
				
				login(token, id, username, email);
				svc.isLoggedIn = true;
			}, function(error) {
				console.log(error);
				svc.isLoggedIn = false;
			});
        }, 
        function(error){
        	// Authentication failed
        	console.log(error);
        	svc.isLoggedIn = false; 
        });
	}

	svc.logout = function () {
		$auth.logout()
			.then(function (data) {

				$rootScope.isLoggedIn = false;
				$rootScope.isAdmin = false;
				svc.user = null;
				svc.isLoggedIn = null;

				$cookies.remove("user");
				
				$state.go("home");
			}, function (error) {

				console.log(error);
			})
	}

	svc.register = function (user) {

		var url = CONSTANTS.API_BASE_URL + "/user";

		return $http.post(url, user);
	}
});