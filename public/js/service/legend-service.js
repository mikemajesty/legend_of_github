(function(angular) {
  'use strict';

  angular.module('Legend')

  .factory("LegendService", ['$http', function($http) {

    var findUser = function(userName) {
      return $http.post('/user', { username: userName }).then(function(res) {
        return res.data;
      });
    };

    var findStreak = function(userName) {
      return $http.post('/streak', { username: userName }).then(function(res) {
        var currentStreak = [];

        res.data.filter(function(data) {
          var date = data.date.split('-');
          return new Date(date[0], date[1], date[2],0,0,0,0).getTime() < new Date().getTime();
        }).forEach(function(data, index) {
          var date = data.date;
          var currentCommit = data.commit;
          var lastCommit = 0;

          if (userName === 'mikemajesty') {
            console.log('currentCommit: ' + currentCommit + ' - lastCommit: ' + lastCommit + ' - date: ' + date);
          }

          if (currentCommit > 0 && lastCommit > 0 || index === 0) {

            currentStreak.push({
              date: date,
              commit: currentCommit
            });

          } else {
            currentStreak = [];
          }

          lastCommit = data.commit;
        });
        return currentStreak;
      });
    };

    var getRepository = function(userName) {
      return $http.post('/repository', { username: userName }).then(function(res) {
        return res.data;
      });
    };

    return {
      findUser,
      findStreak,
      getRepository
    };
  }]);

})(window.angular);