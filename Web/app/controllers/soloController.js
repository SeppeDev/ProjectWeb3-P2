app.controller("soloController", function(bandService) {
	
	var vm = this;
	var bandSvc = bandService;

	playAudioFile = function(track)
	{
		track.play();
	}

	function _init() {
		//vm.track1.play();
		//setTimeout(function(){playAudioFile(vm.track2)}, 400);
	}


	vm.addToBand = function(track) {
		console.log(track);
		bandSvc.trackArray.push(track);
		console.log("TRACKLIST: " + bandSvc.trackArray);
	}

	_init();


	vm.track1 = new Audio("dist/audio/Behemoth - Conquer All - Drum.mp3");
	vm.track2 = new Audio("dist/audio/Behemoth - Conquer All - Guitar.mp3");

	vm.instruments = ["Guitar", "Bass", "Vocals", "Drums", "Keys"];
	vm.soloTracks = [{
						"id": 1,
						"songname": "Conquer All",
						"string": "/dist/audio/Behemoth - Conquer All - Drum.mp3",
						"user_id": 1,
						"instrument_id": 1,
						"artist_id": 1
					},
					{
						"id": 1,
						"songname": "Conquer All",
						"string": "/dist/audio/Behemoth - Conquer All - Guitar.mp3",
						"user_id": 2,
						"instrument_id": 2,
						"artist_id": 1
					}]
});