'use strict';

angular.module('Soju')

.controller('MainController', ['$location', '$scope', 'featureToggle', function($location, $scope, featureToggle) {

	featureToggle.init();

	$scope.selectedMenu = function(route) {

		return route === $location.path();

	};

	$scope.navigateHome = function() {

		$location.url('/');

	};

}]);
