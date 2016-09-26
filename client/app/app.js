'use strict';

var app = angular.module('Soju', ['auth0.lock', 'angular-jwt', 'ngRoute', 'ngMaterial', 'ngMessages', 'chart.js', 'ui.knob']);

app.config(['$routeProvider', '$locationProvider', '$mdThemingProvider', '$httpProvider', 'lockProvider', 'jwtOptionsProvider', function($routeProvider, $locationProvider, $mdThemingProvider, $httpProvider, lockProvider, jwtOptionsProvider) {

	lockProvider.init({
		clientID: '**clientid**',
		domain: '**mydomain**.auth0.com',
		options: {
			auth: {
				redirectUrl: location.href + 'home',
				responseType: 'token'
			}
		}
	});

	// Configuration for angular-jwt
	jwtOptionsProvider.config({
		tokenGetter: function() {

			return localStorage.getItem('id_token');

		},
		whiteListedDomains: ['localhost'],
		unauthenticatedRedirectPath: '/'
	});

	// Add the jwtInterceptor to the array of HTTP interceptors
	// so that JWTs are attached as Authorization headers
	$httpProvider.interceptors.push('jwtInterceptor');

	$routeProvider.
		when('/', {
			templateUrl: 'landing/landing.html',
			controller: 'LandingController'
		}).
		when('/home', {
			templateUrl: 'home/home.html',
			controller: 'HomeController'
		}).
		when('/newsfeed', {
			templateUrl: 'newsfeed/newsfeed.html',
			controller: 'NewsfeedController'
		}).
		when('/user_profile', {
			templateUrl: 'user_profile/user_profile.html',
			controller: 'UserProfileController'
		}).
		when('/feed', {
			templateUrl: 'feed/feed.html',
			controller: 'FeedController',
			resolve: {
				nytFeed: ['Feed', function(Feed) {

					return Feed.getNews();

				}]
			}
		});
		// otherwise({
		// 	redirectTo: '/'
		// }),
	$locationProvider.html5Mode(true);
	$mdThemingProvider.theme('default');

	var lightGreyMap = $mdThemingProvider.extendPalette('red', {
		'500': '#eee',
		'contrastDefaultColor': 'dark'
	});
	$mdThemingProvider.definePalette('lightGrey', lightGreyMap);
	$mdThemingProvider.theme('default')
			.primaryPalette('lightGrey');

}]);
