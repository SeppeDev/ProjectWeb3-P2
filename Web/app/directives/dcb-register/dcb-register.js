app.directive("dcbRegister", function (userService) {
    return {
        restrict: "E",
        templateUrl: "app/directives/dcb-register/dcb-register.html",
        replace: true,
        scope: {},
        controllerAs: "register",
        controller: function ($auth, $scope, $rootScope, userService, authService) {
            var vm = this;
            var authSvc = authService;
            var target = document.getElementById('register-spinner');

            var opts = {
                lines: 13 // The number of lines to draw
                , length: 28 // The length of each line
                , width: 14 // The line thickness
                , radius: 42 // The radius of the inner circle
                , scale: 0.4 // Scales overall size of the spinner
                , corners: 1 // Corner roundness (0..1)
                , color: '#000' // #rgb or #rrggbb or array of colors
                , opacity: 0.25 // Opacity of the lines
                , rotate: 0 // The rotation offset
                , direction: 1 // 1: clockwise, -1: counterclockwise
                , speed: 1 // Rounds per second
                , trail: 60 // Afterglow percentage
                , fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
                , zIndex: 2e9 // The z-index (defaults to 2000000000)
                , className: 'spinner' // The CSS class to assign to the spinner
                , top: '80%' // Top position relative to parent
                , left: '50%' // Left position relative to parent
                , shadow: false // Whether to render a shadow
                , hwaccel: false // Whether to use hardware acceleration
                , position: 'absolute' // Element positioning
            };

            vm.register = function () {
                var spinner = new Spinner(opts).spin(target);
                vm.loading = true;

                var user = {
                    username: vm.username,
                    email: vm.email,
                    password: vm.password
                };

                $auth.signup(user).then(function (response) {
                    // Registration success
                    authSvc.login(user, function () {
                        $('#register_modal').modal();
                        $('#register_modal').modal('close');
                        vm.loading = false;
                        spinner.stop();
                    }, function () {
                        vm.loading = false;
                        spinner.stop();
                    });
                }, function (response) {
                    // Registration failed
                    var errors = [];

                    for (var field in response.data) {
                        if (field === "error") {
                            errors.push("Invalid credentials");
                            break;
                        }

                        for (var i = 0; i < response.data[field].length; i++) {
                            errors.push(response.data[field][i]);
                        }
                    }

                    spinner.stop();
                    vm.loading = false;
                    vm.errors = errors;
                });
            }
        }
    }
});