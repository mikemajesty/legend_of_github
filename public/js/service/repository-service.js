(function(angular) {
  'use strict';

  angular.module('Legend')

  .factory("RepositoryService", ['$http', ($http) => {

    const getRepository = (userName) => {
      return $http.post('/repository', { username: userName }).then(res => res.data);
    };

    return {
      getRepository
    };
  }]);

})(window.angular);