(function(angular) {
  'use strict';
  angular.module('app')
    .controller('Legend', ['$scope', function($scope) {
       $scope.model = {user1: "", user2: ""};

			 $scope.compare = function () {
				 console.log("user1",  $scope.model.user1);
				 console.log("user2",  $scope.model.user2);
			 };
    }]);

})(window.angular);