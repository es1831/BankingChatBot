angular.module('Soju')

	.factory('Newsfeed', ['$http', function($http) {

		return {
			getArticles: function() {

				return $http
					.get('/api/newsfeed')
					.then(function(response) {

						return response.data;

					});

			}
		};

	}]);
