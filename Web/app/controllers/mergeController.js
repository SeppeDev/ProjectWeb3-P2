app.controller("mergeController", function(bandService) {
	var vm = this;
	var bandSvc = bandService;
	var wavesurfer = [];

	function _init() {
		vm.tracks 			= bandSvc.getTrackArray();
		vm.thereAreTracks 	= false;
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
				if(document.getElementById(vm.tracks[i].id).checked) 
				{
					wavesurfer[i] = WaveSurfer.create({
			    		container: '#waveform'+i,
			    		waveColor: 'green',
			    		progressColor: 'purple'
					});

					wavesurfer[i].load('http://discoverbandapi.int/public/api/audio/' + vm.tracks[i].file_url);
					vm.loadedTracks.push(i);
				}
			}
		}
	}

	// Spelen nog niet helemaal gelijk af door de laadtijd
	vm.playAll = function() {
		for (var i = vm.loadedTracks.length - 1; i >= 0; i--) {
			var index = vm.loadedTracks[i];
    		wavesurfer[index].play();
		}
	}

	vm.save = function() {
		
	}

	_init();
});