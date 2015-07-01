(function(){

  'use strict';

  angular.module('spointerMdApp')
    .controller('MainCtrl', function ($route, $mdDialog, Session, socketHandler, voteService) {

      var vm = this;

      vm.start = start;
      vm.exit = exit;
      vm.vote = voteService.send;
      vm.clear = voteService.clear;

      init();

      /* ----- PUBLIC ----- */

      function start(ev) {
        socketHandler.connect();
        $mdDialog.show({
          controller: 'SessionCtrl',
          templateUrl: 'app/session/login-dialog.html',
          targetEvent: ev
        })
        .then(function(info) {
            console.log('current room info: ', info);
            vm.username = info.name;
            vm.roomNumber = info.room;
          });
      }

      function exit() {
        socketHandler.disconnect();
        Session.clear();
        delete vm.username;
        delete vm.roomNumber;
        $route.reload();
      }

      /* ----- PRIVATE ----- */

      function init() {
        start();
      }

    });

}());

