app.service("filterService", function(instrumentService) {
	
	var svc = this;
	var instSvc = instrumentService;


	svc.createSoloFilterData = function()
	{
		svc.soloFilterData = {	"artist": "",
								"title": "",
								};

		angular.forEach(instSvc.instruments, function(value, key)
		{
			svc.soloFilterData[value.id] = true;
		});
	}

	svc.createMergedFilterData = function()
	{
		svc.mergedFilterData = {	"artist": "",
									"title": "",
									};
	}

	function _init() {
		svc.createSoloFilterData();
		svc.createMergedFilterData();
	}

	_init();
})