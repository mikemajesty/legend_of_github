(function(angular) {
  'use strict';

  angular.module('Legend')

  .factory("StreakService", ['$http', ($http) => {

    const findStreak = (userName) => {
      return $http.post('/streak', { username: userName }).then((res) => {
        let currentStreak = [];
 
        res.data/*.filter((data) => {
          const date = data.date.split('-');
          return new Date(date[0], date[1], date[2],0,0,0,0).getTime() < new Date().getTime();
        })*/.forEach(function (data, index) {
          const date = data.date;
          const currentCommit = data.commit;
          let lastCommit = 0;

          if (userName === 'mikemajesty') {
            //console.log('currentCommit: ' + currentCommit + ' - lastCommit: ' + lastCommit + ' - date: ' + date);
          }
          if (currentCommit > 0 && lastCommit > 0 || index === 0) {

            currentStreak.push({
              date: date,
              commit: currentCommit
            });

          } else {
            currentStreak = [];
          }
          console.log('puta vida', data);
          lastCommit = data.commit;
        });
        return currentStreak;
      });
    };

    return {
      findStreak
    };
  }]);

})(window.angular);