(function () {
    'use strict';
    angular.module('events')
        .directive('svEventSidenavAd2015', function ($mdSidenav) {
            return {
                replace: true,
                templateUrl: 'scripts/events/directives/sv-event-sidenav-ad-2015.html',
                scope: {
                    eventTitle: '@',
                    body: '@'
                },
                link: function ($scope, el, attrs) {
                    $scope.closeSideBar = function () {
                        $mdSidenav('left').close();
                        $mdSidenav('right').close();
                    };
                }
            };
        });
})();
