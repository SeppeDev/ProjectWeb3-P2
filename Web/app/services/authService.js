app.service("authService", function ($auth, $rootScope, $cookies, $state, userService) {

    var svc = this;
    var userSvc = userService;

    //Private functions
    function setUser(id, username, email) {

        var expirationTime = new Date();
        expirationTime.setHours(expirationTime.getHours() + 6);

        var userData = {
            id: id,
            username: username,
            email: email
        };

        svc.user = userData;

        $cookies.putObject("user", userData, {expires: expirationTime});
        $rootScope.isLoggedIn = true;
    }

    //Svc functions
    svc.login = function (credentials, callback) {

        $auth.login(credentials).then(function (data) {
            userSvc.getUser().then(function (data) {
                id = data.data.id;
                username = data.data.username;
                email = data.data.email;

                setUser(id, username, email);

                callback('success');
            });
        },
        function (error) {
            callback(error);
        });
    };

    svc.logout = function () {

        $auth.logout().then(function (data) {
            $rootScope.isLoggedIn = false;
            $rootScope.isAdmin = false;
            svc.user = null;

            $cookies.remove("user");

            $state.go("home");
        }, function (error) {

            console.log(error);
        })
    };
});