app.controller("mergeController", function(bandService, mergedService) {
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

				if(document.getElementById(track_id).checked) 
				{
					wavesurfer[track_id] = WaveSurfer.create({
			    		container: '#waveform'+track_id,
			    		waveColor: 'green',
			    		progressColor: 'purple'
					});

					wavesurfer[track_id].load('http://discoverbandapi.int/public/api/audio/' + vm.tracks[i].file_url);

					vm.loadedTracks.push({
		            	track_id: track_id,
		            	trim_amount: 0
		        	});
				}
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
				vm.loadedTracks[i].trim_amount = timeToTrim;
			}
		}
	}


	vm.playPauseAll = function() {
		for (var i = vm.loadedTracks.length - 1; i >= 0; i--) {
			var id = vm.loadedTracks[i].track_id;
			if(!wavesurfer[id].isPlaying())
			{
				vm.savedTime[id] = wavesurfer[id].getCurrentTime();
				console.log(vm.savedTime);
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
			wavesurfer[id].seekTo(progress);
		}
	}

	
	vm.save = function() {
		mergedSvc.mergeTracks(vm.loadedTracks)
		.then(function(data)
        {
          console.log(data);
        }, function(error)
        {
          console.log(error);
        });
	}

	_init();
});