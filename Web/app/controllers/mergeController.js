app.controller("mergeController", function(bandService, mergedService, $state) {
	var vm 			= this;
	var bandSvc 	= bandService;
	var mergedSvc 	= mergedService;
	var wavesurfer 	= [];

	function _init() {
		vm.tracks 			= bandSvc.getTrackArray();
		vm.showTracks 		= false;
		vm.thereAreTracks	= false;
		vm.loadedTracks 	= [];
		vm.savedTime 		= [];
		vm.trimAmounts  	= [];

		if(vm.tracks.length > 0)
		{
			vm.thereAreTracks	= true;
		}
	}

	vm.load = function() {
		if(vm.thereAreTracks)
		{
			for (var i = vm.tracks.length - 1; i >= 0; i--) {
				var track_id = vm.tracks[i].id;

				wavesurfer[track_id] = WaveSurfer.create({
		    		container: '#waveform'+track_id,
		    		waveColor: 'green',
		    		progressColor: 'purple'
				});

				wavesurfer[track_id].load(CONSTANTS.API_BASE_URL + '/audio/' + vm.tracks[i].file_url);

				vm.loadedTracks.push({
	            	track_id: track_id,
	            	trim_amount: 0,
	            	user_id: vm.tracks[i].user.id
	        	});

	        	console.log(vm.loadedTracks);
			}
			vm.showTracks = true;
		}
	}

	vm.playPause = function(id) {
		if(!wavesurfer[id].isPlaying())
		{
			vm.savedTime[id] = wavesurfer[id].getCurrentTime();
			console.log(vm.savedTime);
		}

		wavesurfer[id].playPause();
		wavesurfer[id].zoom(50);
	}

	vm.trim = function(id) {
		var timeToTrim = wavesurfer[id].getCurrentTime();
		for (var i = vm.loadedTracks.length - 1; i >= 0; i--) {
			if(vm.loadedTracks[i].track_id === id)
			{
				vm.loadedTracks[i].trim_amount 	= timeToTrim;
				vm.trimAmounts[id] 				= Math.round(timeToTrim * 100) / 100;
			}
		}
	}


	vm.playPauseAll = function() {
		for (var i = vm.loadedTracks.length - 1; i >= 0; i--) {
			var id = vm.loadedTracks[i].track_id;
			if(!wavesurfer[id].isPlaying())
			{
				vm.savedTime[id] = wavesurfer[id].getCurrentTime();
			}

    		wavesurfer[id].playPause();
    		wavesurfer[id].zoom(50);
		}
	}

	vm.toPrevious = function() {
		for (var i = vm.loadedTracks.length - 1; i >= 0; i--) {
			var id = vm.loadedTracks[i].track_id;
			var previousTime 	= vm.savedTime[id];
			var totalTime		= wavesurfer[id].getDuration();
			var progress = previousTime / totalTime;
			wavesurfer[id].seekAndCenter(progress);
		}
	}

	vm.toStart = function(id) {
		wavesurfer[id].seekAndCenter(0);
	}

	
	vm.save = function() {
		$('#processing_modal').modal();
		$('#processing_modal').modal('open');
		
		mergedSvc.mergeTracks(vm.loadedTracks)
		.then(function(data)
        {
        	$('#processing_modal').modal('close');
        	$state.go("merged");

        }, function(error)
        {
          console.log(error);
        });
	}

	_init();
});