app.directive("dcbMergeprocessing", function() {
    return {
        restrict: "E",
        templateUrl: "app/directives/dcb-mergeprocessing/dcb-mergeprocessing.html",
        replace: true,
        scope: {},
        controllerAs: "processing",
        controller: function($interval) 
        {
            var vm          = this;
            var target      = document.getElementById('processing-spinner');

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
                , top: '40%' // Top position relative to parent
                , left: '50%' // Left position relative to parent
                , shadow: false // Whether to render a shadow
                , hwaccel: false // Whether to use hardware acceleration
                , position: 'absolute' // Element positioning
            }

            var textArray       = [
                "Tuning instruments...", 
                "Adjusting amp settings...", 
                "Soundchecking...", 
                "Recording...", 
                "Mixing sound...", 
                "Finishing up..."
            ];

            var spinner         = new Spinner(opts).spin(target);
            var currentIndex    = 0;

            $interval(function() {
                if($('#processing_modal').is(":visible"))
                {
                    vm.text = textArray[currentIndex];
                    currentIndex++;

                    if(currentIndex >= textArray.length - 1)
                    {
                        currentIndex = 0;
                    }
                }
            }, 4000);
        }
    }
})