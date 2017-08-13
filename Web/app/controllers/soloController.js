app.controller("soloController", function ($scope, bandService, soloService, instrumentService, filterService) {

    var vm = this;
    var bandSvc = bandService;
    var soloSvc = soloService;
    var instSvc = instrumentService;
    var fltSvc = filterService;

    function _init() {

        vm.soloTrackAudio = [];
        vm.currentAudioTrackId = "";
        vm.showNoResultsFound = false;

        /**
         * Get all instruments
         */
        instSvc.getInstruments().then(function (data) {
            vm.instruments = data.data;

            angular.forEach(vm.instruments, function (value, key) {
                fltSvc.soloFilterData[value.id] = true;
            });
        }, function (error) {
            console.log(error);
        });

        getSoloTracks();
        vm.filterData = fltSvc.soloFilterData;
        vm.trackArray = bandSvc.getTrackArray;
        vm.bandTrackIdArray = bandSvc.getTrackIdArray;
        vm.trackArrayCount = bandSvc.getTrackArrayCount;
    }

    /**
     * Load all the solo tracks in
     */
    function getSoloTracks() {

        soloSvc.getTracks().then(function (data) {
            vm.soloTracks = data.data;
            vm.filteredTracks = vm.soloTracks;
            filter();

            angular.forEach(vm.soloTracks, function (track, key) {
                newTrack = new Audio(CONSTANTS.PUBLIC_BASE_URL + '/audio/' + track.file_url);
                vm.soloTrackAudio[track.id] = newTrack;
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

        angular.forEach(vm.soloTracks, function (track, key) {
            goodSearch = true;

            if (!vm.filterData.artist == "" && !track.artist.name.match(new RegExp(vm.filterData.artist, "i"))) {
                goodSearch = false;
            }

            if (!vm.filterData.title == "" && !track.songname.match(new RegExp(vm.filterData.title, "i"))) {
                goodSearch = false;
            }

            if (!vm.filterData[track.instrument_id]) {
                goodSearch = false;
            }


            if (goodSearch) {
                vm.filteredTracks.push(track);
            }
        });

        if (vm.filteredTracks.length === 0) {
            vm.showNoResultsFound = true;
        }
        else {
            vm.showNoResultsFound = false;
        }
    }

    //Vm functions
    /**
     * Add track to the current band
     */
    vm.addToBand = function (track) {

        bandSvc.addToTrackArray(track);
    };

    /**
     * Remove track from the current band
     */
    vm.removeFromBand = function (track) {

        bandSvc.removeFromTrackArray(track);
    };

    /**
     * Play the track after checking if there is another playing currently, and if so, pausing it
     */
    vm.play = function (trackId) {

        if (vm.currentAudioTrackId != "") {
            vm.pause(vm.currentAudioTrackId);
        }

        vm.currentAudioTrackId = trackId;
        vm.soloTrackAudio[trackId].play();
    };

    /**
     * Pause the track
     */
    vm.pause = function (trackId) {

        vm.soloTrackAudio[trackId].pause();
        vm.currentAudioTrackId = "";
    };

    //Watches
    $scope.$watch(
        function () {
            return vm.filterData
        }, function () {
            if (vm.filterData) {
                filter();
            }
        }, true);

    _init();
});