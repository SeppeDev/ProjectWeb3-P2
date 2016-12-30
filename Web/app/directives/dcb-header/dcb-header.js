app.directive("dcbHeader", function() {
	return {
		restrict: "E",
		templateUrl: "app/directives/dcb-header/dcb-header.html",
		replace: true,
		scope: {},
		controllerAs: "head",
		controller: function(loginService) {
			var vm 			= this;
			var loginSvc 	= loginService;

			function _init() {
				vm.value = "This is a directive test value!";
			}

			vm.showLogin = function () {
				$('#login_modal').modal();
				$('#login_modal').modal('open');
			}

			vm.showRegister = function () {
				$('#register_modal').modal();
				$('#register_modal').modal('open');
			}

			_init();
		}
	}
})