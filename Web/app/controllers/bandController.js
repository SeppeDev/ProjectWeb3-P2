app.controller("bandController", function(bandService) {
	
	var vm = this;
	var bandSvc = bandService;

	function _init() {
		vm.gg = bandSvc.testValue;
	}

	_init();
});