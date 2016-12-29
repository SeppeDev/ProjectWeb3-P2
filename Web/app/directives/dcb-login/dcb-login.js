app.directive("dcbLogin", function() {
	return {
		restrict: "E",
		templateUrl: "app/directives/dcb-login/dcb-login.html",
		replace: true,
		scope: {},
		controllerAs: "login",
		controller: function($auth) {
			var vm = this;

	        vm.sendCredentials = function() {
	        	console.log('Sent');
	            var credentials = {
	                email: vm.email,
	                password: vm.password
	            }
	            
	            $auth.login(credentials).then(function(data) {
	            	console.log(data);
	            }, function(error){
	            	console.log(error);
	            });
	        }
		}
	}
})