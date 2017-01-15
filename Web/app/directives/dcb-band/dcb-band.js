app.directive("dcbBand", function(bandService) {
	return {
		restrict: "E",
		templateUrl: "app/directives/dcb-band/dcb-band.html",
		replace: true,
		scope: {},
		controllerAs: "band",
		controller: function($auth, $scope, $rootScope) {
			var vm = this;
			var bandSvc = bandService;

			function _init() {
				vm.trackArray 			= bandSvc.getTrackArray;
				vm.bandTrackIdArray 	= bandSvc.getTrackIdArray;
				vm.trackArrayCount 		= bandSvc.getTrackArrayCount;

				//console.log(vm.trackArrayCount);
			}

			vm.removeFromBand = function(track) {
		
				bandSvc.removeFromTrackArray(track);

				console.log("Track removed from new band: " + track);
				//console.log(bandSvc.trackArray);
			}

			_init();
		}
	}
})