app.controller("homeController", function(instrumentService, filterService) {
	
	var vm = this;
	var instSvc = instrumentService;
	var fltSvc = filterService;

	function _init() {
		vm.filterData = fltSvc.soloFilterData;
	}

	_init();
});