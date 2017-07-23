app.controller("mergedController", function($scope, mergedService, filterService) {
	
	var vm  		= this;
	var mgdSvc 		= mergedService;
	var fltSvc 		= filterService;
	var user_id		= null;

	if(JSON.parse(getCookie('user')).userId)
	{
		var user_id 	= JSON.parse(getCookie('user')).userId;
	}
	

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
					newTrack = new Audio(CONSTANTS.PUBLIC_BASE_URL + '/audio/' + track.file_url);
					vm.mergedTrackAudio[track.id] = newTrack;
				});

				for (var i = vm.mergedTracks.length - 1; i >= 0; i--) {
					vm.voteCountPerTrack[vm.mergedTracks[i].id] = vm.mergedTracks[i].merged_track_votes.length;
				}
			}, function(error) {

				console.log(error);
			});
	}

	function getUserVotes() {
		if(user_id != null)
		{
			mergedService.getUserVotes(user_id)
			.then(function(data) {
				console.log(data);
				vm.votedtracks = data.data;
				for (var i = vm.votedtracks.length - 1; i >= 0; i--) {
					vm.votedTrackArray.push(vm.votedtracks[i].merged_track_id);
				}
				console.log(vm.votedTrackArray);
			}, function(error) {

				console.log(error);
			});
		}
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
		getMergedTracks();
		getUserVotes();
		vm.filterData 			= fltSvc.mergedFilterData;
		vm.voteCountPerTrack 	= [];
		vm.coloredHands 		= [];
		vm.votedTrackArray 		= [];
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
        		vm.votedTrackArray.push(id);
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

	_init();
});