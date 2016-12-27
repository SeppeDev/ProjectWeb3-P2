app.controller("soloController", function($scope, bandService, soloService) {
	
	var vm = this;
	var bandSvc = bandService;
	var soloSvc = soloService;

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
			
			}, function(error)
			{
				console.log(error);
			});
	}

	function createFormData()
	{
		vm.formData = {	"artist": "layer",
						"title": "blood",
						};

		angular.forEach(vm.instruments, function(value, key)
		{
			vm.formData[value.id] = true;
		});
	}

	function filter()
	{
		vm.filteredTracks = [];

		angular.forEach(vm.soloTracks, function(track, key)
		{
			console.log(track);
			goodSearch = true;

			if(!vm.formData.artist == "" && !track.artist.name.match(new RegExp(vm.formData.artist, "i")))
			{
				goodSearch = false;
			}

			if(!vm.formData.title == "" && !track.songname.match(new RegExp(vm.formData.title, "i")))
			{
				goodSearch = false;
			}

			if(!vm.formData[track.instrument_id])
			{
				goodSearch = false;
			}


			if(goodSearch)
			{
				vm.filteredTracks.push(track);
			}
			console.log(vm.filteredTracks);
		});
	}

	function _init() {
		createFormData();

		getSoloTracks();

		//vm.track1.play();
		//setTimeout(function(){playAudioFile(vm.track2)}, 400);
	}

	//Vm functions
	vm.advancedFilter = function(track)
	{
		return track.artist.name.match(new RegExp(vm.formData.artist, "i"))
				&&
				track.songname.match(new RegExp(vm.formData.title, "i"));
	}

	vm.addToBand = function(track) {
		
		bandSvc.trackArray.push(track);
	}

	//Watches
	$scope.$watch(
		function () { return vm.formData }, 
		function () {

			if(vm.formData) 
			{		
				filter();
			}
		}, true);



	vm.track1 = new Audio("dist/audio/Behemoth - Conquer All - Drum.mp3");
	vm.track2 = new Audio("dist/audio/Behemoth - Conquer All - Guitar.mp3");

	vm.instruments = [{
							"name":"Guitar",
							"id":1
						},
						{
							"name":"Drum",
							"id":2
						},
						{
							"name":"Bass",
							"id":3
						},
						{
							"name":"Piano",
							"id":4
						}];


	_init();
});