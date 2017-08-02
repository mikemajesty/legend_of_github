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
        return res.data;
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