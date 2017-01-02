app.directive("dcbRegister", function(userService) {
	return {
		restrict: "E",
		templateUrl: "app/directives/dcb-register/dcb-register.html",
		replace: true,
		scope: {},
		controllerAs: "register",
		controller: function($auth, $rootScope) {
			var vm 			= this;
			var userSvc 	= userService;
			var target 		= document.getElementById('register-spinner');

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
				, top: '60%' // Top position relative to parent
				, left: '50%' // Left position relative to parent
				, shadow: false // Whether to render a shadow
				, hwaccel: false // Whether to use hardware acceleration
				, position: 'absolute' // Element positioning
			}


			
			vm.register = function() {
				var spinner = new Spinner(opts).spin(target);
	        	vm.loading 	= true;

				var user = {
				  	username: vm.username,
				  	email: vm.email,
				  	password: vm.password
				};

				$auth.signup(user).then(function(response) {
					// Registration success
					$auth.login(user).then(function(data) {
	            		// Authentication success
		            	spinner.stop();
		            	vm.loading = false;
		            	$('#register_modal').modal();
						$('#register_modal').modal('close');

						userSvc.getUser().then(function (data) {
							$rootScope.username = data.data.username;
						});
		            }, 
		            function(error){
		            	// Authentication failed
		            	spinner.stop();
		            	vm.loading = false;
		            	console.log(error);
		            });
				})
				.catch(function(response) {
					// Registration failed
				  	spinner.stop();
				  	vm.loading = false;
				    console.log(response);
				});
			}
		}
	}
})