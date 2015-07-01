(function(){
	
	'use strict';
	
	angular.module('spointerMdApp').directive('spVoteDisplay', function(){
		return {
			restrict: 'E',
			templateUrl: 'app/vote/vote-display.html',
			scope: {},
			controller: function($scope, $rootScope, $route, voteService, socketHandler, Session) {
				$scope.votes = undefined;
				
				socketHandler.addListener('voteReceived', function(vote) {
					voteService.getVoteQueue().push({name: vote.name, point: vote.point});
					if(Session.room().people.length === voteService.getVoteQueue().length) {
						$scope.votes = voteService.getVoteQueue();
						$rootScope.$broadcast('reveal');
					}
					$scope.$apply();
				});
				
				socketHandler.addListener('clearVotes', function() {
					voteService.clearQueue();
					$scope.votes = voteService.getVoteQueue();
					$scope.$apply();
					$rootScope.$broadcast('hide');
				});
			},
			link: function(scope) {
				scope.show = false;
				
				scope.$on('reveal', function() {
					scope.show = true;
				});
				
				scope.$on('hide', function() {
					scope.show = false;
				});
			}
		};
	});
	
}());