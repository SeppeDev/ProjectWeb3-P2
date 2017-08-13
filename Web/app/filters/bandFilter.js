app.filter("band", function () {
    return function (trackId, list) {
        angular.forEach(list, function (id) {
            if (id === trackId) {
                return true;
            }
        });

        return false;
    }
});