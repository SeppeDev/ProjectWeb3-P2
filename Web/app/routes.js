app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/");

  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: "app/pages/home.html",
      controller: "homeController as home"
    })
  	.state('solo', {
      url: "/solo",
      templateUrl: "app/pages/solo.html",
      controller: "soloController as solo"
    })
    .state('merged', {
      url: "/merged",
      templateUrl: "app/pages/merged.html",
      controller: "mergedController as merged"
    })
});