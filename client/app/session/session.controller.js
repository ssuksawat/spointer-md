(function(){

  'use strict';

  angular.module('spointerMdApp')
    .controller('SessionCtrl', function ($scope, $mdDialog) {

      $scope.close = function() {
        $mdDialog.hide();
      };

    });

}());

