app.controller("homeController", function() {
	var vm = this;

	function _init() {
		vm.test = "This value has been initiated through _init() and bound to the scope!";
	}

	_init();
});