app.service("bandService", function() {
	var svc = this;
	svc.testValue = "This value is from a service!";

	svc.trackArray = [];

	




	svc.testFunction = function() {
		alert("Test function called from inside service!");
	}
})