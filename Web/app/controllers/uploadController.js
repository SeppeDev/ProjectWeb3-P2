app.controller("uploadController", function(Upload, artistService, instrumentService, soloService) {
  
  var vm            = this;
  var soloSvc       = soloService;
  var artistSvc     = artistService;
  var instrumentSvc = instrumentService;
  var target        = document.getElementById('upload-spinner');
  
  var opts = {
      lines: 13 // The number of lines to draw
    , length: 28 // The length of each line
    , width: 12 // The line thickness
    , radius: 42 // The radius of the inner circle
    , scale: 0.30 // Scales overall size of the spinner
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

  function _init() {
      vm.uploaded       = false;
      vm.showform       = false;

      vm.instruments    = instrumentSvc.getInstruments()
      .then(function(data)
      {
        vm.instruments  = data.data;
        console.log(data.data);
      }, function(error)
      {
        console.log(error);
      });

      vm.artists        = artistSvc.getArtists()
      .then(function(data)
      {
        console.log(data.data);
        vm.artists      = data.data;
      
      }, function(error)
      {
        console.log(error);
      });
  }

  vm.uploadFile = function (file) {
        var spinner = new Spinner(opts).spin(target);
        vm.loading  = true;
        vm.uploaded = false;

        Upload.upload({
            url: CONSTANTS.API_BASE_URL + "/upload",
            fileFormDataName: 'song',
            sendFieldsAs: 'form',
            data: {
              song: file
            }
        })
        .then(function (resp) {
            vm.filename     = resp.data.name;
            vm.tracklength  = resp.data.length;
            spinner.stop();
            vm.loading      = false;
            vm.uploaded     = true;

            // Initialize form
            vm.showform     = true;
            $('select').material_select();
        }, 
        function (resp) {
            vm.loading  = false;
            spinner.stop();
            console.log('Error');
        });
    };

    vm.save = function () {
      var user_id = JSON.parse(getCookie('user')).userId;
      var data = {
            name: vm.songname,
            file_url: vm.filename,
            track_length: vm.tracklength,
            user_id: user_id,
            instrument_id: vm.instrumentsdropdown,
            artist_id : vm.artistsdropdown
        }

      soloSvc.insertTrack(data)
        .then(function(data)
        {
          console.log(data);
        }, function(error)
        {
          console.log(error);
        });
    }

    function getCookie(cname) {
          var name = cname + "=";
          var decodedCookie = decodeURIComponent(document.cookie);
          var ca = decodedCookie.split(';');
          for(var i = 0; i <ca.length; i++) {
              var c = ca[i];
              while (c.charAt(0) == ' ') {
                  c = c.substring(1);
              }
              if (c.indexOf(name) == 0) {
                  return c.substring(name.length, c.length);
              }
          }
          return "";
      }
  _init();
});