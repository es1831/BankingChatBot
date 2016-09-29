'use strict';

angular.module('Soju')

.controller('ChatBotController', ['$scope', 'ChatBotService', 'initChatBot', function($scope, ChatBotService, initChatBot) {
	
	$scope.messages = [];
	$scope.input = '';
	var res = initChatBot,
		botResponse = {
			'username': 'WatsonBankingBot',
			'content': res.output.text[0]
		},
		context = res.context;
	$scope.messages.push(botResponse);
	
	$scope.send = function() {
		
		console.log('What is input', $scope.messages);
		var formattedInput = {
				'username': 'You',
				'content': $scope.input
			},
			text = $scope.input,
			payload = {
				'input': {
					'text': text
				},
				'context': context
			};
		$scope.input = '';
		$scope.messages.push(formattedInput);
		console.log('context', context);
		console.log('payload', payload);
		
		ChatBotService.postMessage(payload).then(function(response) {
			
			console.log('response', response);
			botResponse = {
				'username': 'WatsonBankingBot',
				'content': response.output.text[0]
			};
			context = response.context;
			$scope.messages.push(botResponse);
		
		});
	
	};
	
}]);
