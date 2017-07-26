(function (angular) {
    'use strict';

    angular.module('Legend')

    .factory("LegendService", ['$http', 'LegendConstants', function ($http, LegendConstants) {

        var findUser = function (userName) {
            return $http({
                method: 'GET',
                url: LegendConstants.API + "users/" + userName
            }).then(function (res) {
                return res.data;
            });
        };

        return {
            findUser: findUser,
        };
    }]);

})(window.angular);