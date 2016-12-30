app.directive("dcbHeader", function() {
	return {
		restrict: "E",
		templateUrl: "app/directives/dcb-header/dcb-header.html",
		replace: true,
		scope: {},
		controllerAs: "head",
		controller: function(loginService, $auth, $rootScope) {
			var vm 			= this;
			var loginSvc 	= loginService;

			function _init() {
				if($auth.isAuthenticated())
				{
					loginSvc.getUser().then(function (data) {
						$rootScope.username = data.data.username;
					});
				}

				vm.value = "This is a directive test value!";
			}

			vm.showLogin = function () {
				$('#login_modal').modal();
				$('#login_modal').modal('open');
			}

			vm.logout = function () {
				$auth.logout();
			}

			vm.showRegister = function () {
				$('#register_modal').modal();
				$('#register_modal').modal('open');
			}

			vm.isAuthenticated = function() {
				return $auth.isAuthenticated();
			};

			_init();
		}
	}
})