app.directive("dcbBand", function(bandService) {
	return {
		restrict: "E",
		templateUrl: "app/directives/dcb-band/dcb-band.html",
		replace: true,
		scope: {},
		controllerAs: "band",
		controller: function() {
			var vm = this;
			var bandSvc = bandService;

			function _init() {
				vm.value = "NewBand";
			}

			_init();
		}
	}
})