app.directive("dcbHeader", function(bandService) {
	return {
		restrict: "E",
		templateUrl: "app/directives/dcb-header/dcb-header.html",
		replace: true,
		scope: {},
		controllerAs: "head",
		controller: function($scope, userService, $auth, $rootScope) {
			
			var vm 			= this;
			var userSvc 	= userService;
			var bandSvc 	= bandService;

			function _init() {
				vm.trackArray = bandSvc.trackArray;
				vm.trackArrayCount = bandSvc.trackArrayCount;

				if($auth.isAuthenticated())
				{
					userSvc.getUser().then(function (data) {
						$rootScope.username = data.data.username;
					});
				}
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