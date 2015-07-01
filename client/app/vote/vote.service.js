(function(){
	
	'use strict';
	
	angular.module('spointerMdApp').factory('voteService', function(socketHandler) {
		
		var service = {
			send: send,
			clear: clear,
			getVoteQueue: getVoteQueue,
			clearQueue: clearQueue
		};
		var queue = [];
		
		return service;
		
		/* ----- PUBLIC ----- */
		
		function send(point) {
			socketHandler.emit('sendVote', point);
		}
		
		function clear() {
			socketHandler.emit('clearVotes');
		}
		
		function getVoteQueue() {
			return queue;
		}
		
		function clearQueue() {
			queue = [];
		}
		
	});
	
}());