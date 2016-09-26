(function() {

	'use strict';

	angular.module('Soju')
	.run(['$rootScope', '$location', 'authService', 'authManager', 'jwtHelper', 'featureToggle', function($rootScope, $location, authService, authManager, jwtHelper, featureToggle) {
		
		if (featureToggle.features.auth) {
			
			// Put the authService on $rootScope so its methods
			// can be accessed from the nav bar
			$rootScope.authService = authService;

			// Register the authentication listener that is
			// set up in auth.service.js
			authService.registerAuthenticationListener();

			// Use the authManager from angular-jwt to check for
			// the user's authentication state when the page is
			// refreshed and maintain authentication
			authManager.checkAuthOnRefresh();

			// Listen for 401 unauthorized requests and redirect
			// the user to the login page
			authManager.redirectWhenUnauthenticated();

			$rootScope.$on('$routeChangeStart', function(event) { // eslint-disable-line no-unused-vars

				if (!authService.isAuthenticated()) {

					$location.path('/');

				}

			});

			$rootScope.$on('userProfileSet', function(event, profile) {

				$rootScope.userProfile = profile;

			});

		}

	}]);

})();
