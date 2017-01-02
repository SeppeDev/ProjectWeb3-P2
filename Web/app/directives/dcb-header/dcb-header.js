app.directive("dcbHeader", function(bandService) {
	return {
		restrict: "E",
		templateUrl: "app/directives/dcb-header/dcb-header.html",
		replace: true,
		scope: {},
		controllerAs: "head",
		controller: function($scope) {
			var vm = this;
			var bandSvc = bandService;

			function _init() {
				vm.trackArray = bandSvc.trackArray;
				vm.trackArrayCount = bandSvc.trackArrayCount;
			}

			

			_init();
		}
	}
})