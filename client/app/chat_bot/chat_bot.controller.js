'use strict';

angular.module('Soju')

.controller('ChatBotController', ['$scope', 'ChatBotService', function($scope, ChatBotService) {
	
	console.log('helllllooooooo');

	$scope.message = '';
	$scope.go = function() {
		console.log('posting', $scope.message);
		ChatBotService.postMessage($scope.message).then(function(response) {
			console.log('response', response);
		});
	}
	
}]);
