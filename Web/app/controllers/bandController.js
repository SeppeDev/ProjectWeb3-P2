app.controller("bandController", function (bandService) {

    var vm = this;
    var bandSvc = bandService;

    function _init() {
        vm.trackArray = bandSvc.getTrackArray;
    }

    _init();
});