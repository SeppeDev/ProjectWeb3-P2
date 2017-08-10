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

        vm.toggleSound 		= [];
        vm.togglePlay 		= [];

        $('#band_modal').modal('close');

		if(vm.tracks.length > 0) {
			vm.thereAreTracks	= true;
		}
	}

	/**
	 * Function to load in all the audiotracks in the band
	 */
	vm.load = function() {
		if(vm.thereAreTracks)
		{
			for (var i = vm.tracks.length - 1; i >= 0; i--) {
				var track_id = vm.tracks[i].id;

				/**
				 * Create a new wavesurver line for each track in the mergelist
				 * Load the audiofile into that line
				 */
				wavesurfer[track_id] = WaveSurfer.create({
		    		container: '#waveform'+track_id,
		    		waveColor: 'green',
		    		progressColor: 'purple'
				});
				wavesurfer[track_id].load(CONSTANTS.API_BASE_URL + '/audio/' + vm.tracks[i].file_url);

				/**
				 * Add the track to an array with all the loaded tracks
				 */
				vm.loadedTracks.push({
	            	track_id: track_id,
	            	trim_amount: 0,
	            	user_id: vm.tracks[i].user.id
	        	});

                vm.toggleSound[track_id] = false;
                vm.togglePlay[track_id] = true;
			}
			vm.showTracks = true;
		}
	}

	/**
	 * Function to toggle between Play and Pause
	 */
	vm.playPause = function(id) {
		if(!wavesurfer[id].isPlaying())
		{
			vm.savedTime[id] = wavesurfer[id].getCurrentTime();
		}

		wavesurfer[id].playPause();
		wavesurfer[id].zoom(50);
        vm.togglePlay[id] = !vm.togglePlay[id];
	}

	/**
	 * Function to cut as much audio from the start of the track as was indicated by the user
	 */
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

	/**
	 * Function to toggle between Play and Pause for all tracks as once
	 */
	vm.playPauseAll = function() {
		for (var i = vm.loadedTracks.length - 1; i >= 0; i--) {
			var id = vm.loadedTracks[i].track_id;
			if(!wavesurfer[id].isPlaying())
			{
				vm.savedTime[id] = wavesurfer[id].getCurrentTime();
			}

    		wavesurfer[id].playPause();
    		wavesurfer[id].zoom(50);

            vm.togglePlay[id] = !vm.togglePlay[id];
		}
	}

	/**
	 * Function to reset the progress to the last paused moment
	 */
	vm.toPrevious = function() {
		for (var i = vm.loadedTracks.length - 1; i >= 0; i--) {
			var id = vm.loadedTracks[i].track_id;
			var previousTime 	= vm.savedTime[id];
			var totalTime		= wavesurfer[id].getDuration();
			var progress = previousTime / totalTime;
			wavesurfer[id].seekAndCenter(progress);
		}
	}

	/**
	 * Function to reset the progress to the start of the audiofile
	 */
	vm.toStart = function(id) {
		wavesurfer[id].seekAndCenter(0);
	}

    /**
     * Function to toggle mute.
     */
	vm.toggleMute = function(id) {
		wavesurfer[id].toggleMute();
        vm.toggleSound[id] = !vm.toggleSound[id];
	}

	/**
	 * Function to proceed to the processing modal, where the user can save the changes he/she made to the audio tracks
	 */
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