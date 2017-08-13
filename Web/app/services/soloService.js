app.service("soloService", function ($http) {

    //Globals
    var svc = this;

    //Private functions
    function getData(url, options) {

        !options ? options = {} : "";

        return $http.get(url, options)
    }

    //Svc functions
    svc.getTracks = function () {

        var url = CONSTANTS.API_BASE_URL + "/tracks";

        return getData(url);
    };

    svc.getTrackById = function (id) {

        var url = CONSTANTS.API_BASE_URL + "/tracks/" + id;

        return getData(url);
    };

    svc.insertTrack = function (data) {

        return $http.post(CONSTANTS.API_BASE_URL + "/tracks/create", data);
    }
});