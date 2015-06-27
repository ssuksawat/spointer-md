(function(){

  'use strict';

  angular.module('spointerMdApp').factory('Session', function() {
    var user, room;

    var service = {
      user: user,
      room: room,
      clear: clear
    };

    return service;

    /* ----- PUBLIC ----- */

    function user() {
      user = user || {};
      return user;
    }

    function room() {
      room = room || {};
      return room;
    }

    function clear() {
      user = room = undefined;
    }

  });

}());
