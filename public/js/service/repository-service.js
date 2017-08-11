(function(angular) {
  'use strict';

  angular.module('Legend')

  .factory("RepositoryService", ['$http', ($http) => {

    const getRepository = (userName) => {
      return $http.post('/repository', { username: userName }).then((res) => {

        const sumStarAndFork = _.max(_.map(res.data, (value) => {
          return (parseInt(value.stars) + parseInt(value.forks));
        }));

        const bestRepositoty = _.find(res.data, (value) => { return (parseInt(value.stars) + parseInt(value.forks)) == sumStarAndFork;});

        const starts = _.sumBy(res.data, (value) => { return parseInt(value.stars); });

        const forks = _.sumBy(res.data, (value) => { return parseInt(value.forks); });

        return { starts, forks, repositories: res.data, bestRepositoty: bestRepositoty || "noob" }
      });
    };

    return {
      getRepository
    };
  }]);

})(window.angular);