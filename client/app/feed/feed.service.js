'use strict';

angular.module('Soju')

.factory('Feed', ['$http', function($http) {

	return {
		getNews: function() {

			return $http.get('/api/feed').then(function(res) {
				
				return res.data;
				
			});

		}

	};

}]);
