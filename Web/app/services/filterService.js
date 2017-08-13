app.service("filterService", function (instrumentService) {

    var svc = this;
    var instSvc = instrumentService;

    svc.createSoloFilterData = function () {
        svc.soloFilterData = {
            "artist": "",
            "title": ""
        };
    };

    svc.createMergedFilterData = function () {
        svc.mergedFilterData = {
            "artist": "",
            "title": ""
        };
    };

    function _init() {
        console.log('test');
        svc.createSoloFilterData();
        svc.createMergedFilterData();
    }

    _init();
});