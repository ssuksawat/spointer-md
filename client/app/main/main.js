(function(){

  'use strict';

  angular.module('spointerMdApp')
    .config(function ($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'app/main/main.html',
          controller: 'MainCtrl',
          controllerAs: 'vm'
        });
    });

}());
