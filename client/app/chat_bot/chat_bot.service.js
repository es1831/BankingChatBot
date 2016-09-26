'use strict';

angular.module('Soju')

.factory('ChatBotService', ['$http', function($http) {

	return {
		postMessage: function(data) {
			console.log('We are here', data);
			return $http.post('/api/chat_bot', data).then(function(res) {
				
				return res.data;
				
			});

		}

	};

}]);
