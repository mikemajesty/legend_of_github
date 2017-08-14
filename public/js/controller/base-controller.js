(function(angular) {
  'use strict';
  angular.module('Legend')
    .controller('LegendController', ['$scope', '$q', 'RepositoryService', 'StreakService', 'InformationService', 'CalculateSkillsService',
      ($scope, $q, RepositoryService, StreakService, InformationService, CalculateSkillsService) => {
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

          let avatar = {};

          $q.all([getUser1Repository, getUser2Repository, getUser1Streak, getUser2Streak, getUser1Information, getUser2Information]).then((data) => {
            const user1Repository = data[0];
            const user1Streak = data[2];
            const user1Information = data[4];

            const avatar1 = { repository: user1Repository, currentStreak: user1Streak, information: user1Information };

            $scope.user1Avatar = JSON.stringify(CalculateSkillsService.calculate(avatar1));

            const user2Repository = data[1];
            const user2Streak = data[3];
            const user2Information = data[5];

            const avatar2 = { repository: user2Repository, currentStreak: user2Streak, information: user2Information };

            $scope.user2Avatar =  JSON.stringify(CalculateSkillsService.calculate(avatar2));
          });
        };
      }
    ]);

})(window.angular);