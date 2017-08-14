(function(angular) {
  'use strict';
  angular.module('Legend')
    .controller('LegendController', ['$scope', '$timeout', '$q', 'RepositoryService', 'StreakService', 'InformationService', 'CalculateSkillsService',
      ($scope, $timeout, $q, RepositoryService, StreakService, InformationService, CalculateSkillsService) => {
        $scope.model = {
          user1: "mikemajesty",
          user2: "celso-wo"
        };


        $scope.labels = ['HP', 'P.ATCK', 'P.DEF', 'CAST/SPEED', 'ACCURACY', 'STAMINA', 'RESISTENCE'];
        $scope.series = ['Avatar'];


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

            $scope.user1Avatar = CalculateSkillsService.calculate(avatar1);

            $scope.user1data = [
              [
                $scope.user1Avatar.HP,
                $scope.user1Avatar.P_ATCK,
                $scope.user1Avatar.P_DEF,
                $scope.user1Avatar.CAST_SPEED,
                $scope.user1Avatar.ACCURACY,
                $scope.user1Avatar.STAMINA,
                $scope.user1Avatar.RESISTENCE
              ]
            ];

            const user2Repository = data[1];
            const user2Streak = data[3];
            const user2Information = data[5];

            const avatar2 = { repository: user2Repository, currentStreak: user2Streak, information: user2Information };

            $scope.user2Avatar = CalculateSkillsService.calculate(avatar2);

            $scope.user2data = [
              $scope.user2Avatar.HP,
              $scope.user2Avatar.P_ATCK,
              $scope.user2Avatar.P_DEF,
              $scope.user2Avatar.CAST_SPEED,
              $scope.user2Avatar.ACCURACY,
              $scope.user2Avatar.STAMINA,
              $scope.user2Avatar.RESISTENCE
            ];
          });
        };
      }
    ]);

})(window.angular);