(function(angular) {
  'use strict';

  angular.module('Legend')

  .factory("RepositoryService", ['$http', ($http) => {

    const getRepository = (userName) => {
      return $http.post('/repository', { username: userName }).then((res) => {

        const sumStarAndFork = _.max(_.map(res.data, (value) => {
          return (parseInt(value.stars) + parseInt(value.forks));
        }));

        const groupRepository = _.groupBy(res.data, function(value) { return value.language; });

        const language = _.orderBy(groupRepository, 'length', 'desc')[0]

        const bestRepositoty = _.find(res.data, (value) => { return (parseInt(value.stars) + parseInt(value.forks)) == sumStarAndFork; });

        const relevantsRepositories = _.filter(res.data, (value) => { return value.stars > 5 && value.forks > 0 });

        const stars = _.sumBy(res.data, (value) => { return parseInt(value.stars); });

        const forks = _.sumBy(res.data, (value) => { return parseInt(value.forks); });

        return {
          stars,
          forks,
          repositories: { full: res.data, relevants: relevantsRepositories },
          bestRepositoty: bestRepositoty || "noob",
          language: language ? language[0].language : "noob"
        }
      });
    };

    return {
      getRepository
    };
  }]);

})(window.angular);