(function(){

  'use strict';

  angular.module('spointerMdApp')
    .controller('SessionCtrl', function ($scope, $mdDialog, Session, eventHandler) {

      $scope.create = create;
      $scope.join = join;

      init();

      /* ----- PUBLIC ----- */

      function create(name) {
        eventHandler.addListener('roomCreated', function(roomNumber) {
          console.log('room # is: ', roomNumber);
          eventHandler.removeListener('roomCreated');
          Session.user().name = name;
          Session.room().number = roomNumber;
          Session.room().people = [name];

          $mdDialog.hide({name: name, room: roomNumber});
        });

        eventHandler.createRoom(name);
      }

      function join(name, roomNumber) {
        eventHandler.joinRoom(name, roomNumber);
        Session.user().name = name;
        Session.room().number = roomNumber;

        $mdDialog.hide({name: name, room: roomNumber});
      }

      /* ----- PRIVATE ----- */

      function init() {
        //Add session event listener
        eventHandler.addListener('updateRoom', function(room) {
          Session.room().people = room.people;
        });
      }

    });

}());

