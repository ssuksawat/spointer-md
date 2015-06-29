(function(){

  'use strict';

  angular.module('spointerMdApp')
    .controller('SessionCtrl', function ($scope, $mdDialog, $mdToast, sessionService, Session, socketHandler) {

      $scope.create = create;
      $scope.join = join;

      init();

      /* ----- PUBLIC ----- */

      function create(name) {
        socketHandler.addListener('roomCreated', function(roomNumber) {
          console.log('room # is: ', roomNumber);
          $mdToast.show($mdToast.simple().content('Room created! Room number is ' + roomNumber));
          Session.user().username = name;
          Session.room().number = roomNumber;
          Session.room().people = [name];

          socketHandler.removeListener('roomCreated');
          $mdDialog.hide({name: name, room: roomNumber});
        });

        sessionService.createRoom(name);
      }

      function join(name, roomNumber) {
        sessionService.joinRoom(name, roomNumber);
        Session.user().username = name;
        Session.room().number = roomNumber;

        $mdDialog.hide({name: name, room: roomNumber});
      }

      /* ----- PRIVATE ----- */

      function init() {
        //Add session event listener
        socketHandler.addListener('updateRoom', function(data) {
          console.log('update room', data);
          $mdToast.show($mdToast.simple().content(data.name + ' has joined the room.'));

          Session.room().people = data.room.people;
          console.log(Session.room().people);
        });
      }

    });

}());

