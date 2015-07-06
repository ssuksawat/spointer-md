(function(){

  'use strict';

  angular.module('spointerMdApp')
    .controller('MainCtrl', function ($scope, $window, $mdDialog, Session, socketHandler, voteService) {

      var vm = this;

      vm.start = start;
      vm.exit = exit;
      vm.vote = vote;
      vm.clear = clear;

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
        $window.location.reload();
      }
      
      function vote(point) {
        vm.selected = point;
        voteService.send(point);
        vm.waiting = true;
        console.log('selected', vm.selected);
      }
      
      function clear() {
        vm.selected = undefined;
        voteService.clear();
        vm.waiting = false;
      }

      /* ----- PRIVATE ----- */

      function init() {
        start();
        
        $scope.$on('reveal', function() {
          vm.waiting = false;
          vm.selected = undefined;
        });
      }

    });

}());

