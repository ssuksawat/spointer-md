(function(){

  'use strict';

  angular.module('spointerMdApp').directive('spChat', function(socketHandler, Session) {

    return {
      restrict: 'E',
      templateUrl: 'app/chat/chat.html',
      scope: {},
      controller: function($scope) {
        $scope.sendMessage = sendMessage;

        /* ----- PUBLIC ----- */

        function sendMessage(message) {
          if (message && message.length > 0) {
            socketHandler.emit('sendChat', message);
            $scope.message = '';
          }
        }
      },
      link: function(scope, el) {
        var chatListEl = el.find('#chatList');

        /* ----- Chat Event Listener ----- */
        socketHandler.addListener('chatReceived', function(data) {
          if (data.name === Session.user().username) {
            data.name = 'You';
          }
          chatListEl.append(
            '<md-list-item class="md-2-line">' +
              '<div class="md-list-item-text">' +
                '<h4>' + data.name + '</h4>' +
                '<p>' + data.message + '</p>' +
              '</div>' +
            '</md-list-item>');
          chatListEl.append('<md-divider></md-divider>');
          chatListEl.animate({scrollTop: chatListEl.prop('scrollHeight')}, 500);
        });
      }

    };

  });

}());
