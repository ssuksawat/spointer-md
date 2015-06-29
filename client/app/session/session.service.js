(function(){

  'use strict';

  angular.module('spointerMdApp').factory('sessionService', function($mdToast, socketHandler) {

    var service = {
      createRoom: createRoom,
      joinRoom: joinRoom
    };

    return service;

    /* ----- PUBLIC ----- */

    function createRoom(name) {
      if(!name) {
        console.error('Name is required in order to create room', name);
      } else {
        socketHandler.emit('createRoom', name);
      }
    }

    function joinRoom(name, room) {
      if(!name || !room) {
        console.error('Both Name and Room Number are required to join a room', name, room);
      } else {
        socketHandler.emit('joinRoom', {name: name, room: room});
      }
    }

  });

}());
