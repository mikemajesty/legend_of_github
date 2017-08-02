(function(angular) {
  'use strict';
  angular.module('Legend')
    .controller('LegendController', ['$scope', '$q', 'LegendService', function($scope, $q, LegendService) {

      $scope.model = {
        user1: "mikemajesty",
        user2: "celso-wo"
      };

      $scope.compare = function() {
        var findUser1 = LegendService.findUser($scope.model.user1);

        var findUser2 = LegendService.findUser($scope.model.user2);

        var findUser1Streak = LegendService.findStreak($scope.model.user1);

        var findUser2Streak = LegendService.findStreak($scope.model.user2);

        $q.all([findUser1, findUser2, findUser1Streak, findUser2Streak]).then(function(data) {

          var user1Result = data[0];
          console.log("name", user1Result.name);
          console.log("created_at", user1Result.created_at);
          console.log("public_repos", user1Result.public_repos);
          console.log("followers", user1Result.followers);
          console.log("following", user1Result.following);

          var user2Result = data[1];
          console.log("name", user2Result.name);
          console.log("created_at", user2Result.created_at);
          console.log("public_repos", user2Result.public_repos);
          console.log("followers", user2Result.followers);
          console.log("following", user2Result.following);

          var user1Streak = data[2];
          console.log('current streak: ' + $scope.model.user1, user1Streak.streak || 0);

          var user2Streak = data[3];
          console.log('current streak: ' + $scope.model.user2, user2Streak.streak || 0);
        });
      };
    }]);

})(window.angular);