app.service("filterService", function(instrumentService) {
	
	var svc = this;
	var instSvc = instrumentService;


	svc.createFilterData = function()
	{
		svc.filterData = {	"artist": "",
							"title": "",
							};

		angular.forEach(instSvc.instruments, function(value, key)
		{
			svc.filterData[value.id] = true;
		});
	}

	function _init() {
		svc.createFilterData();
	}

	_init();
})