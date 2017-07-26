(function (angular) {
    'use strict';

    angular.module('Legend').constant('LegendConstants', {
        API: 'https://api.github.com/',
        STREAK: 'https://github-stats.com/api/user/streak/current/'
    });

})(window.angular);