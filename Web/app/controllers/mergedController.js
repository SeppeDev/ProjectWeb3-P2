app.controller("mergedController", function($scope, mergedService, filterService) {
	
	var vm  		= this;
	var mgdSvc 		= mergedService;
	var fltSvc 		= filterService;

	//Private functions
	function playAudioFile(track)
	{
		track.play();
	}

	function getCookie(cname) {
          var name = cname + "=";
          var decodedCookie = decodeURIComponent(document.cookie);
          var ca = decodedCookie.split(';');
          for(var i = 0; i <ca.length; i++) {
              var c = ca[i];
              while (c.charAt(0) == ' ') {
                  c = c.substring(1);
              }
              if (c.indexOf(name) == 0) {
                  return c.substring(name.length, c.length);
              }
          }
          return "";
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

				for (var i = vm.mergedTracks.length - 1; i >= 0; i--) {
					vm.voteCountPerTrack[vm.mergedTracks[i].id] = vm.mergedTracks[i].merged_track_votes.length;
				}
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
		vm.mergedTrackAudio 	= [];
		vm.currentAudioTrackId 	= "";
		vm.source = "/dist/img/rockhand.png";
		getMergedTracks();
		vm.filterData 	= fltSvc.mergedFilterData;
		vm.voteCountPerTrack = [];
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

	vm.download = function(id) {
    	window.open(CONSTANTS.API_BASE_URL + '/mergedtracks/' + id + '/download', '_blank', '');  
	}

	vm.upVote = function(id) {
		var user_id = JSON.parse(getCookie('user')).userId;
	    var data = {
            track_id: id,
            user_id: user_id
	    }

	    mgdSvc.insertVote(data)
        .then(function(data)
        {
        	if(data.data.status == "OK")
        	{
        		vm.voteCountPerTrack[id]++;
        	}
        	else
        	{
        		console.log('already voted');
        	}
        }, function(error)
        {
          console.log(error);
        });
		
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