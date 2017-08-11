(function(angular) {
  'use strict';

  angular.module('Legend')

  .factory("InformationService", ['$http', ($http) => {

    const findUser = (userName) => {
      return $http.post('/user', { username: userName }).then((res) => {
        return res.data;
      });
    };

    return {
      findUser
    };
  }]);

})(window.angular);