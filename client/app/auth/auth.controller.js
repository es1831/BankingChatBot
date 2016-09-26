(function() {

	'use strict';

	angular
	.module('Soju')
	.controller('loginController', loginController);

	loginController.$inject = ['$scope', 'authService'];

	function loginController($scope, authService) {

		// Put the authService on $scope to access
		// the login method in the view
		$scope.authService = authService;

	}

})();
