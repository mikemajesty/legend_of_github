(function(angular) {
  'use strict';

  angular.module('Legend')

    .factory("StreakService", ['$http', ($http) => {

      const findStreak = (userName) => {
        return $http.post('/streak', { username: userName }).then((res) => {
          let currentStreak = [];
          let lastCommit = 0;
          res.data.forEach(function(data, index) {
            const date = data.date;
            const currentCommit = data.commit;
            if (userName == 'samfrezza') {
              console.log('date', date);
              console.log('currentCommit', currentCommit);
            }

            if (new Date(data.date.replace('-', '/')).getTime() <= new Date().getTime()) {
              if (currentCommit > 0 && lastCommit > 0 || index === 0) {

                currentStreak.push({
                  date: date,
                  commit: currentCommit
                });

              } else {
                if (res.data.length === (index + 1) && currentCommit > 0) {
                  currentStreak.push({
                    date: date,
                    commit: currentCommit
                  });
                  return;
                }
                currentStreak = [];
              }
            }
            lastCommit = data.commit;
          });
          return currentStreak.length;
        });
      };

      return {
        findStreak
      };
    }]);

})(window.angular);