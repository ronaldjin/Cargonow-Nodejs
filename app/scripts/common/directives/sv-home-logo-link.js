(function () {
    'use strict';

    angular.module('common')
        .directive('svHomeLogoLink', function ($rootScope, $mdSidenav) {
            return {
                replace: true,
                templateUrl: 'scripts/common/directives/sv-home-logo-link.html',
                scope: {},
                link: function ($scope, el, attrs) {
                    $scope.closeSideBar = function () {
                        $mdSidenav('left').close();
                        $mdSidenav('right').close();
                    };
                }
            };
        });
})();
