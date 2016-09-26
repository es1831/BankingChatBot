(function() {

	'use strict';

	angular.module('Soju')
	.service('authService', authService);

	authService.$inject = ['$rootScope', '$location', 'lock', 'authManager'];

	function authService($rootScope, $location, lock, authManager) {

		$rootScope.userProfile = JSON.parse(localStorage.getItem('profile')) || {};

		function login() {

			lock.show();

		}

		// Logging out just requires removing the user's
		// id_token and profile
		function logout() {

			localStorage.removeItem('id_token');
			localStorage.removeItem('profile');
			authManager.unauthenticate();
			$rootScope.userProfile = {};
			window.location = '/';

		}

		// Set up the logic for when a user authenticates
		// This method is called from app.run.js
		function registerAuthenticationListener() {

			lock.on('authenticated', function(authResult) {

				localStorage.setItem('id_token', authResult.idToken);
				authManager.authenticate();

				lock.getProfile(authResult.idToken, function(error, profile) {

					if (error) {

						console.log(error);

					}

					localStorage.setItem('profile', JSON.stringify(profile));
					$rootScope.$broadcast('userProfileSet', profile);

				});

			});

		}

		function isAuthenticated() {
			
			var idToken = localStorage.getItem('id_token') || null;
			return (idToken === null) ? false : true;

		}

		return {
			login: login,
			logout: logout,
			registerAuthenticationListener: registerAuthenticationListener,
			isAuthenticated: isAuthenticated
		};

	}

})();
