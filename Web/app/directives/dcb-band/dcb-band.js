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
			}

			vm.closeModal = function() {
                $('#band_modal').modal('close');
			}

			vm.removeFromBand = function(track) {
				bandSvc.removeFromTrackArray(track);
			}

			_init();
		}
	}
})