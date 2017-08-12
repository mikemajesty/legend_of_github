(function(angular) {
  'use strict';
  angular.module('Legend')
    .controller('LegendController', ['$scope', '$q', 'RepositoryService', 'StreakService', 'InformationService',
      ($scope, $q, RepositoryService, StreakService, InformationService) => {

        $scope.model = {
          user1: "mikemajesty",
          user2: "luiguild"
        };

        $scope.compare = () => {
          const getUser1Repository = RepositoryService.getRepository($scope.model.user1);

          const getUser2Repository = RepositoryService.getRepository($scope.model.user2);

          const getUser1Streak = StreakService.findStreak($scope.model.user1);

          const getUser2Streak = StreakService.findStreak($scope.model.user2);

          const getUser1Information = InformationService.findUser($scope.model.user1);

          const getUser2Information = InformationService.findUser($scope.model.user2);

          $q.all([getUser1Repository, getUser2Repository, getUser1Streak, getUser2Streak, getUser1Information, getUser2Information]).then((data) => {
            const user1Repository = data[0];
            console.log("repositorio: " + $scope.model.user1, user1Repository);
            const user1Streak = data[2];
            console.log("current streak: " + $scope.model.user1, user1Streak);
            const user1Information = data[4];
            console.log("information: " + $scope.model.user1, user1Information);
            console.log("----------------------------------------------------")
            const user2Repository = data[1];
            console.log("repositorio: " + $scope.model.user2, user2Repository);
            const user2Streak = data[3];
            console.log("current streak: " + $scope.model.user2, user2Streak);
            const user2Information = data[5];
            console.log("information: " + $scope.model.user2, user2Information);
          });
        };
      }
    ]);

})(window.angular);