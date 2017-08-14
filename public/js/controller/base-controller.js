(function(angular) {
  'use strict';
  angular.module('Legend')
    .controller('LegendController', ['$scope', '$timeout', '$q', 'RepositoryService', 'StreakService', 'InformationService', 'CalculateSkillsService', 'ngProgressFactory',
      ($scope, $timeout, $q, RepositoryService, StreakService, InformationService, CalculateSkillsService, ngProgressFactory) => {
        $scope.model = {
          user1: "mikemajesty",
          user2: "celso-wo"
        };


        $scope.labels = ['HP', 'MP', 'P.ATCK', 'P.DEF', 'CAST/SPEED', 'CRITICAL', 'ACCURACY', 'STAMINA'];
        $scope.series = ['Avatar'];

        $scope.progressbar = ngProgressFactory.createInstance();

        $scope.compare = () => {
          $scope.progressbar.start();
          const getUser1Repository = RepositoryService.getRepository($scope.model.user1);

          const getUser2Repository = RepositoryService.getRepository($scope.model.user2);

          const getUser1Streak = StreakService.findStreak($scope.model.user1);

          const getUser2Streak = StreakService.findStreak($scope.model.user2);

          const getUser1Information = InformationService.findUser($scope.model.user1);

          const getUser2Information = InformationService.findUser($scope.model.user2);

          let avatar = {};

          $q.all([getUser1Repository, getUser2Repository, getUser1Streak, getUser2Streak, getUser1Information, getUser2Information]).then((data) => {
            $timeout($scope.progressbar.complete(), 5000);
            const user1Repository = data[0];
            const user1Streak = data[2];
            const user1Information = data[4];

            console.log(`current streak ${ $scope.model.user1 }`, user1Streak);

            const avatar1 = {
              repository: user1Repository,
              currentStreak: user1Streak,
              information: user1Information
            };

            $scope.user1Avatar = CalculateSkillsService.calculate(avatar1);

            $scope.user1data = [
              [
                $scope.user1Avatar.HP,
                $scope.user1Avatar.MP,
                $scope.user1Avatar.P_ATCK,
                $scope.user1Avatar.P_DEF,
                $scope.user1Avatar.CAST_SPEED,
                $scope.user1Avatar.CRITICAL,
                $scope.user1Avatar.ACCURACY,
                $scope.user1Avatar.STAMINA
              ]
            ];

            const user2Repository = data[1];
            const user2Streak = data[3];
            const user2Information = data[5];

            console.log(`current streak ${ $scope.model.user2 }`, user2Streak);

            const avatar2 = {
              repository: user2Repository,
              currentStreak: user2Streak,
              information: user2Information
            };

            $scope.user2Avatar = CalculateSkillsService.calculate(avatar2);

            $scope.user2data = [
              $scope.user2Avatar.HP,
              $scope.user2Avatar.MP,
              $scope.user2Avatar.P_ATCK,
              $scope.user2Avatar.P_DEF,
              $scope.user2Avatar.CAST_SPEED,
              $scope.user2Avatar.CRITICAL,
              $scope.user2Avatar.ACCURACY,
              $scope.user2Avatar.STAMINA
            ];
          });
        };
      }
    ]);

})(window.angular);