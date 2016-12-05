app.controller("homeController", function(testService) {
	var vm = this;
	var tstSvc = testService;

	function _init() {
		vm.test = "This value has been initiated through _init() and bound to the scope!";
		vm.svcTest = tstSvc.testValue;
	}

	_init();
});