app.controller("profileController", function (userService) {

    var vm = this;
    var userSvc = userService;
    var target = document.getElementById('update-profile-spinner');

    /**
     * Custom spinner
     */
    var opts = {
        lines: 13 // The number of lines to draw
        , length: 28 // The length of each line
        , width: 12 // The line thickness
        , radius: 42 // The radius of the inner circle
        , scale: 0.15 // Scales overall size of the spinner
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
        , top: '89%' // Top position relative to parent
        , left: '25.5%' // Left position relative to parent
        , shadow: false // Whether to render a shadow
        , hwaccel: false // Whether to use hardware acceleration
        , position: 'absolute' // Element positioning
    };

    function _init() {
        userSvc.getUser().then(function (data) {
            vm.username = data.data.username;
            vm.email = data.data.email;
        });
    }

    /**
     * Update the userprofile
     *
     * Start the spinner
     * Update the userinfo
     * Post the new uwerinfo
     * Stop the spinner
     */
    vm.update = function () {
        var spinner = new Spinner(opts).spin(target);
        vm.loading = true;

        var userinfo = {
            username: vm.username,
            email: vm.email
        };

        userSvc.updateUser(userinfo).then(function (data) {
            spinner.stop();
            vm.loading = false;
        }, function (error) {
            spinner.stop();
            vm.loading = false;
        });
    };

    _init();
});