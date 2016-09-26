'use strict';

angular.module('Soju')

.controller('LandingController', ['$scope', '$anchorScroll', '$location', '$mdSidenav', function($scope, $anchorScroll, $location, $mdSidenav) {

	$scope.isLandingStyle = true;

	$scope.gotoAnchor = function(eID) {

		var old = $location.hash();
		$location.hash(eID);
		$anchorScroll();
		$mdSidenav('left').close();
		$location.hash(old);

	};

	$scope.toggleList = function() {

		$mdSidenav('left').toggle();

	};

}]);
