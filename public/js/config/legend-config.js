(function (angular) {
	'use strict';

	angular.module('Legend').config(['$qProvider', function ($qProvider) {
		$qProvider.errorOnUnhandledRejections(false);
	}]).config(['$httpProvider', function ($httpProvider) {
		$httpProvider.defaults.useXDomain = true;
		delete $httpProvider.defaults.headers.common['X-Requested-With'];
	}]);

})(window.angular);