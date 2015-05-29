(function(){

  'use strict';

  angular.module('spointerMdApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'ngMaterial'
  ])
    .config(function ($routeProvider, $locationProvider) {
      $routeProvider
        .otherwise({
          redirectTo: '/'
        });

      $locationProvider.html5Mode(true);
    });

}());
