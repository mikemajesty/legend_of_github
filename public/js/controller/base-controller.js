(function(angular) {
  'use strict';
  angular.module('Legend')
    .controller('LegendController', ['$scope', '$q', 'RepositoryService', 'StreakService', 'InformationService',
     ($scope, $q, RepositoryService, StreakService, InformationService) => {

      $scope.model = {
        user1: "mikemajesty",
        user2: "celso-wo"
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
          console.log("repositorio: " + 'mikemajesty', user1Repository);
          const user2Repository = data[1];
          console.log("repositorio: " + 'celso-wo', user2Repository);

          const user1Streak = data[2];
          console.log("streak: " + 'mikemajesty', user1Streak);
          const user2Streak = data[3];
          console.log("streak: " + 'celso-wo', user2Streak);

          const user1Information = data[4];
          console.log("information: " + 'mikemajesty', user1Information);
          const user2Information = data[5];
          console.log("information: " + 'celso-wo', user2Information);
        });
      };
    }]);

})(window.angular);