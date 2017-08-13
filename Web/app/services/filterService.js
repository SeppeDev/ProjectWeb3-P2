app.service("filterService", function (instrumentService) {

    var svc = this;

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

        svc.createSoloFilterData();
        svc.createMergedFilterData();
    }

    _init();
});