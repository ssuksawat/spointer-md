(function(){

  'use strict';

  angular.module('spointerMdApp').factory('eventHandler', function() {

    var socket;

    var service = {
      connect: connect,
      disconnect: disconnect,
      isConnected: isConnected,
      addListener: addListener,
      removeListen: removeListener,
      createRoom: createRoom,
      joinRoom: joinRoom
    };

    return service;

    /* ----- PUBLIC ----- */

    function connect() {
      socket = io();
    }

    function disconnect() {
      socket.disconnect();
    }

    function isConnected() {
      return socket !== undefined;
    }

    function addListener(event, callback) {
      socket.on(event, function(data) {
        callback(data);
      });
    }

    function removeListener(event, callback) {
      socket.removeListener(event, callback);
    }

    function createRoom(name) {
      if(!name) {
        console.error('Name is required in order to create room', name);
      } else {
        socket.emit('createRoom', name);
      }
    }

    function joinRoom(name, room) {
      if(!name || !room) {
        console.error('Both Name and Room Number are required to join a room', name, room);
      } else {
        socket.emit('joinRoom', {name: name, room: room});
      }
    }

  });


}());
