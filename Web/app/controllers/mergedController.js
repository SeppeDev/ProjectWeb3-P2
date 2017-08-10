app.controller("mergedController", function($scope, mergedService, filterService) {
	
	var vm  		= this;
	var mgdSvc 		= mergedService;
	var fltSvc 		= filterService;

	var user_id = null;

	if(getCookie('user')) {
		user_id = JSON.parse(getCookie('user')).userId;
	}
	

	//Private functions
	function playAudioFile(track)
	{
		track.play();
	}

	/**
	 * Get and decode a cookie by its name
	 * @param cname 
	 */
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

	/**
	 * Get all the merged tracks
	 * Filter the tracks
	 * Add audio and votecounter per track
	 */
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

			}, function(error) {
				console.log(error);
			});
	}

	/**
	 * Filter all tracks according to the filderData the user has given
	 */
	function filter() {
		
		vm.filteredTracks = [];

		angular.forEach(vm.mergedTracks, function(track, key) {

			goodSearch = true;

			if(!vm.filterData.artist == "" && !track.artist.name.match(new RegExp(vm.filterData.artist, "i"))) {
				goodSearch = false;
			}

			if(!vm.filterData.title == "" && !track.songname.match(new RegExp(vm.filterData.title, "i"))) {
				goodSearch = false;
			}


			if(goodSearch) {
				vm.filteredTracks.push(track);
			}
		})
	}

	function _init() {
		vm.mergedTrackAudio 	= [];
		vm.currentAudioTrackId 	= "";
		getMergedTracks();
		vm.filterData 			= fltSvc.mergedFilterData;
		vm.coloredHands 		= [];
		vm.votedTrackArray 		= [];
	}

	//Vm functions
	/**
	 * Pause the current playing audiotrack if there is any
	 * Start the new audiotrack
	 */
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

	/**
	 * Upvote the selected track
	 */
	vm.upVote = function(id) {
	    var data = {
            track_id: id,
            user_id: user_id
	    }

	    mgdSvc.insertVote(data).then(function(data) {
			vm.votedTrackArray.push(id);
			getMergedTracks();
        }, function(error)
        {
          console.log(error);
        });
	}

    vm.userHasVoted = function(track) {
		for(var i = 0; i < track.votes.length; i++) {
			if(track.votes[i].user_id === user_id) {
				return true;
			}
		}

        return false;
    };

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