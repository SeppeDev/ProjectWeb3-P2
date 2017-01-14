app.controller("mergedController", function($scope, mergedService, filterService) {
	
	var vm  		= this;
	var mgdSvc 		= mergedService;
	var fltSvc 		= filterService;

	//Private functions
	function playAudioFile(track)
	{
		track.play();
	}

	function getMergedTracks() {
		mergedService.getTracks()
			.then(function(data) {
				
				vm.mergedTracks = data.data;
				vm.filteredTracks = vm.mergedTracks;
				filter();

				angular.forEach(vm.mergedTracks, function(track, key) {
						newTrack = new Audio('http://discoverbandapi.int/public/audio/' + track.file_url);
						vm.mergedTrackAudio[track.id] = newTrack;
					});
			}, function(error) {

				console.log(error);
			});
	}

	function filter() {
		
		vm.filteredTracks = [];

		angular.forEach(vm.mergedTracks, function(track, key) {

			goodSearch = true;

			if(!vm.filterData.artist == "" && !track.artist.name.match(new RegExp(vm.filterData.artist, "i")))
			{
				goodSearch = false;
			}

			if(!vm.filterData.title == "" && !track.songname.match(new RegExp(vm.filterData.title, "i")))
			{
				goodSearch = false;
			}


			if(goodSearch)
			{
				vm.filteredTracks.push(track);
			}
		})
	}

	function _init() {
		vm.mergedTrackAudio = [];
		vm.currentAudioTrackId = "";

		getMergedTracks();
		vm.filterData = fltSvc.mergedFilterData;
	}

	//Vm functions
	vm.play = function(trackId) {

		if(vm.currentAudioTrackId != "") {
			vm.pause(vm.currentAudioTrackId);
		}

		vm.currentAudioTrackId = trackId;
		vm.mergedTrackAudio[trackId].play();
	}

	vm.pause = function(trackId) {
		vm.mergedTrackAudio[trackId].pause();
		vm.currentAudioTrackId = "";
	}

	//Watches
	$scope.$watch(
		function () { return vm.filterData }, 
		function () {

			if(vm.filterData) 
			{
				filter();
			}
		}, true);



	//vm.track1 = new Audio("dist/audio/Behemoth - Conquer All - Drum.mp3");
	//vm.track2 = new Audio("dist/audio/Behemoth - Conquer All - Guitar.mp3");


	_init();
});