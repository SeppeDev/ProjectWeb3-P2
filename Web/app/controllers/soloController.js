app.controller("soloController", function($scope, bandService, soloService, instrumentService, filterService) {
	
	var vm = this;
	var bandSvc = bandService;
	var soloSvc = soloService;
	var instSvc = instrumentService;
	var fltSvc = filterService;

	//Private functions
	function playAudioFile(track)
	{
		track.play();
	}

	function getSoloTracks()
	{
		soloSvc.getTracks()
			.then(function(data)
			{
				vm.soloTracks = data.data;
				vm.filteredTracks = vm.soloTracks;
				filter();

				angular.forEach(vm.soloTracks, function(track, key) {
						//newTrack = new Audio(track.file_url);
						newTrack = new Audio('http://discoverbandapi.int/public/audio/' + track.file_url);
						vm.soloTrackAudio[track.id] = newTrack;
					});
			
			}, function(error)
			{
				console.log(error);
			});
	}

	function filter()
	{
		vm.filteredTracks = [];

		angular.forEach(vm.soloTracks, function(track, key)
		{
			//console.log(track);
			goodSearch = true;

			if(!vm.filterData.artist == "" && !track.artist.name.match(new RegExp(vm.filterData.artist, "i")))
			{
				goodSearch = false;
			}

			if(!vm.filterData.title == "" && !track.songname.match(new RegExp(vm.filterData.title, "i")))
			{
				goodSearch = false;
			}

			if(!vm.filterData[track.instrument_id])
			{
				goodSearch = false;
			}


			if(goodSearch)
			{
				vm.filteredTracks.push(track);
			}
			//console.log(vm.filteredTracks);
		});
	}

	/*function arrayObjectIndexOf(myArray, searchTerm, property) {
    	
    	for(var i = 0, len = myArray.length; i < len; i++) {
        	if (myArray[i][property] === searchTerm) return i;
    	}

    	return -1;
	}*/

	function _init() {
		vm.soloTrackAudio = [];
		vm.currentAudioTrackId = "";

		getSoloTracks();
		vm.instruments = instSvc.instruments;
		vm.filterData = fltSvc.soloFilterData;
		vm.trackArray = bandSvc.getTrackArray;
		vm.bandTrackIdArray = bandSvc.getTrackIdArray;
		vm.trackArrayCount = bandSvc.getTrackArrayCount;

		/*angular.forEach(bandSvc.trackArray, function(track, key) {
			vm.bandTrackIdArray.push(track.id);
		});*/

		//vm.track1.play();
		//setTimeout(function(){playAudioFile(vm.track2)}, 400);
	}

	//Vm functions
	vm.addToBand = function(track) {

		bandSvc.addToTrackArray(track);
		/*vm.bandTrackIdArray = [];

		bandSvc.trackArray.push(track);
		bandSvc.trackArrayCount ++;
		angular.forEach(bandSvc.trackArray, function(track, key) {
			vm.bandTrackIdArray.push(track.id);
		});*/

		console.log(track);
		//console.log(bandSvc.trackArray);
		//console.log(vm.bandTrackIdArray);
		//console.log(vm.trackArrayCount());
		//console.log(vm.bandTrackIdArray());
	}

	vm.removeFromBand = function(track) {
		
		bandSvc.removeFromTrackArray(track);
		/*index = arrayObjectIndexOf(bandSvc.trackArray, track.id, "id");
		if (index > -1) {
			bandSvc.trackArray.splice(index, 1);
			bandSvc.trackArrayCount --;
			vm.bandTrackArray = bandSvc.trackArray;

			intIndex = vm.bandTrackIdArray.indexOf(track.id);
			if (intIndex > -1) {
				vm.bandTrackIdArray.splice(intIndex, 1);
			}
		}*/

		console.log("Track removed from new band: " + track);
		//console.log(bandSvc.trackArray);
	}

	vm.play = function(trackId) {

		if(vm.currentAudioTrackId != "") {
			vm.pause(vm.currentAudioTrackId);
		}

		vm.currentAudioTrackId = trackId;
		vm.soloTrackAudio[trackId].play();
	}

	vm.pause = function(trackId) {
		vm.soloTrackAudio[trackId].pause();
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



	//vm.track1 = new Audio('http://discoverbandapi.int/public/audio/drum.wav');
	//vm.track2 = new Audio('http://discoverbandapi.int/public/audio/guitar.wav');


	_init();
});