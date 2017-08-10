(function(angular) {
  'use strict';
  angular.module('Legend')
    .controller('LegendController', ['$scope', '$q', 'RepositoryService', 'StreakService', ($scope, $q, RepositoryService, StreakService) => {

      $scope.model = {
        user1: "mikemajesty",
        user2: "celso-wo"
      };

      $scope.compare = () => {
        const getUser1Repository = RepositoryService.getRepository($scope.model.user1);

        const getUser2Repository = RepositoryService.getRepository($scope.model.user2);

        const getUser1Streak = StreakService.findStreak($scope.model.user1);

        const getUser2Streak = StreakService.findStreak($scope.model.user2);

        $q.all([getUser1Repository, getUser2Repository, getUser1Streak, getUser2Streak]).then((data) => {
          const user1Repository = data[0];
          console.log("repositorio: " + 'mikemajesty', user1Repository);
          const user2Repository = data[1];
          console.log("repositorio: " + 'celso-wo', user2Repository);

          const user1Streak = data[2];
          console.log("streak: " + 'mikemajesty', user1Streak);
          const user2Streak = data[3];
          console.log("streak: " + 'celso-wo', user2Streak);

        });

        /*$q.all([findUser1, findUser2, findUser1Streak, findUser2Streak, getUser1Repository, getUser2Repository]).then(function(data) {

          const user1Result = data[0];
          console.log("name", user1Result.name);
          console.log("created_at", user1Result.created_at);
          console.log("public_repos", user1Result.public_repos);
          console.log("followers", user1Result.followers);
          console.log("following", user1Result.following);

          const user2Result = data[1];
          console.log("name", user2Result.name);
          console.log("created_at", user2Result.created_at);
          console.log("public_repos", user2Result.public_repos);
          console.log("followers", user2Result.followers);
          console.log("following", user2Result.following);

          const user1Streak = data[2];
          console.log('current streak: ' + $scope.model.user1, user1Streak || 0);

          const user2Streak = data[3];
          console.log('current streak: ' + $scope.model.user2, user2Streak || 0);

          const user1Repository = data[4];
          console.log('repository information: ' + $scope.model.user1, user1Repository || 0);

          const user2Repository = data[5];
          console.log('repository information: ' + $scope.model.user2, user2Repository || 0);
        });*/
      };
    }]);

})(window.angular);