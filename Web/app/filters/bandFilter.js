app.filter("band", function () {

    return function (trackId, list) {
        var val = false;

        angular.forEach(list, function (id) {
            if (id === trackId) {
                val = true;
            }
        });

        return val;
    }
});