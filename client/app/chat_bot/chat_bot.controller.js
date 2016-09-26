'use strict';

angular.module('Soju')

.controller('ChatBotController', ['$scope', 'ChatBotService', 'initChatBot', function($scope, ChatBotService, initChatBot) {
	
	console.log('helllllooooooo');
	$scope.messages = [];

	$scope.input = '';
	var response = initChatBot;
	console.log('response', response);
	var botResponse = {
		'username': 'WatsonBankingBot',
		'content': response.output.text[0]
	}
	$scope.messages.push(botResponse);
	var context = response.context;
	
	$scope.send = function() {
		console.log('What is input', $scope.messages);
		var formattedInput = {
			'username': 'me',
			'content' : $scope.input
		};
		var text = $scope.input;
		$scope.input = '';
		$scope.messages.push(formattedInput);
		console.log('context', context);
		var payload = {
			"input": {
				"text": text
			},
			"context": context
		}
		console.log('payload', payload);
		
		ChatBotService.postMessage(payload).then(function(response) {
			console.log('response', response);
			var botResponse = {
				'username': 'WatsonBankingBot',
				'content': response.output.text[0]
			}
			$scope.messages.push(botResponse);
			context = response.context;
		});
	}
	
}]);
