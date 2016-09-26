'use strict';

angular.module('Soju')
.factory('featureToggle', ['$rootScope', function($rootScope) {

	return {
		features: {
			'auth': false
		},
		init: function() {

			$rootScope.features = this.features;

		}
	};

}]);
