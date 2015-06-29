(function(){

  'use strict';

  angular.module('spointerMdApp').factory('socketHandler', function() {

    var socket;

    var service = {
      connect: connect,
      disconnect: disconnect,
      isConnected: isConnected,
      addListener: addListener,
      removeListener: removeListener,
      emit: emit
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

    function emit(event, data) {
      socket.emit(event, data);
    }

  });


}());
