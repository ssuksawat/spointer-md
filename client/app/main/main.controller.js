(function(){

  'use strict';

  angular.module('spointerMdApp')
    .controller('MainCtrl', function ($mdDialog) {

      var vm = this;

      vm.showLoginDialog = function (ev) {
        $mdDialog.show({
          controller: 'SessionCtrl',
          templateUrl: 'app/session/login-dialog.html',
          targetEvent: ev
        })
          .then(function(answer) {
            vm.alert = 'You said the information was "' + answer + '".';
          }, function() {
            $scope.alert = 'You cancelled the dialog.';
          });
      };

    });

}());

