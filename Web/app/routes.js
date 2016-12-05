app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/");

  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: "app/pages/home.html",
      controller: "homeController as home"
    })
  	.state('test', {
      url: "/test",
      templateUrl: "app/pages/test.html",
      controller: "testController as test"
    })
});