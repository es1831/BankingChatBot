'use strict';

angular.module('Soju')

.controller('FeedController', ['$scope', 'nytFeed', function($scope, nytFeed) {
	
	$scope.techNews = nytFeed.results;
	
}]);
