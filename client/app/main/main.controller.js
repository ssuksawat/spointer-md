(function(){

  'use strict';

  angular.module('spointerMdApp')
    .controller('MainCtrl', function ($mdDialog, Session, eventHandler) {

      var vm = this;

      vm.start = start;
      vm.exit = exit;

      init();

      /* ----- PUBLIC ----- */

      function start(ev) {
        eventHandler.connect();
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
        eventHandler.disconnect();
        Session.clear();
        delete vm.username;
        delete vm.roomNumber;
      }

      /* ----- PRIVATE ----- */

      function init() {
        //eventHandler.connect();
      }

    });

}());

