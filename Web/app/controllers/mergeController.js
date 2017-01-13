app.controller("mergeController", function(bandService, mergedService) {
	var vm 			= this;
	var bandSvc 	= bandService;
	var mergedSvc 	= mergedService;
	var wavesurfer 	= [];

	function _init() {
		vm.tracks 			= bandSvc.getTrackArray();
		vm.thereAreTracks 	= false;
		vm.showTracks 		= false;
		vm.loadedTracks 	= [];

		if(vm.tracks.length > 0) 
		{
			vm.thereAreTracks = true;
		}
	}

	vm.load = function() {
		if(vm.thereAreTracks)
		{
			for (var i = vm.tracks.length - 1; i >= 0; i--) {
				var track_id = vm.tracks[i].id;

				if(document.getElementById(track_id).checked) 
				{
					console.log('ID: ' + track_id);
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
		console.log(vm.loadedTracks);
	}

	vm.playPause = function(id) {
		console.log(id);
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
			var id = vm.loadedTracks[i];
    		wavesurfer[id].playPause();
    		wavesurfer[id].zoom(50);
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