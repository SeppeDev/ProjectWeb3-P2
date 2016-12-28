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

	function _init() {
		getSoloTracks();
		vm.instruments = instSvc.instruments;
		vm.filterData = fltSvc.filterData;

		//vm.track1.play();
		//setTimeout(function(){playAudioFile(vm.track2)}, 400);
	}

	//Vm functions
	vm.addToBand = function(track) {
		
		bandSvc.trackArray.push(track);
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



	vm.track1 = new Audio("dist/audio/Behemoth - Conquer All - Drum.mp3");
	vm.track2 = new Audio("dist/audio/Behemoth - Conquer All - Guitar.mp3");


	_init();
});