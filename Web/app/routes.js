app.config(function($stateProvider, $urlRouterProvider, $authProvider) {
  $authProvider.loginUrl    = CONSTANTS.API_BASE_URL + '/login';
  $authProvider.signupUrl   = CONSTANTS.API_BASE_URL + '/register';
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
    .state('band', {
      url: "/band",
      templateUrl: "app/pages/band.html",
      controller: "bandController as band"
    })
    .state('merge', {
      url: "/merge",
      templateUrl: "app/pages/merge.html",
      controller: "mergeController as merge"
    })
    .state('profile', {
      url: "/profile",
      templateUrl: "app/pages/profile.html",
      controller: "profileController as profile"
    })
});