'use strict';

angular.module('Soju')

.controller('UserProfileController', ['$scope', '$location', '$mdSidenav', '$log', function($scope, $location, $mdSidenav, $log) {
	
	$scope.close = function() {

		$mdSidenav('left').close()
			.then(function() {

				$log.debug('close LEFT is done');

			});

	};

	$scope.toggleList = function() {
		
		$mdSidenav('left').toggle();

	};

	$scope.user = {
		email: '',
		firstName: '',
		lastName: '',
		company: 'Cedrus',
		addressLine1: '',
		addressLine2: '',
		city: '',
		state: '',
		postalCode: ''
	};

	$scope.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
	'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
	'WY').split(' ').map(function(state) {

		return {abbrev: state};

	});

}]);

