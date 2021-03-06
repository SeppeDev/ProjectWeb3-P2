app.directive("dcbHeader", function (bandService) {

    return {
        restrict: "E",
        templateUrl: "app/directives/dcb-header/dcb-header.html",
        replace: true,
        scope: {},
        controllerAs: "head",
        controller: function ($scope, userService, authService, $auth, $rootScope) {

            var vm = this;
            var userSvc = userService;
            var authSvc = authService;
            var bandSvc = bandService;

            function _init() {

                vm.trackArray = bandSvc.getTrackArray;
                vm.trackArrayCount = bandSvc.getTrackArrayCount;

                if ($auth.isAuthenticated()) {
                    userSvc.getUser().then(function (data) {
                        $rootScope.username = data.data.username;
                    });
                }
            }

            vm.showLogin = function () {

                $('#login_modal').modal();
                $('#login_modal').modal('open');
            };

            vm.logout = function () {

                authSvc.logout();
            };

            vm.showRegister = function () {

                $('#register_modal').modal();
                $('#register_modal').modal('open');
            };

            vm.showBand = function () {

                $('#band_modal').modal();
                $('#band_modal').modal('open');
            };

            vm.isAuthenticated = function () {

                return $auth.isAuthenticated();
            };

            _init();

            //Watches
            $scope.$watch(
                function () {
                    return authSvc.user
                },
                function () {

                    vm.user = authSvc.user;
                });
        }
    }
});