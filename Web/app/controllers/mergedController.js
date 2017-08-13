app.controller("mergedController", function ($scope, mergedService, filterService, $cookies) {

    var vm = this;
    var mgdSvc = mergedService;
    var fltSvc = filterService;

    var user = null;

    function _init() {
        getUser();
        getMergedTracks();

        vm.mergedTrackAudio = [];
        vm.currentAudioTrackId = "";
        vm.filterData = fltSvc.mergedFilterData;
        vm.coloredHands = [];
        vm.votedTrackArray = [];
    }

    function getUser() {
        if ($cookies.getObject('user')) {
            user = $cookies.getObject('user');
            return true;
        }

        return false;
    }

    /**
     * Get all the merged tracks
     * Filter the tracks
     * Add audio and votecounter per track
     */
    function getMergedTracks() {
        mergedService.getTracks()
            .then(function (data) {
                vm.mergedTracks = data.data;
                vm.filteredTracks = vm.mergedTracks;
                filter();

                angular.forEach(vm.mergedTracks, function (track, key) {
                    newTrack = new Audio(CONSTANTS.PUBLIC_BASE_URL + '/audio/' + track.file_url);
                    vm.mergedTrackAudio[track.id] = newTrack;
                });

            }, function (error) {
                console.log(error);
            });
    }

    /**
     * Filter all tracks according to the filderData the user has given
     */
    function filter() {

        vm.filteredTracks = [];

        angular.forEach(vm.mergedTracks, function (track, key) {

            goodSearch = true;

            if (!vm.filterData.artist == "" && !track.artist.name.match(new RegExp(vm.filterData.artist, "i"))) {
                goodSearch = false;
            }

            if (!vm.filterData.title == "" && !track.songname.match(new RegExp(vm.filterData.title, "i"))) {
                goodSearch = false;
            }


            if (goodSearch) {
                vm.filteredTracks.push(track);
            }
        })
    }

    //Vm functions
    /**
     * Pause the current playing audiotrack if there is any
     * Start the new audiotrack
     */
    vm.play = function (trackId) {

        if (vm.currentAudioTrackId != "") {
            vm.pause(vm.currentAudioTrackId);
        }

        vm.currentAudioTrackId = trackId;
        vm.mergedTrackAudio[trackId].play();
    };

    vm.pause = function (trackId) {

        vm.mergedTrackAudio[trackId].pause();
        vm.currentAudioTrackId = "";
    };

    vm.download = function (id) {

        window.open(CONSTANTS.API_BASE_URL + '/mergedtracks/' + id + '/download', '_blank', '');
    };

    /**
     * Upvote the selected track
     */
    vm.vote = function (id) {

        if (!user && !getUser()) {
            $('#login_modal').modal();
            $('#login_modal').modal('open');

            return;
        }

        var data = {
            track_id: id
        };

        mgdSvc.insertVote(data).then(function (data) {
            vm.votedTrackArray.push(id);
            getMergedTracks();
        }, function (error) {
            console.log(error);
        });
    };

    vm.userHasVoted = function (track) {
        if (!user && !getUser()) {
            return;
        }

        for (var i = 0; i < track.votes.length; i++) {
            if (track.votes[i].user_id === user.id) {
                return true;
            }
        }

        return false;
    };

    //Watches
    $scope.$watch(
        function () {
            return vm.filterData
        },
        function () {

            if (vm.filterData) {
                filter();
            }
        }, true);

    _init();
});