app.service("testService", function() {
	var svc = this;
	svc.testValue = "This value is from a service!";

	svc.testFunction = function() {
		alert("Test function called from inside service!");
	}
})