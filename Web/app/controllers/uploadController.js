app.controller("uploadController", function(Upload) {
  
  var vm      = this;
  var target  = document.getElementById('upload-spinner');

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
  }

  function _init() {
    
  }

  vm.uploadFile = function (file) {
        console.log('TRYING');
        console.log(file);
        Upload.upload({
            url: CONSTANTS.API_BASE_URL + "/upload",
            fileFormDataName: 'song',
            sendFieldsAs: 'form',
            data: {song: file}
        }).then(function (resp) {
            console.log(resp);
        }, function (resp) {
            console.log('Error');
        }, function (evt) {
            console.log(evt);
        });
    };

  _init();
});